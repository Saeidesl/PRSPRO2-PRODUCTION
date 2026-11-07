(function () {
  'use strict';

  const PMS = window.PMS;
  const CACHE_KEY = PMS.Cache.keys.EVENTS;
  const PROJECTS_CACHE_KEY = PMS.Cache.keys.PROJECTS;
  const EVENT_TYPES_CACHE_KEY = PMS.Cache.keys.EVENT_TYPES;
  const EVENT_FORM_DEFINITION_CACHE_TTL_MS = 30000;
  const eventFormDefinitionCache = new Map();
  let eventFormDefinitionsPrefetchPromise = null;
  let eventFormDefinitionsPrefetchToken = '';
  let eventFormDefinitionCacheGeneration = 0;

  function eventFormDefinitionCacheKey(eventTypeId) {
    const token = PMS.Api && typeof PMS.Api.getToken === 'function'
      ? PMS.Api.getToken() || ''
      : '';
    return String(token) + '\\n' + String(eventTypeId || '');
  }

  function clearEventFormDefinitionCache() {
    eventFormDefinitionCache.clear();
    eventFormDefinitionCacheGeneration++;
    eventFormDefinitionsPrefetchPromise = null;
    eventFormDefinitionsPrefetchToken = '';
  }

  const EVENT_DEPENDENT_CACHE_TTL_MS = 60000;
  const EVENT_WORKFLOW_CACHE_TTL_MS = 15000;
  const eventDependentDataCache = new Map();
  const eventDependentDataRequests = new Map();
  let eventDependentDataCacheGeneration = 0;

  function eventDependentCacheKey(kind, parts) {
    const token = PMS.Api && typeof PMS.Api.getToken === 'function'
      ? PMS.Api.getToken() || ''
      : '';
    return [token, kind].concat((parts || []).map(value => String(value || ''))).join('\\n');
  }

  function clearEventDependentDataCache(projectId) {
    eventDependentDataCacheGeneration++;
    const token = PMS.Api && typeof PMS.Api.getToken === 'function'
      ? PMS.Api.getToken() || ''
      : '';
    const prefix = String(token) + '\\n';
    const project = projectId ? String(projectId) : '';
    [eventDependentDataCache, eventDependentDataRequests].forEach(map => {
      Array.from(map.keys()).forEach(key => {
        if (key.indexOf(prefix) !== 0) return;
        if (!project || key.indexOf('\\n' + project) !== -1) map.delete(key);
      });
    });
  }

  function getEventDependentData(key, loader, ttlMs) {
    const now = Date.now();
    const cached = eventDependentDataCache.get(key);
    if (cached && cached.expiresAt > now) return Promise.resolve(cached.value);
    if (eventDependentDataRequests.has(key)) return eventDependentDataRequests.get(key);
    const generation = eventDependentDataCacheGeneration;
    const request = Promise.resolve().then(loader).then(value => {
      if (generation === eventDependentDataCacheGeneration) eventDependentDataCache.set(key, {
        value: value,
        expiresAt: Date.now() + Math.max(1000, Number(ttlMs) || EVENT_DEPENDENT_CACHE_TTL_MS)
      });
      return value;
    }).finally(() => {
      if (eventDependentDataRequests.get(key) === request) eventDependentDataRequests.delete(key);
    });
    eventDependentDataRequests.set(key, request);
    return request;
  }

  const Events = {
    events: [],
    projects: [],
    eventsLoaded: false,
    projectsLoaded: false,
    projectOptionsToken: '',
    formDefinitionCacheInvalidationBound: false,
    workflowProgress: null,
    workflowProgressRequestId: 0,
    amendmentSourceRequestId: 0,
    workflowProgressProjectId: '',
    workflowProgressLoading: false,
    workflowProgressError: false,
    eventContextRequestId: 0,
    eventContextInformation: [],
    eventContextHistoryRequests: {},
    eventTypes: [],
    canCreateEvents: false,
    canAccessProjectOptions: false,
    formDefinitions: [],
    formsReady: true,
    formsRequestId: 0,
    eventFormsLoadRequestId: 0,
    modalOpen: false,
    submitting: false,
    escapeHandlerBound: false,
    pendingIdempotencyKey: '',
    pendingIdempotencyFingerprint: '',
    searchTimer: null,
    historySortOrder: 'desc',
    preselectedProjectId: '',
    entryMode: 'all',
    amendmentMode: false,
    amendmentSourceEventId: '',
    amendmentSourceFormId: '',
    amendmentSourceVersion: 0,
    amendmentSourceUpdatedAt: '',
    amendmentEventId: '',
    amendmentPendingValues: null,
    queueProjectImageObserver: null,
    queueProjectImageRequestId: 0,
    queueProjectImageAttachments: Object.create(null),

    init: function () {
      this.bindEvents();
      if (!this.formDefinitionCacheInvalidationBound && typeof window.addEventListener === 'function') {
        this.formDefinitionCacheInvalidationBound = true;
        window.addEventListener('hashchange', function () {
          const route = String(window.location.hash || '').replace(/^#/, '').split('/')[0];
          if (['forms', 'event-types', 'information-types', 'projects'].indexOf(route) !== -1) {
            clearEventFormDefinitionCache();
            clearEventDependentDataCache();
          }
        });
        window.addEventListener('pms:auth-expired', function () {
          clearEventFormDefinitionCache();
          clearEventDependentDataCache();
        });
      }
      this.activateQueue('progress');

      const permissions = PMS.Router && Array.isArray(PMS.Router.permissions)
        ? PMS.Router.permissions : [];
      const isAdmin = !!(PMS.Router && typeof PMS.Router.isAdmin === 'function' && PMS.Router.isAdmin());
      this.canCreateEvents = isAdmin || permissions.indexOf('EVENT_CREATE') !== -1;
      this.canAccessProjectOptions = isAdmin ||
        permissions.indexOf('PROJECT_VIEW') !== -1 ||
        permissions.indexOf('PROJECT_CREATE') !== -1;

      const createButton = document.getElementById('event-create-button');
      if (createButton) createButton.hidden = !this.canCreateEvents;
      const entryGrid = document.querySelector('.event-entry-grid');
      if (entryGrid) entryGrid.hidden = !this.canCreateEvents;
      const projectEntry = document.querySelector('[data-event-entry="project"]');
      const workEntry = document.querySelector('[data-event-entry="my-work"]');
      if (projectEntry) projectEntry.hidden = !this.canAccessProjectOptions;
      if (workEntry) workEntry.hidden = !this.canAccessProjectOptions;

      this.load().then(function () {
        if (Events.preselectedProjectId) {
          Events.entryMode = 'project';
          Events.openForm();
        }
      });
    },

    bindEvents: function () {
      if (!this.escapeHandlerBound) {
        this.escapeHandlerBound = true;
        document.addEventListener('keydown', function (event) {
          const progressOverlay = document.getElementById('event-submit-progress-modal');
          if (!Events.modalOpen && !progressOverlay) return;
          if (event.key === 'Escape') {
            if (progressOverlay) {
              if (Events.submitProgressState && Events.submitProgressState.finished) {
                Events.closeSubmitProgressModal();
              }
              return;
            }
            if (!Events.submitting) Events.closeModal();
            return;
          }
          if (event.key !== 'Tab') return;
          const overlay = progressOverlay || document.getElementById('event-create-modal') ||
            document.getElementById('event-details-modal');
          const dialog = overlay && (
            overlay.getAttribute('role') === 'dialog' ? overlay : overlay.querySelector('[role="dialog"]')
          );
          const focusable = dialog ? Array.from(dialog.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )).filter(function (element) { return !element.hidden && element.getAttribute('aria-hidden') !== 'true'; }) : [];
          if (!focusable.length) { event.preventDefault(); return; }
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        });
      }

      document.addEventListener('click', function (event) {
        const target = event.target;

        const clearFiltersButton = target.closest('#events-clear-filters');
        if (clearFiltersButton) {
          event.preventDefault();
          Events.clearHistoryFilters();
          return;
        }

        const filterButton = target.closest('#events-filter-toggle');
        if (filterButton) {
          event.preventDefault();

          const content = document.getElementById('events-filter-content');
          const arrow = document.getElementById('events-filter-arrow');

          if (!content) return;

          content.hidden = !content.hidden;
          filterButton.setAttribute('aria-expanded', String(!content.hidden));
          filterButton.classList.toggle('is-expanded', !content.hidden);

          if (arrow) arrow.textContent = content.hidden ? '⌄' : '⌃';
          return;
        }

        const projectEntry = target.closest('[data-event-entry="project"]');
        if (projectEntry) {
          event.preventDefault();
          Events.prefetchEventFormDefinitions();
          const panel = document.getElementById('events-project-entry-panel');
          if (panel) {
            panel.hidden = false;
            Events.renderRecentProjects();
            const search = document.getElementById('events-project-search');
            if (search) search.focus();
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          return;
        }
        if (target.closest('[data-event-entry-close]')) {
          const panel = document.getElementById('events-project-entry-panel');
          if (panel) panel.hidden = true;
          return;
        }
        if (target.closest('[data-event-entry="my-work"]')) {
          event.preventDefault();
          const queue = document.getElementById('event-project-queues');
          if (queue) queue.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (target.closest('[data-event-entry="independent"]')) {
          event.preventDefault();
          Events.entryMode = 'independent';
          Events.preselectedProjectId = '';
          Events.openForm();
          return;
        }
        const recentProjectAction = target.closest('.event-recent-project-action');
        if (recentProjectAction) {
          event.preventDefault();
          Events.entryMode = 'project';
          Events.preselectedProjectId = String(recentProjectAction.dataset.projectId || '');
          Events.openForm();
          return;
        }

        const queueTab = target.closest('.event-queue-tab');
        if (queueTab) {
          event.preventDefault();
          Events.activateQueue(queueTab.dataset.queue);
          return;
        }

        if (target.closest('#event-create-button')) {
          event.preventDefault();
          Events.openForm();
          return;
        }

        const queueThumbnail = target.closest('[data-event-project-thumbnail]');
        if (queueThumbnail) {
          event.preventDefault();
          const media = queueThumbnail.closest('[data-event-project-media]');
          const projectId = media && String(media.getAttribute('data-event-project-media') || '');
          const imageSrc = projectId && PMS.Modules && PMS.Modules.Projects &&
            PMS.Modules.Projects.projectCardImages
            ? PMS.Modules.Projects.projectCardImages[projectId]
            : '';
          const canViewImage = !!(PMS.Router && (
            (typeof PMS.Router.isAdmin === 'function' && PMS.Router.isAdmin()) ||
            (Array.isArray(PMS.Router.permissions) && PMS.Router.permissions.indexOf('ATTACHMENT_VIEW') !== -1)
          ));
          if (canViewImage && imageSrc && !queueThumbnail.hidden &&
              media && media.dataset.imageState === 'ready') {
            PMS.Modules.Projects.openProjectImage(imageSrc, queueThumbnail.alt || 'تصویر پروژه');
          }
          return;
        }

        const changeRequestAction = target.closest('.event-queue-change-request-button');
        if (changeRequestAction) {
          event.preventDefault();
          if (PMS.Alert && typeof PMS.Alert.info === 'function') {
            PMS.Alert.info('این امکان فعلاً در دسترس نیست و به‌زودی فعال می‌شود');
          }
          return;
        }

        const queueAction = target.closest('.event-queue-register-button');
        if (queueAction) {
          event.preventDefault();
          Events.preselectedProjectId = String(queueAction.dataset.projectId || '');
          Events.openForm();
          return;
        }

        const contextEventButton = target.closest('[data-context-event-id]');
        if (contextEventButton) {
          event.preventDefault();
          Events.openDetails(contextEventButton.dataset.contextEventId);
          return;
        }

        const detailsButton = target.closest('.event-details-button');
        if (detailsButton) {
          event.preventDefault();
          Events.openDetails(detailsButton.dataset.eventId);
        }
      });

      // Complete the ARIA tab interaction for keyboard and assistive-technology users.
      document.addEventListener('keydown', function (event) {
        const thumbnail = event.target && event.target.closest
          ? event.target.closest('[data-event-project-thumbnail]') : null;
        if (thumbnail && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          const media = thumbnail.closest('[data-event-project-media]');
          const projectId = media && String(media.getAttribute('data-event-project-media') || '');
          const imageSrc = projectId && PMS.Modules && PMS.Modules.Projects &&
            PMS.Modules.Projects.projectCardImages ? PMS.Modules.Projects.projectCardImages[projectId] : '';
          const canViewImage = !!(PMS.Router && (
            (typeof PMS.Router.isAdmin === 'function' && PMS.Router.isAdmin()) ||
            (Array.isArray(PMS.Router.permissions) && PMS.Router.permissions.indexOf('ATTACHMENT_VIEW') !== -1)
          ));
          if (canViewImage && imageSrc && !thumbnail.hidden && media && media.dataset.imageState === 'ready') {
            PMS.Modules.Projects.openProjectImage(imageSrc, thumbnail.alt || 'تصویر پروژه');
          }
          return;
        }
        const current = event.target && event.target.closest
          ? event.target.closest('.event-queue-tab') : null;
        if (!current) return;
        const tabs = Array.from(document.querySelectorAll('.event-queue-tab:not([disabled])'));
        const index = tabs.indexOf(current);
        if (index < 0) return;
        let nextIndex = index;
        if (event.key === 'ArrowLeft') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowRight') nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        const next = tabs[nextIndex];
        Events.activateQueue(next.dataset.queue);
        next.focus();
      });

      [
        'event-project-filter',
        'event-type-filter',
        'event-status-filter',
        'event-history-scope',
        'event-creator-filter',
        'event-department-filter',
        'event-occurred-from',
        'event-occurred-to',
        'event-created-from',
        'event-created-to',
        'event-history-sort'
      ].forEach(function (id) {
        const element = document.getElementById(id);
        if (element) {
          element.addEventListener('change', function () {
            Events.applyFilters();
          });
        }
      });

      const projectSearch = document.getElementById('events-project-search');
      if (projectSearch) {
        projectSearch.addEventListener('input', function () {
          Events.renderRecentProjects();
        });
      }

      const searchInput = document.getElementById('event-search');

      if (searchInput) {
        searchInput.addEventListener('input', function () {
          clearTimeout(Events.searchTimer);
          Events.searchTimer = setTimeout(function () {
            Events.applyFilters();
          }, 120);
        });
      }

      document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if (Events.submitting) return;

        if (document.getElementById('event-create-modal')) {
          Events.closeForm();
        } else if (document.getElementById('event-details-modal')) {
          Events.closeModal();
        }
      });
    },

    load: async function () {
      const loading = document.getElementById('events-loading');
      const router = PMS.Router;
      const isAdmin = !!(
        router &&
        typeof router.isAdmin === 'function' &&
        router.isAdmin()
      );
      const permissions = router && Array.isArray(router.permissions)
        ? router.permissions
        : [];
      const canViewEvents = isAdmin || permissions.indexOf('EVENT_VIEW') !== -1;
      const canLoadProjectOptions = isAdmin ||
        permissions.indexOf('PROJECT_VIEW') !== -1 ||
        permissions.indexOf('PROJECT_CREATE') !== -1;
      const canLoadEventTypes = isAdmin ||
        permissions.indexOf('EVENT_CREATE') !== -1 ||
        permissions.indexOf('EVENT_TYPE_MANAGE') !== -1;

      const currentToken = PMS.Api.getToken() || '';
      if (this.projectOptionsToken !== currentToken) {
        this.projects = [];
        this.projectsLoaded = false;
      }
      const cachedEvents = canViewEvents ? PMS.Cache.get(CACHE_KEY) : null;
      const cachedProjects = canLoadProjectOptions &&
        this.projectOptionsToken === currentToken && this.projectsLoaded
        ? this.projects
        : null;
      const cachedTypes = canLoadEventTypes
        ? PMS.Cache.get(EVENT_TYPES_CACHE_KEY)
        : null;

      if (!canViewEvents) {
        this.events = [];
        PMS.Cache.remove(CACHE_KEY);
      }
      if (!canLoadProjectOptions) {
        this.projects = [];
        this.projectsLoaded = false;
        this.projectOptionsToken = '';
        PMS.Cache.remove(PROJECTS_CACHE_KEY);
      }
      if (!canLoadEventTypes) {
        this.eventTypes = [];
        PMS.Cache.remove(EVENT_TYPES_CACHE_KEY);
      }

      this.eventsLoaded = !canViewEvents || cachedEvents !== null;
      this.projectsLoaded = !canLoadProjectOptions || cachedProjects !== null;
      if (cachedEvents !== null) this.events = this.normalize(cachedEvents);
      if (cachedProjects !== null) this.projects = this.normalize(cachedProjects);
      if (cachedTypes !== null) this.eventTypes = this.normalize(cachedTypes);

      const hasCache =
        cachedEvents !== null ||
        cachedProjects !== null ||
        cachedTypes !== null;

      if (hasCache) {
        this.renderFilters();
        this.applyFilters();
        if (loading) loading.hidden = true;
      }

      try {
        const requests = [];
        const resultKeys = [];

        if (canViewEvents) {
          resultKeys.push('events');
          requests.push(
            PMS.Api.getCached('/events', CACHE_KEY, {
              cacheTtl: 15000,
              onRefresh: function (data) {
                Events.events = Events.normalize(data);
                Events.eventsLoaded = true;
                Events.scheduleRefreshRender();
              },
              onError: function (error, isBackground) {
                if (!isBackground && cachedEvents === null) {
                  Events.showError(error);
                }
              }
            })
          );
        }

        if (canLoadProjectOptions) {
          resultKeys.push('projects');
          requests.push(
            PMS.Api.get('/projects', {
              query: { view: 'event-picker' }
            }).then(function (response) {
              return {
                data: PMS.Api.extractData(response),
                cached: false
              };
            })
          );
        }

        if (canLoadEventTypes) {
          resultKeys.push('types');
          requests.push(
            PMS.Api.getCached('/event-types', EVENT_TYPES_CACHE_KEY, {
              cacheTtl: 60000,
              onRefresh: function (data) {
                Events.eventTypes = Events.normalize(data);
                Events.scheduleRefreshRender();
              }
            })
          );
        }

        const results = await Promise.all(requests);
        let hasFreshResult = false;
        results.forEach(function (result, index) {
          if (!result || result.cached !== false) return;

          hasFreshResult = true;
          const key = resultKeys[index];
          if (key === 'events') { Events.events = Events.normalize(result.data); Events.eventsLoaded = true; }
          if (key === 'projects') {
            Events.projects = Events.normalize(result.data);
            Events.projectsLoaded = true;
            Events.projectOptionsToken = currentToken;
          }
          if (key === 'types') Events.eventTypes = Events.normalize(result.data);
        });

        // Cache hits were already rendered above. Only render here when this
        // request batch supplied data that was not available in the cache.
        if (hasFreshResult) {
          this.renderFilters();
          this.applyFilters();
        }
      } catch (error) {
        if (cachedEvents === null) this.showError(error);
        this.clearUnresolvedSkeletons();
      } finally {
        if (loading) {
          loading.hidden = true;
          loading.removeAttribute('aria-busy');
        }
      }
    },

    clearUnresolvedSkeletons: function () {
      const targets = [
        { id: 'events-recent-projects', label: 'فهرست پروژه‌ها' },
        { id: 'event-queue-pending', label: 'صف پروژه‌های در انتظار اقدام' },
        { id: 'event-queue-progress', label: 'صف پروژه‌های در حال انجام' },
        { id: 'event-queue-completed', label: 'صف پروژه‌های تکمیل‌شده' }
      ];
      targets.forEach(function (target) {
        const container = document.getElementById(target.id);
        if (!container) return;
        const hasSkeleton = !!container.querySelector('.event-skeleton-stack, .event-skeleton-grid');
        const hasLegacyLoading = /در حال بارگذاری/.test(container.textContent || '');
        if (!hasSkeleton && !hasLegacyLoading) return;
        container.removeAttribute('aria-busy');
        container.innerHTML = '<p class="event-queue-empty">' +
          Events.escape('دریافت ' + target.label + ' ناموفق بود. صفحه را دوباره بارگذاری کنید.') +
          '</p>';
      });
    },

    scheduleRefreshRender: function () {
      // Coalesce background refreshes from /events, /projects and /event-types
      // into one UI update instead of rendering once per response.
      clearTimeout(this.refreshRenderTimer);
      this.refreshRenderTimer = setTimeout(function () {
        Events.renderFilters();
        Events.applyFilters();
      }, 40);
    },

    normalize: function (data) {
      if (Array.isArray(data)) return data;
      if (!data || typeof data !== 'object') return [];

      const keys = [
        'items',
        'events',
        'projects',
        'eventTypes',
        'fields',
        'data',
        'records',
        'values'
      ];

      for (const key of keys) {
        if (Array.isArray(data[key])) return data[key];
      }

      return [];
    },

    idOf: function (item) {
      return String(item && (item.ID || item.Id || item.id) || '');
    },

    findById: function (items, id) {
      const wanted = String(id || '');

      return items.find(function (item) {
        return Events.idOf(item) === wanted;
      }) || null;
    },

    renderFilters: function () {
      const projectFilter = document.getElementById('event-project-filter');
      const typeFilter = document.getElementById('event-type-filter');
      const creatorFilter = document.getElementById('event-creator-filter');
      const departmentFilter = document.getElementById('event-department-filter');

      function fillSelect(select, label, items) {
        if (!select) return;

        const signature = JSON.stringify([label, items.map(function (item) {
          return [String(item.value), String(item.label)];
        })]);
        if (select.dataset.pmsOptionsSignature === signature) return;

        const previous = select.value;
        const fragment = document.createDocumentFragment();

        const first = document.createElement('option');
        first.value = '';
        first.textContent = label;
        fragment.appendChild(first);

        items.forEach(function (item) {
          const option = document.createElement('option');
          option.value = String(item.value);
          option.textContent = String(item.label);
          fragment.appendChild(option);
        });

        select.replaceChildren(fragment);
        select.dataset.pmsOptionsSignature = signature;

        if (Array.from(select.options).some(function (option) {
          return option.value === previous;
        })) {
          select.value = previous;
        }
      }

      const projects = this.uniqueValues(this.projects.map(function (project) {
        const id = Events.idOf(project);
        if (!id) return null;

        return {
          value: id,
          label: project.ProjectCode || project.Title || project.Name || id
        };
      }));

      const types = this.uniqueValues(this.eventTypes.map(function (type) {
        const id = Events.idOf(type);
        if (!id) return null;

        return {
          value: id,
          label: type.Name || type.Code || id
        };
      }));

      const creators = this.uniqueValues(this.events.map(function (event) {
        const value = Events.creatorIdValue(event);
        const label = Events.creatorValue(event);
        return value && label !== '-' ? { value: value, label: label } : null;
      }));

      const departments = this.uniqueValues(this.events.map(function (event) {
        const value = Events.departmentIdValue(event);
        const label = Events.departmentValue(event);
        return value && label !== '-' ? { value: value, label: label } : null;
      }));

      fillSelect(projectFilter, 'همه پروژه‌ها', projects);
      fillSelect(typeFilter, 'همه انواع', types);
      fillSelect(creatorFilter, 'همه ثبت‌کنندگان', creators);
      fillSelect(departmentFilter, 'همه واحدها', departments);
      this.renderRecentProjects();
    },

    renderRecentProjects: function () {
      const container = document.getElementById('events-recent-projects');
      if (!container || !this.projectsLoaded) return;
      container.removeAttribute('aria-busy');
      const searchInput = document.getElementById('events-project-search');
      const query = String(searchInput && searchInput.value || '').trim().toLocaleLowerCase('fa');
      const projects = this.projects.filter(function (project) {
        const id = Events.idOf(project);
        const label = [project.ProjectCode, project.Title, project.Name, project.ProjectName, id]
          .filter(Boolean).join(' ').toLocaleLowerCase('fa');
        return id && (!query || label.includes(query));
      }).slice(0, 12);
      if (!projects.length) {
        const emptyMarkup = '<p class="event-queue-empty">' +
          Events.escape(query ? 'پروژه‌ای با این مشخصات پیدا نشد.' : 'پروژه‌ای برای نمایش در دسترس نیست.') +
          '</p>';
        if (container.innerHTML !== emptyMarkup) container.innerHTML = emptyMarkup;
        return;
      }
      const markup = projects.map(function (project) {
        const id = Events.idOf(project);
        const code = project.ProjectCode || id;
        const title = project.Title || project.Name || project.ProjectName || 'بدون عنوان';
        const step = project.CurrentStepName || project.WorkflowStepName || '';
        const status = project.CurrentStepStatus || project.Status || '';
        return '<article class="event-recent-project-card">' +
          '<div class="event-recent-project-main"><strong>' + Events.escape(code) + '</strong>' +
          '<span>' + Events.escape(title) + '</span>' +
          (step ? '<small>' + Events.escape(step) + '</small>' : '') +
          (status ? '<small class="event-recent-project-status">' + Events.escape(status) + '</small>' : '') +
          '</div><button type="button" class="btn btn-primary event-recent-project-action" data-project-id="' +
          Events.escape(id) + '">ادامه و ثبت رویداد</button></article>';
      }).join('');
      if (container.innerHTML !== markup) container.innerHTML = markup;
    },

    uniqueValues: function (items) {
      const seen = new Set();

      return items
        .filter(function (item) {
          if (!item || item.value === null || item.value === undefined) {
            return false;
          }

          const value = String(item.value).trim();
          if (!value || seen.has(value)) return false;

          seen.add(value);
          item.value = value;
          item.label = String(item.label || value);
          return true;
        })
        .sort(function (a, b) {
          return a.label.localeCompare(b.label, 'fa');
        });
    },

    applyFilters: function () {
      const get = function (id) {
        const element = document.getElementById(id);
        return element ? element.value.trim() : '';
      };

      const filters = {
        project: get('event-project-filter'),
        type: get('event-type-filter'),
        scope: get('event-history-scope') || 'mine',
        creator: get('event-creator-filter'),
        department: get('event-department-filter'),
        status: get('event-status-filter').toUpperCase(),
        search: get('event-search').toLocaleLowerCase('fa'),
        occurredFrom: get('event-occurred-from'),
        occurredTo: get('event-occurred-to'),
        createdFrom: get('event-created-from'),
        createdTo: get('event-created-to')
      };

      this.renderProjectQueues();

      const projectMap = new Map();

      this.projects.forEach(function (item) {
        projectMap.set(Events.idOf(item), item);
      });

      const typeMap = new Map();

      this.eventTypes.forEach(function (item) {
        typeMap.set(Events.idOf(item), item);
      });

      const dateKey = function (value) {
        if (!value) return '';
        const raw = String(value).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw.slice(0, 10);

        const date = new Date(value);
        if (isNaN(date.getTime())) return '';

        return [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0')
        ].join('-');
      };

      const inRange = function (value, from, to) {
        if (!from && !to) return true;

        const date = dateKey(value);
        if (!date) return false;
        if (from && date < from) return false;
        if (to && date > to) return false;

        return true;
      };

      const currentUserId = this.currentUserId();
      const filtered = this.events.filter(function (event) {
        if (filters.scope === 'mine' && (!currentUserId || String(event.CreatedBy || '') !== currentUserId)) {
          return false;
        }

        if (filters.project && String(event.ProjectID || '') !== filters.project) {
          return false;
        }

        if (filters.type && String(event.EventTypeID || '') !== filters.type) {
          return false;
        }

        if (filters.status &&
            String(event.Status || '').toUpperCase() !== filters.status) {
          return false;
        }

        if (filters.creator && Events.creatorIdValue(event) !== filters.creator) {
          return false;
        }

        if (filters.department && Events.departmentIdValue(event) !== filters.department) {
          return false;
        }

        if (!inRange(event.OccurredAt, filters.occurredFrom, filters.occurredTo)) {
          return false;
        }

        if (!inRange(event.CreatedAt, filters.createdFrom, filters.createdTo)) {
          return false;
        }

        if (filters.search) {
          const project = projectMap.get(String(event.ProjectID || ''));
          const type = typeMap.get(String(event.EventTypeID || ''));

          const text = [
            event.ProjectCode,
            event.ProjectTitle,
            event.ProjectName,
            project && project.ProjectCode,
            project && project.Title,
            project && project.Name,
            event.EventTypeName,
            type && type.Name,
            type && type.Code,
            event.Description,
            event.OccurredAt,
            Events.formatDate(event.OccurredAt),
            event.CreatedAt,
            Events.formatDate(event.CreatedAt),
            event.CreatorName,
            event.CreatedByName,
            event.CreatedBy,
            event.PerformedByName,
            event.PerformedBy,
            event.DepartmentName,
            event.DepartmentTitle,
            event.DepartmentID,
            Events.statusText(event.Status),
            event.Status,
            event.ID
          ].filter(function (value) {
            return value !== null && value !== undefined;
          }).join(' ').toLocaleLowerCase('fa');

          if (!text.includes(filters.search)) return false;
        }

        return true;
      });

      const sortControl = document.getElementById('event-history-sort');
      this.historySortOrder = sortControl && sortControl.value === 'asc' ? 'asc' : 'desc';
      const sortDirection = this.historySortOrder === 'asc' ? 1 : -1;
      const sorted = filtered.map(function (event, index) {
        const timestamp = Date.parse(event && event.CreatedAt || '');
        return { event: event, index: index, timestamp: Number.isFinite(timestamp) ? timestamp : 0 };
      }).sort(function (a, b) {
        if (a.timestamp === b.timestamp) return a.index - b.index;
        return (a.timestamp - b.timestamp) * sortDirection;
      }).map(function (item) { return item.event; });

      this.render(sorted);
      this.updateHistoryFilterSummary(filters);
    },

    currentUserId: function () {
      const user = PMS.Router && typeof PMS.Router.getUser === 'function' ? PMS.Router.getUser() || {} : {};
      return String(user.ID || user.Id || user.id || '');
    },

    creatorIdValue: function (event) {
      return String(event && event.CreatedBy || '').trim();
    },

    departmentIdValue: function (event) {
      return String(event && event.DepartmentID || '').trim();
    },

    updateHistoryFilterSummary: function (filters) {
      const count = [
        filters.scope === 'all', filters.project, filters.creator, filters.department,
        filters.type, filters.status, filters.occurredFrom, filters.occurredTo,
        filters.createdFrom, filters.createdTo, filters.search
      ].filter(Boolean).length;
      const label = document.getElementById('events-active-filter-count');
      const clear = document.getElementById('events-clear-filters');
      if (label) label.textContent = count ? count + ' فیلتر فعال' : 'فیلتر فعالی وجود ندارد';
      if (clear) clear.disabled = count === 0;
    },

    clearHistoryFilters: function () {
      const ids = [
        'event-history-scope', 'event-project-filter', 'event-creator-filter',
        'event-department-filter', 'event-type-filter', 'event-status-filter',
        'event-created-from', 'event-created-to', 'event-occurred-from', 'event-occurred-to', 'event-search'
      ];
      ids.forEach(function (id) {
        const element = document.getElementById(id);
        if (element) element.value = id === 'event-history-scope' ? 'mine' : '';
      });
      this.applyFilters();
    },

    activateQueue: function (key) {
      const allowed = ['pending', 'progress', 'completed'];
      if (allowed.indexOf(key) === -1) return;

      allowed.forEach(function (name) {
        const tab = document.querySelector('.event-queue-tab[data-queue="' + name + '"]');
        const panel = document.getElementById('event-panel-' + name);
        const active = name === key;

        if (tab) {
          tab.classList.toggle('is-active', active);
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
        }

        if (panel) {
          panel.hidden = !active;
          panel.classList.toggle('is-active', active);
        }
      });
    },

    getLatestEventByProject: function (events) {
      const latestByProject = new Map();
      (events || []).forEach(function (event) {
        if (!event || String(event.Status || 'ACTIVE').toUpperCase() === 'VOID') return;
        const projectId = String(event.ProjectID || '').trim();
        if (!projectId) return;
        const createdAt = new Date(event.CreatedAt || '').getTime();
        const occurredAt = new Date(event.OccurredAt || '').getTime();
        const timestamp = Number.isFinite(createdAt) && createdAt > 0
          ? createdAt
          : Number.isFinite(occurredAt) && occurredAt > 0 ? occurredAt : 0;
        const previous = latestByProject.get(projectId);
        if (!previous || timestamp > previous.timestamp) {
          latestByProject.set(projectId, { event: event, timestamp: timestamp });
        }
      });
      return latestByProject;
    },

    getProjectStatusTone: function (status) {
      const value = String(status || '').trim().toLowerCase()
        .replace(/[ي]/g, 'ی')
        .replace(/[ك]/g, 'ک')
        .replace(/[\u200c\s]+/g, ' ');

      if (!value) return 'neutral';
      if (/لغو|رد شده|ناموفق|مردود|cancelled|rejected/.test(value)) return 'danger';
      if (/تکمیل شده|تکمیل‌شده|پایان یافته|پایان‌یافته|انجام شده|انجام‌شده|completed/.test(value)) return 'completed';
      if (/متوقف|تعلیق|on hold|paused/.test(value)) return 'paused';
      if (/در انتظار|منتظر|آماده|pending|waiting/.test(value)) return 'waiting';
      if (/در حال|جاری|فعال|الگوسازی|برش|دوخت|بسته بندی|بسته‌بندی|in progress|active/.test(value)) return 'active';
      return 'neutral';
    },

    renderProjectQueues: function () {
      if (!this.projectsLoaded) return;
      const user = PMS.Router && typeof PMS.Router.getUser === 'function' ? PMS.Router.getUser() || {} : {};
      const userId = String(user.ID || user.Id || user.id || '');
      const departmentId = String(user.DepartmentID || user.departmentId || '');
      const typeMap = new Map();
      this.eventTypes.forEach(function (type) { typeMap.set(Events.idOf(type), type); });

      // Aggregate project activity once; latest-event selection is independently testable.
      const activityByProject = new Map();
      const latestEventByProject = this.getLatestEventByProject(this.events);

      this.events.forEach(function (event) {
        if (String(event.Status || 'ACTIVE').toUpperCase() === 'VOID') return;
        const projectId = String(event.ProjectID || '').trim();
        if (!projectId) return;

        const belongsToUser = !!userId && (
          String(event.PerformedBy || '') === userId ||
          String(event.CreatedBy || '') === userId
        );
        const belongsToDepartment = !!departmentId &&
          String(event.DepartmentID || '') === departmentId;
        const related = departmentId
          ? belongsToDepartment || belongsToUser
          : belongsToUser;
        if (!related) return;

        let activity = activityByProject.get(projectId);
        if (!activity) {
          activity = { hasRelated: false, completed: false };
          activityByProject.set(projectId, activity);
        }
        activity.hasRelated = true;
        const type = typeMap.get(String(event.EventTypeID || ''));
        if (event.IsWorkCompletion === true ||
            String(event.IsWorkCompletion).toLowerCase() === 'true' ||
            String(event.IsWorkCompletion) === '1' ||
            (!!type && (type.IsWorkCompletion === true ||
              String(type.IsWorkCompletion).toLowerCase() === 'true' ||
              String(type.IsWorkCompletion) === '1'))) {
          activity.completed = true;
        }
      });

      const queues = { pending: [], progress: [], completed: [] };
      this.projects.forEach(function (project) {
        const projectId = Events.idOf(project);
        if (!projectId) return;
        const activity = activityByProject.get(projectId);
        queues[activity && activity.completed ? 'completed' :
          activity && activity.hasRelated ? 'progress' : 'pending'].push(project);
      });

      const definitions = [
        { key: 'pending', label: 'در انتظار اقدام', id: 'event-queue-pending', countId: 'event-queue-pending-count', empty: 'پروژه‌ای در انتظار اقدام نیست.' },
        { key: 'progress', label: 'در حال انجام', id: 'event-queue-progress', countId: 'event-queue-progress-count', empty: 'پروژه‌ای در حال انجام نیست.' },
        { key: 'completed', label: 'تکمیل‌شده', id: 'event-queue-completed', countId: 'event-queue-completed-count', empty: 'هنوز پروژه‌ای با رویداد پایان کار ثبت نشده است.' }
      ];
      definitions.forEach(function (definition) {
        const container = document.getElementById(definition.id);
        const count = document.getElementById(definition.countId);
        if (!container) return;
        container.removeAttribute('aria-busy');
        const items = queues[definition.key];
        if (count) count.textContent = String(items.length).replace(/\d/g, function (digit) { return '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]; });
        if (!items.length) {
          container.innerHTML = '<p class="event-queue-empty">' + Events.escape(definition.empty) + '</p>';
          return;
        }
        container.innerHTML = items.map(function (project) {
          const id = Events.idOf(project);
          const code = project.ProjectCode || id;
          const title = project.Title || project.Name || project.ProjectName || 'بدون عنوان';
          const status = String(project.CurrentStepStatus || project.Status || '').trim();
          const statusTone = Events.getProjectStatusTone(status);
          const latest = latestEventByProject.get(id);
          const latestEvent = latest && latest.event;
          const eventType = latestEvent
            ? (latestEvent.EventTypeName || (typeMap.get(String(latestEvent.EventTypeID || '')) || {}).Name ||
              (typeMap.get(String(latestEvent.EventTypeID || '')) || {}).Code || 'رویداد ثبت‌شده')
            : '';
          const eventCreator = latestEvent ? Events.creatorValue(latestEvent) : '';
          const eventDate = latestEvent
            ? Events.formatDate(latestEvent.CreatedAt || latestEvent.OccurredAt)
            : '';
          return '<article class="event-queue-project queue-' + definition.key + '" data-queue="' + definition.key + '" data-event-project-card="' + Events.escape(id) + '">' +
            '<div class="event-queue-project-main">' +
              '<div class="event-queue-project-media" data-event-project-media="' + Events.escape(id) + '" data-image-state="loading">' +
                '<img data-event-project-thumbnail alt="تصویر پروفایل پروژه" role="button" tabindex="0" aria-label="نمایش بزرگ تصویر پروژه" hidden>' +
                '<span class="event-queue-project-image-placeholder">در حال بارگذاری تصویر</span>' +
              '</div>' +
              '<div class="event-queue-project-copy">' +
                '<strong>' + Events.escape(code) + ' — ' + Events.escape(title) + '</strong>' +
                (status ? '<span class="event-queue-project-status-badge status-' + statusTone + '" title="وضعیت پروژه">' + Events.escape(status) + '</span>' : '') +
              '</div>' +
            '</div>' +
            (latestEvent
              ? '<div class="event-queue-latest-event"><span class="event-queue-latest-label">آخرین رویداد</span>' +
                '<strong>' + Events.escape(eventType) + '</strong>' +
                '<span>' + Events.escape(eventCreator) + (eventDate ? ' · ' + Events.escape(eventDate) : '') + '</span></div>'
              : '<div class="event-queue-latest-event is-empty"><span class="event-queue-latest-label">آخرین رویداد</span><span>هنوز رویدادی ثبت نشده است.</span></div>') +
            (definition.key === 'completed'
              ? '<button type="button" class="btn btn-secondary event-queue-change-request-button">درخواست ثبت تغییرات</button>'
              : (Events.canCreateEvents ? '<button type="button" class="btn btn-secondary event-queue-register-button" data-project-id="' + Events.escape(id) + '">ثبت رویداد برای این پروژه</button>' : '')) +
            '</article>';
        }).join('');
      });

      this.loadQueueProjectImages(this.projects);
    },

    loadQueueProjectImages: async function (projects) {
      const projectModule = PMS.Modules && PMS.Modules.Projects;
      const containers = [
        document.getElementById('event-queue-pending'),
        document.getElementById('event-queue-progress'),
        document.getElementById('event-queue-completed')
      ].filter(Boolean);
      const requestId = ++this.queueProjectImageRequestId;
      if (this.queueProjectImageObserver) this.queueProjectImageObserver.disconnect();
      if (!projectModule || typeof projectModule.getProjectCardAttachments !== 'function') return;

      const router = PMS.Router;
      const canViewAttachments = !!(router && (
        (typeof router.isAdmin === 'function' && router.isAdmin()) ||
        (Array.isArray(router.permissions) && router.permissions.indexOf('ATTACHMENT_VIEW') !== -1)
      ));
      if (!canViewAttachments) {
        this.applyQueueProjectImages();
        return;
      }

      try {
        const attachments = await projectModule.getProjectCardAttachments();
        if (requestId !== this.queueProjectImageRequestId) return;
        const visibleIds = new Set((projects || []).map(Events.idOf).filter(Boolean));
        const latestByProject = Object.create(null);
        (attachments || []).filter(function (item) {
          const entityType = String(item.EntityType || item.entityType || '').toUpperCase();
          const projectId = String(item.EntityID || item.entityID || item.EntityId || '');
          const mime = String(item.MimeType || item.mimeType || '').toLowerCase();
          const attachmentType = String(item.AttachmentType || item.attachmentType || '').toUpperCase();
          const status = String(item.Status || item.status || 'ACTIVE').toUpperCase();
          return entityType === 'PROJECT' && visibleIds.has(projectId) &&
            mime.indexOf('image/') === 0 && attachmentType === 'PROFILE' &&
            status !== 'DELETED' && status !== 'VOID';
        }).sort(function (a, b) {
          return new Date(b.UploadedAt || b.uploadedAt || b.CreatedAt || 0).getTime() -
            new Date(a.UploadedAt || a.uploadedAt || a.CreatedAt || 0).getTime();
        }).forEach(function (item) {
          const projectId = String(item.EntityID || item.entityID || item.EntityId || '');
          if (projectId && !latestByProject[projectId]) latestByProject[projectId] = item;
        });

        this.queueProjectImageAttachments = latestByProject;
        (projects || []).forEach(function (project) {
          const projectId = Events.idOf(project);
          if (!projectId) return;
          if (!latestByProject[projectId] && !projectModule.projectCardImages[projectId]) {
            projectModule.projectCardImageStates[projectId] = 'empty';
          } else if (latestByProject[projectId] && !projectModule.projectCardImages[projectId]) {
            projectModule.projectCardImageStates[projectId] = 'loading';
          }
        });
        this.applyQueueProjectImages();
        const targets = containers.reduce(function (all, container) {
          return all.concat(Array.from(container.querySelectorAll('[data-event-project-media]')));
        }, []);
        if ('IntersectionObserver' in window) {
          this.queueProjectImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const media = entry.target;
              this.queueProjectImageObserver.unobserve(media);
              const projectId = String(media.getAttribute('data-event-project-media') || '');
              const attachment = this.queueProjectImageAttachments[projectId];
              if (attachment && typeof projectModule.loadOneProjectCardImage === 'function') {
                projectModule.loadOneProjectCardImage(projectId, attachment)
                  .finally(() => this.applyQueueProjectImages());
              }
            });
          }, { rootMargin: '240px 0px', threshold: 0.01 });
          targets.forEach((target) => this.queueProjectImageObserver.observe(target));
        } else {
          await Promise.all(targets.map((target) => {
            const projectId = String(target.getAttribute('data-event-project-media') || '');
            const attachment = this.queueProjectImageAttachments[projectId];
            return attachment && typeof projectModule.loadOneProjectCardImage === 'function'
              ? projectModule.loadOneProjectCardImage(projectId, attachment)
              : Promise.resolve();
          }));
          this.applyQueueProjectImages();
        }
      } catch (error) {
        if (requestId !== this.queueProjectImageRequestId) return;
        (projects || []).forEach(function (project) {
          const projectId = Events.idOf(project);
          if (projectId && projectModule.projectCardImageStates) projectModule.projectCardImageStates[projectId] = 'error';
        });
        console.warn('Event queue project images could not be loaded:', error);
        this.applyQueueProjectImages();
      }
    },

    applyQueueProjectImages: function () {
      const projectModule = PMS.Modules && PMS.Modules.Projects;
      const router = PMS.Router;
      const canViewAttachments = !!(router && (
        (typeof router.isAdmin === 'function' && router.isAdmin()) ||
        (Array.isArray(router.permissions) && router.permissions.indexOf('ATTACHMENT_VIEW') !== -1)
      ));
      const containers = [
        document.getElementById('event-queue-pending'),
        document.getElementById('event-queue-progress'),
        document.getElementById('event-queue-completed')
      ].filter(Boolean);
      containers.forEach(function (container) {
        container.querySelectorAll('[data-event-project-media]').forEach(function (media) {
          const projectId = String(media.getAttribute('data-event-project-media') || '');
          const image = media.querySelector('[data-event-project-thumbnail]');
          const placeholder = media.querySelector('.event-queue-project-image-placeholder');
          const src = canViewAttachments && projectModule && projectModule.projectCardImages
            ? projectModule.projectCardImages[projectId]
            : '';
          const state = canViewAttachments && projectModule && projectModule.projectCardImageStates
            ? projectModule.projectCardImageStates[projectId] || 'empty'
            : 'empty';
          if (image && !image.dataset.queueImageErrorBound) {
            image.dataset.queueImageErrorBound = '1';
            image.addEventListener('error', function () {
              image.hidden = true;
              image.removeAttribute('src');
              media.dataset.imageState = 'error';
              if (placeholder) {
                placeholder.hidden = false;
                placeholder.textContent = 'تصویر در دسترس نیست';
              }
            });
          }
          media.dataset.imageState = src ? 'ready' : state;
          if (src && image) {
            image.src = src;
            image.hidden = false;
            if (placeholder) placeholder.hidden = true;
          } else {
            if (image) { image.removeAttribute('src'); image.hidden = true; }
            if (placeholder) {
              placeholder.hidden = false;
              placeholder.textContent = state === 'loading' || state === 'loading-image'
                ? 'در حال بارگذاری تصویر'
                : state === 'error' ? 'تصویر در دسترس نیست' : 'بدون تصویر';
            }
          }
        });
      });
    },

    render: function (events) {
      if (!this.eventsLoaded) return;
      const container = document.getElementById('events-table-container');
      const empty = document.getElementById('events-empty');
      if (!container) return;

      const loading = document.getElementById('events-loading');
      if (loading) {
        loading.hidden = true;
        loading.removeAttribute('aria-busy');
      }

      if (!events || events.length === 0) {
        container.replaceChildren();
        container.hidden = true;
        if (empty) empty.hidden = false;
        return;
      }

      if (empty) empty.hidden = true;

      const projectMap = new Map();
      const typeMap = new Map();
      this.projects.forEach(function (project) { projectMap.set(Events.idOf(project), project); });
      this.eventTypes.forEach(function (type) { typeMap.set(Events.idOf(type), type); });

      const cards = events.map(function (event) {
        const project = projectMap.get(String(event.ProjectID || '')) || null;
        const type = typeMap.get(String(event.EventTypeID || '')) || null;
        const projectCode = (project && project.ProjectCode) || event.ProjectCode || event.ProjectID || '-';
        const projectTitle = (project && (project.Title || project.Name || project.ProjectName)) ||
          event.ProjectTitle || event.ProjectName || 'بدون عنوان';
        const typeName = event.EventTypeName || (type && (type.Name || type.Code)) ||
          event.EventTypeID || 'رویداد ثبت‌شده';
        const description = event.Description || 'بدون شرح';
        const creator = Events.creatorValue(event) || '-';
        const department = Events.departmentValue(event) || '-';
        const status = String(event.Status || '').toUpperCase();
        const statusClass = Events.statusClass(status);
        const eventId = Events.escape(event.ID || '');
        const occurredAt = Events.formatDate(event.OccurredAt) || '-';
        const createdAt = Events.formatDate(event.CreatedAt) || '-';

        return '<article class="event-list-card">' +
          '<div class="event-list-card-main">' +
            '<div class="event-list-card-heading">' +
              '<div class="event-list-card-project">' +
                '<span class="event-list-card-eyebrow">پروژه</span>' +
                '<strong class="event-list-card-code">' + Events.escape(projectCode) + '</strong>' +
                '<span class="event-list-card-title">' + Events.escape(projectTitle) + '</span>' +
              '</div>' +
              '<span class="event-list-card-status ' + statusClass + '">' +
                Events.escape(Events.statusText(event.Status)) +
              '</span>' +
            '</div>' +
            '<div class="event-list-card-type"><span class="event-list-card-type-dot" aria-hidden="true"></span>' +
              Events.escape(typeName) +
            '</div>' +
            '<div class="event-list-card-description">' +
              '<span class="event-list-card-label">شرح فعالیت</span>' +
              '<p>' + Events.escape(description) + '</p>' +
            '</div>' +
            '<div class="event-list-card-meta">' +
              '<div class="event-list-card-meta-item"><span class="event-list-card-label">تاریخ وقوع</span><strong>' + Events.escape(occurredAt) + '</strong></div>' +
              '<div class="event-list-card-meta-item"><span class="event-list-card-label">تاریخ ثبت</span><strong>' + Events.escape(createdAt) + '</strong></div>' +
              '<div class="event-list-card-meta-item"><span class="event-list-card-label">ثبت‌کننده</span><strong>' + Events.escape(creator) + '</strong></div>' +
              '<div class="event-list-card-meta-item"><span class="event-list-card-label">واحد</span><strong>' + Events.escape(department) + '</strong></div>' +
            '</div>' +
          '</div>' +
          '<div class="event-list-card-actions">' +
            '<span class="event-list-card-id">شناسه: ' + Events.escape(event.ID || '-') + '</span>' +
            '<button type="button" class="btn btn-secondary event-details-button" data-event-id="' + eventId + '">مشاهده جزئیات <span aria-hidden="true">←</span></button>' +
          '</div>' +
        '</article>';
      }).join('');

      container.innerHTML = '<div class="event-history-card-grid" aria-label="فهرست رویدادهای ثبت‌شده">' + cards + '</div>';
      container.hidden = false;
    },

    statusClass: function (status) {
      if (status === 'ACTIVE') return 'events-status-active';
      if (status === 'VOID') return 'events-status-void';
      return 'events-status-other';
    },

    openDetails: async function (eventId) {
      if (!eventId) return;

      this.closeModal();

      const previousFocus = document.activeElement;
      const modal = document.createElement('div');
      modal.id = 'event-details-modal';
      modal._pmsFocusReturn = previousFocus;
      modal.dir = 'rtl';
      modal.className = 'event-modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'event-details-title');

      modal.innerHTML =
        '<div class="event-modal-panel event-details-panel">' +
        '<div class="event-modal-heading"><h3 id="event-details-title">جزئیات رویداد</h3>' +
        '<button type="button" id="event-details-close" class="event-modal-close" ' +
        'aria-label="بستن">×</button></div>' +
        '<div id="event-details-content" class="event-modal-content" aria-live="polite">' +
        '<div class="event-loading-state"><span class="event-spinner" aria-hidden="true"></span>' +
        '<p>در حال دریافت جزئیات رویداد...</p></div></div></div>';

      document.body.appendChild(modal);
      this.modalOpen = true;
      const detailsFirstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (detailsFirstFocusable) detailsFirstFocusable.focus();

      document.getElementById('event-details-close')
        .addEventListener('click', () => this.closeModal());

      modal.addEventListener('click', (event) => {
        if (event.target === modal) this.closeModal();
      });

      try {
        const responses = await Promise.all([
          PMS.Api.get('/events/' + encodeURIComponent(eventId)),
          PMS.Api.get('/events/' + encodeURIComponent(eventId) + '/data'),
          PMS.Api.get('/events/' + encodeURIComponent(eventId) + '/forms')
        ]);

        if (!document.getElementById('event-details-modal')) return;

        const event = this.extractObject(responses[0]);
        const legacyDynamicData = this.extractDataObject(responses[1]);
        const formResponses = this.normalize(responses[2]);
        const project = this.findById(this.projects, event.ProjectID);
        const type = this.findById(this.eventTypes, event.EventTypeID);
        let variantDetails = [];
        try {
          const parsedVariants = JSON.parse(String(event.VariantDetailsJSON || '[]'));
          if (Array.isArray(parsedVariants)) variantDetails = parsedVariants;
        } catch (error) {}
        const variantSummary = variantDetails.map(function (variant) {
          const parts = [];
          if (variant.Color) parts.push('رنگ ' + variant.Color);
          if (variant.Size) parts.push('سایز ' + variant.Size);
          if (variant.VariantQuantity !== '' && variant.VariantQuantity !== undefined && variant.VariantQuantity !== null) {
            parts.push('تعداد ' + variant.VariantQuantity);
          }
          return parts.join('، ');
        }).filter(Boolean).join(' | ');

        const rows = [
          ['شناسه رویداد', event.ID],
          [
            'پروژه',
            event.ProjectCode ||
              (project && (project.ProjectCode || project.Title || project.Name)) ||
              event.ProjectID
          ],
          [
            'نوع رویداد',
            event.EventTypeName ||
              (type && (type.Name || type.Code)) ||
              event.EventTypeID
          ],
          ['شرح', event.Description],
          ...(variantDetails.length > 1 && variantSummary ? [['ترکیب‌های رنگ/سایز', variantSummary]] : []),
          ...(variantDetails.length <= 1 && event.Color ? [['رنگ', event.Color]] : []),
          ...(variantDetails.length <= 1 && event.Size ? [['سایز', event.Size]] : []),
          ...(variantDetails.length <= 1 && event.VariantQuantity !== undefined && event.VariantQuantity !== null && String(event.VariantQuantity) !== '' ? [['مقدار رنگ/سایز', event.VariantQuantity]] : []),
          ['ثبت‌کننده', this.creatorValue(event)],
          ['انجام‌دهنده', event.PerformedByName || event.PerformedBy],
          ['واحد', this.departmentValue(event)],
          ['تاریخ وقوع', this.formatDate(event.OccurredAt)],
          ['تاریخ ثبت', this.formatDate(event.CreatedAt)],
          ['وضعیت', this.statusText(event.Status)]
        ];

        let html = '<div class="event-detail-grid">';

        rows.forEach(function (row) {
          html +=
            '<div class="event-detail-card"><strong class="event-detail-label">' +
            Events.escape(row[0]) +
            '</strong><div class="event-detail-value">' +
            Events.escape(row[1] || '-') +
            '</div></div>';
        });

        html += '</div><h4 class="event-section-title">اطلاعات اختصاصی رویداد</h4>';

        const values = this.legacyDynamicEntries(legacyDynamicData);

        if (values.length) {
          html +=
            '<div class="event-modal-table-wrap"><table class="event-modal-table">' +
            '<thead><tr><th>فیلد</th><th>مقدار</th></tr></thead><tbody>';

          values.forEach(function (item) {
            html +=
              '<tr><td>' + Events.escape(item[0]) + '</td><td>' +
              Events.escape(item[1]) + '</td></tr>';
          });

          html += '</tbody></table></div>';
        } else {
          html += '<p class="event-muted">اطلاعات اختصاصی برای این رویداد ثبت نشده است.</p>';
        }

        if (formResponses.length) {
          html += '<h4 class="event-section-title">فرم‌های اطلاعات ثبت‌شده</h4>';
          formResponses.forEach(function (response) {
            const definition = response.Definition || {};
            html += '<section class="event-form-response-card"><h5>' +
              Events.escape(definition.Name || definition.Code || 'فرم') + '</h5>';
            const fields = Array.isArray(definition.Fields) ? definition.Fields : [];
            fields.forEach(function (field) {
              const info = field.InformationType || {};
              const key = String(field.InformationTypeID || info.ID || '');
              const value = response.Values ? response.Values[key] : null;
              const label = field.LabelOverride || info.Name || info.Code || 'اطلاعات';
              html += '<div class="event-form-response-field"><strong>' + Events.escape(label) + '</strong>';
              const cardinality = String(info.Cardinality || 'SINGLE').toUpperCase();
              const columns = Array.isArray(info.Columns) ? info.Columns.filter(column => String(column.Status || 'ACTIVE') === 'ACTIVE') : [];
              if (columns.length) {
                const dataRows = cardinality === 'MULTIPLE' ? (Array.isArray(value) ? value : []) : (value && typeof value === 'object' && Object.keys(value).length ? [value] : []);
                if (dataRows.length) {
                  html += '<div class="event-modal-table-wrap"><table class="event-modal-table"><thead><tr>';
                  columns.forEach(function (column) { html += '<th>' + Events.escape(column.Name || column.Code) + '</th>'; });
                  html += '</tr></thead><tbody>';
                  dataRows.forEach(function (row) {
                    html += '<tr>';
                    columns.forEach(function (column) { html += '<td>' + Events.renderEventFormValue(row[String(column.Code)], column.DataType) + '</td>'; });
                    html += '</tr>';
                  });
                  html += '</tbody></table></div>';
                } else {
                  html += '<p class="event-muted">ردیفی ثبت نشده است.</p>';
                }
              } else {
                html += '<div>' + Events.renderEventFormValue(value, info.DataType) + '</div>';
              }
              html += '</div>';
            });
            html += '</section>';
          });
        }

        const content = document.getElementById('event-details-content');
        if (content) {
          content.innerHTML = html;
          content.querySelectorAll('[data-event-image-attachment]').forEach(button => {
            button.addEventListener('click', () => this.openEventImageAttachment(button.dataset.eventImageAttachment));
          });
        }
      } catch (error) {
        const content = document.getElementById('event-details-content');

        if (content) {
          content.innerHTML = '';

          const message = document.createElement('p');
          message.className = 'event-modal-error';
          message.setAttribute('role', 'alert');
          message.textContent =
            'دریافت جزئیات ناموفق بود: ' + this.errorMessage(error);

          content.appendChild(message);
        }
      }
    },

    extractObject: function (response) {
      const data = PMS.Api.extractData(response);

      if (Array.isArray(data)) return data[0] || {};
      if (data && data.event && typeof data.event === 'object') return data.event;

      return data && typeof data === 'object' ? data : {};
    },

    extractDataObject: function (response) {
      const data = PMS.Api.extractData(response);

      if (Array.isArray(data)) return data;

      if (data && typeof data === 'object') {
        if (Array.isArray(data.items)) return data.items;
        if (Array.isArray(data.fields)) return data.fields;
        if (Array.isArray(data.values)) return data.values;
        if (data.data && typeof data.data === 'object') return data.data;

        return data;
      }

      return {};
    },

    legacyDynamicEntries: function (data) {
      if (Array.isArray(data)) {
        return data.map(function (item) {
          if (item && typeof item === 'object') {
            return [
              item.Name || item.FieldName || item.Code || item.FieldCode || 'فیلد',
              Events.displayValue(
                item.Value !== undefined ? item.Value : item.FieldValue
              )
            ];
          }

          return ['', Events.displayValue(item)];
        });
      }

      if (!data || typeof data !== 'object') return [];

      return Object.keys(data).map(function (key) {
        const value = data[key];

        if (value && typeof value === 'object' && !Array.isArray(value)) {
          const label = value.Name || value.FieldName || value.Label || key;

          const actual = value.Value !== undefined
            ? value.Value
            : value.FieldValue !== undefined
              ? value.FieldValue
              : JSON.stringify(value);

          return [label, Events.displayValue(actual)];
        }

        return [key, Events.displayValue(value)];
      });
    },

    renderEventInformationValue: function (value, info) {
      info = info || {};
      const columns = Array.isArray(info.Columns) ? info.Columns.filter(column => String(column.Status || 'ACTIVE') === 'ACTIVE') : [];
      if (!columns.length) return this.renderEventFormValue(value, info.DataType);
      const rows = String(info.Cardinality || 'SINGLE').toUpperCase() === 'MULTIPLE'
        ? (Array.isArray(value) ? value : [])
        : (value && typeof value === 'object' ? [value] : []);
      if (!rows.length) return '<span>-</span>';
      return '<div class="event-modal-table-wrap"><table class="event-modal-table"><thead><tr>' +
        columns.map(column => '<th>' + this.escape(column.Name || column.Code) + '</th>').join('') +
        '</tr></thead><tbody>' + rows.map(row => '<tr>' + columns.map(column =>
          '<td>' + this.renderEventFormValue(row && row[String(column.Code)], column.DataType) + '</td>'
        ).join('') + '</tr>').join('') + '</tbody></table></div>';
    },

    renderEventFormValue: function (value, dataType) {
      const type = String(dataType || '').toLowerCase();
      if (type === 'image') {
        const images = Array.isArray(value) ? value : (value && typeof value === 'object' ? [value] : []);
        if (!images.length) return '<span>-</span>';
        const canView = PMS.Router && ((typeof PMS.Router.isAdmin === 'function' && PMS.Router.isAdmin()) ||
          (Array.isArray(PMS.Router.permissions) && PMS.Router.permissions.indexOf('ATTACHMENT_VIEW') !== -1));
        return '<div class="event-image-gallery">' + images.map(image => {
          const id = image && (image.AttachmentID || image.ID || image.Id);
          const name = image && (image.FileName || image.Name) || 'تصویر';
          return '<span class="event-image-gallery-item">' +
            (canView && id ? '<button type="button" class="event-image-preview-button" data-event-image-attachment="' + this.escape(id) + '">' + this.escape(name) + '</button>' : this.escape(name)) +
            '</span>';
        }).join('') + '</div>';
      }
      return this.escape(this.displayValue(value));
    },

    openEventImageAttachment: async function (attachmentId) {
      const router = PMS.Router;
      const canView = router && ((typeof router.isAdmin === 'function' && router.isAdmin()) ||
        (Array.isArray(router.permissions) && router.permissions.indexOf('ATTACHMENT_VIEW') !== -1));
      if (!canView || !attachmentId) return;
      try {
        const response = await PMS.Api.get('/attachments/' + encodeURIComponent(attachmentId) + '/download', {trackSync:false});
        const data = PMS.Api.extractData(response) || {};
        if (!data.Base64 || String(data.MimeType || '').toLowerCase().indexOf('image/') !== 0) throw new Error('تصویر قابل دریافت نیست.');
        const binary = atob(data.Base64), bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const url = URL.createObjectURL(new Blob([bytes], {type:data.MimeType}));
        const old = document.getElementById('event-image-preview-modal');
        if (old) old.remove();
        const modal = document.createElement('div');
        modal.id = 'event-image-preview-modal';
        modal.className = 'event-modal-overlay';
        modal.innerHTML = '<div class="event-modal-panel" style="max-width:900px"><div class="event-modal-heading"><h3>' + this.escape(data.FileName || 'پیش‌نمایش تصویر') + '</h3><button type="button" class="event-modal-close" aria-label="بستن">×</button></div><div style="padding:16px;text-align:center"><img alt="' + this.escape(data.FileName || 'تصویر') + '" src="' + url + '" style="max-width:100%;max-height:75vh;object-fit:contain"></div></div>';
        document.body.appendChild(modal);
        const close = () => { modal.remove(); URL.revokeObjectURL(url); };
        modal.querySelector('.event-modal-close').addEventListener('click', close);
        modal.addEventListener('click', event => { if (event.target === modal) close(); });
      } catch (error) {
        this.showNotice('پیش‌نمایش تصویر ناموفق بود: ' + this.errorMessage(error), 'warning');
      }
    },

    displayValue: function (value) {
      if (value === null || value === undefined || value === '') return '-';
      if (typeof value === 'object') return JSON.stringify(value);
      if (value === true) return 'بله';
      if (value === false) return 'خیر';

      return String(value);
    },

    closeModal: function () {
      const details = document.getElementById('event-details-modal');
      const form = document.getElementById('event-create-modal');
      const focusReturn = (form && !this.submitting && form._pmsFocusReturn) ||
        (details && details._pmsFocusReturn);

      if (details) details.remove();
      if (form && !this.submitting) form.remove();

      this.modalOpen = Boolean(
        document.getElementById('event-create-modal')
      );
      if (!this.modalOpen && focusReturn && focusReturn.isConnected &&
          typeof focusReturn.focus === 'function') {
        focusReturn.focus();
      }
    },

    renderProjectPicker: function () {
      const select = document.getElementById('event-form-project');
      const root = document.getElementById('event-project-picker');
      const trigger = document.getElementById('event-project-picker-trigger');
      const value = document.getElementById('event-project-picker-value');
      const list = document.getElementById('event-project-picker-list');
      const search = document.getElementById('event-project-picker-search');
      if (!select || !root || !trigger || !value || !list || !search) return;

      const selected = this.findById(this.projects, select.value);
      const selectedName = selected && (selected.Title || selected.Name) || '';
      const selectedCode = selected && (selected.ProjectCode || this.idOf(selected)) || '';
      value.innerHTML = selected
        ? '<strong class="event-project-picker-code">' + this.escape(selectedCode) + '</strong><small class="event-project-picker-name">' + this.escape(selectedName || 'بدون عنوان') + '</small>'
        : '<span class="event-project-picker-placeholder">برای ادامه، پروژه را انتخاب کنید</span>';
      trigger.classList.toggle('has-selection', !!selected);
      trigger.setAttribute('aria-label', selected
        ? 'پروژه انتخاب‌شده: ' + (selectedName || 'بدون عنوان') + '، کد ' + selectedCode
        : 'انتخاب پروژه');

      const query = String(search.value || '').trim().toLocaleLowerCase('fa');
      const filtered = this.projects.filter(function (project) {
        const title = String(project.Title || project.Name || '').toLocaleLowerCase('fa');
        const code = String(project.ProjectCode || '').toLocaleLowerCase('fa');
        return !query || title.includes(query) || code.includes(query);
      });
      list.innerHTML = '';
      if (!filtered.length) {
        const empty = document.createElement('div');
        empty.className = 'event-project-picker-empty';
        empty.textContent = 'پروژه‌ای با این مشخصات پیدا نشد.';
        list.appendChild(empty);
        return;
      }
      filtered.forEach((project) => {
        const id = this.idOf(project);
        if (!id) return;
        const title = String(project.Title || project.Name || 'بدون عنوان');
        const code = String(project.ProjectCode || id);
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'event-project-picker-option' + (String(select.value) === String(id) ? ' is-selected' : '');
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', String(String(select.value) === String(id)));
        item.dataset.projectId = id;
        const copy = document.createElement('span');
        copy.className = 'event-project-picker-option-copy';
        const projectCode = document.createElement('strong');
        projectCode.className = 'event-project-picker-option-code';
        projectCode.textContent = code;
        const projectName = document.createElement('small');
        projectName.className = 'event-project-picker-option-name';
        projectName.textContent = title;
        copy.append(projectCode, projectName);
        const check = document.createElement('span');
        check.className = 'event-project-picker-check';
        check.setAttribute('aria-hidden', 'true');
        check.textContent = String(select.value) === String(id) ? '✓' : '';
        item.append(copy, check);
        list.appendChild(item);
      });
    },

    setProjectPickerOpen: function (open) {
      const root = document.getElementById('event-project-picker');
      const trigger = document.getElementById('event-project-picker-trigger');
      const panel = document.getElementById('event-project-picker-panel');
      const search = document.getElementById('event-project-picker-search');
      if (!root || !trigger || !panel) return;
      root.classList.toggle('is-open', !!open);
      trigger.setAttribute('aria-expanded', String(!!open));
      panel.hidden = !open;
      if (open && search) {
        search.value = '';
        this.renderProjectPicker();
        window.setTimeout(function () { search.focus(); }, 0);
      }
    },

    openForm: async function () {
      if (!this.canCreateEvents || this.modalOpen || this.submitting) return;
      if (this.preselectedProjectId) this.entryMode = 'project';

      // Start fetching all visible event-type form definitions in parallel
      // with project/workflow selection. The existing per-type endpoint remains
      // the fallback if prefetch is unavailable or a definition is invalid.
      this.prefetchEventFormDefinitions();

      this.modalOpen = true;
      this.formDefinitions = [];
      this.formsReady = true;
      this.formsRequestId++;
      this.eventFormsLoading = false;
      this.eventFormsReady = false;
      this.eventFormsError = false;
      this.formsLoadedForTypeId = '';

      const previousFocus = document.activeElement;
      const modal = document.createElement('div');
      modal.id = 'event-create-modal';
      modal._pmsFocusReturn = previousFocus;
      modal.dir = 'rtl';
      modal.className = 'event-modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'event-form-title');

      modal.innerHTML =
        '<div class="event-modal-panel event-form-workspace">' +
        '<div class="event-modal-heading"><div><span class="event-modal-kicker">مدیریت تولید</span>' +
        '<h3 id="event-form-title">ثبت رویداد جدید</h3>' +
        '<p class="event-modal-subtitle">اطلاعات فعالیت انجام‌شده را وارد کنید.</p></div>' +
        '<button type="button" id="event-form-close" class="event-modal-close" aria-label="بستن">×</button></div>' +
        '<div id="event-form-error" class="event-modal-error" role="alert" hidden></div>' +
        '<form id="event-create-form" novalidate>' +
        '<button type="button" class="event-context-mobile-trigger" id="event-context-mobile-trigger" aria-expanded="false" aria-controls="event-context-panel">اطلاعات مرتبط پروژه</button>' +
        '<section class="event-form-section"><h4 class="event-section-title">اطلاعات اصلی</h4>' +
        '<div class="event-dynamic-grid">' +
        '<div class="event-field"><label for="event-project-picker-trigger">پروژه <span class="event-required">*</span></label>' +
        '<select id="event-form-project" name="ProjectID" class="event-project-native-select" tabindex="-1" aria-hidden="true"><option value="">انتخاب پروژه</option></select><div class="event-project-picker" id="event-project-picker"><button type="button" class="event-project-picker-trigger" id="event-project-picker-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="event-project-picker-panel"><span class="event-project-picker-value" id="event-project-picker-value"><span class="event-project-picker-placeholder">برای ادامه، پروژه را انتخاب کنید</span></span><span class="event-project-picker-chevron" aria-hidden="true">⌄</span></button><div class="event-project-picker-panel" id="event-project-picker-panel" hidden><div class="event-project-picker-search-wrap"><span aria-hidden="true">⌕</span><input type="search" id="event-project-picker-search" placeholder="جست‌وجوی نام یا کد پروژه..." autocomplete="off" aria-label="جست‌وجوی پروژه"></div><div class="event-project-picker-list" id="event-project-picker-list" role="listbox" aria-label="فهرست پروژه‌ها"></div></div></div></div>' +
        '<div class="event-field"><label for="event-form-type">نوع رویداد <span class="event-required">*</span></label>' +
        '<div class="event-type-control"><select id="event-form-type" name="EventTypeID" required><option value="">انتخاب نوع رویداد</option></select>' +
        '<div id="event-type-loading" class="event-type-loading" hidden></div></div></div>' +
        '<div class="event-field"><label for="event-form-date">تاریخ و زمان وقوع <span class="event-required">*</span></label>' +
        '<input id="event-form-date" name="OccurredAt" type="datetime-local" required></div>' +
        '<div class="event-field event-field-wide"><label for="event-form-description">شرح رویداد</label>' +
        '<textarea id="event-form-description" name="Description" rows="3" placeholder="توضیحات تکمیلی، در صورت نیاز"></textarea></div>' +
        '</div></section>' +
        '<section class="event-form-section" id="event-workflow-progress-section" hidden><h4 class="event-section-title">پیشرفت مرحله گردش‌کار</h4><div id="event-workflow-progress" class="event-muted" role="status" aria-live="polite"></div></section>' +
        '<section class="event-form-section" id="event-amendment-section" hidden><h4 class="event-section-title">فرم مورد اصلاح</h4>' +
        '<p class="event-muted" id="event-amendment-status" role="status" aria-live="polite">پس از انتخاب پروژه، پاسخ قبلی فرم به‌صورت خودکار پیدا می‌شود.</p>' +
        '<div hidden aria-hidden="true"><select id="event-amendment-source-event"></select><select id="event-amendment-source-form"></select></div></section>' +
        '<section class="event-form-section" id="event-quantity-section" hidden><h4 class="event-section-title">مقدار تولید/تحویل</h4>' +
        '<div id="event-quantity-field" class="event-dynamic-grid"></div></section>' +
        '<section class="event-form-section" id="event-configured-forms-section" hidden><div class="event-configured-forms-heading"><h4 class="event-section-title">فرم‌های اطلاعات تکمیلی</h4></div>' +
        '<div id="event-configured-forms" class="event-dynamic-grid" aria-live="polite"></div></section>' +
        '<div id="event-submit-progress" class="event-submit-progress" hidden role="status" aria-live="polite">' +
        '<span class="event-spinner" aria-hidden="true"></span><div><strong>در حال آماده‌سازی و ثبت رویداد</strong>' +
        '<p>فایل‌ها و اطلاعات فرم در حال آماده‌سازی و ارسال هستند؛ لطفاً این پنجره را نبندید.</p></div></div>' +
        '<div class="event-modal-actions">' +
        '<button type="submit" id="event-form-submit" class="event-modal-button event-modal-button-primary" disabled aria-disabled="true">' +
        '<span class="event-submit-button-text">ثبت رویداد</span><span class="event-button-spinner" aria-hidden="true" hidden></span></button>' +
        '<button type="button" id="event-form-cancel" class="event-modal-button">انصراف</button>' +
        '</div></form>' +
        '<aside id="event-context-panel" class="event-context-panel" aria-label="اطلاعات مرتبط پروژه">' +
        '<div class="event-context-heading"><div><span class="event-modal-kicker">اطلاعات کمکی</span><h4>اطلاعات مرتبط</h4></div>' +
        '<button type="button" id="event-context-close" class="event-context-close" aria-label="بستن پنل">×</button></div>' +
        '<div id="event-context-content" class="event-context-content"><p class="event-muted">برای مشاهده اطلاعات مرتبط، پروژه و نوع رویداد را انتخاب کنید.</p></div></aside></div>';

      document.body.appendChild(modal);
      modal.addEventListener('click', (event) => {
        if (!event.target.closest('#event-project-picker')) {
          this.setProjectPickerOpen(false);
        }
        const contextTrigger = event.target.closest('#event-context-mobile-trigger');
        if (contextTrigger) {
          const panel = document.getElementById('event-context-panel');
          if (panel) panel.classList.add('is-open');
          contextTrigger.setAttribute('aria-expanded', 'true');
          return;
        }
        if (event.target.closest('#event-context-close')) {
          const panel = document.getElementById('event-context-panel');
          const trigger = document.getElementById('event-context-mobile-trigger');
          if (panel) panel.classList.remove('is-open');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
          return;
        }
        const imageButton = event.target.closest('[data-event-image-attachment]');
        if (imageButton) {
          this.openEventImageAttachment(imageButton.dataset.eventImageAttachment);
          return;
        }
        const historyButton = event.target.closest('[data-context-history]');
        if (historyButton) {
          this.toggleEventContextHistory(historyButton.dataset.contextHistory, historyButton);
          return;
        }
      });

      const projectSelect = document.getElementById('event-form-project');
      const typeSelect = document.getElementById('event-form-type');
      const dateInput = document.getElementById('event-form-date');
      if (this.entryMode === 'independent') {
        const projectField = projectSelect.closest('.event-field');
        if (projectField) projectField.hidden = true;
        projectSelect.required = false;
      }

      this.projects.forEach(function (project) {
        const id = Events.idOf(project);
        if (!id) return;

        const option = document.createElement('option');
        option.value = id;
        option.textContent =
          project.ProjectCode || project.Title || project.Name || id;

        projectSelect.appendChild(option);
      });

      // When arriving from a project detail page, preselect that project.
      if (this.preselectedProjectId) {
        const requestedProjectId = String(this.preselectedProjectId);
        if (Array.from(projectSelect.options).some(function (option) {
          return option.value === requestedProjectId;
        })) {
          projectSelect.value = requestedProjectId;
        }
        this.preselectedProjectId = '';
      }

      this.renderProjectPicker();

      this.refreshEventTypeOptions();

      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      dateInput.value = now.toISOString().slice(0, 16);

      document.getElementById('event-form-close')
        .addEventListener('click', () => this.closeForm());

      document.getElementById('event-form-cancel')
        .addEventListener('click', () => this.closeForm());

      // Event type availability is recalculated from the selected project and
      // the authoritative workflow-progress response.


      typeSelect.addEventListener('change', () => {
        const selectedType = this.findById(this.eventTypes, typeSelect.value);
        this.setAmendmentMode(!!selectedType && (selectedType.IsFormAmendment === true || String(selectedType.IsFormAmendment).toLowerCase() === 'true' || /(EDIT|UPDATE|AMEND|ویرایش|اصلاح)/i.test(String(selectedType.Code || '')+' '+String(selectedType.Name || ''))), projectSelect.value);
        const selectedProject = this.findById(this.projects, projectSelect.value);
        if (selectedProject && String(selectedProject.RecordState || '').toUpperCase() === 'DRAFT' &&
            selectedType && String(selectedType.ConnectionType || 'PROJECT').toUpperCase() !== 'INDEPENDENT' &&
            !(selectedType.AllowOnDraft === true || String(selectedType.AllowOnDraft).toLowerCase() === 'true')) {
          typeSelect.value = '';
          this.showFormError('این نوع رویداد برای ثبت روی پیش‌نویس مجاز نشده است.');
          return;
        }
        const isIndependent = !!selectedType &&
          String(selectedType.ConnectionType || 'PROJECT').toUpperCase() === 'INDEPENDENT';
        const projectField = projectSelect.closest('.event-field');
        if (projectField) projectField.hidden = isIndependent;
        projectSelect.required = !isIndependent;
        if (isIndependent) {
          projectSelect.value = '';
          this.loadWorkflowProgress('');
        } else {
          this.refreshEventTypeOptions();
        }
        this.updateSubmitAvailability();
        this.renderEventQuantityField();
        this.loadEventForms(typeSelect.value).then(() => this.loadEventContext(projectSelect.value, typeSelect.value));
      });

      const projectPicker = document.getElementById('event-project-picker');
      const projectPickerTrigger = document.getElementById('event-project-picker-trigger');
      const projectPickerSearch = document.getElementById('event-project-picker-search');
      if (projectPickerTrigger) {
        projectPickerTrigger.addEventListener('click', () => {
          this.setProjectPickerOpen(!projectPicker.classList.contains('is-open'));
        });
      }
      if (projectPickerSearch) {
        projectPickerSearch.addEventListener('input', () => this.renderProjectPicker());
        projectPickerSearch.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            this.setProjectPickerOpen(false);
            projectPickerTrigger.focus();
          }
        });
      }
      if (projectPicker) {
        projectPicker.addEventListener('click', (event) => {
          const option = event.target.closest('[data-project-id]');
          if (!option) return;
          projectSelect.value = option.dataset.projectId;
          projectSelect.dispatchEvent(new Event('change', { bubbles: true }));
          this.setProjectPickerOpen(false);
          this.renderProjectPicker();
          projectPickerTrigger.focus();
        });
      }

      projectSelect.addEventListener('change', () => {
        this.renderProjectPicker();
        this.loadWorkflowProgress(projectSelect.value);
        if (this.amendmentMode) this.loadAmendmentSourceEvents(projectSelect.value);
        this.updateSubmitAvailability();
        this.renderEventQuantityField();
        this.loadEventContext(projectSelect.value, typeSelect.value);
      });

      dateInput.addEventListener('input', () => {
        this.updateSubmitAvailability();
      });

      dateInput.addEventListener('change', () => {
        this.updateSubmitAvailability();
      });

      document.getElementById('event-create-form')
        .addEventListener('submit', (event) => {
          event.preventDefault();
          // Catch failures in async preflight work too (for example form-value
          // collection or file preparation), before submitForm enters its API try/catch.
          this.submitForm().catch((error) => {
            this.submitting = false;
            this.showFormError(
              'آماده‌سازی یا ثبت رویداد با مشکل مواجه شد: ' + this.errorMessage(error)
            );
            this.failSubmitProgress(error);
            this.setSubmitState(false);
          });
        });

      modal.addEventListener('click', (event) => {
        if (event.target === modal && !this.submitting) {
          this.closeForm();
        }
      });

      this.refreshEventTypeOptions();
      this.loadWorkflowProgress(projectSelect.value);
      this.loadEventContext(projectSelect.value, typeSelect.value);
      this.updateSubmitAvailability();

      const firstInput = document.getElementById('event-form-project');
      if (firstInput) firstInput.focus();
    },

    loadEventContext: async function (projectId, eventTypeId) {
      const content = document.getElementById('event-context-content');
      const panel = document.getElementById('event-context-panel');
      if (!content || !panel) return;
      const requestId = ++this.eventContextRequestId;
      const projectKey = String(projectId || '');
      const typeKey = String(eventTypeId || '');
      this.eventContextInformation = [];
      this.eventContextHistoryRequests = {};
      if (!projectKey) {
        panel.hidden = true;
        const trigger = document.getElementById('event-context-mobile-trigger');
        if (trigger) trigger.hidden = true;
        content.innerHTML = '<p class="event-muted">برای رویداد مستقل، اطلاعات پروژه نمایش داده نمی‌شود.</p>';
        panel.classList.remove('has-project-context');
        return;
      }
      panel.hidden = false;
      const contextTrigger = document.getElementById('event-context-mobile-trigger');
      if (contextTrigger) contextTrigger.hidden = false;
      panel.classList.add('has-project-context');
      content.innerHTML = '<div class="event-context-loading"><span class="event-spinner" aria-hidden="true"></span><span>در حال دریافت اطلاعات مرتبط...</span></div>';
      try {
        const informationKey = eventDependentCacheKey('project-information', [projectKey]);
        const response = await getEventDependentData(
          informationKey,
          () => PMS.Api.get('/projects/' + encodeURIComponent(projectKey) + '/information'),
          EVENT_DEPENDENT_CACHE_TTL_MS
        );
        if (requestId !== this.eventContextRequestId || !document.getElementById('event-context-panel')) return;
        const rows = this.normalize(PMS.Api.extractData(response));
        const definitions = (this.formDefinitions || []).reduce(function (all, item) {
          const form = item.Form || item.Definition || {};
          (form.Fields || []).forEach(function (field) {
            const info = field.InformationType || {};
            const id = String(field.InformationTypeID || info.ID || '');
            if (id) all[id] = true;
          });
          return all;
        }, Object.create(null));
        const hasMappedFields = Object.keys(definitions).length > 0;
        const relevant = rows.filter(function (row) {
          const info = row.InformationType || {};
          const id = String(row.InformationTypeID || info.ID || '');
          const value = row.Value !== undefined ? row.Value : row.ValueJSON;
          const active = String(row.Status || 'ACTIVE').toUpperCase() === 'ACTIVE';
          const hasValue = value !== '' && value !== null && value !== undefined &&
            !(Array.isArray(value) && !value.length);
          return active && hasValue && hasMappedFields && definitions[id];
        });
        this.eventContextInformation = relevant;
        const relatedEvents = this.events.filter(function (item) {
          return String(item.ProjectID || '') === projectKey &&
            (!typeKey || String(item.EventTypeID || '') === typeKey) &&
            String(item.Status || 'ACTIVE').toUpperCase() !== 'VOID';
        }).sort(function (a, b) {
          return String(b.OccurredAt || b.CreatedAt || '').localeCompare(String(a.OccurredAt || a.CreatedAt || ''));
        }).slice(0, 4);
        const relatedFormResponses = await Promise.all(relatedEvents.slice(0, 3).map(async (item) => {
          try {
            const response = await getEventDependentData(
              eventDependentCacheKey('event-forms', [projectKey, item.ID]),
              () => PMS.Api.get('/events/' + encodeURIComponent(item.ID) + '/forms'),
              EVENT_DEPENDENT_CACHE_TTL_MS
            );
            return { event: item, forms: this.normalize(PMS.Api.extractData(response)) };
          } catch (error) {
            return { event: item, forms: [] };
          }
        }));
        if (requestId !== this.eventContextRequestId || !document.getElementById('event-context-panel')) return;
        let html = '<section class="event-context-section"><h5>اطلاعات مرکزی جاری <span>' + relevant.length + '</span></h5>';
        if (relevant.length) {
          html += relevant.map((row) => {
            const info = row.InformationType || {};
            const id = String(row.InformationTypeID || info.ID || '');
            const value = row.Value !== undefined ? row.Value : (function () { try { return JSON.parse(String(row.ValueJSON || 'null')); } catch (error) { return null; } })();
            const source = row.SourceEventID ? 'رویداد ' + row.SourceEventID : 'ثبت مستقیم';
            return '<article class="event-context-info-card"><div class="event-context-info-title">' +
              this.escape(info.Name || info.Code || 'اطلاعات') + '</div><div class="event-context-info-value">' +
              this.renderEventInformationValue(value, Object.assign({}, info, {Columns: row.Columns || info.Columns || []})) + '</div><div class="event-context-meta">' +
              this.escape(source) + (row.UpdatedBy ? ' · ثبت‌کننده ' + this.escape(row.UpdatedBy) : '') + (row.UpdatedAt ? ' · ' + this.escape(this.formatDate(row.UpdatedAt)) : '') +
              '</div><button type="button" class="event-context-history-button" data-context-history="' +
              this.escape(id) + '">مشاهده تاریخچه</button><div class="event-context-history" data-context-history-content="' +
              this.escape(id) + '" hidden></div></article>';
          }).join('');
        } else {
          html += '<p class="event-muted">اطلاعات مرکزی مرتبطی برای این نوع رویداد ثبت نشده است.</p>';
        }
        html += '</section><section class="event-context-section"><h5>رویدادهای مرتبط اخیر <span>' + relatedEvents.length + '</span></h5>';
        if (relatedEvents.length) {
          html += relatedEvents.map((item) => {
            const type = this.findById(this.eventTypes, item.EventTypeID);
            return '<article class="event-context-event-card"><strong>' +
              this.escape(type && (type.Name || type.Code) || 'رویداد') + '</strong><span>' +
              this.escape(this.formatDate(item.OccurredAt || item.CreatedAt)) + '</span><small>' +
              this.escape(item.Description || 'بدون شرح') + '</small><button type="button" class="event-context-event-open" data-context-event-id="' +
              this.escape(item.ID || '') + '">مشاهده جزئیات</button></article>';
          }).join('');
        } else {
          html += '<p class="event-muted">هنوز رویداد مرتبطی برای این پروژه ثبت نشده است.</p>';
        }
        html += '</section><section class="event-context-section"><h5>پاسخ فرم‌های قبلی</h5>';
        const previousForms = relatedFormResponses.reduce(function (all, item) {
          item.forms.forEach(function (form) { all.push({ event: item.event, form: form }); });
          return all;
        }, []);
        if (previousForms.length) {
          html += previousForms.map((item) => {
            const definition = item.form.Definition || {};
            const fields = Array.isArray(definition.Fields) ? definition.Fields : [];
            const values = item.form.Values || {};
            const entries = fields.map((field) => {
              const info = field.InformationType || {};
              const key = String(field.InformationTypeID || info.ID || '');
              const value = values[key];
              if (value === undefined || value === null || value === '') return '';
              return '<div class="event-context-form-value"><strong>' +
                this.escape(field.LabelOverride || info.Name || info.Code || 'فیلد') +
                '</strong><span>' + this.escape(this.displayValue(value)) + '</span></div>';
            }).filter(Boolean).slice(0, 5).join('');
            return '<article class="event-context-event-card"><strong>' +
              this.escape(definition.Name || definition.Code || 'فرم ثبت‌شده') +
              '</strong><span>' + this.escape(this.formatDate(item.event.OccurredAt || item.event.CreatedAt)) +
              '</span>' + (entries || '<small>پاسخ قابل نمایش ندارد.</small>') + '</article>';
          }).join('');
        } else {
          html += '<p class="event-muted">پاسخ فرم مرتبط قبلی پیدا نشد.</p>';
        }
        html += '</section><p class="event-context-footnote">اطلاعات این پنل فقط برای مراجعه است؛ تغییرات از مسیرهای اصلی ثبت انجام می‌شود.</p>';
        content.innerHTML = html;
      } catch (error) {
        if (requestId !== this.eventContextRequestId) return;
        content.innerHTML = '<div class="event-context-error" role="alert">دریافت اطلاعات مرتبط ناموفق بود: ' +
          this.escape(this.errorMessage(error)) + '<button type="button" id="event-context-retry">تلاش مجدد</button></div>';
        const retry = document.getElementById('event-context-retry');
        if (retry) retry.addEventListener('click', () => this.loadEventContext(projectKey, typeKey));
      }
    },

    toggleEventContextHistory: async function (typeId, button) {
      const content = Array.from(document.querySelectorAll('[data-context-history-content]')).find(function (node) { return String(node.dataset.contextHistoryContent || '') === String(typeId || ''); });
      if (!content) return;
      if (!content.hidden) { content.hidden = true; button.textContent = 'مشاهده تاریخچه'; return; }
      content.hidden = false;
      button.textContent = 'بستن تاریخچه';
      if (content.dataset.loaded === 'true') return;
      content.innerHTML = '<p class="event-muted">در حال دریافت تاریخچه...</p>';
      const project = document.getElementById('event-form-project');
      if (!project || !project.value) return;
      try {
        const response = await PMS.Api.get('/projects/' + encodeURIComponent(project.value) +
          '/information/' + encodeURIComponent(typeId) + '/history');
        const rows = this.normalize(PMS.Api.extractData(response));
        content.innerHTML = rows.length ? rows.slice().reverse().map((row) =>
          '<div class="event-context-history-row"><strong>نسخه ' + this.escape(row.Revision || '-') +
          ' · ' + this.escape(row.Action || 'تغییر') + '</strong><span>' +
          this.escape(this.formatDate(row.CreatedAt)) + (row.ActorUserID ? ' · کاربر ' + this.escape(row.ActorUserID) : '') +
          '</span><small>' + this.escape(row.Reason || (row.SourceEventID ? 'رویداد ' + row.SourceEventID : 'بدون توضیح')) +
          '</small><small>مقدار قبلی: ' + this.escape(this.displayValue(row.OldValue)) +
          '</small><small>مقدار جدید: ' + this.escape(this.displayValue(row.NewValue)) +
          '</small></div>').join('') : '<p class="event-muted">تاریخچه‌ای ثبت نشده است.</p>';
        content.dataset.loaded = 'true';
      } catch (error) {
        content.innerHTML = '<p class="event-context-error">دریافت تاریخچه ناموفق بود: ' + this.escape(this.errorMessage(error)) + '</p>';
      }
    },

    setEventTypeLoadingState: function (isLoading, projectId) {
      const typeSelect = document.getElementById('event-form-type');
      const loading = document.getElementById('event-type-loading');
      if (!typeSelect || !loading) return;

      if (isLoading && projectId) {
        typeSelect.disabled = true;
        typeSelect.hidden = true;
        loading.hidden = false;
        const projectKey = String(projectId);
        if (loading.dataset.projectId !== projectKey || !loading.querySelector('.loading-state')) {
          if (window.PMS && PMS.Loading && typeof PMS.Loading.show === 'function') {
            PMS.Loading.show(loading, 'در حال آماده‌سازی فهرست رویدادها...');
          } else {
            loading.textContent = 'در حال آماده‌سازی فهرست رویدادها...';
          }
          const state = loading.querySelector('.loading-state');
          if (state) {
            const hint = document.createElement('small');
            hint.textContent = 'اطلاعات گردش‌کار پروژه در حال دریافت است.';
            state.appendChild(hint);
          }
          loading.dataset.projectId = projectKey;
        }
        loading.dataset.state = 'loading';
        return;
      }

      typeSelect.disabled = false;
      typeSelect.hidden = false;
      if (window.PMS && PMS.Loading && typeof PMS.Loading.hide === 'function') {
        PMS.Loading.hide(loading);
      } else {
        loading.replaceChildren();
        loading.removeAttribute('aria-busy');
      }
      loading.hidden = true;
      delete loading.dataset.projectId;
      loading.dataset.state = 'ready';
    },

    refreshEventTypeOptions: function () {
      const typeSelect = document.getElementById('event-form-type');
      const projectSelect = document.getElementById('event-form-project');
      if (!typeSelect || !projectSelect) return;

      const previousValue = String(typeSelect.dataset.pendingValue || typeSelect.value || '');
      const project = this.findById(this.projects, projectSelect.value);
      const projectId = String(projectSelect.value || '');
      const workflowPending = !!projectId && (
        this.workflowProgressProjectId !== projectId || this.workflowProgressLoading
      );
      if (workflowPending) {
        if (previousValue) typeSelect.dataset.pendingValue = previousValue;
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'در حال آماده‌سازی فهرست رویدادها...';
        typeSelect.replaceChildren(placeholder);
        typeSelect.value = '';
        this.setEventTypeLoadingState(true, projectId);
        this.updateSubmitAvailability();
        return;
      }
      this.setEventTypeLoadingState(false, projectId);
      delete typeSelect.dataset.pendingValue;
      const isDraftProject = !!project &&
        String(project.RecordState || 'ACTIVE').toUpperCase() === 'DRAFT';
      const progress = this.workflowProgress && this.workflowProgressProjectId === projectId
        ? this.workflowProgress : null;
      const available = [];
      const restricted = [];
      const self = this;

      function workflowRestriction(type) {
        const isProjectEvent = String(type.ConnectionType || 'PROJECT').toUpperCase() !== 'INDEPENDENT';
        if (!isProjectEvent) return '';
        if (!projectId) return 'ابتدا پروژه را انتخاب کنید';
        if (self.workflowProgressProjectId !== projectId || self.workflowProgressLoading) {
          return 'در حال بررسی گردش‌کار';
        }
        if (self.workflowProgressError) return 'قواعد گردش‌کار دریافت نشد';
        if (!progress || !progress.configured) return '';

        const rules = Array.isArray(progress.rules) ? progress.rules : [];
        const rule = rules.find(function(item) {
          return String(item.eventTypeId || '') === Events.idOf(type);
        });
        if (!rule) return 'در مرحله فعلی تعریف نشده';
        const mode = String(rule.requirementMode || 'REQUIRED').toUpperCase();
        if (mode === 'REFERENCE') return 'از پروژه مرجع تأمین می‌شود';
        if (mode === 'NOT_REQUIRED') return 'برای این مرحله قابل ثبت نیست';
        if (progress.stepClosed) return 'مرحله پایان یافته است';
        if (rule.satisfied && !rule.allowRepeat) return 'قبلاً در این مرحله ثبت شده است';

        const requiredIncomplete = rules.filter(function(item) {
          return String(item.requirementMode || 'REQUIRED').toUpperCase() === 'REQUIRED' &&
            !item.satisfied;
        });
        const sequenceMode = String(rule.sequenceMode || 'STRICT').toUpperCase();
        if (sequenceMode === 'STRICT' && requiredIncomplete.some(function(item) {
          return Number(item.eventOrder || 0) < Number(rule.eventOrder || 0);
        })) return 'ابتدا رویدادهای اجباری قبلی را ثبت کنید';
        if (sequenceMode === 'GROUPED') {
          const firstPendingGroup = requiredIncomplete.reduce(function(minimum, item) {
            return Math.min(minimum, Number(item.groupOrder || 0));
          }, Infinity);
          if (isFinite(firstPendingGroup) && Number(rule.groupOrder || 0) > firstPendingGroup) {
            return 'ابتدا گروه قبلی گردش‌کار را تکمیل کنید';
          }
        }
        return '';
      }

      this.eventTypes.forEach(function(type) {
        const id = Events.idOf(type);
        if (!id || String(type.Status || 'ACTIVE').toUpperCase() !== 'ACTIVE') return;
        const isProjectEvent = String(type.ConnectionType || 'PROJECT').toUpperCase() !== 'INDEPENDENT';
        if (isProjectEvent && !self.canAccessProjectOptions) return;
        if (self.entryMode === 'project' && !isProjectEvent) return;
        if (self.entryMode === 'independent' && isProjectEvent) return;

        let reason = '';
        if (isProjectEvent && isDraftProject &&
            !(type.AllowOnDraft === true || String(type.AllowOnDraft).toLowerCase() === 'true')) {
          reason = 'غیرمجاز برای پیش‌نویس';
        } else {
          reason = workflowRestriction(type);
        }

        const option = document.createElement('option');
        option.value = id;
        option.dataset.connectionType = isProjectEvent ? 'PROJECT' : 'INDEPENDENT';
        option.dataset.allowOnDraft = String(type.AllowOnDraft === true || String(type.AllowOnDraft).toLowerCase() === 'true');
        const repeatRule = progress && Array.isArray(progress.rules)
          ? progress.rules.find(function(item) { return String(item.eventTypeId || '') === id; }) : null;
        const repeatSuffix = repeatRule && repeatRule.allowRepeat
          ? ' · تعداد ثبت: ' + Number(repeatRule.eventCount || 0) : '';
        option.textContent = (type.Name || type.Code || id) + repeatSuffix + (reason ? ' — ' + reason : '');
        option.disabled = !!reason;
        (reason ? restricted : available).push(option);
      });

      if (progress && progress.configured) {
        const rules = Array.isArray(progress.rules) ? progress.rules : [];
        const ruleFor = function(option) {
          return rules.find(function(rule) {
            return String(rule.eventTypeId || '') === String(option.value || '');
          }) || {};
        };
        available.sort(function(a, b) {
          const ruleA = ruleFor(a);
          const ruleB = ruleFor(b);
          const sequenceMode = String(ruleA.sequenceMode || ruleB.sequenceMode || 'STRICT').toUpperCase();
          if (sequenceMode === 'GROUPED') {
            const groupDifference = Number(ruleA.groupOrder || 0) - Number(ruleB.groupOrder || 0);
            if (groupDifference) return groupDifference;
          }
          if (sequenceMode === 'STRICT') {
            return Number(ruleA.eventOrder || 0) - Number(ruleB.eventOrder || 0);
          }
          return Number(ruleA.displayOrder || 0) - Number(ruleB.displayOrder || 0);
        });
      }

      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'انتخاب نوع رویداد';
      const groups = [];
      if (available.length) {
        const group = document.createElement('optgroup');
        group.label = progress && progress.configured
          ? 'قابل ثبت در مرحله فعلی'
          : 'انواع مجاز برای شما';
        available.forEach(function(option) { group.appendChild(option); });
        groups.push(group);
      }
      if (restricted.length) {
        const group = document.createElement('optgroup');
        group.label = 'سایر انواع و موارد غیرقابل ثبت';
        restricted.forEach(function(option) { group.appendChild(option); });
        groups.push(group);
      }
      typeSelect.replaceChildren(placeholder);
      groups.forEach(function(group) { typeSelect.appendChild(group); });

      const selected = previousValue
        ? Array.from(typeSelect.options).find(function(option) {
            return option.value === previousValue && !option.disabled;
          })
        : null;
      if (selected) {
        typeSelect.value = previousValue;
      } else {
        typeSelect.value = '';
        if (previousValue) {
          this.setAmendmentMode(false, projectId);
          this.loadEventForms('');
          this.renderEventQuantityField();
        }
      }
      this.updateSubmitAvailability();
    },

    loadWorkflowProgress: async function (projectId) {
      const section = document.getElementById('event-workflow-progress-section');
      const container = document.getElementById('event-workflow-progress');
      const requestId = ++this.workflowProgressRequestId;
      const selectedProjectId = String(projectId || '');
      this.workflowProgress = null;
      this.workflowProgressProjectId = selectedProjectId;
      this.workflowProgressLoading = !!selectedProjectId;
      this.workflowProgressError = false;
      this.refreshEventTypeOptions();
      if (!section || !container) return;
      if (!selectedProjectId) {
        section.hidden = true;
        container.replaceChildren();
        return;
      }

      const selectedProject = this.findById(this.projects, selectedProjectId);
      const isDraftWithoutWorkflow = !!selectedProject && (
        String(selectedProject.RecordState || 'ACTIVE').toUpperCase() === 'DRAFT' ||
        !String(selectedProject.WorkflowID || '').trim() ||
        !String(selectedProject.CurrentStepID || '').trim()
      );
      if (isDraftWithoutWorkflow) {
        // Drafts and projects without a configured current workflow have no
        // workflow-rule endpoint requirement; the server remains authoritative.
        this.workflowProgress = { configured: false, rules: [], remaining: [], stageComplete: true };
        this.workflowProgressLoading = false;
        this.workflowProgressError = false;
        this.refreshEventTypeOptions();
        section.hidden = true;
        container.replaceChildren();
        return;
      }

      section.hidden = false;
      container.textContent = 'در حال بررسی قواعد و پیشرفت مرحله...';
      try {
        const response = await getEventDependentData(
          eventDependentCacheKey('workflow-progress', [selectedProjectId]),
          () => PMS.Api.get('/projects/' + encodeURIComponent(selectedProjectId) + '/workflow-progress'),
          EVENT_WORKFLOW_CACHE_TTL_MS
        );
        if (requestId !== this.workflowProgressRequestId ||
            !document.getElementById('event-create-modal')) return;
        const data = PMS.Api.extractData(response) || {};
        this.workflowProgress = data;
        this.workflowProgressLoading = false;
        this.workflowProgressError = false;
        this.refreshEventTypeOptions();
        container.replaceChildren();

        const actions = document.querySelector('#event-create-form .event-modal-actions');
        if (actions) {
          const oldAction = actions.querySelector('.event-step-complete-action');
          if (oldAction) oldAction.remove();
          if (data.manualCompletionRequired) {
            const action = document.createElement('div');
            action.className = 'event-step-complete-action';
            action.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;width:100%;margin-bottom:8px';
            const status = document.createElement('span');
            status.className = 'event-muted';
            status.textContent = data.stepClosed
              ? 'این مرحله توسط مسئول پایان یافته است.'
              : (data.requirementsSatisfied ? 'همه رویدادهای اجباری ثبت شده‌اند؛ مسئول مرحله می‌تواند پایان کار را اعلام کند.' : 'پس از ثبت رویدادهای اجباری، مسئول مرحله می‌تواند پایان کار را اعلام کند.');
            action.appendChild(status);
            if (!data.stepClosed && data.canCompleteStep) {
              const completeButton = document.createElement('button');
              completeButton.type = 'button';
              completeButton.className = 'event-modal-button event-modal-button-primary';
              completeButton.textContent = 'اعلام پایان مرحله';
              completeButton.disabled = !data.requirementsSatisfied;
              completeButton.addEventListener('click', async () => {
                if (!window.confirm('آیا از پایان این مرحله و توقف ثبت رویدادهای آن مطمئن هستید؟')) return;
                completeButton.disabled = true;
                completeButton.textContent = 'در حال ثبت...';
                try {
                  await PMS.Api.post('/projects/' + encodeURIComponent(selectedProjectId) + '/complete-step', {});
                  clearEventDependentDataCache(selectedProjectId);
                  status.textContent = 'پایان مرحله ثبت شد؛ ثبت رویدادهای این مرحله بسته است.';
                  this.workflowProgress = Object.assign({}, this.workflowProgress, {
                    stepClosed: true,
                    stageComplete: true,
                    canCompleteStep: false
                  });
                  this.refreshEventTypeOptions();
                  completeButton.remove();
                } catch (completeError) {
                  status.textContent = this.errorMessage(completeError);
                  completeButton.disabled = false;
                  completeButton.textContent = 'اعلام پایان مرحله';
                }
              });
              action.appendChild(completeButton);
            }
            actions.insertBefore(action, actions.firstChild);
          }
        }
        // Keep the compact completion action outside the temporary progress panel.
        section.remove();
      } catch (error) {
        if (requestId !== this.workflowProgressRequestId) return;
        this.workflowProgressLoading = false;
        this.workflowProgressError = true;
        this.refreshEventTypeOptions();
        container.replaceChildren();
        const message = document.createElement('p');
        message.textContent = 'قواعد گردش‌کار دریافت نشد؛ برای جلوگیری از انتخاب اشتباه، ثبت رویداد پروژه‌ای تا دریافت اطلاعات متوقف است.';
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'btn btn-secondary';
        retry.textContent = 'تلاش مجدد';
        retry.addEventListener('click', () => this.loadWorkflowProgress(selectedProjectId));
        container.appendChild(message);
        container.appendChild(retry);
      }
    },

    setAmendmentMode: function (enabled, projectId) {
      this.amendmentMode = !!enabled;
      this.amendmentSourceEventId = '';
      this.amendmentSourceFormId = '';
      this.amendmentSourceVersion = 0;
      this.amendmentSourceUpdatedAt = '';
      this.amendmentEventId = '';
      this.amendmentPendingValues = null;
      const section = document.getElementById('event-amendment-section');
      const status = document.getElementById('event-amendment-status');
      const sourceEvent = document.getElementById('event-amendment-source-event');
      const sourceForm = document.getElementById('event-amendment-source-form');
      if (section) section.hidden = !this.amendmentMode;
      if (!this.amendmentMode) return;
      if (status) status.textContent = 'در حال یافتن آخرین پاسخ فرم تعیین‌شده برای این پروژه...';
      if (sourceEvent) sourceEvent.innerHTML = '';
      if (sourceForm) { sourceForm.innerHTML = ''; sourceForm.disabled = true; }
      this.loadAmendmentSourceEvents(projectId || '');
    },

    loadAmendmentSourceEvents: async function (projectId) {
      const sourceEvent = document.getElementById('event-amendment-source-event');
      const sourceForm = document.getElementById('event-amendment-source-form');
      const status = document.getElementById('event-amendment-status');
      if (!sourceEvent || !sourceForm || !this.amendmentMode) return;
      const requestId = ++this.amendmentSourceRequestId;
      const projectKey = String(projectId || '');
      this.amendmentSourceEventId = '';
      this.amendmentSourceFormId = '';
      this.amendmentSourceVersion = 0;
      this.amendmentSourceUpdatedAt = '';
      if (!projectId) {
        if (status) status.textContent = 'ابتدا پروژه را انتخاب کنید.';
        return;
      }
      const selectedType = this.findById(this.eventTypes, document.getElementById('event-form-type').value);
      const explicitAllowList = selectedType && (selectedType.IsFormAmendment === true || String(selectedType.IsFormAmendment).toLowerCase() === 'true');
      const allowedFormIds = explicitAllowList
        ? (Array.isArray(selectedType.AmendableFormIDs) ? selectedType.AmendableFormIDs.map(String) : [])
        : [];
      if (explicitAllowList && !allowedFormIds.length) {
        if (status) status.textContent = 'برای این نوع رویداد هیچ فرم مجازی جهت اصلاح تنظیم نشده است.';
        return;
      }
      if (status) status.textContent = 'در حال جست‌وجوی پاسخ‌های قبلی...';
      try {
        const response = await PMS.Api.get('/projects/' + encodeURIComponent(projectId) + '/events');
        if (requestId !== this.amendmentSourceRequestId) return;
        const events = this.normalize(PMS.Api.extractData(response)).filter(item => String(item.ID || item.EventID || ''));
        events.sort((a, b) => {
          const left = new Date(a.OccurredAt || a.CreatedAt || 0).getTime() || 0;
          const right = new Date(b.OccurredAt || b.CreatedAt || 0).getTime() || 0;
          return right - left;
        });
        let match = null;
        const batchSize = 4;
        for (let offset = 0; offset < events.length && !match; offset += batchSize) {
          const batch = events.slice(offset, offset + batchSize);
          const responses = await Promise.all(batch.map(async event => {
            const eventId = String(event.ID || event.EventID || '');
            try {
              const formsResponse = await getEventDependentData(
                eventDependentCacheKey('event-forms', [projectKey, eventId]),
                () => PMS.Api.get('/events/' + encodeURIComponent(eventId) + '/forms'),
                EVENT_DEPENDENT_CACHE_TTL_MS
              );
              return { event, eventId, forms: this.normalize(PMS.Api.extractData(formsResponse)) };
            } catch (error) {
              return { event, eventId, forms: [] };
            }
          }));
          if (requestId !== this.amendmentSourceRequestId) return;
          // Keep newest-first precedence even though each small batch is fetched concurrently.
          for (const result of responses) {
            const candidate = result.forms.find(item => {
              const definition = item.Definition || {};
              const formId = String(item.FormID || definition.ID || '');
              return formId && (!explicitAllowList || allowedFormIds.indexOf(formId) !== -1);
            });
            if (candidate) {
              match = { event: result.event, form: candidate, eventId: result.eventId };
              break;
            }
          }
        }
        if (requestId !== this.amendmentSourceRequestId) return;
        if (!match) {
          if (status) status.textContent = 'برای این پروژه هنوز پاسخی از فرم تعیین‌شده ثبت نشده است؛ ابتدا رویداد ثبت‌کننده آن فرم را ایجاد کنید.';
          return;
        }
        const item = match.form;
        const definition = item.Definition || {};
        const formId = String(item.FormID || definition.ID || '');
        const eventOption = document.createElement('option');
        eventOption.value = match.eventId;
        eventOption.textContent = 'رویداد مبنا';
        sourceEvent.replaceChildren(eventOption);
        sourceEvent.value = match.eventId;
        const formOption = document.createElement('option');
        formOption.value = formId;
        formOption.textContent = definition.Name || definition.Code || formId;
        formOption.dataset.version = String(item.FormVersion || definition.Version || 1);
        formOption.dataset.updatedAt = String(item.UpdatedAt || '');
        formOption.dataset.response = JSON.stringify(item.Values || {});
        formOption.dataset.definition = JSON.stringify(definition);
        sourceForm.replaceChildren(formOption);
        sourceForm.value = formId;
        sourceForm.disabled = false;
        this.amendmentSourceEventId = match.eventId;
        this.hydrateAmendmentForm(formId);
        if (status) {
          const eventName = match.event.EventTypeName || match.event.TypeName || match.event.EventTypeCode || 'رویداد قبلی';
          status.textContent = 'فرم «' + (definition.Name || definition.Code || 'فرم تعیین‌شده') + '» به‌صورت خودکار از ' + eventName + ' پیدا شد.';
        }
      } catch (error) {
        if (requestId !== this.amendmentSourceRequestId) return;
        if (status) status.textContent = 'دریافت پاسخ قبلی ناموفق بود.';
        this.showFormError('یافتن فرم ثبت‌شده برای اصلاح ناموفق بود: ' + this.errorMessage(error));
      }
    },

    hydrateAmendmentForm: function (formId) {
      const select = document.getElementById('event-amendment-source-form');
      const option = select && Array.from(select.options).find(item => item.value === String(formId));
      if (!option) return;
      let definition = {}, values = {};
      try { definition = JSON.parse(option.dataset.definition || '{}'); values = JSON.parse(option.dataset.response || '{}'); }
      catch (error) { this.showFormError('اطلاعات فرم قبلی قابل خواندن نیست.'); return; }
      if (!Array.isArray(definition.Fields) || !definition.Fields.length) {
        this.showFormError('ساختار نسخه ثبت‌شده این فرم در دسترس نیست.'); return;
      }
      this.amendmentSourceFormId = String(formId);
      this.amendmentSourceVersion = Number(option.dataset.version || definition.Version || 1);
      this.amendmentSourceUpdatedAt = String(option.dataset.updatedAt || '');
      this.formDefinitions = [{ Form: definition, FormID: formId, IsRequired: true }];
      this.renderConfiguredForms();
      const container = document.getElementById('event-configured-forms');
      (definition.Fields || []).forEach((field) => {
        const typeId = String(field.InformationTypeID || (field.InformationType || {}).ID || '');
        const info = field.InformationType || {};
        const value = values[typeId];
        const wrapper = Array.from(container.querySelectorAll('.event-form-value-field')).find(node => node.dataset.formId === String(formId) && node.dataset.infoTypeId === typeId);
        if (!wrapper || value === undefined || value === null) return;
        const columns = Array.isArray(info.Columns) ? info.Columns.filter(column => String(column.Status || 'ACTIVE') === 'ACTIVE') : [];
        if (columns.length) {
          const table = wrapper.querySelector('[data-form-table]');
          const tbody = table && table.querySelector('tbody');
          if (!tbody) return;
          tbody.replaceChildren();
          const rows = String(info.Cardinality || 'SINGLE').toUpperCase() === 'MULTIPLE' ? (Array.isArray(value) ? value : []) : (Object.keys(value || {}).length ? [value] : []);
          rows.forEach((rowValue) => {
            this.addConfiguredFormRow(tbody, columns, String(info.Cardinality || 'SINGLE').toUpperCase() === 'MULTIPLE');
            const row = tbody.lastElementChild;
            Object.keys(rowValue || {}).forEach((code) => {
              const input = Array.from(row.querySelectorAll('[data-column-code]')).find(node => node.dataset.columnCode === code);
              if (!input) return;
              const item = rowValue[code];
              if (input.type === 'file') {
                if (item && typeof item === 'object') { input.dataset.uploadedAttachment = JSON.stringify(item); input.required = false; }
              } else if (input.type === 'checkbox') input.checked = item === true || String(item) === 'true';
              else input.value = item === null || item === undefined ? '' : String(item);
            });
          });
          if (!rows.length) this.addConfiguredFormRow(tbody, columns, String(info.Cardinality || 'SINGLE').toUpperCase() === 'MULTIPLE');
        } else {
          const input = wrapper.querySelector('[data-form-value]');
          if (!input) return;
          if (input.type === 'file') { if (value && typeof value === 'object') { input.dataset.uploadedAttachment = JSON.stringify(value); input.required = false; } }
          else if (input.type === 'checkbox') input.checked = value === true || String(value) === 'true';
          else input.value = value === null || value === undefined ? '' : String(value);
        }
      });
      this.updateSubmitAvailability();
    },

    renderEventQuantityField: function () {
      const section = document.getElementById('event-quantity-section');
      const container = document.getElementById('event-quantity-field');
      const typeInput = document.getElementById('event-form-type');
      if (!section || !container || !typeInput) return;

      const type = this.findById(this.eventTypes, typeInput.value);
      const isProjectEvent = !!type &&
        String(type.ConnectionType || 'PROJECT').toUpperCase() !== 'INDEPENDENT';
      const trackQuantity = isProjectEvent &&
        (type.TrackVariantQuantity === true || String(type.TrackVariantQuantity).toLowerCase() === 'true');

      container.replaceChildren();
      section.hidden = !trackQuantity;
      if (!trackQuantity) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'event-field';
      const label = document.createElement('label');
      label.htmlFor = 'event-quantity-input';
      label.textContent = 'مقدار تولید/تحویل *';
      const input = document.createElement('input');
      input.id = 'event-quantity-input';
      input.type = 'number';
      input.min = '1';
      input.step = '1';
      input.required = true;
      input.inputMode = 'numeric';
      input.dataset.eventQuantity = 'true';
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    },

    prefetchEventFormDefinitions: function () {
      const token = PMS.Api && typeof PMS.Api.getToken === 'function'
        ? PMS.Api.getToken() || ''
        : '';
      if (!token || !this.eventTypes.length) return Promise.resolve(false);
      if (eventFormDefinitionsPrefetchPromise &&
          eventFormDefinitionsPrefetchToken === token) {
        return eventFormDefinitionsPrefetchPromise;
      }

      const generation = eventFormDefinitionCacheGeneration;
      const promise = PMS.Api.get('/event-types', {
        query: { includeFormDefinitions: true }
      }).then((response) => {
        if (generation !== eventFormDefinitionCacheGeneration ||
            token !== (PMS.Api.getToken() || '')) return false;
        const types = this.normalize(PMS.Api.extractData(response));
        let cachedCount = 0;
        types.forEach((type) => {
          const eventTypeId = this.idOf(type);
          if (!eventTypeId || type.FormDefinitionsLoadFailed ||
              !Array.isArray(type.FormDefinitions)) return;
          const cacheKey = eventFormDefinitionCacheKey(eventTypeId);
          const existing = eventFormDefinitionCache.get(cacheKey);
          if (!existing || Date.now() - existing.cachedAt >= EVENT_FORM_DEFINITION_CACHE_TTL_MS) {
            eventFormDefinitionCache.set(cacheKey, {
              data: type.FormDefinitions,
              cachedAt: Date.now()
            });
          }
          cachedCount++;
        });
        while (eventFormDefinitionCache.size > 50) {
          const oldestKey = eventFormDefinitionCache.keys().next().value;
          eventFormDefinitionCache.delete(oldestKey);
        }
        return cachedCount > 0;
      }).catch((error) => {
        // Prefetch is an optimization only. The existing per-type request below
        // remains authoritative and reports its normal validation errors.
        console.warn('Event form definitions prefetch failed:', error);
        return false;
      }).finally(() => {
        if (eventFormDefinitionsPrefetchPromise === promise) {
          eventFormDefinitionsPrefetchPromise = null;
          eventFormDefinitionsPrefetchToken = '';
        }
      });

      eventFormDefinitionsPrefetchPromise = promise;
      eventFormDefinitionsPrefetchToken = token;
      return promise;
    },

    loadEventForms: async function (eventTypeId) {
      const requestId = ++this.eventFormsLoadRequestId;
      const selectedTypeId = String(eventTypeId || '');
      this.formDefinitions = [];
      this.formsReady = !selectedTypeId;
      this.eventFormsReady = !selectedTypeId;
      this.eventFormsLoading = Boolean(selectedTypeId);
      this.eventFormsError = false;
      this.formsLoadedForTypeId = '';
      this.updateSubmitAvailability();

      const section = document.getElementById('event-configured-forms-section');
      const container = document.getElementById('event-configured-forms');
      if (!selectedTypeId) {
        if (section) section.hidden = true;
        if (container) container.replaceChildren();
        this.eventFormsLoading = false;
        this.eventFormsReady = false;
        this.formsLoadedForTypeId = '';
        this.updateSubmitAvailability();
        return;
      }

      this.eventFormsLoading = true;
      this.eventFormsReady = false;
      this.eventFormsError = false;
      await this.loadConfiguredForms(selectedTypeId);
      // Ignore stale responses when the user changes event type quickly.
      // Only the latest selected type may unlock the submit button.
      if (requestId !== this.eventFormsLoadRequestId ||
          !document.getElementById('event-create-modal') ||
          String((document.getElementById('event-form-type') || {}).value || '') !== selectedTypeId) {
        return;
      }
      this.eventFormsLoading = false;
      this.eventFormsReady = this.formsReady;
      this.eventFormsError = !this.formsReady;
      this.formsLoadedForTypeId = this.formsReady ? selectedTypeId : '';
      this.updateSubmitAvailability();
    },

    updateSubmitAvailability: function () {
      const button = document.getElementById('event-form-submit');

      if (!button) return;

      const projectInput = document.getElementById('event-form-project');
      const typeInput = document.getElementById('event-form-type');
      const dateInput = document.getElementById('event-form-date');

      const selectedOption = typeInput && typeInput.options[typeInput.selectedIndex];
      const typeSelected = Boolean(
        typeInput && String(typeInput.value || '').trim() &&
        selectedOption && !selectedOption.disabled
      );
      const selectedType = typeInput
        ? this.findById(this.eventTypes, typeInput.value)
        : null;
      const isIndependent = !!selectedType &&
        String(selectedType.ConnectionType || 'PROJECT').toUpperCase() === 'INDEPENDENT';
      const projectSelected = isIndependent || Boolean(
        projectInput && String(projectInput.value || '').trim()
      );

      const dateSelected = Boolean(
        dateInput && String(dateInput.value || '').trim()
      );

      const typeMatchesLoadedFields = Boolean(
        typeSelected &&
        this.formsLoadedForTypeId &&
        String(typeInput.value) === String(this.formsLoadedForTypeId)
      );

      const amendmentReady = !this.amendmentMode || Boolean(
        this.amendmentSourceEventId && this.amendmentSourceFormId && this.amendmentSourceVersion
      );
      const canSubmit =
        !this.submitting &&
        amendmentReady &&
        projectSelected &&
        typeSelected &&
        dateSelected &&
        this.eventFormsReady &&
        !this.eventFormsLoading &&
        !this.eventFormsError &&
        this.formsReady &&
        typeMatchesLoadedFields;

      button.disabled = !canSubmit;
      button.setAttribute('aria-disabled', String(!canSubmit));
    },

    loadConfiguredForms: async function (eventTypeId) {
      const requestId = ++this.formsRequestId;
      const section = document.getElementById('event-configured-forms-section');
      const container = document.getElementById('event-configured-forms');
      this.formsReady = false;
      this.updateSubmitAvailability();
      if (!section || !container) {
        this.formsReady = true;
        this.updateSubmitAvailability();
        return;
      }
      const cacheKey = eventFormDefinitionCacheKey(eventTypeId);
      const cachedDefinition = eventFormDefinitionCache.get(cacheKey);
      // Do not block the selected event type on an unfinished prefetch. If the
      // batch has not completed yet, use the existing per-type endpoint now;
      // the background prefetch remains available for the next selection.
      if (cachedDefinition && Date.now() - cachedDefinition.cachedAt < EVENT_FORM_DEFINITION_CACHE_TTL_MS) {
        this.formDefinitions = cachedDefinition.data;
        this.renderConfiguredForms();
        this.formsReady = true;
        this.updateSubmitAvailability();
        return;
      }
      if (cachedDefinition) eventFormDefinitionCache.delete(cacheKey);

      section.hidden = false;
      container.innerHTML = '<p class="event-muted">در حال دریافت فرم‌های متصل…</p>';
      try {
        const response = await PMS.Api.get('/event-types/' + encodeURIComponent(eventTypeId) + '/forms');
        if (requestId !== this.formsRequestId || !document.getElementById('event-create-modal')) return;
        let data = PMS.Api.extractData(response);
        // Accept the canonical API array and common envelope variants so
        // harmless response wrapping changes cannot silently hide assigned forms.
        for (let depth = 0; depth < 3 && data && !Array.isArray(data); depth++) {
          if (Array.isArray(data.items)) data = data.items;
          else if (Array.isArray(data.forms)) data = data.forms;
          else if (Array.isArray(data.data)) data = data.data;
          else break;
        }
        this.formDefinitions = Array.isArray(data) ? data : [];
        eventFormDefinitionCache.set(cacheKey, {
          data: this.formDefinitions,
          cachedAt: Date.now()
        });
        if (eventFormDefinitionCache.size > 50) {
          const oldestKey = eventFormDefinitionCache.keys().next().value;
          eventFormDefinitionCache.delete(oldestKey);
        }
        this.renderConfiguredForms();
        this.formsReady = true;
      } catch (error) {
        if (requestId !== this.formsRequestId) return;
        eventFormDefinitionCache.delete(cacheKey);
        this.formDefinitions = [];
        container.innerHTML = '';
        this.showFormError('دریافت فرم‌های متصل ناموفق بود: ' + this.errorMessage(error));
        this.formsReady = false;
      }
      this.updateSubmitAvailability();
    },

    renderConfiguredForms: function () {
      const section = document.getElementById('event-configured-forms-section');
      const container = document.getElementById('event-configured-forms');
      if (!section || !container) return;
      const definitions = this.formDefinitions || [];
      section.hidden = definitions.length === 0;
      container.replaceChildren();
      definitions.forEach((mapping) => {
        const form = mapping.Form || {};
        const fields = Array.isArray(form.Fields) ? form.Fields : [];
        const card = document.createElement('div');
        card.className = 'event-configured-form-card';
        card.dataset.formId = form.ID || mapping.FormID;
        card.dataset.formVersion = String(form.Version || 1);
        const heading = document.createElement('h5');
        heading.textContent = form.Name || form.Code || 'فرم اطلاعات';
        card.appendChild(heading);
        if (mapping.IsRequired === true || String(mapping.IsRequired).toLowerCase() === 'true') {
          const required = document.createElement('p');
          required.className = 'event-muted';
          required.textContent = 'تکمیل این فرم برای ثبت رویداد الزامی است.';
          card.appendChild(required);
        }
        let activeGroupName = null;
        let groupContainer = null;
        fields.forEach((field, index) => {
          const groupName = String(field.GroupName || '').trim();
          if (groupName !== activeGroupName) {
            activeGroupName = groupName;
            groupContainer = document.createElement('div');
            groupContainer.className = 'event-form-group';
            if (groupName) {
              const groupHeading = document.createElement('h6');
              groupHeading.textContent = groupName;
              groupContainer.appendChild(groupHeading);
            }
            card.appendChild(groupContainer);
          }
          const info = field.InformationType || {};
          const typeId = String(field.InformationTypeID || info.ID || '');
          const label = field.LabelOverride || info.Name || info.Code || 'اطلاعات';
          const cardinality = String(info.Cardinality || 'SINGLE').toUpperCase();
          const columns = Array.isArray(info.Columns) ? info.Columns.filter(column => String(column.Status || 'ACTIVE') === 'ACTIVE') : [];
          const required = field.IsRequired === true || String(field.IsRequired).toLowerCase() === 'true';
          const wrapper = document.createElement('div');
          wrapper.className = 'event-field event-form-value-field';
          wrapper.dataset.formId = String(form.ID || mapping.FormID);
          wrapper.dataset.infoTypeId = typeId;
          wrapper.dataset.cardinality = cardinality;
          const visibilityRule = field.VisibilityRule || this.parseVisibilityRule(field.VisibilityRuleJSON);
          wrapper.dataset.visibilityRule = JSON.stringify(visibilityRule || {});
          if (columns.length) {
            const title = document.createElement('strong');
            title.textContent = label + (required ? ' *' : '');
            wrapper.appendChild(title);
            if (field.HelpText) {
              const help = document.createElement('small');
              help.className = 'event-muted';
              help.textContent = field.HelpText;
              wrapper.appendChild(help);
            }
            const tableWrap = document.createElement('div');
            tableWrap.className = 'event-modal-table-wrap';
            const table = document.createElement('table');
            table.className = 'event-modal-table';
            table.dataset.formTable = 'true';
            table.dataset.formId = String(form.ID || mapping.FormID);
            table.dataset.infoTypeId = typeId;
            const head = document.createElement('thead');
            const headRow = document.createElement('tr');
            columns.forEach((column) => {
              const th = document.createElement('th');
              th.textContent = column.Name || column.Code;
              headRow.appendChild(th);
            });
            if (cardinality === 'MULTIPLE') {
              const actionHead = document.createElement('th');
              actionHead.textContent = 'عملیات';
              headRow.appendChild(actionHead);
            }
            head.appendChild(headRow);
            table.appendChild(head);
            const tbody = document.createElement('tbody');
            table.appendChild(tbody);
            tableWrap.appendChild(table);
            wrapper.appendChild(tableWrap);
            if (cardinality === 'MULTIPLE') {
              const add = document.createElement('button');
              add.type = 'button';
              add.className = 'event-modal-button event-form-row-add';
              add.textContent = '＋ افزودن ردیف جدید';
              add.addEventListener('click', () => {
                if (tbody.querySelectorAll('[data-form-row]').length >= 500) {
                  this.showFormError('حداکثر ۵۰۰ ردیف برای هر جدول مجاز است.');
                  return;
                }
                this.addConfiguredFormRow(tbody, columns, true);
              });
              wrapper.appendChild(add);
            }
            this.addConfiguredFormRow(tbody, columns, cardinality === 'MULTIPLE');
          } else {
            const labelElement = document.createElement('label');
            labelElement.textContent = label + (required ? ' *' : '');
            const inputField = {
              Code: typeId,
              FieldType: String(info.DataType || 'text').toLowerCase(),
              Options: info.OptionsJSON || '[]'
            };
            let input;
            if (inputField.FieldType === 'boolean') {
              input = document.createElement('select');
              input.innerHTML = '<option value="">انتخاب کنید</option><option value="true">بله</option><option value="false">خیر</option>';
            } else {
              input = this.createFieldInput(inputField, inputField.FieldType);
            }
            input.dataset.formValue = 'true';
            input.dataset.formId = String(form.ID || mapping.FormID);
            input.dataset.infoTypeId = typeId;
            input.dataset.formDataType = inputField.FieldType;
            input.required = required;
            input.dataset.baseRequired = String(required);
            input.id = 'event-form-value-' + String(form.ID || mapping.FormID) + '-' + index;
            labelElement.htmlFor = input.id;
            wrapper.appendChild(labelElement);
            wrapper.appendChild(input);
            if (inputField.FieldType === 'image') {
              const profileLabel = document.createElement('label');
              profileLabel.className = 'event-muted';
              profileLabel.style.display = 'block';
              const profileToggle = document.createElement('input');
              profileToggle.type = 'checkbox';
              profileToggle.dataset.profileImageToggle = 'true';
              profileLabel.appendChild(profileToggle);
              profileLabel.appendChild(document.createTextNode(' استفاده از این تصویر به‌عنوان عکس پروفایل پروژه'));
              wrapper.appendChild(profileLabel);
            }
            if (field.HelpText) {
              const help = document.createElement('small');
              help.className = 'event-muted';
              help.textContent = field.HelpText;
              wrapper.appendChild(help);
            }
          }
          wrapper.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', () => {
              const files = Array.from(input.files || []);
              const isImage = String(input.dataset.formDataType || info.DataType || '').toLowerCase() === 'image';
              if (isImage && files.length > 20) { input.value = ''; this.showFormError('حداکثر ۲۰ تصویر برای هر فیلد مجاز است.'); return; }
              let preview = wrapper.querySelector('[data-event-file-preview]');
              if (!preview) { preview = document.createElement('div'); preview.dataset.eventFilePreview = 'true'; preview.className = 'event-image-selection-preview'; wrapper.appendChild(preview); }
              preview.replaceChildren();
              files.forEach(file => {
                const fileDataPromise = this.getConfiguredFormFileData(file, input);
                const item = document.createElement('span'); item.className = 'event-image-selection-item'; item.style.cssText = 'display:inline-flex;flex-direction:column;gap:4px;align-items:center;width:112px;padding:6px;border:1px solid var(--color-border,#d1d5db);border-radius:8px;margin:4px';
                if (isImage && file.type.indexOf('image/') === 0) {
                  fileDataPromise.then(dataUrl => { if (!Array.from(input.files || []).includes(file)) return; const img = document.createElement('img'); img.alt = file.name; img.src = dataUrl; img.style.cssText = 'width:96px;height:76px;object-fit:contain;border-radius:5px'; item.appendChild(img); }).catch(() => {});
                }
                const name = document.createElement('small'); name.textContent = file.name; item.appendChild(name);
                const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'حذف تصویر'; remove.style.cssText = 'font-size:11px;padding:3px 7px';
                remove.addEventListener('click', () => {
                  const transfer = new DataTransfer();
                  Array.from(input.files || []).forEach(selected => { if (selected !== file) transfer.items.add(selected); });
                  input.files = transfer.files;
                  input.dispatchEvent(new Event('change', {bubbles:true}));
                });
                item.appendChild(remove); preview.appendChild(item);
              });
            });
          });
          groupContainer.appendChild(wrapper);
        });
        container.appendChild(card);
      });
      container.oninput = () => this.applyConfiguredFormVisibility(container);
      container.onchange = () => this.applyConfiguredFormVisibility(container);
    },

    parseVisibilityRule: function (value) {
      if (!value) return {};
      if (typeof value === 'object') return value;
      try { return JSON.parse(String(value)); } catch (error) { return {}; }
    },

    applyConfiguredFormVisibility: function (container) {
      if (!container) return;
      const wrappers = Array.from(container.querySelectorAll('.event-form-value-field'));
      wrappers.forEach((wrapper) => {
        const rule = this.parseVisibilityRule(wrapper.dataset.visibilityRule);
        let visible = true;
        if (rule.fieldId) {
          const source = wrappers.find((item) => item.dataset.infoTypeId === String(rule.fieldId));
          let value;
          if (source && source.dataset.visibilityHidden !== 'true') {
            const table = source.querySelector('[data-form-table]');
            if (table) {
              const rows = Array.from(table.querySelectorAll('[data-form-row]'));
              value = rows.some((row) => Array.from(row.querySelectorAll('[data-column-code]')).some((input) =>
                input.type === 'checkbox' ? input.checked : input.value !== ''
              ));
            } else {
              const control = source.querySelector('[data-form-value]');
              if (control) value = control.type === 'checkbox' ? control.checked : control.value;
            }
          }
          const empty = value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
          const operator = String(rule.operator || '').toUpperCase();
          if (operator === 'FILLED') visible = !empty;
          else if (operator === 'EMPTY') visible = empty;
          else if (operator === 'EQUALS') visible = !empty && String(value) === String(rule.value);
          else if (operator === 'NOT_EQUALS') visible = empty || String(value) !== String(rule.value);
        }
        wrapper.dataset.visibilityHidden = String(!visible);
        wrapper.hidden = !visible;
        wrapper.querySelectorAll('[data-form-value]').forEach((input) => {
          input.required = visible && input.dataset.baseRequired === 'true';
        });
      });
      container.querySelectorAll('.event-form-group').forEach((group) => {
        const children = Array.from(group.querySelectorAll('.event-form-value-field'));
        group.hidden = children.length > 0 && children.every((item) => item.hidden);
      });
    },

    addConfiguredFormRow: function (tbody, columns, allowRemove) {
      const row = document.createElement('tr');
      row.dataset.formRow = 'true';
      columns.forEach((column) => {
        const cell = document.createElement('td');
        cell.dataset.label = String(column.Name || column.Code || 'اطلاعات');
        const type = String(column.DataType || 'text').toLowerCase();
        let input;
        if (type === 'boolean') {
          input = document.createElement('select');
          input.innerHTML = '<option value="">انتخاب کنید</option><option value="true">بله</option><option value="false">خیر</option>';
        } else {
          input = this.createFieldInput({
            Code: column.Code,
            FieldType: type,
            Options: column.OptionsJSON || '[]'
          }, type);
        }
        input.dataset.columnCode = String(column.Code);
        input.dataset.columnType = type;
        input.dataset.formDataType = type;
        if (input.type === 'file') input.addEventListener('change', () => {
          const files = Array.from(input.files || []);
          if (type === 'image' && files.length > 20) { input.value = ''; this.showFormError('حداکثر ۲۰ تصویر برای هر فیلد مجاز است.'); return; }
          let preview = cell.querySelector('[data-event-file-preview]');
          if (!preview) { preview = document.createElement('div'); preview.dataset.eventFilePreview = 'true'; preview.className = 'event-image-selection-preview'; cell.appendChild(preview); }
          preview.replaceChildren();
          files.forEach(file => {
            const fileDataPromise = this.getConfiguredFormFileData(file, input);
            const item = document.createElement('span'); item.className = 'event-image-selection-item';
            if (type === 'image' && file.type.indexOf('image/') === 0) {
              fileDataPromise.then(dataUrl => { if (!Array.from(input.files || []).includes(file)) return; const img = document.createElement('img'); img.alt = file.name; img.src = dataUrl; img.style.cssText = 'width:96px;height:76px;object-fit:contain;border-radius:5px'; item.appendChild(img); }).catch(() => {});
            }
            const name = document.createElement('small'); name.textContent = file.name; item.appendChild(name);
                const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'حذف تصویر'; remove.style.cssText = 'font-size:11px;padding:3px 7px';
                remove.addEventListener('click', () => {
                  const transfer = new DataTransfer();
                  Array.from(input.files || []).forEach(selected => { if (selected !== file) transfer.items.add(selected); });
                  input.files = transfer.files;
                  input.dispatchEvent(new Event('change', {bubbles:true}));
                });
                item.appendChild(remove); preview.appendChild(item);
          });
        });
        input.dataset.columnType = type;
        input.dataset.columnRequired = String(column.IsRequired === true || String(column.IsRequired).toLowerCase() === 'true');
        input.required = input.dataset.columnRequired === 'true';
        input.setAttribute('aria-label', column.Name || column.Code);
        cell.appendChild(input);
        if (type === 'image') {
          const profileLabel = document.createElement('label');
          profileLabel.className = 'event-muted';
          profileLabel.style.display = 'block';
          const profileToggle = document.createElement('input');
          profileToggle.type = 'checkbox';
          profileToggle.dataset.profileImageToggle = 'true';
          profileLabel.appendChild(profileToggle);
          profileLabel.appendChild(document.createTextNode(' عکس پروفایل'));
          cell.appendChild(profileLabel);
        }
        row.appendChild(cell);
      });
      if (allowRemove) {
        const actionCell = document.createElement('td');
        actionCell.dataset.label = 'عملیات';
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'event-modal-button event-form-row-remove';
        remove.textContent = 'حذف ردیف';
        remove.addEventListener('click', () => row.remove());
        actionCell.appendChild(remove);
        row.appendChild(actionCell);
      }
      tbody.appendChild(row);
    },

    hasStoredFormAttachment: function (input) {
      if (!input || !input.dataset.uploadedAttachment) return false;
      try {
        const saved = JSON.parse(input.dataset.uploadedAttachment);
        return Array.isArray(saved) ? saved.length > 0 : !!(saved && typeof saved === 'object' && (saved.AttachmentID || saved.ID));
      } catch (error) { return false; }
    },

    collectConfiguredFormResponses: async function (projectId) {
      const responses = [];
      const container = document.getElementById('event-configured-forms');
      if (!container) return responses;
      for (const mapping of this.formDefinitions || []) {
        const form = mapping.Form || {};
        const formId = String(form.ID || mapping.FormID);
        const values = {};
        const fields = Array.isArray(form.Fields) ? form.Fields : [];
        for (const field of fields) {
          const info = field.InformationType || {};
          const typeId = String(field.InformationTypeID || info.ID || '');
          if (!typeId) continue;
          const required = field.IsRequired === true || String(field.IsRequired).toLowerCase() === 'true';
          const wrapper = Array.from(container.querySelectorAll('.event-form-value-field')).find(node => node.dataset.formId === formId && node.dataset.infoTypeId === typeId);
          if (wrapper && wrapper.dataset.visibilityHidden === 'true') {
            const cardinality = String(info.Cardinality || 'SINGLE').toUpperCase();
            const hasColumns = Array.isArray(info.Columns) && info.Columns.some(column => String(column.Status || 'ACTIVE') === 'ACTIVE');
            values[typeId] = hasColumns ? (cardinality === 'MULTIPLE' ? [] : {}) : (cardinality === 'MULTIPLE' ? [] : '');
            continue;
          }
          const cardinality = String(info.Cardinality || 'SINGLE').toUpperCase();
          const columns = Array.isArray(info.Columns) ? info.Columns.filter(column => String(column.Status || 'ACTIVE') === 'ACTIVE') : [];
          if (columns.length) {
            const table = Array.from(container.querySelectorAll('[data-form-table]')).find(node => node.dataset.formId === formId && node.dataset.infoTypeId === typeId);
            const rows = table ? Array.from(table.querySelectorAll('[data-form-row]')) : [];
            const valueRows = [];
            for (const row of rows) {
              const value = {};
              let hasAnyValue = false;
              const inputs = Array.from(row.querySelectorAll('[data-column-code]'));
              for (const input of inputs) {
                const dataType = String(input.dataset.columnType || '').toLowerCase();
                let item = '';
                if (input.type === 'file') {
                  const selectedFiles = Array.from(input.files || []);
                  if (dataType === 'image' && selectedFiles.length) { item = await this.uploadConfiguredFormImages(selectedFiles, projectId, input); hasAnyValue = true; }
                  else if (selectedFiles.length) { item = await this.uploadConfiguredFormFile(selectedFiles[0], dataType, projectId, input); hasAnyValue = true; }
                  else if (input.dataset.uploadedAttachment) {
                    try { item = JSON.parse(input.dataset.uploadedAttachment); hasAnyValue = Array.isArray(item) ? item.length > 0 : !!item; } catch (error) {}
                  }
                } else {
                  item = input.type === 'checkbox' ? input.checked : input.value;
                  if (input.type === 'checkbox' ? input.checked : (item !== '' && item !== null && item !== undefined)) hasAnyValue = true;
                  if (dataType === 'boolean' && item !== '') item = String(item).toLowerCase() === 'true';
                  if (input.type === 'number' && String(item).trim() !== '') item = Number(item);
                }
                value[input.dataset.columnCode] = item;
              }
              if (hasAnyValue) {
                const missing = inputs.find(input => input.dataset.columnRequired === 'true' &&
                  (input.type === 'file' ? !(input.files && input.files.length) && !this.hasStoredFormAttachment(input) : (input.value === '' || input.value === null || input.value === undefined)));
                if (missing) { this.showFormError('ستون «' + (missing.getAttribute('aria-label') || missing.dataset.columnCode) + '» الزامی است.'); missing.focus(); return null; }
                valueRows.push(value);
              }
            }
            if (required && valueRows.length === 0) { this.showFormError('حداقل یک ردیف برای «' + (field.LabelOverride || info.Name) + '» وارد کنید.'); return null; }
            values[typeId] = cardinality === 'MULTIPLE' ? valueRows : (valueRows[0] || {});
          } else {
            const input = Array.from(container.querySelectorAll('[data-form-value]')).find(node => node.dataset.formId === formId && node.dataset.infoTypeId === typeId);
            if (!input) continue;
            let value = '';
            if (input.type === 'file') {
              const dataType = String(info.DataType || 'file').toLowerCase();
              const selectedFiles = Array.from(input.files || []);
              if (dataType === 'image' && selectedFiles.length) value = await this.uploadConfiguredFormImages(selectedFiles, projectId, input);
              else if (selectedFiles.length) value = await this.uploadConfiguredFormFile(selectedFiles[0], dataType, projectId, input);
              else if (input.dataset.uploadedAttachment) { try { value = JSON.parse(input.dataset.uploadedAttachment); } catch (error) {} }
            } else {
              value = input.type === 'checkbox' ? input.checked : input.value;
              if (input.dataset.formDataType === 'boolean' && value !== '') value = String(value).toLowerCase() === 'true';
              if (input.type === 'number' && String(value).trim() !== '') value = Number(value);
            }
            if (required && (value === '' || value === null || value === undefined || (String(info.DataType || '').toLowerCase() === 'image' && Array.isArray(value) && value.length === 0))) {
              if (input.type === 'file') this.showFormError('برای «' + (field.LabelOverride || info.Name || 'تصویر') + '» حداقل یک تصویر انتخاب کنید.');
              else input.reportValidity();
              input.focus();
              return null;
            }
            values[typeId] = value;
          }
        }
        const hasValue = value => {
          if (Array.isArray(value)) return value.some(hasValue);
          if (value && typeof value === 'object') return Object.keys(value).some(key => hasValue(value[key]));
          return value !== '' && value !== null && value !== undefined;
        };
        const hasAnyValue = Object.keys(values).some(key => hasValue(values[key]));
        const mappingRequired = mapping.IsRequired === true || String(mapping.IsRequired).toLowerCase() === 'true';
        if (hasAnyValue || mappingRequired) responses.push({ FormID: formId, FormVersion: Number(form.Version || 1), Values: values });
      }
      return responses;
    },

    uploadConfiguredFormImages: async function (files, projectId, input) {
      const selected = Array.from(files || []);
      if (selected.length > 20) throw new Error('حداکثر ۲۰ تصویر برای هر فیلد مجاز است.');
      const uploaded = new Array(selected.length);
      const profileToggle = input && input.parentElement && input.parentElement.querySelector('[data-profile-image-toggle]');
      const useProfileForFirst = !!(profileToggle && profileToggle.checked);
      const concurrency = 3;
      for (let offset = 0; offset < selected.length; offset += concurrency) {
        const batch = selected.slice(offset, offset + concurrency);
        const results = await Promise.all(batch.map((file, batchIndex) => {
          const selectedIndex = offset + batchIndex;
          const attachmentType = selectedIndex === 0 && useProfileForFirst ? 'PROFILE' : 'INFORMATION';
          return this.uploadConfiguredFormFile(file, 'image', projectId, input, attachmentType);
        }));
        results.forEach((value, batchIndex) => {
          uploaded[offset + batchIndex] = value;
        });
      }
      if (input) input.dataset.uploadedAttachment = JSON.stringify(uploaded);
      return uploaded;
    },

    getConfiguredFormFileData: function (file, input) {
      if (input && input._pmsFileDataPromises && input._pmsFileDataPromises.has(file)) {
        return input._pmsFileDataPromises.get(file);
      }
      const readPromise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('خواندن فایل ناموفق بود.'));
        reader.readAsDataURL(file);
      });
      if (input) {
        if (!input._pmsFileDataPromises) input._pmsFileDataPromises = new Map();
        input._pmsFileDataPromises.set(file, readPromise);
      }
      // The preview listener also consumes this promise; attach a handler so a
      // read error before submit does not become an unhandled rejection.
      readPromise.catch(() => {});
      return readPromise;
    },

    uploadConfiguredFormFile: async function (file, dataType, projectId, input, attachmentTypeOverride) {
      // Reuse an upload only when it belongs to this exact File object.
      // A previously saved attachment may have the same name/size as a newly
      // selected replacement; metadata equality must never suppress that upload.
      if (input && input._pmsUploadedAttachments && input._pmsUploadedAttachments.has(file)) return input._pmsUploadedAttachments.get(file);
      if (input && input._pmsUploadedFile === file && input._pmsUploadedAttachment) return input._pmsUploadedAttachment;
      if (!projectId) throw new Error('بارگذاری فایل در رویداد مستقل امکان‌پذیر نیست؛ این فرم باید به پروژه متصل باشد.');
      const maxBytes = 10 * 1024 * 1024;
      const extension = String(file.name || '').split('.').pop().toLowerCase();
      const mimeByExtension = {jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp',gif:'image/gif',pdf:'application/pdf',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',xls:'application/vnd.ms-excel',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'};
      const mime = String(file.type || mimeByExtension[extension] || '').toLowerCase();
      if (!mimeByExtension[extension] || mimeByExtension[extension] !== mime || file.size < 1 || file.size > maxBytes || (dataType === 'image' && mime.indexOf('image/') !== 0)) {
        throw new Error(dataType === 'image' ? 'فقط تصویر JPEG، PNG، WebP یا GIF تا ۱۰ مگابایت مجاز است.' : 'فقط تصویر، PDF، Word یا Excel تا ۱۰ مگابایت مجاز است.');
      }
      const dataUrl = await this.getConfiguredFormFileData(file, input);
      const profileToggle = input && input.parentElement && input.parentElement.querySelector('[data-profile-image-toggle]');
      const attachmentType = attachmentTypeOverride || (dataType === 'image' && profileToggle && profileToggle.checked ? 'PROFILE' : 'INFORMATION');
      const response = await PMS.Api.post('/projects/' + encodeURIComponent(projectId) + '/attachments', {FileName:file.name,MimeType:mime,Base64:dataUrl.split(',')[1] || '',AttachmentType:attachmentType}, {trackSync:false});
      const result = PMS.Api.extractData ? PMS.Api.extractData(response) : (response && response.data) || response;
      const attachment = result && (result.attachment || result.Attachment);
      if (!attachment || !(attachment.ID || attachment.Id)) throw new Error('اطلاعات فایل بارگذاری‌شده دریافت نشد.');
      const value = {AttachmentID:attachment.ID || attachment.Id,FileName:attachment.FileName || file.name,MimeType:attachment.MimeType || mime,FileSize:Number(attachment.FileSize || file.size),AttachmentType:attachmentType};
      this.recordSubmitProgressUpload(file);
      if (input) {
        input.dataset.uploadedAttachment = JSON.stringify(value);
        if (!input._pmsUploadedAttachments) input._pmsUploadedAttachments = new Map();
        input._pmsUploadedAttachments.set(file, value);
        input._pmsUploadedFile = file;
        input._pmsUploadedAttachment = value;
      }
      return value;
    },


    createFieldInput: function (field, type) {
      let input;

      if (type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 3;
      } else if (type === 'select') {
        input = document.createElement('select');

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'انتخاب کنید';

        input.appendChild(placeholder);

        this.parseOptions(field.Options).forEach(function (item) {
          const option = document.createElement('option');
          option.value = item.value;
          option.textContent = item.label;
          input.appendChild(option);
        });
      } else {
        input = document.createElement('input');

        const types = {
          text: 'text',
          number: 'number',
          date: 'date',
          datetime: 'datetime-local'
        };

        input.type = type === 'image' || type === 'file' ? 'file' : (types[type] || 'text');
        if (type === 'image') { input.accept = 'image/jpeg,image/png,image/webp,image/gif'; input.multiple = true; }
        if (type === 'file') input.accept = '.jpg,.jpeg,.png,.webp,.gif,.pdf,.doc,.docx,.xls,.xlsx,image/jpeg,image/png,image/webp,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (type === 'number') input.step = 'any';
      }

      input.name = 'form_' + (field.Code || '');

      return input;
    },

    parseOptions: function (value) {
      if (!value) return [];

      let options;

      try {
        options = JSON.parse(value);
      } catch (error) {
        options = String(value).split(',');
      }

      if (!Array.isArray(options)) return [];

      return options.map(function (item) {
        if (item && typeof item === 'object') {
          const optionValue =
            item.value !== undefined ? item.value : item.label;

          return {
            value: String(
              optionValue === undefined ? '' : optionValue
            ).trim(),
            label: String(
              item.label !== undefined ? item.label : optionValue
            ).trim()
          };
        }

        const text = String(item).trim();

        return {
          value: text,
          label: text
        };
      }).filter(function (item) {
        return item.value !== '';
      });
    },

    isRequired: function (field) {
      const value = field.IsRequired;

      return value === true ||
        String(value).toLowerCase() === 'true' ||
        String(value) === '1';
    },

    submitForm: async function () {
      if (this.submitting) return;

      const form = document.getElementById('event-create-form');
      if (!form) return;

      const projectInput = document.getElementById('event-form-project');
      const typeInput = document.getElementById('event-form-type');
      const dateInput = document.getElementById('event-form-date');
      const descriptionInput = document.getElementById('event-form-description');

      if (!projectInput || !typeInput || !dateInput || !descriptionInput) {
        this.showFormError('فرم ثبت رویداد کامل بارگذاری نشده است. پنجره را ببندید و دوباره باز کنید.');
        return;
      }

      const selectedTypeId = String(typeInput.value || '');

      if (!selectedTypeId) {
        this.showFormError('ابتدا نوع رویداد را انتخاب کنید.');
        typeInput.focus();
        return;
      }

      if (this.eventFormsLoading) {
        this.showFormError('فرم‌های متصل هنوز در حال بارگذاری هستند. کمی صبر کنید.');
        return;
      }

      if (this.eventFormsError || !this.eventFormsReady) {
        this.showFormError('فرم‌های متصل آماده نیستند. نوع رویداد را دوباره انتخاب کنید.');
        return;
      }

      if (String(this.formsLoadedForTypeId) !== selectedTypeId) {
        this.showFormError('نوع رویداد تغییر کرده است. منتظر آماده‌شدن فرم‌های متصل بمانید.');
        return;
      }

      if (!form.reportValidity()) return;

      this.submitting = true;
      this.setSubmitState(true);
      this.openSubmitProgressModal();

      const projectId = projectInput.value;
      const typeId = typeInput.value;
      const occurredAt = dateInput.value;
      const description = descriptionInput.value.trim();
      const formResponses = await this.collectConfiguredFormResponses(projectId);
      if (formResponses === null) {
        this.submitting = false;
        this.closeSubmitProgressModal();
        this.setSubmitState(false);
        return;
      }
      this.amendmentPendingValues = this.amendmentMode ? formResponses : null;

      const type = this.findById(this.eventTypes, typeId);
      const date = new Date(occurredAt);

      if (isNaN(date.getTime())) {
        this.showFormError('تاریخ و زمان واردشده معتبر نیست.');
        this.submitting = false;
        this.closeSubmitProgressModal();
        this.setSubmitState(false);
        return;
      }

      this.setSubmitProgressStep('prepare', 'success',
        this.submitProgressState && this.submitProgressState.uploadTotal
          ? 'اطلاعات فرم آماده شد و ' + this.submitProgressState.uploadDone + ' از ' + this.submitProgressState.uploadTotal + ' فایل بارگذاری شد.'
          : 'اطلاعات فرم آماده شد؛ فایل جدیدی برای بارگذاری وجود نداشت.'
      );

      const isIndependent = !!type &&
        String(type.ConnectionType || 'PROJECT').toUpperCase() === 'INDEPENDENT';
      const payload = {
        ProjectID: isIndependent ? '' : projectId,
        EventTypeID: typeId,
        EventTypeVersion: type ? Number(type.Version || 1) : 1,
        OccurredAt: date.toISOString(),
        Description: description,
        FormResponses: this.amendmentMode ? [] : formResponses,
        VariantQuantity: (form.querySelector('[data-event-quantity-input]') || {}).value || ''
      };
      // Keep a key for retries of the same logical submission, but rotate it if
      // the user edits any field after a failed request.
      const requestFingerprint = JSON.stringify({ payload, amendmentSourceEventId: this.amendmentMode ? this.amendmentSourceEventId : '', amendmentSourceFormId: this.amendmentMode ? this.amendmentSourceFormId : '', amendmentValues: this.amendmentMode ? formResponses : null });
      if (!this.pendingIdempotencyKey ||
          this.pendingIdempotencyFingerprint !== requestFingerprint) {
        this.pendingIdempotencyKey = 'EVREQ_' + (
          window.crypto && typeof window.crypto.randomUUID === 'function'
            ? window.crypto.randomUUID()
            : (Date.now().toString(36) + '_' + Math.random().toString(36).slice(2) + '_' + Math.random().toString(36).slice(2))
        );
        this.pendingIdempotencyFingerprint = requestFingerprint;
      }
      payload.IdempotencyKey = this.pendingIdempotencyKey;

      try {
        let eventResult = {};
        this.setSubmitProgressStep('event', 'active', 'در حال ارسال اطلاعات به سرور...');
        if (this.amendmentMode && this.amendmentEventId) {
          // اگر ایجاد رویداد قبلاً موفق شده و فقط اصلاح پاسخ شکست خورده باشد،
          // تلاش مجدد باید فقط PUT را اجرا کند و رویداد تکراری نسازد.
          eventResult = { event: { ID: this.amendmentEventId } };
        } else {
          const eventResponse = await PMS.Api.post('/events', payload);
          eventResult = PMS.Api.extractData(eventResponse) || {};
          clearEventDependentDataCache();
        }
        if (this.amendmentMode) {
          const amendmentEvent = eventResult.event || eventResult.Event || eventResult;
          const amendmentEventId = String(
            this.amendmentEventId ||
            amendmentEvent.ID || amendmentEvent.Id ||
            eventResult.eventId || eventResult.EventID || ''
          );
          const selectedSourceForm = document.getElementById('event-amendment-source-form');
          const selectedOption = selectedSourceForm && selectedSourceForm.options[selectedSourceForm.selectedIndex];
          if (!this.amendmentSourceEventId || !this.amendmentSourceFormId || !amendmentEventId || !selectedOption) {
            throw new Error('رویداد اصلی، فرم مبنا یا شناسه رویداد اصلاحی معتبر نیست.');
          }
          this.amendmentEventId = amendmentEventId;
          const amendmentValues = this.amendmentPendingValues || formResponses;
          const formValues = amendmentValues.find(item => String(item.FormID) === String(this.amendmentSourceFormId));
          if (!formValues) throw new Error('پاسخ فرم اصلاح‌شده جمع‌آوری نشد.');
          await PMS.Api.put('/events/' + encodeURIComponent(this.amendmentSourceEventId) + '/forms/' + encodeURIComponent(this.amendmentSourceFormId), {
            AmendmentEventID: amendmentEventId,
            FormVersion: this.amendmentSourceVersion,
            ExpectedUpdatedAt: this.amendmentSourceUpdatedAt,
            Values: formValues.Values
          });
          clearEventDependentDataCache();
        }
        this.setSubmitProgressStep('event', 'success',
          this.amendmentMode ? 'اطلاعات رویداد با موفقیت به‌روزرسانی شد.' : 'رویداد با موفقیت در سیستم ثبت شد.'
        );
        const procurementIntegration = eventResult.procurementIntegration || {};
        // procurementIntegration.status can be FAILED; the result panel below exposes recovery.

        this.projectOptionsToken = '';
        PMS.Api.invalidateMany([
          CACHE_KEY,
          PROJECTS_CACHE_KEY,
          EVENT_TYPES_CACHE_KEY,
          'dashboard_projects_lookup',
          'dashboard_shared_lookups_v2',
          PMS.Cache.keys.DASHBOARD
        ]);

        // Keep project detail from serving stale project/event data.
        if (projectId) {
          PMS.Cache.remove(
            PMS.Cache.keys.PROJECT_EVENTS + '_' + String(projectId)
          );
          PMS.Cache.remove(
            PMS.Cache.keys.PROJECT_EVENTS + '_' + String(projectId) + '_DETAILS'
          );
          PMS.Cache.remove(
            PMS.Cache.keys.PROJECT + '_' + String(projectId)
          );
        }

        // موفقیت ثبت را از موفقیت تازه‌سازی فهرست جدا نگه می‌داریم.
        this.closeForm(true);
        this.setSubmitProgressStep('refresh', 'active', 'در حال دریافت فهرست به‌روز رویدادها...');

        try {
          await this.reloadEvents();
          this.setSubmitProgressStep('refresh', 'success', 'فهرست رویدادها با موفقیت به‌روز شد.');
          this.completeSubmitProgress('رویداد ثبت شد و فهرست نیز به‌روز شد.');
        } catch (refreshError) {
          // رویداد ثبت شده است؛ فقط تازه‌سازی فهرست ناموفق بوده.
          this.setSubmitProgressStep('refresh', 'warning', 'ثبت رویداد موفق بود؛ تازه‌سازی فهرست انجام نشد.');
          this.completeSubmitProgress('رویداد ثبت شد؛ اما به‌روزرسانی فهرست با مشکل مواجه شد.');
          this.showRefreshNotice();
        }

        this.showEventSubmissionResult(eventResult, {
          projectId: isIndependent ? '' : projectId,
          formResponseCount: formResponses.length,
          isIndependent: isIndependent
        });
      } catch (error) {
        this.showFormError(
          'ثبت رویداد ناموفق بود: ' + this.errorMessage(error)
        );
        this.failSubmitProgress(error);
      } finally {
        this.submitting = false;
        this.setSubmitState(false);
      }
    },

    reloadEvents: async function () {
      const response = await PMS.Api.getFresh('/events', CACHE_KEY);

      this.events = this.normalize(PMS.Api.extractData(response));
      this.renderFilters();
      this.applyFilters();
    },

    openSubmitProgressModal: function () {
      const existing = document.getElementById('event-submit-progress-modal');
      if (existing) existing.remove();

      const container = document.getElementById('event-configured-forms');
      const fileInputs = container
        ? Array.from(container.querySelectorAll('input[type="file"]')).filter(function (input) {
            const wrapper = input.closest('.event-form-value-field');
            return !(wrapper && wrapper.dataset.visibilityHidden === 'true');
          })
        : [];
      let uploadTotal = 0;
      let uploadDone = 0;
      const completedFiles = new Set();
      fileInputs.forEach(function (input) {
        Array.from(input.files || []).forEach(function (file) {
          uploadTotal += 1;
          const cached = !!(
            (input._pmsUploadedAttachments && input._pmsUploadedAttachments.has(file)) ||
            (input._pmsUploadedFile === file && input._pmsUploadedAttachment)
          );
          if (cached) {
            uploadDone += 1;
            completedFiles.add(file);
          }
        });
      });

      this.submitProgressState = {
        activeStep: 'prepare',
        uploadTotal: uploadTotal,
        uploadDone: uploadDone,
        completedFiles: completedFiles,
        steps: { prepare: 'active', event: 'pending', refresh: 'pending' }
      };

      const overlay = document.createElement('div');
      overlay.id = 'event-submit-progress-modal';
      overlay.className = 'event-submit-progress-overlay';
      overlay.dir = 'rtl';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-labelledby', 'event-submit-progress-title');
      overlay.innerHTML =
        '<section class="event-submit-progress-dialog" role="document">' +
          '<div class="event-submit-progress-topline"><span class="event-submit-progress-symbol" aria-hidden="true">↗</span><span class="event-submit-progress-badge">در حال انجام</span></div>' +
          '<h3 id="event-submit-progress-title" class="event-submit-progress-title" tabindex="-1">در حال ثبت رویداد</h3>' +
          '<p class="event-submit-progress-description" id="event-submit-progress-description">لطفاً تا پایان عملیات منتظر بمانید.</p>' +
          '<div class="event-submit-progress-steps">' +
            '<div class="event-submit-step is-active" data-progress-step="prepare"><span class="event-submit-step-icon" aria-hidden="true">◌</span><div class="event-submit-step-copy"><strong>آماده‌سازی فرم و آپلود پیوست‌ها</strong><small data-progress-detail>در حال آماده‌سازی اطلاعات فرم...</small><div class="event-submit-progress-track"><span data-progress-fill></span></div></div><span class="event-submit-step-state" data-progress-state>در حال انجام</span></div>' +
            '<div class="event-submit-step is-pending" data-progress-step="event"><span class="event-submit-step-icon" aria-hidden="true">○</span><div class="event-submit-step-copy"><strong>ثبت رویداد در سیستم</strong><small data-progress-detail>در انتظار تکمیل مرحله قبل</small></div><span class="event-submit-step-state" data-progress-state>در انتظار</span></div>' +
            '<div class="event-submit-step is-pending" data-progress-step="refresh"><span class="event-submit-step-icon" aria-hidden="true">○</span><div class="event-submit-step-copy"><strong>به‌روزرسانی فهرست رویدادها</strong><small data-progress-detail>در انتظار ثبت رویداد</small></div><span class="event-submit-step-state" data-progress-state>در انتظار</span></div>' +
          '</div>' +
          '<p class="event-submit-progress-footnote" id="event-submit-progress-footnote">تا پایان عملیات، پنجره را نبندید.</p>' +
          '<button type="button" class="event-submit-progress-close" id="event-submit-progress-close" hidden>بستن</button>' +
        '</section>';

      const formModal = document.getElementById('event-create-modal');
      if (formModal) formModal.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
      const closeButton = overlay.querySelector('#event-submit-progress-close');
      closeButton.addEventListener('click', () => this.closeSubmitProgressModal());
      overlay.querySelector('.event-submit-progress-title').focus();
      this.renderSubmitProgressModal();
    },

    renderSubmitProgressModal: function () {
      const overlay = document.getElementById('event-submit-progress-modal');
      const state = this.submitProgressState;
      if (!overlay || !state) return;

      const labels = {
        prepare: { active: 'در حال انجام', success: 'تکمیل شد', error: 'ناموفق' },
        event: { active: 'در حال انجام', success: 'ثبت شد', error: 'ناموفق' },
        refresh: { active: 'در حال انجام', success: 'تکمیل شد', warning: 'نیازمند تازه‌سازی', error: 'ناموفق' }
      };
      Object.keys(state.steps).forEach((key) => {
        const step = overlay.querySelector('[data-progress-step="' + key + '"]');
        if (!step) return;
        const status = state.steps[key];
        step.className = 'event-submit-step is-' + status;
        const icon = step.querySelector('.event-submit-step-icon');
        const stateLabel = step.querySelector('[data-progress-state]');
        if (icon) icon.textContent = status === 'success' ? '✓' : status === 'error' ? '!' : status === 'warning' ? '!' : status === 'active' ? '◌' : '○';
        if (stateLabel) stateLabel.textContent = labels[key][status] || 'در انتظار';
      });

      const prepare = overlay.querySelector('[data-progress-step="prepare"]');
      if (prepare) {
        const detail = prepare.querySelector('[data-progress-detail]');
        const fill = prepare.querySelector('[data-progress-fill]');
        if (detail) {
          if (state.steps.prepare === 'error') {
            detail.textContent = 'بارگذاری متوقف شد: ' + state.uploadDone + ' از ' + state.uploadTotal + ' فایل تکمیل شد.';
          } else if (state.uploadTotal && state.steps.prepare === 'active') {
            detail.textContent = state.uploadDone < state.uploadTotal
              ? 'در حال آپلود تصاویر و فایل‌ها: ' + state.uploadDone + ' از ' + state.uploadTotal
              : 'آپلود تصاویر و فایل‌ها تکمیل شد؛ در حال نهایی‌سازی اطلاعات فرم...';
          } else if (state.uploadTotal) {
            detail.textContent = 'آپلود تصاویر و فایل‌ها تکمیل شد: ' + state.uploadDone + ' از ' + state.uploadTotal;
          } else {
            detail.textContent = state.steps.prepare === 'active'
              ? 'در حال آماده‌سازی اطلاعات فرم؛ فایل جدیدی برای آپلود انتخاب نشده است.'
              : 'اطلاعات فرم آماده شد؛ فایل جدیدی برای بارگذاری وجود نداشت.';
          }
        }
        if (fill) fill.style.width = state.uploadTotal
          ? Math.min(100, Math.round((state.uploadDone / state.uploadTotal) * 100)) + '%'
          : (state.steps.prepare === 'success' ? '100%' : '0%');
      }

      overlay.classList.toggle('is-error', state.finished === 'error');
      overlay.classList.toggle('is-complete', state.finished === 'success');
      const title = overlay.querySelector('.event-submit-progress-title');
      const badge = overlay.querySelector('.event-submit-progress-badge');
      const description = overlay.querySelector('.event-submit-progress-description');
      const footnote = overlay.querySelector('.event-submit-progress-footnote');
      const closeButton = overlay.querySelector('#event-submit-progress-close');
      if (state.finished === 'success') {
        title.textContent = 'عملیات ثبت رویداد پایان یافت';
        badge.textContent = 'تکمیل شد';
        description.textContent = state.message || 'تمام مراحل با موفقیت انجام شدند.';
        footnote.textContent = 'برای بازگشت به صفحه، دکمه بستن را انتخاب کنید.';
        closeButton.hidden = false;
        closeButton.textContent = 'بستن';
      } else if (state.finished === 'error') {
        title.textContent = 'ثبت رویداد کامل نشد';
        badge.textContent = 'نیازمند بررسی';
        description.textContent = state.message || 'یکی از مراحل با خطا مواجه شد.';
        footnote.textContent = 'پیام خطا در فرم ثبت نیز نمایش داده شده است؛ پس از بستن این پنجره می‌توانید دوباره تلاش کنید.';
        closeButton.hidden = false;
        closeButton.textContent = 'بازگشت به فرم';
      }
      if (state.finished) closeButton.focus();
    },

    setSubmitProgressStep: function (key, status, detail) {
      const state = this.submitProgressState;
      if (!state || !Object.prototype.hasOwnProperty.call(state.steps, key)) return;
      state.steps[key] = status;
      state.activeStep = status === 'active' ? key : state.activeStep;
      const overlay = document.getElementById('event-submit-progress-modal');
      if (overlay && detail) {
        const step = overlay.querySelector('[data-progress-step="' + key + '"]');
        const copy = step && step.querySelector('[data-progress-detail]');
        if (copy && key !== 'prepare') copy.textContent = detail;
      }
      this.renderSubmitProgressModal();
    },

    recordSubmitProgressUpload: function (file) {
      const state = this.submitProgressState;
      if (!state || !file || state.completedFiles.has(file)) return;
      state.completedFiles.add(file);
      state.uploadDone = Math.min(state.uploadTotal, state.uploadDone + 1);
      this.renderSubmitProgressModal();
    },

    completeSubmitProgress: function (message) {
      if (!this.submitProgressState) return;
      this.submitProgressState.finished = 'success';
      this.submitProgressState.message = message || 'رویداد با موفقیت ثبت شد.';
      this.renderSubmitProgressModal();
    },

    failSubmitProgress: function (error) {
      const state = this.submitProgressState;
      if (!state || state.finished) return;
      const key = state.activeStep || 'prepare';
      state.steps[key] = 'error';
      state.finished = 'error';
      state.message = this.errorMessage(error);
      this.renderSubmitProgressModal();
    },

    closeSubmitProgressModal: function () {
      const overlay = document.getElementById('event-submit-progress-modal');
      if (overlay) overlay.remove();
      this.submitProgressState = null;
      const formModal = document.getElementById('event-create-modal');
      if (formModal) {
        formModal.removeAttribute('aria-hidden');
        const submit = document.getElementById('event-form-submit');
        if (submit && !submit.disabled) submit.focus();
      } else {
        const resultClose = document.querySelector('.event-result-close');
        if (resultClose) resultClose.focus();
      }
    },

    setSubmitState: function (busy) {
      const modal = document.getElementById('event-create-modal');
      const button = document.getElementById('event-form-submit');
      const cancel = document.getElementById('event-form-cancel');
      const close = document.getElementById('event-form-close');
      const progress = document.getElementById('event-submit-progress');
      const buttonText =
        button && button.querySelector('.event-submit-button-text');
      const spinner =
        button && button.querySelector('.event-button-spinner');

      if (modal) {
        modal.classList.toggle('is-submitting', busy);
        modal.setAttribute('aria-busy', String(busy));
      }

      if (button) {
        button.disabled = true;
        button.setAttribute('aria-disabled', 'true');
      }

      if (cancel) cancel.disabled = busy;
      if (close) close.disabled = busy;
      if (progress) progress.hidden = !busy;
      if (spinner) spinner.hidden = !busy;

      if (buttonText) {
        buttonText.textContent = busy ? 'در حال ثبت...' : 'ثبت رویداد';
      }

      const errorBox = document.getElementById('event-form-error');

      if (busy && errorBox) {
        errorBox.hidden = true;
        errorBox.textContent = '';
      }

      // پس از پایان ثبت، فقط در صورت آماده‌بودن واقعی فرم دکمه فعال می‌شود.
      if (!busy) {
        this.updateSubmitAvailability();
      }
    },

    showFormError: function (message) {
      const box = document.getElementById('event-form-error');

      if (!box) {
        alert(message);
        return;
      }

      box.textContent = message;
      box.hidden = false;
      box.focus();
    },

    showEventSubmissionResult: function (result, context) {
      context = context || {};
      const event = result && (result.event || result.Event) || {};
      const eventId = String(event.ID || event.Id || result.eventId || result.EventID || '');
      const formState = result.formPersistence || {};
      const centralState = result.centralInformation || {};
      const procurement = result.procurementIntegration || {};
      const statusText = function (status) {
        const value = String(status || '').toUpperCase();
        if (['SUCCEEDED', 'SUCCESS', 'COMPLETED'].indexOf(value) !== -1) return 'موفق';
        if (['FAILED', 'ERROR'].indexOf(value) !== -1) return 'نیازمند پیگیری';
        if (['NOT_APPLICABLE', 'NOT_CONFIGURED', 'NONE'].indexOf(value) !== -1) return 'نیازی نبود';
        if (['ALREADY_PROCESSED', 'ALREADY_APPLIED'].indexOf(value) !== -1) return 'قبلاً انجام شده';
        if (value === 'NO_CHANGE') return 'بدون تغییر مرحله';
        return status || 'نامشخص';
      };
      const panel = document.createElement('section');
      panel.className = 'event-result-panel';
      panel.setAttribute('role', 'status');
      panel.setAttribute('aria-live', 'polite');
      const heading = document.createElement('div');
      heading.className = 'event-result-heading';
      const title = document.createElement('strong');
      title.textContent = 'نتیجه ثبت رویداد';
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'event-result-close';
      close.textContent = 'بستن';
      close.setAttribute('aria-label', 'بستن نتیجه ثبت');
      close.addEventListener('click', function () { panel.remove(); });
      heading.appendChild(title);
      heading.appendChild(close);
      panel.appendChild(heading);

      const description = document.createElement('p');
      description.className = 'event-result-description';
      description.textContent = result.idempotentReplay
        ? 'این درخواست قبلاً ثبت شده بود؛ از ایجاد رویداد تکراری جلوگیری شد.'
        : (eventId ? 'رویداد با شناسه ' + eventId + ' ذخیره شد.' : 'درخواست ثبت با موفقیت انجام شد.');
      panel.appendChild(description);

      const rows = document.createElement('div');
      rows.className = 'event-result-rows';
      const addRow = function (label, status, detail, tone) {
        const row = document.createElement('div');
        const statusValue = String(status || '').toUpperCase();
        row.className = 'event-result-row' + (tone ? ' is-' + tone : (['SUCCEEDED', 'SUCCESS', 'COMPLETED'].indexOf(statusValue) !== -1 ? ' is-success' : ''));
        const copy = document.createElement('div');
        copy.className = 'event-result-row-copy';
        const name = document.createElement('strong');
        name.textContent = label;
        const note = document.createElement('small');
        note.textContent = detail || '';
        copy.appendChild(name);
        if (detail) copy.appendChild(note);
        const state = document.createElement('span');
        state.className = 'event-result-state';
        state.textContent = statusText(status);
        row.appendChild(copy);
        row.appendChild(state);
        rows.appendChild(row);
        return { row: row, state: state };
      };

      addRow('ذخیره رویداد', 'SUCCEEDED', eventId ? 'شناسه: ' + eventId : '');
      const formStatus = formState.status || (context.formResponseCount ? 'SUCCEEDED' : 'NOT_APPLICABLE');
      addRow('پاسخ فرم', formStatus, Number(formState.responseCount || context.formResponseCount || 0)
        ? Number(formState.responseCount || context.formResponseCount || 0) + ' فرم ذخیره شد' : 'فرمی برای ذخیره وجود نداشت',
        String(formStatus).toUpperCase() === 'FAILED' ? 'warning' : '');
      const centralStatus = centralState.status ||
        (context.projectId && context.formResponseCount ? 'SUCCEEDED' : 'NOT_APPLICABLE');
      addRow('اطلاعات مرکزی پروژه', centralStatus,
        Number(centralState.updatedCount || 0) ? Number(centralState.updatedCount) + ' مقدار به‌روزرسانی شد' :
          (centralStatus === 'NOT_APPLICABLE' ? 'به‌روزرسانی اطلاعات مرکزی لازم نبود' : 'به‌روزرسانی همراه با پاسخ فرم انجام شد'),
        String(centralStatus).toUpperCase() === 'FAILED' ? 'warning' : '');
      const workflowStatus = context.isIndependent ? 'NOT_APPLICABLE' :
        (result.idempotentReplay ? 'ALREADY_PROCESSED' : (result.workflowMoved ? 'SUCCEEDED' : 'NO_CHANGE'));
      addRow('گردش کار پروژه', workflowStatus,
        context.isIndependent ? 'رویداد مستقل است' :
          (result.currentStepID ? 'مرحله فعلی: ' + result.currentStepID : 'مرحله پروژه تغییر نکرد'));
      const procurementStatus = procurement.status || 'NOT_CONFIGURED';
      const procurementRow = addRow('محاسبه ملزومات', procurementStatus,
        procurement.message || (String(procurementStatus).toUpperCase() === 'FAILED'
          ? 'محاسبه نیاز ملزومات کامل نشد؛ برای بازیابی می‌توانید تلاش مجدد کنید.'
          : (procurementStatus === 'NOT_CONFIGURED' ? 'اتصال تأمین برای این نوع رویداد تعریف نشده است' : '')),
        String(procurementStatus).toUpperCase() === 'FAILED' ? 'warning' : '');
      if (String(procurementStatus).toUpperCase() === 'FAILED' && eventId) {
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'btn btn-sm btn-secondary event-result-retry';
        retry.textContent = 'تلاش مجدد برای محاسبه ملزومات';
        retry.addEventListener('click', async () => {
          if (retry.disabled) return;
          retry.disabled = true;
          retry.textContent = 'در حال تلاش مجدد...';
          try {
            const response = await PMS.Api.post('/events/' + encodeURIComponent(eventId) + '/procurement-retry', {});
            const retryResult = PMS.Api.extractData(response) || {};
            procurementRow.state.textContent = statusText(retryResult.status || 'SUCCEEDED');
            procurementRow.row.classList.remove('is-warning');
            procurementRow.row.classList.add('is-success');
            const detail = procurementRow.row.querySelector('small');
            if (detail) detail.textContent = 'محاسبه نیاز ملزومات با موفقیت مجدداً اجرا شد';
            retry.remove();
            PMS.Api.invalidateMany([CACHE_KEY, PROJECTS_CACHE_KEY, PMS.Cache.keys.DASHBOARD]);
            if (typeof this.reloadEvents === 'function') {
              try { await this.reloadEvents(); } catch (refreshError) {}
            }
          } catch (error) {
            retry.disabled = false;
            retry.textContent = 'تلاش مجدد';
            const detail = procurementRow.row.querySelector('small');
            if (detail) detail.textContent = 'تلاش مجدد ناموفق بود: ' + this.errorMessage(error);
          }
        });
        panel.appendChild(rows);
        panel.appendChild(retry);
      } else {
        panel.appendChild(rows);
      }
      document.body.appendChild(panel);
    },

    showSuccessNotice: function (message) {
      this.showNotice(message, 'success');
    },

    showRefreshNotice: function () {
      this.showNotice(
        'ثبت رویداد انجام شد، اما به‌روزرسانی فهرست کامل نشد. صفحه را دوباره بارگذاری کنید.',
        'warning'
      );
    },

    showProcurementRetryNotice: function (eventId, message) {
      const notice = document.createElement('div');
      notice.className = 'event-toast event-toast-warning';
      notice.setAttribute('role', 'status');
      const text = document.createElement('div');
      text.textContent = message;
      notice.appendChild(text);
      if (eventId) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-sm btn-secondary';
        button.textContent = 'تلاش مجدد برای محاسبه ملزومات';
        button.style.marginTop = '8px';
        button.addEventListener('click', async () => {
          button.disabled = true;
          button.textContent = 'در حال تلاش مجدد...';
          try {
            await PMS.Api.post('/events/' + encodeURIComponent(eventId) + '/procurement-retry', {});
            notice.remove();
            this.showNotice('محاسبه نیاز ملزومات با موفقیت مجدداً اجرا شد.', 'success');
            PMS.Api.invalidateMany([CACHE_KEY, PROJECTS_CACHE_KEY, PMS.Cache.keys.DASHBOARD]);
            if (typeof this.reloadEvents === 'function') await this.reloadEvents();
          } catch (error) {
            button.disabled = false;
            button.textContent = 'تلاش مجدد';
            text.textContent = 'تلاش مجدد ناموفق بود: ' + this.errorMessage(error);
          }
        });
        notice.appendChild(button);
      }
      document.body.appendChild(notice);
      requestAnimationFrame(() => notice.classList.add('is-visible'));
      setTimeout(() => {
        if (!notice.isConnected) return;
        notice.classList.remove('is-visible');
        setTimeout(() => notice.remove(), 250);
      }, 12000);
    },

    showNotice: function (message, type) {
      const notice = document.createElement('div');
      notice.className = 'event-toast event-toast-' + type;
      notice.setAttribute('role', 'status');
      notice.textContent = message;

      document.body.appendChild(notice);

      requestAnimationFrame(function () {
        notice.classList.add('is-visible');
      });

      setTimeout(function () {
        notice.classList.remove('is-visible');

        setTimeout(function () {
          notice.remove();
        }, 250);
      }, 4000);
    },

    errorMessage: function (error) {
      return error && error.message ? error.message : 'خطای نامشخص';
    },

    closeForm: function (force) {
      this.entryMode = 'all';
      this.pendingIdempotencyKey = '';
      this.pendingIdempotencyFingerprint = '';
      if (this.submitting && !force) return;
      this.amendmentMode = false;
      this.amendmentSourceEventId = '';
      this.amendmentSourceFormId = '';
      this.amendmentSourceVersion = 0;
      this.amendmentEventId = '';
      this.amendmentPendingValues = null;

      const modal = document.getElementById('event-create-modal');
      if (modal) modal.remove();

      this.modalOpen = false;
      this.eventFormsLoading = false;
      this.eventFormsReady = false;
      this.eventFormsError = false;
      this.formsLoadedForTypeId = '';

      // پاسخ درخواست قبلی دیگر نباید وضعیت فرم را تغییر دهد.
    },

    creatorValue: function (event) {
      return String(
        event.CreatorName ||
        event.CreatedByName ||
        event.CreatedBy ||
        ''
      ).trim() || '-';
    },

    departmentValue: function (event) {
      return String(
        event.DepartmentName ||
        event.DepartmentTitle ||
        event.DepartmentID ||
        ''
      ).trim() || '-';
    },

    statusText: function (status) {
      const map = {
        ACTIVE: 'فعال',
        VOID: 'باطل‌شده',
        INACTIVE: 'غیرفعال'
      };

      return map[String(status || '').toUpperCase()] || status || '-';
    },

    formatDate: function (value) {
      if (!value) return '-';

      try {
        const date = new Date(value);

        if (isNaN(date.getTime())) return String(value);

        return date.toLocaleString('fa-IR');
      } catch (error) {
        return String(value);
      }
    },

    showError: function (error) {
      const loading = document.getElementById('events-loading');
      if (loading) { loading.hidden = true; loading.removeAttribute('aria-busy'); }
      const box = document.getElementById('events-error');
      if (!box) return;

      box.textContent = error && error.message
        ? error.message
        : 'خطا در دریافت رویدادها.';

      box.hidden = false;
    },

    escape: function (value) {
      if (value === null || value === undefined) return '';

      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  };

  window.PMS = window.PMS || {};
  window.PMS.Modules = window.PMS.Modules || {};
  window.PMS.Events = Events;
  window.PMS.Modules.Events = Events;
})();