    ensureTimelineStyles: function () {
      if (document.getElementById('pms-timeline-styles')) return;

      const style = document.createElement('style');
      style.id = 'pms-timeline-styles';

      style.textContent = `
        .pms-timeline {
          position: relative;
          padding: 8px 18px 8px 0;
        }

        .pms-timeline:before {
          content: "";
          position: absolute;
          right: 7px;
          top: 14px;
          bottom: 18px;
          width: 2px;
          background: var(--color-border);
        }

        .pms-timeline-item {
          position: relative;
          padding: 0 24px 22px 0;
        }

        .pms-timeline-marker {
          position: absolute;
          right: 0;
          top: 14px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          border: 3px solid var(--color-surface);
          box-shadow: 0 0 0 1px var(--color-border);
          z-index: 1;
        }

        .pms-timeline-card {
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 16px;
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
          min-width: 0;
        }

        .pms-timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .pms-timeline-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text);
        }

        .pms-timeline-date {
          margin-top: 5px;
          font-size: 12px;
          color: var(--color-text-muted);
        }

        .pms-timeline-status {
          display: inline-block;
          border-radius: 20px;
          padding: 4px 9px;
          background: var(--color-surface-alt);
          color: var(--color-text);
          font-size: 11px;
        }

        .pms-timeline-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 24px;
          padding: 12px 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .pms-timeline-meta-item,
        .pms-timeline-dynamic-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 100px;
          overflow-wrap: anywhere;
        }

        .pms-timeline-meta-item span,
        .pms-timeline-dynamic-item span {
          color: var(--color-text-muted);
          font-size: 11px;
        }

        .pms-timeline-meta-item strong,
        .pms-timeline-dynamic-item strong {
          color: var(--color-text);
          font-size: 13px;
          font-weight: 600;
        }

        .pms-timeline-description {
          margin-top: 13px;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          line-height: 1.9;
          color: var(--color-text);
          font-size: 13px;
        }

        .pms-timeline-dynamic {
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
          background: var(--color-surface-alt);
        }

        .pms-timeline-dynamic > strong {
          display: block;
          font-size: 12px;
          margin-bottom: 10px;
        }

        .pms-timeline-dynamic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }

        .pms-timeline-footer {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px 16px;
          margin-top: 14px;
          color: var(--color-text-muted);
          font-size: 11px;
        }

        @media (max-width: 600px) {
          .pms-timeline-card {
            padding: 12px;
          }

          .pms-timeline-header {
            flex-direction: column;
          }

          .pms-timeline-meta {
            gap: 12px;
          }
        }
      `;

      document.head.appendChild(style);
    },

    ensureTimelineStyles: function () {
      if (document.getElementById('pms-timeline-styles')) return;
      const style = document.createElement('style');
      style.id = 'pms-timeline-styles';
      style.textContent = `
        .pms-timeline-compact { position:relative; padding:2px 18px 2px 0; }
        .pms-timeline-compact:before { content:""; position:absolute; right:7px; top:12px; bottom:12px; width:2px; background:var(--color-border); }
        .pms-timeline-details { position:relative; margin:0; padding:0 24px 0 0; border-bottom:1px solid var(--color-border); }
        .pms-timeline-details:last-child { border-bottom:0; }
        .pms-timeline-summary { display:flex; align-items:center; gap:10px; min-height:50px; padding:6px 0; cursor:pointer; list-style:none; }
        .pms-timeline-summary::-webkit-details-marker { display:none; }
        .pms-timeline-marker { position:absolute; right:0; top:17px; width:12px; height:12px; border-radius:50%; background:var(--color-primary); border:2px solid var(--color-surface); box-shadow:0 0 0 1px var(--color-border); z-index:1; }
        .pms-timeline-summary-content { display:flex; flex:1; min-width:0; flex-direction:column; gap:3px; }
        .pms-timeline-summary-line { display:flex; align-items:center; justify-content:space-between; gap:10px; min-width:0; }
        .pms-timeline-title { font-size:13px; font-weight:700; color:var(--color-text); overflow-wrap:anywhere; }
        .pms-timeline-date { font-size:11px; color:var(--color-text-muted); white-space:nowrap; }
        .pms-timeline-performer { font-size:11px; color:var(--color-text-muted); }
        .pms-timeline-chevron { width:7px; height:7px; flex:none; border-left:1.5px solid var(--color-text-muted); border-bottom:1.5px solid var(--color-text-muted); transform:rotate(-45deg); margin:0 4px; transition:transform .15s ease; }
        .pms-timeline-details[open] .pms-timeline-chevron { transform:rotate(135deg); }
        .pms-timeline-expanded { padding:0 0 12px; display:flex; flex-direction:column; gap:9px; }
        .pms-timeline-status { display:inline-flex; width:max-content; border-radius:12px; padding:2px 7px; background:var(--color-surface-alt); color:var(--color-text); font-size:11px; }
        .pms-timeline-meta-item { display:flex; flex-direction:column; gap:3px; min-width:100px; overflow-wrap:anywhere; }
        .pms-timeline-meta-item span { color:var(--color-text-muted); font-size:11px; }
        .pms-timeline-meta-item strong { color:var(--color-text); font-size:12px; font-weight:600; }
        .pms-timeline-description { white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.7; color:var(--color-text); font-size:12px; }
        .pms-timeline-dynamic { padding:10px; border-radius:8px; background:var(--color-surface-alt); }
        .pms-timeline-dynamic > strong { display:block; font-size:12px; margin-bottom:8px; }
        .pms-timeline-dynamic-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:10px; }
        .pms-timeline-dynamic-item { display:flex; flex-direction:column; gap:4px; min-width:0; overflow-wrap:anywhere; }
        .pms-timeline-dynamic-item span { color:var(--color-text-muted); font-size:11px; }
        .pms-timeline-dynamic-item strong { color:var(--color-text); font-size:12px; }
        .pms-timeline-footer { color:var(--color-text-muted); font-size:10px; }
        @media(max-width:600px) { .pms-timeline-summary-line { flex-wrap:wrap; } .pms-timeline-date { white-space:normal; } }
      `;
      document.head.appendChild(style);
    },

    showContent: function () {
      const content = document.getElementById(
        'project-detail-content'
      );

      const errorBox = document.getElementById(
        'project-detail-error'
      );

      if (content) content.hidden = false;
      if (errorBox) errorBox.hidden = true;
    },

    showError: function (error) {
      const loading = document.getElementById(
        'project-detail-loading'
      );

      const errorBox = document.getElementById(
        'project-detail-error'
      );

      if (loading) loading.hidden = true;
      if (!errorBox) return;

      errorBox.textContent =
        error && error.message
          ? error.message
          : 'خطا در دریافت اطلاعات پروژه.';

      errorBox.hidden = false;
    },

    statusText: function (status) {
      const map = {
        ACTIVE: 'فعال',
        INACTIVE: 'غیرفعال',
        ON_HOLD: 'متوقف',
        COMPLETED: 'تکمیل‌شده',
        CANCELLED: 'لغوشده',
        VOID: 'باطل‌شده',
        DELETED: 'حذف‌شده',
        PENDING: 'در انتظار',
        DRAFT: 'پیش‌نویس',
        SUBMITTED: 'ثبت‌شده',
        APPROVED: 'تأییدشده',
        REJECTED: 'ردشده'
      };

      const custom = this.projectStatuses.find(function (item) {
        return String(item.Code || item.ID || '').toLowerCase() === String(status || '').toLowerCase();
      });
      return (custom && (custom.Name || custom.Code)) || map[String(status || '').toUpperCase()] || status || '-';
    },

    formatDate: function (value) {
      if (!value) return '-';

      try {
        const date = new Date(value);

        if (isNaN(date.getTime())) {
          return String(value);
        }

        return date.toLocaleString('fa-IR');
      } catch (error) {
        return String(value);
      }
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
  window.PMS.ProjectDetail = ProjectDetail;
  window.PMS.Modules.ProjectDetail = ProjectDetail;
})();