(function () {

  'use strict';


  window.PMS =
    window.PMS || {};

  window.PMS.Modules =
    window.PMS.Modules || {};


  const Api =
    window.PMS.Api;

  const Cache =
    window.PMS.Cache;


  const MODULE = {


    cacheKey:
      Cache.keys.ATTACHMENTS || 'attachments',


    state: {

      attachments: [],

      filter:
        '',

      search:
        ''

    },


    init: function () {

      this.bindEvents();

      this.load();

    },


    bindEvents: function () {

      const search =
        document.getElementById(
          'attachment-search'
        );


      if (search) {

        search.addEventListener(
          'input',
          function (event) {

            MODULE.state.search =
              String(
                event.target.value ||
                ''
              )
                .trim()
                .toLowerCase();

            MODULE.render();

          }
        );

      }


      const filter =
        document.getElementById(
          'attachment-entity-filter'
        );


      if (filter) {

        filter.addEventListener(
          'change',
          function (event) {

            MODULE.state.filter =
              String(
                event.target.value ||
                ''
              )
                .trim()
                .toUpperCase();

            MODULE.render();

          }
        );

      }


      const uploadButton =
        document.getElementById(
          'attachment-upload-button'
        );


      if (uploadButton) {
        const router = window.PMS.Router;
        const permissions = router && Array.isArray(router.permissions) ? router.permissions : [];
        const canUpload = !!(router && (
          (typeof router.isAdmin === 'function' && router.isAdmin()) ||
          permissions.indexOf('ATTACHMENT_UPLOAD') !== -1
        ));
        uploadButton.hidden = !canUpload;
        if (canUpload) {
          uploadButton.addEventListener('click', function () {
            MODULE.showUploadMessage();
          });
        }
      }

    },


    load: async function () {

      const cached =
        Cache
          ? Cache.get(
              this.cacheKey
            )
          : null;


      if (cached !== null) {

        this.state.attachments =
          this.normalize(
            cached
          );

        this.render();

      } else {

        this.showLoading(
          true
        );

      }


      try {

        const result = await Api.getCached(
          '/attachments',
          this.cacheKey,
          {
            cacheTtl: 60000,
            refreshCached: false
          }
        );

        const data = result && result.data !== undefined
          ? result.data
          : result;


        const attachments =
          this.normalize(
            data
          );


        this.state.attachments =
          attachments;


        if (Cache && result && result.cached === false) {
          Cache.set(
            this.cacheKey,
            attachments,
            { ttl: 60000 }
          );
        }

        this.render();


      } catch (error) {

        console.error(
          'Attachments Load Error:',
          error
        );


        if (
          cached === null
        ) {

          this.showError(
            error.message ||
            'خطا در دریافت فایل‌ها.'
          );

        }

      }

    },


    normalize: function (
      data
    ) {

      if (
        Array.isArray(
          data
        )
      ) {

        return data;

      }


      if (
        data &&
        Array.isArray(
          data.items
        )
      ) {

        return data.items;

      }


      if (
        data &&
        Array.isArray(
          data.attachments
        )
      ) {

        return data.attachments;

      }


      return [];

    },


    render: function () {

      const container =
        document.getElementById(
          'attachments-table-container'
        );


      const empty =
        document.getElementById(
          'attachments-empty'
        );


      if (!container) {

        return;

      }


      const filtered =
        this.getFilteredAttachments();


      this.showLoading(
        false
      );


      this.hideError();


      if (
        filtered.length === 0
      ) {

        container.innerHTML =
          '';

        container.hidden =
          true;

        if (empty) {

          empty.hidden =
            false;

        }

        return;

      }


      if (empty) {

        empty.hidden =
          true;

      }


      container.innerHTML =
        this.buildTable(
          filtered
        );


      container.hidden =
        false;

    },


    getFilteredAttachments:
      function () {

        const search =
          this.state.search;


        const filter =
          this.state.filter;


        return this.state.attachments
          .filter(
            function (item) {

              if (
                filter &&
                String(
                  item.EntityType ||
                  item.entityType ||
                  ''
                )
                  .toUpperCase() !==
                filter
              ) {

                return false;

              }


              if (!search) {

                return true;

              }


              const fileName =
                String(
                  item.FileName ||
                  item.fileName ||
                  ''
                )
                  .toLowerCase();


              const mimeType =
                String(
                  item.MimeType ||
                  item.mimeType ||
                  ''
                )
                  .toLowerCase();


              const entityId =
                String(
                  item.EntityID ||
                  item.entityID ||
                  ''
                )
                  .toLowerCase();


              return (
                fileName.indexOf(
                  search
                ) !== -1 ||

                mimeType.indexOf(
                  search
                ) !== -1 ||

                entityId.indexOf(
                  search
                ) !== -1
              );

            }
          );

      },


    buildTable: function (
      items
    ) {

      let html = '';

      html +=
        '<table class="data-table">';

      html +=
        '<thead>';

      html +=
        '<tr>';

      html +=
        '<th>نام فایل</th>';

      html +=
        '<th>نوع ارتباط</th>';

      html +=
        '<th>شناسه</th>';

      html +=
        '<th>نوع فایل</th>';

      html +=
        '<th>حجم</th>';

      html +=
        '<th>تاریخ بارگذاری</th>';

      html +=
        '<th>وضعیت</th>';

      html +=
        '<th>عملیات</th>';

      html +=
        '</tr>';

      html +=
        '</thead>';

      html +=
        '<tbody>';


      items.forEach(
        function (item) {

          const id =
            item.ID ||
            item.id ||
            '';


          const fileName =
            item.FileName ||
            item.fileName ||
            '-';


          const entityType =
            item.EntityType ||
            item.entityType ||
            '-';


          const entityId =
            item.EntityID ||
            item.entityID ||
            '-';


          const mimeType =
            item.MimeType ||
            item.mimeType ||
            '-';


          const fileSize =
            item.FileSize ||
            item.fileSize ||
            '';


          const uploadedAt =
            item.UploadedAt ||
            item.uploadedAt ||
            '-';


          const status =
            item.Status ||
            item.status ||
            '';


          html +=
            '<tr>';


          html +=
            '<td>' +
            this.escapeHtml(
              fileName
            ) +
            '</td>';


          html +=
            '<td>' +
            this.getEntityLabel(
              entityType
            ) +
            '</td>';


          html +=
            '<td>' +
            this.escapeHtml(
              entityId
            ) +
            '</td>';


          html +=
            '<td>' +
            this.escapeHtml(
              mimeType
            ) +
            '</td>';


          html +=
            '<td>' +
            this.formatFileSize(
              fileSize
            ) +
            '</td>';


          html +=
            '<td>' +
            this.escapeHtml(
              uploadedAt
            ) +
            '</td>';


          html +=
            '<td>' +
            this.getStatusLabel(
              status
            ) +
            '</td>';


          html +=
            '<td>';


          html +=
            '<button ' +
            'type="button" ' +
            'class="btn btn-sm btn-light" ' +
            'data-attachment-id="' +
            this.escapeHtml(
              id
            ) +
            '" ' +
            'onclick="PMS.Modules.Attachments.download(\'' +
            this.escapeJs(
              id
            ) +
            '\')">' +
            'مشاهده' +
            '</button>';


          html +=
            '</td>';


          html +=
            '</tr>';

        }.bind(this)
      );


      html +=
        '</tbody>';

      html +=
        '</table>';


      return html;

    },


    sanitizePreviewHtml: function (html) {
      const parsed = new DOMParser().parseFromString(String(html || ''), 'text/html');
      const allowed = {P:1,BR:1,DIV:1,SPAN:1,H1:1,H2:1,H3:1,H4:1,H5:1,H6:1,STRONG:1,B:1,EM:1,I:1,U:1,UL:1,OL:1,LI:1,BLOCKQUOTE:1,TABLE:1,THEAD:1,TBODY:1,TR:1,TH:1,TD:1,A:1,IMG:1,HR:1,PRE:1,CODE:1,SUB:1,SUP:1};
      const clean = function (node) {
        const fragment = document.createDocumentFragment();
        Array.prototype.forEach.call(node.childNodes, function (child) {
          if (child.nodeType === 3) { fragment.appendChild(document.createTextNode(child.nodeValue || '')); return; }
          if (child.nodeType !== 1) return;
          if (!allowed[child.tagName]) { fragment.appendChild(clean(child)); return; }
          const element = document.createElement(child.tagName.toLowerCase());
          if (child.tagName === 'A') {
            const href = child.getAttribute('href') || '';
            if (/^https?:\/\//i.test(href)) {
              element.setAttribute('href', href);
              element.setAttribute('target', '_blank');
              element.setAttribute('rel', 'noopener noreferrer');
            }
          }
          if (child.tagName === 'TH' || child.tagName === 'TD') {
            ['colspan','rowspan'].forEach(function (key) {
              const value = child.getAttribute(key);
              if (value && /^\d{1,3}$/.test(value)) element.setAttribute(key, value);
            });
          }
          if (child.tagName === 'IMG') {
            const src = child.getAttribute('src') || '';
            if (!/^data:image\/(png|jpeg|gif|webp);base64,/i.test(src)) return;
            element.setAttribute('src', src);
            element.setAttribute('alt', child.getAttribute('alt') || '');
          }
          element.appendChild(clean(child));
          fragment.appendChild(element);
        });
        return fragment;
      };
      const wrapper = document.createElement('div');
      wrapper.appendChild(clean(parsed.body));
      return wrapper.innerHTML;
    },

    loadPreviewLibrary: function (url, globalName) {
      if (window[globalName]) return Promise.resolve(window[globalName]);
      const key = 'pms-preview-' + globalName;
      if (window[key]) return window[key];
      window[key] = new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = function () {
          if (window[globalName]) resolve(window[globalName]);
          else reject(new Error('کتابخانه پیش‌نمایش بارگذاری شد اما آماده نیست.'));
        };
        script.onerror = function () {
          delete window[key];
          reject(new Error('بارگذاری ابزار پیش‌نمایش فایل ناموفق بود.'));
        };
        document.head.appendChild(script);
      });
      return window[key];
    },

    fetchAttachmentBlob: async function (attachmentId) {
      const response = await Api.get('/attachments/' + encodeURIComponent(attachmentId) + '/download');
      const data = Api.extractData(response) || {};
      const remoteUrl = data.url || data.downloadUrl || data.DownloadUrl;
      if (remoteUrl) return { url: remoteUrl, data: data };
      const base64 = data.Base64 || data.base64;
      if (!base64) throw new Error('سرور محتوای فایل را برنگرداند.');
      const mimeType = data.MimeType || data.mimeType || 'application/octet-stream';
      const cleanBase64 = String(base64).replace(/^data:[^,]*;base64,/, '');
      const binary = window.atob(cleanBase64);
      const chunks = [];
      const chunkSize = 8192;
      for (let offset = 0; offset < binary.length; offset += chunkSize) {
        const length = Math.min(chunkSize, binary.length - offset);
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) bytes[i] = binary.charCodeAt(i);
        chunks.push(bytes);
      }
      return {
        blob: new Blob(chunks, { type: mimeType }),
        data: data
      };
    },

    download: async function (attachmentId) {
      if (!attachmentId) {
        alert('شناسه فایل مشخص نیست.');
        return;
      }
      let objectUrl = '';
      try {
        const result = await this.fetchAttachmentBlob(attachmentId);
        if (result.url) {
          window.open(result.url, '_blank', 'noopener');
          return;
        }
        const fileName = result.data.FileName || result.data.fileName || ('attachment-' + attachmentId);
        objectUrl = window.URL.createObjectURL(result.blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Attachment Download Error:', error);
        alert(error.message || 'خطا در دریافت فایل.');
      } finally {
        if (objectUrl) window.setTimeout(function () { window.URL.revokeObjectURL(objectUrl); }, 30000);
      }
    },

    preview: async function (attachmentId) {
      if (!attachmentId) return;
      const existing = document.getElementById('attachment-preview-modal');
      if (existing) existing.remove();
      const modal = document.createElement('div');
      modal.id = 'attachment-preview-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = '<section class="modal" role="dialog" aria-modal="true" aria-labelledby="attachment-preview-title" style="width:min(1100px,96vw);height:min(92vh,900px);display:flex;flex-direction:column;overflow:hidden">' +
        '<header class="modal-header"><h3 id="attachment-preview-title">پیش‌نمایش فایل</h3><div style="display:flex;gap:8px;align-items:center"><button type="button" class="btn btn-secondary" id="attachment-preview-download">دانلود فایل</button><button type="button" class="modal-close" id="attachment-preview-close" aria-label="بستن">×</button></div></header>' +
        '<div id="attachment-preview-content" style="flex:1;min-height:0;overflow:auto;padding:12px;display:flex;align-items:center;justify-content:center"><div class="loading-spinner" aria-label="در حال دریافت فایل"></div></div></section>';
      document.body.appendChild(modal);
      const content = modal.querySelector('#attachment-preview-content');
      const close = function () {
        modal.remove();
        if (modal._objectUrl) window.URL.revokeObjectURL(modal._objectUrl);
        document.removeEventListener('keydown', onKeyDown);
      };
      const onKeyDown = function (event) { if (event.key === 'Escape') close(); };
      modal.querySelector('#attachment-preview-close').addEventListener('click', close);
      modal.addEventListener('click', function (event) { if (event.target === modal) close(); });
      document.addEventListener('keydown', onKeyDown);
      modal.querySelector('#attachment-preview-download').addEventListener('click', function () {
        MODULE.download(attachmentId);
      });
      try {
        const result = await this.fetchAttachmentBlob(attachmentId);
        if (!document.body.contains(modal)) return;
        if (result.url) {
          const frame = document.createElement('iframe');
          frame.src = result.url;
          frame.title = 'پیش‌نمایش فایل';
          frame.style.cssText = 'width:100%;height:100%;min-height:65vh;border:0;background:#fff';
          content.appendChild(frame);
          return;
        }
        const blob = result.blob;
        const data = result.data || {};
        const fileName = String(data.FileName || data.fileName || 'file');
        const mime = String(data.MimeType || data.mimeType || blob.type || '').toLowerCase();
        const extension = (fileName.split('.').pop() || '').toLowerCase();
        const url = window.URL.createObjectURL(blob);
        modal._objectUrl = url;
        modal.querySelector('#attachment-preview-title').textContent = fileName;
        if (mime.indexOf('image/') === 0 || ['jpg','jpeg','png','webp','gif'].indexOf(extension) !== -1) {
          const image = document.createElement('img');
          image.src = url;
          image.alt = fileName;
          image.style.cssText = 'display:block;max-width:100%;max-height:100%;object-fit:contain;margin:auto';
          content.appendChild(image);
          image.addEventListener('click', function () {
            image.style.maxHeight = image.style.maxHeight === '100%' ? 'none' : '100%';
          });
        } else if (mime === 'application/pdf' || extension === 'pdf') {
          const frame = document.createElement('iframe');
          frame.src = url + '#toolbar=1&navpanes=0';
          frame.title = fileName;
          frame.style.cssText = 'width:100%;height:100%;min-height:65vh;border:0;background:#fff';
          content.appendChild(frame);
        } else if (extension === 'docx' || mime.indexOf('wordprocessingml') !== -1) {
          const mammoth = await this.loadPreviewLibrary('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js', 'mammoth');
          const arrayBuffer = await blob.arrayBuffer();
          const rendered = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
          content.style.display = 'block';
          content.style.direction = 'rtl';
          content.style.textAlign = 'right';
          content.innerHTML = '<article class="attachment-docx-preview" style="max-width:850px;margin:0 auto;padding:24px;background:#fff;color:#222;line-height:1.9"></article>';
          content.querySelector('article').innerHTML = MODULE.sanitizePreviewHtml(rendered.value || '<p>محتوای متنی قابل نمایش نیست.</p>');
        } else if (extension === 'xlsx' || extension === 'xls' || mime.indexOf('spreadsheet') !== -1 || mime.indexOf('excel') !== -1) {
          const XLSX = await this.loadPreviewLibrary('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js', 'XLSX');
          const workbook = XLSX.read(await blob.arrayBuffer(), { type: 'array' });
          content.style.display = 'block';
          content.style.direction = 'rtl';
          content.innerHTML = '';
          workbook.SheetNames.forEach(function (sheetName) {
            const heading = document.createElement('h4');
            heading.textContent = sheetName;
            content.appendChild(heading);
            const table = document.createElement('div');
            table.style.cssText = 'overflow:auto;margin-bottom:24px;background:var(--color-surface)';
            const html = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName], { editable: false });
            table.innerHTML = MODULE.sanitizePreviewHtml(html);
            const renderedTable = table.querySelector('table');
            if (renderedTable) renderedTable.style.cssText = 'border-collapse:collapse;width:100%;direction:rtl';
            content.appendChild(table);
          });
        } else {
          content.innerHTML = '<div style="text-align:center"><p>پیش‌نمایش این نوع فایل در مرورگر پشتیبانی نمی‌شود.</p><p>می‌توانید فایل اصلی را با دکمه «دانلود فایل» دریافت کنید.</p></div>';
        }
      } catch (error) {
        console.error('Attachment Preview Error:', error);
        if (document.body.contains(modal)) {
          content.innerHTML = '';
          const message = document.createElement('p');
          message.textContent = error.message || 'نمایش فایل ناموفق بود. لطفاً فایل را دانلود کنید.';
          content.appendChild(message);
        }
      }
    },


    showUploadMessage: async function () {
      if (document.getElementById('attachment-upload-modal')) return;

      const router = window.PMS.Router;
      const permissions = router && Array.isArray(router.permissions) ? router.permissions : [];
      const canUpload = !!(router && (
        (typeof router.isAdmin === 'function' && router.isAdmin()) ||
        permissions.indexOf('ATTACHMENT_UPLOAD') !== -1
      ));
      if (!canUpload) {
        alert('برای بارگذاری فایل، دسترسی ATTACHMENT_UPLOAD لازم است.');
        return;
      }

      const modal = document.createElement('div');
      modal.id = 'attachment-upload-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML =
        '<section class="modal" role="dialog" aria-modal="true" aria-labelledby="attachment-upload-title" style="width:min(620px,100%);max-height:90vh;overflow:auto;">' +
          '<header class="modal-header"><h3 id="attachment-upload-title">بارگذاری فایل</h3><button type="button" class="modal-close" id="attachment-upload-close" aria-label="بستن">×</button></header>' +
          '<div class="modal-body">' +
            '<form id="attachment-upload-form">' +
              '<div class="filter-group"><label for="attachment-upload-entity-type">اتصال فایل به *</label><select id="attachment-upload-entity-type" class="form-control" required><option value="PROJECT">پروژه</option><option value="EVENT">رویداد</option></select></div>' +
              '<div class="filter-group" style="margin-top:12px"><label for="attachment-upload-entity">انتخاب مورد *</label><select id="attachment-upload-entity" class="form-control" required><option value="">ابتدا نوع اتصال را انتخاب کنید…</option></select><small id="attachment-upload-entity-help" style="display:block;margin-top:5px;color:var(--color-text-secondary)">در حال دریافت فهرست…</small></div>' +
              '<div class="filter-group" style="margin-top:12px"><label for="attachment-upload-file">فایل *</label><input id="attachment-upload-file" class="form-control" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.docx,.xlsx,image/jpeg,image/png,image/webp,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required><small style="display:block;margin-top:5px;color:var(--color-text-secondary)">فرمت‌های مجاز: JPG، PNG، WEBP، PDF، DOCX و XLSX؛ حداکثر ۵ مگابایت.</small></div>' +
              '<div class="filter-group" style="margin-top:12px"><label for="attachment-upload-filename">نام فایل</label><input id="attachment-upload-filename" class="form-control" type="text" maxlength="180" autocomplete="off" placeholder="نام اصلی فایل استفاده می‌شود"></div>' +
              '<div id="attachment-upload-status" role="status" aria-live="polite" style="margin-top:12px"></div>' +
              '<div style="display:flex;gap:8px;justify-content:flex-start;flex-wrap:wrap;margin-top:16px"><button class="btn btn-primary" id="attachment-upload-submit" type="submit">بارگذاری</button><button class="btn btn-secondary" id="attachment-upload-cancel" type="button">انصراف</button></div>' +
            '</form>' +
          '</div>' +
        '</section>';

      document.body.appendChild(modal);

      const form = modal.querySelector('#attachment-upload-form');
      const typeSelect = modal.querySelector('#attachment-upload-entity-type');
      const entitySelect = modal.querySelector('#attachment-upload-entity');
      const entityHelp = modal.querySelector('#attachment-upload-entity-help');
      const fileInput = modal.querySelector('#attachment-upload-file');
      const fileNameInput = modal.querySelector('#attachment-upload-filename');
      const status = modal.querySelector('#attachment-upload-status');
      const submit = modal.querySelector('#attachment-upload-submit');
      let entityRequestId = 0;

      const onKeyDown = function (event) {
        if (event.key === 'Escape') close();
      };
      const close = function () {
        modal.remove();
        document.removeEventListener('keydown', onKeyDown);
      };
      modal.querySelector('#attachment-upload-close').addEventListener('click', close);
      modal.querySelector('#attachment-upload-cancel').addEventListener('click', close);
      modal.addEventListener('click', function (event) {
        if (event.target === modal) close();
      });
      document.addEventListener('keydown', onKeyDown);

      const unwrapList = function (response, keys) {
        let data = Api.extractData(response);
        for (let depth = 0; depth < 4 && data && !Array.isArray(data); depth += 1) {
          let next = null;
          for (let i = 0; i < keys.length; i += 1) {
            if (Array.isArray(data[keys[i]])) { next = data[keys[i]]; break; }
          }
          if (!next && data.data && typeof data.data === 'object') next = data.data;
          if (!next) break;
          data = next;
        }
        return Array.isArray(data) ? data : [];
      };

      const getEntityId = function (item, kind) {
        return String(item.ID || item.Id || item.id ||
          (kind === 'PROJECT' ? item.ProjectID : item.EventID) || '');
      };
      const getEntityLabel = function (item, kind, id) {
        if (kind === 'PROJECT') {
          const code = item.ProjectCode || item.Code || '';
          const title = item.Title || item.Name || item.ProjectName || '';
          return [code, title].filter(Boolean).join(' — ') || id;
        }
        const title = item.EventTypeName || item.EventTypeTitle || item.Title || item.Name || item.EventTitle || 'رویداد';
        const project = item.ProjectCode || item.ProjectTitle || '';
        const date = item.EventDate || item.CreatedAt || item.RegisteredAt || '';
        return [title, project, date ? String(date).slice(0, 10) : ''].filter(Boolean).join(' — ') || id;
      };

      const loadEntities = async function () {
        const requestId = ++entityRequestId;
        const kind = typeSelect.value;
        entitySelect.disabled = true;
        entitySelect.innerHTML = '<option value="">در حال دریافت فهرست…</option>';
        entityHelp.textContent = 'در حال دریافت فهرست…';
        status.textContent = '';
        try {
          const response = await Api.get(kind === 'PROJECT' ? '/projects' : '/events', { trackSync: false });
          if (requestId !== entityRequestId || !document.body.contains(modal)) return;
          const keys = kind === 'PROJECT'
            ? ['projects', 'items', 'results', 'data']
            : ['events', 'items', 'results', 'data'];
          const items = unwrapList(response, keys);
          const options = items.map(function (item) {
            const id = getEntityId(item, kind);
            return id ? { id: id, label: getEntityLabel(item, kind, id) } : null;
          }).filter(Boolean);
          entitySelect.innerHTML = '<option value="">یک مورد انتخاب کنید…</option>' + options.map(function (item) {
            return '<option value="' + MODULE.escapeHtml(item.id) + '">' + MODULE.escapeHtml(item.label) + '</option>';
          }).join('');
          entitySelect.disabled = false;
          entityHelp.textContent = options.length
            ? options.length + ' مورد قابل انتخاب است.'
            : 'موردی برای انتخاب پیدا نشد یا دسترسی مشاهده این فهرست وجود ندارد.';
        } catch (error) {
          if (requestId !== entityRequestId || !document.body.contains(modal)) return;
          entitySelect.innerHTML = '<option value="">فهرست قابل دریافت نیست</option>';
          entitySelect.disabled = true;
          entityHelp.textContent = 'دریافت فهرست ناموفق بود. دسترسی مشاهده پروژه‌ها/رویدادها و اتصال سرور را بررسی کنید.';
          status.textContent = error.message || 'خطا در دریافت فهرست.';
        }
      };

      typeSelect.addEventListener('change', loadEntities);
      fileInput.addEventListener('change', function () {
        const file = fileInput.files && fileInput.files[0];
        if (file && !fileNameInput.value.trim()) fileNameInput.value = file.name;
      });
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (submit.disabled) return;
        const entityId = entitySelect.value;
        const kind = typeSelect.value;
        const file = fileInput.files && fileInput.files[0];
        if (!entityId) {
          status.textContent = 'ابتدا پروژه یا رویداد را انتخاب کنید.';
          entitySelect.focus();
          return;
        }
        if (!file) {
          status.textContent = 'لطفاً یک فایل انتخاب کنید.';
          fileInput.focus();
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          status.textContent = 'حجم فایل نباید بیشتر از ۵ مگابایت باشد.';
          fileInput.focus();
          return;
        }
        const extension = (file.name.split('.').pop() || '').toLowerCase();
        const mimeByExtension = {
          jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
          pdf: 'application/pdf',
          docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
        const allowedMimeTypes = Object.keys(mimeByExtension).map(function (key) { return mimeByExtension[key]; });
        const mimeType = allowedMimeTypes.indexOf(file.type) !== -1 ? file.type : mimeByExtension[extension];
        if (!mimeType) {
          status.textContent = 'نوع فایل مجاز نیست. فقط JPG، PNG، WEBP، PDF، DOCX و XLSX پذیرفته می‌شوند.';
          fileInput.focus();
          return;
        }

        submit.disabled = true;
        status.textContent = 'در حال آماده‌سازی و ارسال فایل…';
        try {
          const dataUrl = await new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = function () { resolve(String(reader.result || '')); };
            reader.onerror = function () { reject(new Error('خواندن فایل ناموفق بود.')); };
            reader.readAsDataURL(file);
          });
          const requestedName = String(fileNameInput.value || '').trim();
          const chosenName = requestedName || file.name;
          const dot = chosenName.lastIndexOf('.');
          const finalName = dot > 0 ? chosenName : chosenName + '.' + extension;
          const response = await Api.post('/attachments', {
            EntityType: kind,
            EntityID: entityId,
            FileName: finalName.replace(/[\/:*?"<>|]/g, '_').slice(0, 180),
            MimeType: mimeType,
            Base64: dataUrl
          });
          const result = Api.extractData(response) || {};
          if (result.success === false || result.error) {
            throw new Error(result.message || result.error || 'بارگذاری فایل ناموفق بود.');
          }
          if (Cache && typeof Cache.remove === 'function') Cache.remove(MODULE.cacheKey);
          if (kind === 'PROJECT' && window.PMS && window.PMS.Projects &&
              typeof window.PMS.Projects.invalidateProjectCardAttachmentMetadata === 'function') {
            window.PMS.Projects.invalidateProjectCardAttachmentMetadata(entityId);
          } else if (kind === 'EVENT' && window.PMS && window.PMS.Api) {
            window.PMS.Api.invalidateMany([
              window.PMS.Cache.keys.EVENTS,
              window.PMS.Cache.keys.DASHBOARD
            ]);
          }
          status.textContent = 'فایل با موفقیت بارگذاری شد.';
          await MODULE.load();
          window.setTimeout(close, 350);
        } catch (error) {
          status.textContent = error.message || 'بارگذاری فایل ناموفق بود.';
        } finally {
          if (document.body.contains(modal)) submit.disabled = false;
        }
      });

      await loadEntities();
      const firstFocusable = modal.querySelector('#attachment-upload-entity-type');
      if (firstFocusable) firstFocusable.focus();
    },


    getEntityLabel:
      function (
        value
      ) {

        const type =
          String(
            value || ''
          )
            .toUpperCase();


        if (
          type === 'PROJECT'
        ) {

          return 'پروژه';

        }


        if (
          type === 'EVENT'
        ) {

          return 'رویداد';

        }


        return this.escapeHtml(
          value || '-'
        );

      },


    getStatusLabel:
      function (
        value
      ) {

        const status =
          String(
            value || ''
          )
            .toUpperCase();


        const labels = {

          ACTIVE:
            'فعال',

          INACTIVE:
            'غیرفعال',

          DELETED:
            'حذف‌شده',

          VOID:
            'باطل‌شده'

        };


        return (
          labels[status] ||
          this.escapeHtml(
            value || '-'
          )
        );

      },


    formatFileSize:
      function (
        value
      ) {

        const size =
          Number(
            value
          );


        if (
          !size ||
          size <= 0
        ) {

          return '-';

        }


        if (
          size < 1024
        ) {

          return (
            size +
            ' B'
          );

        }


        if (
          size < 1024 * 1024
        ) {

          return (
            (size / 1024)
              .toFixed(1) +
            ' KB'
          );

        }


        return (
          (size / (1024 * 1024))
            .toFixed(1) +
          ' MB'
        );

      },


    showLoading:
      function (
        visible
      ) {

        const element =
          document.getElementById(
            'attachments-loading'
          );


        if (element) {

          element.hidden =
            !visible;

        }

      },


    showError:
      function (
        message
      ) {

        const element =
          document.getElementById(
            'attachments-error'
          );


        if (!element) {

          return;

        }


        element.textContent =
          message;


        element.hidden =
          false;

      },


    hideError:
      function () {

        const element =
          document.getElementById(
            'attachments-error'
          );


        if (element) {

          element.hidden =
            true;

        }

      },


    escapeHtml:
      function (
        value
      ) {

        const div =
          document.createElement(
            'div'
          );


        div.textContent =
          String(
            value ?? ''
          );


        return div.innerHTML;

      },


    escapeJs:
      function (
        value
      ) {

        return String(
          value ?? ''
        )
          .replace(
            /\\/g,
            '\\\\'
          )
          .replace(
            /'/g,
            "\\'"
          )
          .replace(
            /"/g,
            '\\"'
          )
          .replace(
            /\r/g,
            '\\r'
          )
          .replace(
            /\n/g,
            '\\n'
          );

      }

  };



  // Project-oriented attachment workspace; keeps the existing API, cache and upload flow.
  MODULE.state.projects = [];
  MODULE.state.events = [];
  MODULE.state.selectedProjectId = '';

  MODULE.ensureProjectWorkspaceStyles = function () {
    if (document.getElementById('attachments-project-workspace-styles')) return;
    const style = document.createElement('style');
    style.id = 'attachments-project-workspace-styles';
    style.textContent = [
      '#attachments-project-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr));gap:14px}',
      '.attachment-project-card{display:flex;flex-direction:column;align-items:flex-start;gap:9px;min-width:0;padding:16px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface);color:var(--color-text);text-align:right;cursor:pointer;transition:.18s}',
      '.attachment-project-card:hover{border-color:var(--color-primary);box-shadow:var(--shadow-md);transform:translateY(-1px)}',
      '.attachment-project-card:focus-visible{outline:2px solid var(--color-primary);outline-offset:3px}',
      '.attachment-project-card-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--color-surface-hover);font-size:22px}',
      '.attachment-project-card-title{font-weight:700;font-size:14px;overflow-wrap:anywhere}',
      '.attachment-project-card-code,.attachment-project-card-meta{font-size:12px;color:var(--color-text-secondary)}',
      '.attachment-project-card-meta{display:flex;justify-content:space-between;width:100%;gap:8px;margin-top:4px}',
      '.attachment-project-workspace-header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}',
      '.attachment-project-files{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr));gap:12px}',
      '.attachment-project-file{min-width:0;padding:12px;border:1px solid var(--color-border);border-radius:12px;background:var(--color-surface)}',
      '.attachment-project-file-name{font-size:13px;font-weight:600;overflow-wrap:anywhere;margin-top:8px}',
      '.attachment-project-file-meta{font-size:11px;color:var(--color-text-secondary);margin-top:5px}',
      '@media(max-width:600px){#attachments-project-grid,.attachment-project-files{grid-template-columns:1fr}}'
    ].join('');
    document.head.appendChild(style);
  };

  MODULE.projectId = function (item) {
    return String(item && (item.ID || item.Id || item.id || item.ProjectID || item.projectId) || '');
  };
  MODULE.projectTitle = function (item) {
    return String(item && (item.Title || item.ProjectName || item.Name || item.TitleName) || 'پروژه بدون عنوان');
  };
  MODULE.projectCode = function (item) {
    return String(item && (item.ProjectCode || item.Code || '') || '');
  };
  MODULE.projectFiles = function (projectId) {
    const eventIds = Object.create(null);
    (MODULE.state.events || []).forEach(function (event) {
      const parentId = String(event.ProjectID || event.ProjectId || event.projectId || '');
      const eventId = String(event.ID || event.Id || event.id || event.EventID || '');
      if (parentId === String(projectId) && eventId) eventIds[eventId] = true;
    });
    return MODULE.state.attachments.filter(function (item) {
      const type = String(item.EntityType || item.entityType || '').toUpperCase();
      const entityId = String(item.EntityID || item.entityID || '');
      return (type === 'PROJECT' && entityId === String(projectId)) ||
        (type === 'EVENT' && !!eventIds[entityId]);
    });
  };

  MODULE.extractWorkspaceList = function (response, keys) {
    let data = Api && typeof Api.extractData === 'function' ? Api.extractData(response) : response;
    for (let depth = 0; depth < 5 && data && !Array.isArray(data); depth += 1) {
      let next = null;
      for (let i = 0; i < keys.length; i += 1) {
        if (Array.isArray(data[keys[i]])) { next = data[keys[i]]; break; }
      }
      if (!next && data.data && typeof data.data === 'object') next = data.data;
      if (!next) break;
      data = next;
    }
    return Array.isArray(data) ? data : [];
  };

  const originalLoad = MODULE.load;
  MODULE.load = async function () {
    await originalLoad.call(MODULE);
    try {
      const projectResponse = await Api.getCached('/projects', Cache.keys.PROJECTS || 'projects', {
        cacheTtl: 60000, refreshCached: false
      });
      MODULE.state.projects = MODULE.extractWorkspaceList(projectResponse, ['projects', 'items', 'results']);
    } catch (error) {
      MODULE.state.projects = [];
      console.warn('Attachment project list unavailable:', error);
    }
    try {
      const eventResponse = await Api.getCached('/events', Cache.keys.EVENTS || 'events', {
        cacheTtl: 60000, refreshCached: false
      });
      MODULE.state.events = MODULE.extractWorkspaceList(eventResponse, ['events', 'items', 'results']);
    } catch (error) {
      MODULE.state.events = [];
    }
    MODULE.render();
  };

  MODULE.render = function () {
    const container = document.getElementById('attachments-table-container');
    const empty = document.getElementById('attachments-empty');
    if (!container) return;
    MODULE.ensureProjectWorkspaceStyles();
    MODULE.showLoading(false);
    MODULE.hideError();

    if (MODULE.state.selectedProjectId) {
      const project = MODULE.state.projects.find(function (item) {
        return MODULE.projectId(item) === String(MODULE.state.selectedProjectId);
      });
      if (!project) MODULE.state.selectedProjectId = '';
      else {
        const files = MODULE.projectFiles(MODULE.state.selectedProjectId);
        const fileCards = files.map(function (item) {
          const id = String(item.ID || item.id || '');
          const mime = String(item.MimeType || item.mimeType || '').toLowerCase();
          const icon = mime.indexOf('image/') === 0 ? '🖼️' : (mime === 'application/pdf' ? '📕' : '📄');
          return '<article class="attachment-project-file"><div class="attachment-project-card-icon" aria-hidden="true">' + icon + '</div>' +
            '<div class="attachment-project-file-name">' + MODULE.escapeHtml(item.FileName || item.fileName || 'بدون نام') + '</div>' +
            '<div class="attachment-project-file-meta">' + MODULE.formatFileSize(item.FileSize || item.fileSize) + ' · ' +
            MODULE.escapeHtml(item.UploadedAt || item.uploadedAt || '') + '</div>' +
            '<div style="margin-top:10px"><button type="button" class="btn btn-sm btn-light" data-attachment-open="' +
            MODULE.escapeHtml(id) + '">مشاهده فایل</button></div></article>';
        }).join('');
        container.innerHTML = '<section><header class="attachment-project-workspace-header"><div><h3 style="margin:0">' +
          MODULE.escapeHtml(MODULE.projectTitle(project)) + '</h3><small>کد پروژه: ' +
          MODULE.escapeHtml(MODULE.projectCode(project) || '—') + ' · ' + files.length + ' فایل</small></div>' +
          '<button type="button" class="btn btn-secondary" id="attachments-back-to-projects">← بازگشت به پروژه‌ها</button></header>' +
          (files.length ? '<div class="attachment-project-files">' + fileCards + '</div>' :
            '<div class="table-empty">برای این پروژه فایلی ثبت نشده است.</div>') + '</section>';
        container.hidden = false;
        if (empty) empty.hidden = true;
        const back = container.querySelector('#attachments-back-to-projects');
        if (back) back.addEventListener('click', function () {
          MODULE.state.selectedProjectId = '';
          MODULE.render();
        });
        container.querySelectorAll('[data-attachment-open]').forEach(function (button) {
          button.addEventListener('click', function () {
            MODULE.preview(button.getAttribute('data-attachment-open'));
          });
        });
        return;
      }
    }

    const search = String(MODULE.state.search || '').toLowerCase();
    const projects = MODULE.state.projects.filter(function (project) {
      const id = MODULE.projectId(project);
      const files = MODULE.projectFiles(id);
      const title = MODULE.projectTitle(project).toLowerCase();
      const code = MODULE.projectCode(project).toLowerCase();
      return (!search || title.indexOf(search) !== -1 || code.indexOf(search) !== -1) &&
        (!MODULE.state.filter || files.length > 0);
    });
    if (!projects.length) {
      container.innerHTML = '';
      container.hidden = true;
      if (empty) {
        empty.textContent = search ? 'پروژه‌ای با این مشخصات پیدا نشد.' :
          'پروژه‌ای دارای فایل برای نمایش وجود ندارد.';
        empty.hidden = false;
      }
      return;
    }
    if (empty) empty.hidden = true;
    container.innerHTML = '<div id="attachments-project-grid">' + projects.map(function (project) {
      const id = MODULE.projectId(project);
      const count = MODULE.projectFiles(id).length;
      return '<button type="button" class="attachment-project-card" data-project-id="' + MODULE.escapeHtml(id) + '">' +
        '<span class="attachment-project-card-icon" aria-hidden="true">📁</span>' +
        '<span class="attachment-project-card-title">' + MODULE.escapeHtml(MODULE.projectTitle(project)) + '</span>' +
        '<span class="attachment-project-card-code">کد پروژه: ' + MODULE.escapeHtml(MODULE.projectCode(project) || 'بدون کد') + '</span>' +
        '<span class="attachment-project-card-meta"><span>' + count + ' فایل</span><span>مشاهده فایل‌ها ←</span></span></button>';
    }).join('') + '</div>';
    container.hidden = false;
    container.querySelectorAll('[data-project-id]').forEach(function (card) {
      card.addEventListener('click', function () {
        MODULE.state.selectedProjectId = card.getAttribute('data-project-id') || '';
        MODULE.render();
      });
    });
  };

   window.PMS.Attachments =
    MODULE;

  window.PMS.Modules.Attachments =
    MODULE;

})();