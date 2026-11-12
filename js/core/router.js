
(function () {
  'use strict';

  window.PMS = window.PMS || {};
  window.PMS.Modules = window.PMS.Modules || {};

  const Router = {
    pages: {
      login: 'pages/login.html',
      dashboard: 'pages/dashboard.html',
      projects: 'pages/projects.html',
      'project-detail': 'pages/project-detail.html',
      'print-designer': 'pages/print-designer.html',
      'print-design': 'pages/print-designer.html',
      'print-output': 'pages/print-output.html',
      events: 'pages/events.html',
      workflows: 'pages/workflows.html',
      'project-statuses': 'pages/project-statuses.html',
      'event-types': 'pages/event-types.html',
      'information-types': 'pages/information-types.html',
      forms: 'pages/forms.html',
      procurement: 'pages/procurement.html',
      attachments: 'pages/attachments.html',
      reports: 'pages/reports.html',
      users: 'pages/users.html',
      departments: 'pages/departments.html',
      roles: 'pages/roles.html',
      permissions: 'pages/permissions.html',
      audit: 'pages/audit.html',
      settings: 'pages/settings.html',
      admin: 'pages/admin.html'
    },

    currentPage: null,
    pageStates: Object.create(null),
    layoutRendered: false,
    handling: false,
    pending: false,
    permissions: [],
    permissionsLoaded: false,
    permissionsRequest: null,
    serverIsAdmin: false,
    authGeneration: 0,
    authExpiredListener: null,

    routePermissions: {
      dashboard: ['REPORT_VIEW'],
      projects: ['PROJECT_VIEW', 'PROJECT_CREATE'],
      'project-detail': ['PROJECT_VIEW'],
      'print-designer': ['SYSTEM_SETTINGS'],
      'print-design': ['SYSTEM_SETTINGS'],
      'print-output': ['PROJECT_VIEW'],
      events: ['EVENT_VIEW', 'EVENT_CREATE'],
      workflows: ['WORKFLOW_MANAGE'],
      'project-statuses': ['PROJECT_STATUS_MANAGE'],
      'event-types': ['EVENT_TYPE_MANAGE'],
      'information-types': ['SYSTEM_SETTINGS'],
      forms: ['SYSTEM_SETTINGS'],
      procurement: ['PROCUREMENT_VIEW', 'PROCUREMENT_MANAGE'],
      attachments: ['ATTACHMENT_VIEW'],
      reports: ['REPORT_VIEW'],
      users: ['USER_VIEW', 'USER_CREATE'],
      departments: ['DEPARTMENT_MANAGE'],
      roles: ['ROLE_MANAGE'],
      permissions: ['PERMISSION_MANAGE'],
      audit: ['REPORT_VIEW'],
      settings: ['SYSTEM_SETTINGS', 'PROJECT_CREATE'],
      admin: ['SYSTEM_SETTINGS']
    },

getBaseUrl: function () {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const firstSegment = String(parts[0] || '').toLowerCase();

  // Operational GitHub Pages is published from PRSPRO2-PRODUCTION.
  // Resolve all dynamically loaded pages from that same project path.
  if (firstSegment === 'prspro2-production') {
    return new URL('/PRSPRO2-PRODUCTION/', window.location.origin);
  }

  // Keep the explicitly addressed legacy/staging path compatible when used
  // outside the operational deployment.
  if (firstSegment === 'prspro2') {
    if (parts[1] && parts[1].toLowerCase() === 'staging') {
      return new URL('/PRSPRO2/staging/', window.location.origin);
    }
    return new URL('/PRSPRO2/', window.location.origin);
  }

  // This router belongs to the operational repository; never silently fall
  // back to the Development repository path on an unknown/root URL.
  return new URL('/PRSPRO2-PRODUCTION/', window.location.origin);
},
    resolveUrl: function (path) {
      path = String(path || '').trim();
      if (!path) throw new Error('مسیر فایل خالی است.');

      if (/^(https?:)?\/\//i.test(path)) {
        return new URL(path, window.location.href).href;
      }

      if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(path)) {
        return new URL(path).href;
      }

      return new URL(path.replace(/^\/+/, ''), Router.getBaseUrl()).href;
    },

    isLoggedIn: function () {
      return !!(
        window.PMS.Session &&
        typeof window.PMS.Session.isAuthenticated === 'function' &&
        window.PMS.Session.isAuthenticated()
      );
    },

    getUser: function () {
      if (window.PMS.Session &&
          typeof window.PMS.Session.getUser === 'function') {
        return window.PMS.Session.getUser() || {};
      }

      return {};
    },

    isAdmin: function () {
      // Only the authenticated backend response is authoritative.
      return Router.serverIsAdmin === true;
    },

    getHomeRoute: function () {
      return 'events';
    },

    loadPermissions: async function () {
      if (Router.permissionsLoaded) return true;
      if (Router.permissionsRequest) return Router.permissionsRequest;

      const generation = Router.authGeneration;
      Router.permissionsRequest = (async function () {
        try {
          if (!window.PMS.Api ||
              typeof window.PMS.Api.get !== 'function') {
            throw new Error('سرویس API در دسترس نیست.');
          }

          const response = await window.PMS.Api.get('/auth/me/permissions');

          let data = response &&
            Object.prototype.hasOwnProperty.call(response, 'data')
            ? response.data
            : response;

          if (data && data.success === false) {
            throw new Error(
              data.error && data.error.message
                ? data.error.message
                : 'دریافت دسترسی‌ها ناموفق بود.'
            );
          }

          if (data && data.data) data = data.data;

          if (generation !== Router.authGeneration) return false;
          Router.serverIsAdmin = !!(data && data.isAdmin === true);

          let list = [];

          if (Array.isArray(data)) {
            list = data;
          } else if (data && Array.isArray(data.permissions)) {
            list = data.permissions;
          } else if (data && Array.isArray(data.items)) {
            list = data.items;
          }

          Router.permissions = list.map(function (item) {
            if (typeof item === 'string') return item;

            return item &&
              (item.Code || item.PermissionCode || item.code || '');
          }).filter(Boolean);

          Router.permissionsLoaded = true;
          return true;
        } catch (error) {
          console.error('خطا در دریافت دسترسی‌ها:', error);
          if (generation === Router.authGeneration) {
            Router.permissions = [];
            Router.permissionsLoaded = false;
            Router.serverIsAdmin = false;
          }
          return false;
        } finally {
          if (generation === Router.authGeneration) Router.permissionsRequest = null;
        }
      })();

      return Router.permissionsRequest;
    },

    hasRouteAccess: function (route) {
      if (Router.isAdmin()) return true;

      const mainRoute = String(route || '').split('/')[0];

      if (!Router.pages[mainRoute] || !Router.permissionsLoaded) {
        return false;
      }


      const required = Router.routePermissions[mainRoute] || [];

      return required.some(function (permission) {
        return Router.permissions.indexOf(permission) !== -1;
      });
    },

    resetAuthState: function () {
      Router.authGeneration += 1;
      Router.pageStates = Object.create(null);
      Router.permissions = []
      Router.permissionsLoaded = false;
      Router.permissionsRequest = null;
      Router.serverIsAdmin = false;
      Router.currentPage = null;
      if (window.PMS.Permissions && typeof window.PMS.Permissions.clear === 'function') {
        window.PMS.Permissions.clear();
      }
    },

    init: function () {
      window.addEventListener('hashchange', function () {
        Router.handle();
      });

      if (Router.authExpiredListener) {
        window.removeEventListener('pms:auth-expired', Router.authExpiredListener);
      }
      Router.authExpiredListener = function (event) {
        const detail = event && event.detail ? event.detail : {};
        if (window.PMS.Auth && typeof window.PMS.Auth.handleAuthExpired === 'function') {
          window.PMS.Auth.handleAuthExpired(detail.message || 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید.');
        } else {
          Router.resetAuthState();
          if (window.PMS.Session && typeof window.PMS.Session.clear === 'function') window.PMS.Session.clear();
          Router.navigate('login', true);
        }
      };
      window.addEventListener('pms:auth-expired', Router.authExpiredListener);

      Router.handle();
    },

    handle: async function () {
      if (Router.handling) {
        // Preserve the latest requested route while a navigation is in progress.
        Router.pending = true;
        return;
      }
      Router.handling = true;
      Router.pending = false;

      try {
        let route = window.location.hash.replace(/^#/, '').trim();

        if (!route) route = Router.getHomeRoute();

        let mainRoute = route.split('/')[0];

        if (!Router.pages[mainRoute]) {
          route = Router.getHomeRoute();
          mainRoute = 'events';
        }

        if (!Router.isLoggedIn() && mainRoute !== 'login') {
          Router.changeRoute('login', true);
          route = 'login';
          mainRoute = 'login';
        }

        if (Router.isLoggedIn() && mainRoute === 'login') {
          route = Router.getHomeRoute();
          mainRoute = 'events';
          Router.changeRoute(route, true);
        }

        if (mainRoute === 'login') {
          await Router.loadLogin();
          return;
        }

        if (!Router.isLoggedIn()) return;

        const permissionsOk = await Router.loadPermissions();

        if (!permissionsOk || !Router.hasRouteAccess(route)) {
          const fallbackRoutes = Router.isAdmin()
            ? ['dashboard', 'events', 'projects']
            : [
                'events',
                'projects',
                'dashboard',
                'reports',
                'users',
                'workflows',
                'event-types',
                'attachments',
                'departments',
                'roles',
                'permissions',
                'audit',
                'settings',
                'admin'
              ];

          const fallbackRoute = permissionsOk
            ? fallbackRoutes.find(function (candidate) {
                return Router.hasRouteAccess(candidate);
              })
            : null;

          if (!fallbackRoute) {
            if (!Router.layoutRendered) Router.renderLayout();

            const content = document.getElementById('page-content');

            if (content) {
              content.innerHTML =
                '<div class="alert alert-danger">' +
                'شما به هیچ صفحه قابل‌نمایشی دسترسی ندارید. ' +
                'از مدیر سامانه بخواهید دسترسی مناسب را برای نقش شما فعال کند.' +
                '</div>';
            }

            return;
          }

          route = fallbackRoute;
          mainRoute = fallbackRoute;
          Router.changeRoute(fallbackRoute, true);
        }

        if (!Router.layoutRendered) Router.renderLayout();

        await Router.loadPage(mainRoute, route);
      } catch (error) {
        console.error('Router Error:', error);

        const content = document.getElementById('page-content');
        if (content) {
          const message = error && error.message
            ? error.message
            : 'خطای نامشخص هنگام باز کردن صفحه.';
          content.innerHTML =
            '<div class="alert alert-danger" role="alert" style="direction:rtl;text-align:right;padding:16px">' +
            '<strong>صفحه باز نشد.</strong><br>' +
            String(message).replace(/[&<>"]/g, function (character) {
              return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character];
            }) +
            '</div>';
        }
      } finally {
        Router.handling = false;
        if (Router.pending) {
          Router.pending = false;
          Promise.resolve().then(function () {
            Router.handle();
          });
        }
      }
    },

    changeRoute: function (route, replace) {
      const target = '#' + (route || Router.getHomeRoute());

      if (window.location.hash === target) return;

      if (replace) {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search + target
        );
      } else {
        window.location.hash = route;
      }
    },

    renderLayout: function () {
      if (!window.PMS.Layout ||
          typeof window.PMS.Layout.render !== 'function') {
        console.error('PMS.Layout.render پیدا نشد.');
        return;
      }

      try {
        window.PMS.Layout.render();
      } catch (error) {
        console.error('خطا در ساختار ظاهری صفحه:', error);
      }

      // If the shell was created, continue to the requested page even if
      // a non-essential layout initializer failed.
      Router.layoutRendered = !!document.getElementById('page-content');

      if (!Router.layoutRendered) {
        throw new Error('ساختار اصلی صفحه ساخته نشد؛ عنصر page-content در دسترس نیست.');
      }

      if (typeof window.PMS.Layout.setActiveRoute === 'function') {
        try {
          window.PMS.Layout.setActiveRoute();
        } catch (error) {
          console.warn('به‌روزرسانی منوی فعال انجام نشد:', error);
        }
      }
    },

    loadLogin: async function () {
      const app = document.getElementById('app');

      if (!app) {
        console.error('عنصر app پیدا نشد.');
        return;
      }

      try {
        const pageUrl = Router.resolveUrl(Router.pages.login);
        const response = await fetch(pageUrl, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(
            'خطا در بارگذاری صفحه ورود: ' +
            response.status + ' - ' + pageUrl
          );
        }

        app.innerHTML = await response.text();
        Router.layoutRendered = false;

        await Router.executePageScripts(app);
        Router.initPageModule('login');
      } catch (error) {
        console.error('Login Router Error:', error);

        app.innerHTML =
          '<div class="alert alert-danger">' +
          'خطا در بارگذاری صفحه ورود. کنسول مرورگر را بررسی کنید.' +
          '</div>';
      }
    },

    // Keep only safe, page-level navigation preferences in memory.
    // Form drafts, passwords, files and modal contents are deliberately excluded.
    getPageStateControls: function (page) {
      const controls = {
        projects: ['project-status-filter', 'project-search'],
        events: [
          'events-project-search', 'event-history-sort', 'event-search',
          'event-history-scope', 'event-project-filter', 'event-creator-filter',
          'event-department-filter', 'event-type-filter', 'event-status-filter',
          'event-created-from', 'event-created-to', 'event-occurred-from', 'event-occurred-to'
        ],
        attachments: ['attachment-entity-filter', 'attachment-search']
      };
      return controls[page] || [];
    },

    capturePageState: function () {
      const page = String(Router.currentPage || '').split('/')[0];
      const ids = Router.getPageStateControls(page);
      if (!ids.length) return;

      const values = {};
      ids.forEach(function (id) {
        const element = document.getElementById(id);
        if (!element) return;
        values[id] = element.type === 'checkbox' || element.type === 'radio'
          ? { checked: !!element.checked }
          : { value: String(element.value == null ? '' : element.value) };
      });

      const activeQueue = page === 'events'
        ? document.querySelector('.event-queue-tab.is-active')
        : null;
      const filterPanel = page === 'events'
        ? document.getElementById('events-filter-content')
        : null;
      const scrollContainers = {};
      if (page === 'projects' || page === 'events' || page === 'attachments') {
        document.querySelectorAll('.table-wrapper, .event-queue-list').forEach(function (element) {
          if (!element.id) return;
          scrollContainers[element.id] = { top: element.scrollTop, left: element.scrollLeft };
        });
      }

      Router.pageStates[page] = {
        values: values,
        activeQueue: activeQueue ? String(activeQueue.getAttribute('data-queue') || '') : '',
        filtersExpanded: !!(filterPanel && !filterPanel.hidden),
        scrollX: Number(window.scrollX || 0),
        scrollY: Number(window.scrollY || 0),
        scrollContainers: scrollContainers
      };
    },

    getPageStateValue: function (id) {
      const page = String(Router.currentPage || '').split('/')[0];
      const state = Router.pageStates[page];
      const item = state && state.values ? state.values[id] : null;
      return item && Object.prototype.hasOwnProperty.call(item, 'value') ? item.value : '';
    },

    restorePageState: function (page) {
      const state = Router.pageStates[page];
      if (!state) return;

      Router.getPageStateControls(page).forEach(function (id) {
        const element = document.getElementById(id);
        const saved = state.values && state.values[id];
        if (!element || !saved) return;
        if (Object.prototype.hasOwnProperty.call(saved, 'checked')) {
          element.checked = saved.checked;
        } else if (element.tagName !== 'SELECT' || Array.from(element.options).some(function (option) {
          return option.value === saved.value;
        })) {
          element.value = saved.value;
        }

        // Dynamic event filter options are restored by Events.renderFilters
        // after their authorized option lists have been loaded.
        if (element.value === saved.value) {
          const eventName = element.tagName === 'SELECT' ? 'change' : 'input';
          element.dispatchEvent(new Event(eventName, { bubbles: true }));
        }
      });

      if (page === 'events') {
        const tabs = document.querySelectorAll('.event-queue-tab');
        tabs.forEach(function (tab) {
          if (String(tab.getAttribute('data-queue') || '') === state.activeQueue &&
              typeof window.PMS.Events?.activateQueue === 'function') {
            window.PMS.Events.activateQueue(state.activeQueue);
          }
        });
        const panel = document.getElementById('events-filter-content');
        const toggle = document.getElementById('events-filter-toggle');
        if (panel && toggle && !panel.hidden !== state.filtersExpanded) toggle.click();
      }

      const restoreScroll = function () {
        window.scrollTo(state.scrollX || 0, state.scrollY || 0);
        Object.keys(state.scrollContainers || {}).forEach(function (key) {
          const saved = state.scrollContainers[key];
          const element = document.getElementById(key);
          if (element && saved) {
            element.scrollTop = saved.top || 0;
            element.scrollLeft = saved.left || 0;
          }
        });
      };
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(restoreScroll);
        });
      } else {
        window.setTimeout(restoreScroll, 0);
      }
    },

    loadPage: async function (page, route) {
      const content = document.getElementById('page-content');

      if (!content) {
        console.error('page-content پیدا نشد.');
        return;
      }

      const pagePath = Router.pages[page];

      if (!pagePath) {
        console.error('مسیر صفحه تعریف نشده است:', page);
        return;
      }

      if (!Router.hasRouteAccess(route)) {
        content.innerHTML =
          '<div class="alert alert-danger">' +
          'شما اجازه مشاهده این صفحه را ندارید.' +
          '</div>';
        return;
      }

      Router.capturePageState();

      try {
        const pageUrl = Router.resolveUrl(pagePath);
        const response = await fetch(pageUrl, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(
            'خطا در بارگذاری صفحه: ' +
            response.status + ' - ' + pageUrl
          );
        }

        content.innerHTML = await response.text();
        Router.currentPage = route;

        await Router.executePageScripts(content);

        if (window.PMS.Layout &&
            typeof window.PMS.Layout.setActiveRoute === 'function') {
          window.PMS.Layout.setActiveRoute();
        }

        Router.initPageModule(page);
        Router.restorePageState(page);
      } catch (error) {
        console.error('Router Error:', error);

        content.innerHTML =
          '<div class="alert alert-danger">' +
          'خطا در بارگذاری صفحه. کنسول مرورگر را بررسی کنید.' +
          '</div>';
      }
    },

    executePageScripts: async function (container) {
      const scripts = Array.from(container.querySelectorAll('script'));

      for (const oldScript of scripts) {
        const newScript = document.createElement('script');

        Array.from(oldScript.attributes).forEach(function (attribute) {
          newScript.setAttribute(attribute.name, attribute.value);
        });

        if (oldScript.hasAttribute('src')) {
          newScript.src = Router.resolveUrl(oldScript.getAttribute('src'));
          newScript.async = false;
        } else {
          newScript.textContent = oldScript.textContent;
        }

        const loaded = new Promise(function (resolve, reject) {
          if (!newScript.hasAttribute('src')) {
            resolve();
            return;
          }

          newScript.onload = resolve;

          newScript.onerror = function () {
            reject(
              new Error('بارگذاری اسکریپت ناموفق بود: ' + newScript.src)
            );
          };
        });

        oldScript.parentNode.replaceChild(newScript, oldScript);

        if (newScript.hasAttribute('src')) await loaded;
      }
    },

    initPageModule: function (page) {
      const moduleMap = {
        dashboard: 'Dashboard',
        projects: 'Projects',
        'project-detail': 'ProjectDetail',
        'print-designer': 'PrintDesigner',
        'print-design': 'PrintDesigner',
        'print-output': 'PrintDesigner',
        events: 'Events',
        workflows: 'Workflows',
        'project-statuses': 'ProjectStatuses',
        'event-types': 'EventTypes',
        'information-types': 'InformationTypes',
        forms: 'Forms',
        attachments: 'Attachments',
        reports: 'Reports',
        users: 'Users',
        departments: 'Departments',
        roles: 'Roles',
        permissions: 'Permissions',
        audit: 'Audit',
        settings: 'Settings',
        admin: 'Admin',
        login: 'Auth'
      };

      const moduleName = moduleMap[page];
      if (!moduleName) return;

      const module = window.PMS.Modules[moduleName];

      if (!module || typeof module.init !== 'function') {
        console.warn('ماژول صفحه پیدا نشد:', moduleName);
        return;
      }

      try {
        module.init();
      } catch (error) {
        console.error('خطا در اجرای init ماژول:', moduleName, error);
      }
    },

    go: function (route) {
      window.location.hash = route || Router.getHomeRoute();
    },

    getCurrentRoute: function () {
      return window.location.hash.replace(/^#/, '').trim() ||
        Router.getHomeRoute();
    },

    navigate: function (route, replace) {
      route = route || Router.getHomeRoute();
      Router.changeRoute(route, !!replace);

      if (Router.getCurrentRoute() === route && !Router.handling) {
        Router.handle();
      }
    }
  };

  window.PMS.Router = Router;
})();
