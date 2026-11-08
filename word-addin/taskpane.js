(function () {
  'use strict';
  const API_BASE = 'https://script.google.com/macros/s/AKfycbwxuzgcxw6fIGxWzeSwExvCIlrCXSTCq8y5sb2rtF7yPNhuC5XWbdJzesc2plXh_CB2/exec';
  const state = { token: '', user: null, projects: [], selectedProject: null, project: null, tags: [] };
  const $ = id => document.getElementById(id);
  const TAG_FIELDS = {
    PROJECT_NAME: p => p.Title || '',
    PROJECT_CODE: p => p.ProjectCode || '',
    TOTAL_QUANTITY: p => p.Quantity == null ? '' : String(p.Quantity),
    PROJECT_DESCRIPTION: p => p.Description || '',
    PROJECT_STATUS: p => p.Status || '',
    PROJECT_ID: p => p.ID || ''
  };
  function status(message, type) {
    $('status').textContent = message;
    $('status').className = 'status' + (type ? ' ' + type : '');
  }
  function extract(response) {
    if (!response || response.success === false) throw new Error(response && response.error && response.error.message || response && response.message || 'پاسخ سرور معتبر نیست.');
    return response.data !== undefined ? response.data : response;
  }
  async function api(method, path, body) {
    const url = new URL(API_BASE);
    url.searchParams.set('path', path);
    if (state.token) url.searchParams.set('token', state.token);
    const options = { method: method === 'PUT' || method === 'DELETE' ? 'POST' : method, redirect: 'follow' };
    if (method !== 'GET') {
      if (method === 'PUT' || method === 'DELETE') url.searchParams.set('_method', method);
      options.headers = { 'Content-Type': 'text/plain;charset=utf-8' };
      options.body = JSON.stringify(body || {});
    }
    const response = await fetch(url.toString(), options);
    let data;
    try { data = await response.json(); }
    catch (parseError) { throw new Error('پاسخ سرور قابل خواندن نیست؛ ارتباط یا نشانی سرویس را بررسی کنید.'); }
    if (!response.ok) throw new Error(data && data.error && data.error.message || data && data.message || 'ارتباط با PMS ناموفق بود.');
    return extract(data);
  }
  function normalizeProjects(value) {
    if (Array.isArray(value)) return value;
    for (const key of ['items','Items','projects','Projects','data']) if (value && Array.isArray(value[key])) return value[key];
    return [];
  }
  function renderProjects(query) {
    const q = String(query || '').trim().toLocaleLowerCase();
    const rows = state.projects.filter(p => !q || [p.Title,p.ProjectCode,p.ID].some(v => String(v || '').toLocaleLowerCase().includes(q)));
    $('project-select').innerHTML = '<option value="">انتخاب پروژه…</option>' + rows.map(p =>
      '<option value="' + escapeHtml(p.ID) + '">' + escapeHtml((p.Title || 'بدون نام') + (p.ProjectCode ? ' — ' + p.ProjectCode : '')) + '</option>'
    ).join('');
  }
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  async function login() {
    const username = $('username').value.trim(), password = $('password').value;
    if (!username || !password) return status('نام کاربری و رمز عبور را وارد کنید.', 'error');
    $('login-button').disabled = true;
    try {
      const result = await api('POST','/auth/login',{username,password});
      state.token = result.token || '';
      state.user = result.user || (result.data && result.data.user) || null;
      if (!state.token) throw new Error('توکن ورود از PMS دریافت نشد.');
      $('password').value = '';
      $('login-panel').hidden = true;
      $('workspace').hidden = false;
      $('user-label').textContent = state.user && (state.user.Name || state.user.Username) || 'کاربر واردشده';
      await loadProjects();
      status('اتصال به PMS برقرار شد. یک پروژه انتخاب کنید.', 'success');
    } catch (e) { state.token = ''; status(e.message || 'ورود ناموفق بود.', 'error'); }
    finally { $('login-button').disabled = false; }
  }
  async function loadProjects() {
    status('در حال دریافت فهرست پروژه‌ها…');
    const result = await api('GET','/projects');
    state.projects = normalizeProjects(result);
    renderProjects($('project-search').value);
    if (!state.projects.length) status('پروژه قابل دسترسی پیدا نشد.', 'error');
  }
  async function loadProject() {
    const id = $('project-select').value;
    if (!id) return status('ابتدا یک پروژه انتخاب کنید.', 'error');
    status('در حال دریافت اطلاعات پروژه…');
    try {
      state.project = await api('GET','/projects/' + encodeURIComponent(id));
      state.selectedProject = id;
      $('project-summary').hidden = false;
      $('project-summary').textContent = (state.project.Title || 'پروژه') + ' | کد: ' + (state.project.ProjectCode || 'ندارد') + ' | تعداد: ' + (state.project.Quantity == null ? '—' : state.project.Quantity);
      $('insert-data').disabled = false;
      await scanTags();
      status('اطلاعات پروژه دریافت شد. قالب آماده درج است.', 'success');
    } catch (e) { state.project = null; $('insert-data').disabled = true; status(e.message || 'دریافت پروژه ناموفق بود.', 'error'); }
  }
  async function scanTags() {
    if (!window.Word) return status('این افزونه باید داخل Microsoft Word اجرا شود.', 'error');
    try {
      await Word.run(async context => {
        const controls = context.document.contentControls;
        controls.load('items/id,tag,title');
        await context.sync();
        state.tags = controls.items.map(c => c.tag).filter(Boolean);
      });
      const known = state.tags.filter(tag => Object.prototype.hasOwnProperty.call(TAG_FIELDS, tag));
      status('شناسه‌های قالب: ' + known.length + ' از ' + Object.keys(TAG_FIELDS).length + ' شناسه شناخته‌شده پیدا شد.', known.length ? 'success' : 'error');
      return known;
    } catch (e) { status('خواندن شناسه‌های قالب ممکن نشد: ' + e.message, 'error'); return []; }
  }
  async function insertData() {
    if (!state.project) return status('ابتدا پروژه را بارگذاری کنید.', 'error');
    const values = {};
    Object.keys(TAG_FIELDS).forEach(tag => { values[tag] = String(TAG_FIELDS[tag](state.project) ?? ''); });
    let count = 0;
    try {
      await Word.run(async context => {
        const controls = context.document.contentControls;
        controls.load('items/id,tag');
        await context.sync();
        controls.items.forEach(control => {
          const tag = String(control.tag || '').trim().toUpperCase();
          if (!Object.prototype.hasOwnProperty.call(values, tag)) return;
          control.insertText(values[tag], Word.InsertLocation.replace);
          count++;
        });
        await context.sync();
      });
      status(count ? count + ' محل در سند تکمیل شد.' : 'هیچ Content Control با Tag شناخته‌شده در سند پیدا نشد.', count ? 'success' : 'error');
    } catch (e) { status('درج اطلاعات ناموفق بود: ' + e.message, 'error'); }
  }
  async function logout() {
    try { if (state.token) await api('POST','/auth/logout',{}); } catch (e) {}
    state.token = ''; state.user = null; state.projects = []; state.project = null; state.selectedProject = null;
    $('workspace').hidden = true; $('login-panel').hidden = false; $('project-select').innerHTML = '<option value="">ابتدا پروژه را انتخاب کنید</option>';
    $('insert-data').disabled = true; status('از PMS خارج شدید.');
  }
  function init() {
    $('login-button').addEventListener('click',login);
    $('logout-button').addEventListener('click',logout);
    $('project-search').addEventListener('input',() => renderProjects($('project-search').value));
    $('load-project').addEventListener('click',loadProject);
    $('scan-tags').addEventListener('click',scanTags);
    $('insert-data').addEventListener('click',insertData);
    if (window.Office) status('افزونه Word آماده است. برای شروع وارد PMS شوید.');
    else status('این صفحه خارج از Word باز شده است؛ برای استفاده، افزونه را در Word بارگذاری کنید.');
  }
  if (window.Office) Office.onReady(info => { if (info.host === Office.HostType.Word) init(); else status('این افزونه فقط برای Microsoft Word طراحی شده است.','error'); });
  else document.addEventListener('DOMContentLoaded',init);
})();
