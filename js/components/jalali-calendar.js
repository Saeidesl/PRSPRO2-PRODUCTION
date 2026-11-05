(function () {
  'use strict';
  window.PMS = window.PMS || {};
  const JalaliCalendar = {
    months: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
    weekdays: ['ش','ی','د','س','چ','پ','ج'],
    faDigits: '۰۱۲۳۴۵۶۷۸۹',
    toLatin: function (value) { return String(value || '').replace(/[۰-۹]/g, function (d) { return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); }).replace(/[٠-٩]/g, function (d) { return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)); }); },
    toFa: function (value) { return String(value).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[Number(d)]; }); },
    parts: function (date) {
      const p = new Intl.DateTimeFormat('en-u-ca-persian-nu-latn', {year:'numeric',month:'numeric',day:'numeric',timeZone:'UTC'}).formatToParts(date);
      const o = {}; p.forEach(function (x) { if (x.type === 'year' || x.type === 'month' || x.type === 'day') o[x.type] = Number(x.value); });
      return o;
    },
    parseISO: function (value) {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || '').slice(0,10));
      if (!m) return null;
      const d = new Date(Date.UTC(+m[1], +m[2]-1, +m[3]));
      return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2]-1 && d.getUTCDate() === +m[3] ? d : null;
    },
    localDateParts: function (date) {
      const local = date || new Date();
      return this.parts(new Date(Date.UTC(local.getFullYear(), local.getMonth(), local.getDate())));
    },
    toJalali: function (date) {
      if (!(date instanceof Date) || !isFinite(date.getTime())) return '';
      const p = this.parts(date);
      return p.year + '/' + String(p.month).padStart(2,'0') + '/' + String(p.day).padStart(2,'0');
    },
    _jalaliYearCache: Object.create(null),
    fromJalali: function (value) {
      const clean = this.toLatin(value).trim().replace(/[.\-]/g,'/').replace(/\s+/g,'');
      const m = /^(\d{3,4})\/(\d{1,2})\/(\d{1,2})$/.exec(clean);
      if (!m) return null;
      const jy=+m[1], jm=+m[2], jd=+m[3];
      if (jm<1 || jm>12 || jd<1 || jd>31) return null;
      let yearMap=this._jalaliYearCache[jy];
      if (!yearMap) {
        yearMap=Object.create(null);
        const start=Date.UTC(jy+621,2,18), end=start+371*86400000;
        for(let t=start;t<end;t+=86400000){
          const d=new Date(t), p=this.parts(d);
          if(p.year===jy){
            const iso=d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0');
            yearMap[p.month+'/'+p.day]=iso;
          }
        }
        this._jalaliYearCache[jy]=yearMap;
      }
      return yearMap[jm+'/'+jd] || null;
    },
    parseJalali: function (value) {
      const iso=this.fromJalali(value);
      return iso ? {iso:iso, parts:this.parts(this.parseISO(iso))} : null;
    },
    init: function () {
      if (this._started) return;
      this._started = true;
      const self=this;
      function scan(root) {
        if (root.nodeType !== 1 && root !== document) return;
        if (root.matches && root.matches('input[type="date"],input[type="datetime-local"],input[data-jalali-date],input.date-input,input.date-picker')) self.enhance(root);
        if (root.querySelectorAll) root.querySelectorAll('input[type="date"],input[type="datetime-local"],input[data-jalali-date],input.date-input,input.date-picker').forEach(function (input) { self.enhance(input); });
      }
      scan(document);
      new MutationObserver(function (records) {
        records.forEach(function (record) { record.addedNodes.forEach(function (node) { if (node.nodeType===1) scan(node); }); });
      }).observe(document.documentElement,{childList:true,subtree:true});
    },
    enhance: function (original) {
      if (!original || original.dataset.jalaliEnhanced==='1' || original.type==='hidden') return;
      const originalType=original.type;
      original.dataset.jalaliOriginalType=originalType;
      if (originalType!=='date' && originalType!=='datetime-local' && !original.hasAttribute('data-jalali-date') && !original.classList.contains('date-input') && !original.classList.contains('date-picker')) return;
      original.dataset.jalaliEnhanced='1';
      const self=this, id=original.id || ('pms-date-'+Math.random().toString(36).slice(2,9));
      if (!original.id) original.id=id;
      const visible=document.createElement('input');
      visible.type='text'; visible.className='pms-jalali-date-input';
      visible.id=id+'-jalali'; visible.autocomplete='off'; visible.inputMode='numeric';
      visible.placeholder='۱۴۰۵/۰۸/۰۵'; visible.setAttribute('aria-label','تاریخ شمسی');
      visible.setAttribute('aria-haspopup','dialog'); visible.setAttribute('aria-expanded','false');
      visible.dataset.jalaliFor=id;
      visible.required=original.required;
      const minValue=original.getAttribute('min') || '';
      const maxValue=original.getAttribute('max') || '';
      if (minValue) { visible.dataset.minIso=minValue.slice(0,10); visible.dataset.minValue=minValue; }
      if (maxValue) { visible.dataset.maxIso=maxValue.slice(0,10); visible.dataset.maxValue=maxValue; }
      visible.disabled=original.disabled;
      visible.readOnly=original.readOnly;
      visible.title='تاریخ شمسی (سال/ماه/روز)';
      original.required=false;
      original.type='hidden';
      original.removeAttribute('min'); original.removeAttribute('max');
      original.classList.add('pms-date-iso-value');
      original.insertAdjacentElement('beforebegin',visible);
      document.querySelectorAll('label[for="'+CSS.escape(id)+'"]').forEach(function(label){label.htmlFor=visible.id;});
      if (original.value) { const isoDate=self.parseISO(original.value); if(isoDate){ visible.value=self.toFa(self.toJalali(isoDate))+(originalType==='datetime-local'?' '+String(original.value).slice(11,16):''); } else { const converted=self.fromJalali(original.value); if(converted){ original.value=converted; visible.value=self.toFa(self.toJalali(self.parseISO(converted))); } else { visible.value=original.value; } } }
      const wrap=document.createElement('span'); wrap.className='pms-jalali-date-wrap';
      visible.parentNode.insertBefore(wrap,visible); wrap.appendChild(visible); wrap.appendChild(original);
      const trigger=document.createElement('button'); trigger.type='button'; trigger.className='pms-jalali-calendar-trigger'; trigger.textContent='▦'; trigger.title='انتخاب از تقویم شمسی'; trigger.setAttribute('aria-label','باز کردن تقویم شمسی'); trigger.disabled=original.disabled || original.readOnly; wrap.appendChild(trigger);
      const pop=document.createElement('div'); pop.className='pms-jalali-calendar'; pop.hidden=true; pop.setAttribute('role','dialog'); pop.setAttribute('aria-label','تقویم شمسی'); wrap.appendChild(pop);
      let viewYear=1405, viewMonth=1, draftISO='', draftTime='09:00', pickerMode='date';
      function updateFromISO() {
        const value=String(original.value||'');
        const d=self.parseISO(value);
        draftISO=d?value.slice(0,10):'';
        if(originalType==='datetime-local') draftTime=/^\d{2}:\d{2}$/.test(value.slice(11,16))?value.slice(11,16):'09:00';
        visible.value=d?self.toFa(self.toJalali(d))+(originalType==='datetime-local'?' '+draftTime:''):'';
      }
      function dateWithinBounds(iso) {
        if (!iso) return true;
        const min=visible.dataset.minIso || '';
        const max=visible.dataset.maxIso || '';
        return (!min || iso >= min) && (!max || iso <= max);
      }
      function withinBounds(iso,time) {
        if (!iso || !dateWithinBounds(iso)) return !iso;
        if(originalType!=='datetime-local') return true;
        const value=iso+'T'+(time || '09:00');
        const min=visible.dataset.minValue || '';
        const max=visible.dataset.maxValue || '';
        const minValue=min ? (min.length===10?min+'T00:00':min.slice(0,16)) : '';
        const maxValue=max ? (max.length===10?max+'T23:59':max.slice(0,16)) : '';
        return (!minValue || value>=minValue) && (!maxValue || value<=maxValue);
      }
      function setValue(iso, display, timeOverride) {
        const timePart=originalType==='datetime-local' ? (timeOverride || (String(visible.value||'').match(/(?:^|\s)(\d{1,2}:\d{2})$/)||[])[1] || draftTime || '09:00') : '';
        if (iso && !withinBounds(iso,timePart)) {
          visible.setCustomValidity('تاریخ و ساعت باید در محدوده مجاز باشد.');
          return;
        }
        visible.setCustomValidity('');
        original.value=iso ? (originalType==='datetime-local' ? iso+'T'+timePart : iso) : '';
        draftISO=iso || '';
        if(originalType==='datetime-local' && iso) draftTime=timePart;
        visible.value=display || (iso ? self.toFa(self.toJalali(self.parseISO(iso)))+(originalType==='datetime-local'?' '+timePart:'') : '');
        original.dispatchEvent(new Event('input',{bubbles:true}));
        original.dispatchEvent(new Event('change',{bubbles:true}));
        visible.dispatchEvent(new Event('change',{bubbles:true}));
        render(); close();
      }
      function isMobileCalendar(){return !!(window.matchMedia && window.matchMedia('(max-width: 480px)').matches);}
      function close(){
        pop.hidden=true;
        visible.setAttribute('aria-expanded','false');
        if(pop.parentNode===document.body) wrap.appendChild(pop);
        pop.style.removeProperty('position');
        pop.style.removeProperty('transform');
        pop.style.removeProperty('top');
        pop.style.removeProperty('left');
        pop.style.removeProperty('right');
        pop.style.removeProperty('inset-inline-start');
        pop.style.removeProperty('width');
        pop.style.removeProperty('max-height');
        pop.style.removeProperty('overflow-y');
      }
      function renderTimePicker() {
        const hourOptions=Array.from({length:24},function(_,i){const v=String(i).padStart(2,'0');return '<option value="'+v+'"'+(draftTime.slice(0,2)===v?' selected':'')+'>'+self.toFa(v)+'</option>';}).join('');
        const minuteOptions=Array.from({length:60},function(_,i){const v=String(i).padStart(2,'0');return '<option value="'+v+'"'+(draftTime.slice(3,5)===v?' selected':'')+'>'+self.toFa(v)+'</option>';}).join('');
        const date=self.parseISO(draftISO);
        const jalali=date?self.toFa(self.toJalali(date)):'—';
        pop.innerHTML='<div class="pms-jalali-time-head"><strong>انتخاب ساعت</strong><span>'+jalali+'</span></div><div class="pms-jalali-time-picker" aria-label="انتخاب ساعت"><label>ساعت<select data-time="hour"'+(original.disabled||original.readOnly?' disabled':'')+'>'+hourOptions+'</select></label><span class="pms-jalali-time-separator">:</span><label>دقیقه<select data-time="minute"'+(original.disabled||original.readOnly?' disabled':'')+'>'+minuteOptions+'</select></label></div><div class="pms-jalali-cal-footer"><button type="button" data-cal="back-date">بازگشت به تاریخ</button><button type="button" data-cal="confirm" class="pms-jalali-cal-confirm">تأیید ساعت</button></div>';
      }
      function render() {
        if(originalType==='datetime-local' && pickerMode==='time'){renderTimePicker();return;}
        const today=self.localDateParts(new Date());
        let html='<div class="pms-jalali-cal-head"><button type="button" data-cal="prev" aria-label="ماه قبل">‹</button><strong>'+self.months[viewMonth-1]+' '+self.toFa(viewYear)+'</strong><button type="button" data-cal="next" aria-label="ماه بعد">›</button></div><div class="pms-jalali-cal-grid pms-jalali-weekdays">'+self.weekdays.map(function(x){return '<span>'+x+'</span>';}).join('')+'</div><div class="pms-jalali-cal-grid">';
        const firstISO=self.fromJalali(viewYear+'/'+viewMonth+'/01');
        if (!firstISO) { pop.innerHTML=''; return; }
        const first=new Date(self.parseISO(firstISO).getTime());
        const offset=(first.getUTCDay()+1)%7;
        for(let i=0;i<offset;i++) html+='<span class="pms-jalali-cal-empty"></span>';
        const days=viewMonth<=6?31:(viewMonth<=11?30:(self.fromJalali(viewYear+'/12/30')?30:29));
        for(let day=1;day<=days;day++){
          const iso=self.fromJalali(viewYear+'/'+viewMonth+'/'+day);
          const selected=iso && iso===(originalType==='datetime-local'?(draftISO || String(original.value||'').slice(0,10)):original.value);
          const isToday=today.year===viewYear&&today.month===viewMonth&&today.day===day;
          const inRange=dateWithinBounds(iso);
          html+='<button type="button" class="pms-jalali-day'+(selected?' is-selected':'')+(isToday?' is-today':'')+(!inRange?' is-out-of-range':'')+'" data-day="'+day+'"'+(!inRange?' disabled aria-disabled="true"':'')+'>'+self.toFa(day)+'</button>';
        }
        html+='</div>';
        html+='<div class="pms-jalali-cal-footer"><button type="button" data-cal="today">امروز</button><button type="button" data-cal="clear">پاک کردن</button></div>';
        pop.innerHTML=html;
      }
      function open() {
        if(original.disabled || original.readOnly) return;
        pickerMode='date';
        const dateText=String(visible.value||'').replace(/\s+\d{1,2}:\d{2}$/,'');
        const parsed=self.parseJalali(dateText);
        const storedDate=self.parseISO(String(original.value||'').slice(0,10));
        const now=self.localDateParts(new Date());
        const parts=parsed?parsed.parts:(storedDate?self.parts(storedDate):now);
        draftISO=parsed?parsed.iso:(storedDate?String(original.value).slice(0,10):self.fromJalali(parts.year+'/'+parts.month+'/'+parts.day));
        if(originalType==='datetime-local'){
          const displayTime=(String(visible.value||'').match(/(\d{1,2}:\d{2})$/)||[])[1];
          draftTime=/^\d{2}:\d{2}$/.test(String(original.value||'').slice(11,16))?String(original.value).slice(11,16):(displayTime||'09:00');
        }
        viewYear=parts.year; viewMonth=parts.month;
        render();
        if(isMobileCalendar()){
          if(pop.parentNode!==document.body) document.body.appendChild(pop);
          pop.hidden=false;
          // Force viewport coordinates so RTL logical insets and application layout
          // rules cannot move the popup outside the screen.
          const margin=12;
          const vw=Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
          const vh=Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0);
          pop.style.setProperty('position','fixed','important');
          pop.style.setProperty('inset','auto','important');
          pop.style.setProperty('right','auto','important');
          pop.style.setProperty('inset-inline-start','auto','important');
          pop.style.setProperty('transform','none','important');
          pop.style.setProperty('width','min(320px, calc(100vw - 24px))','important');
          pop.style.setProperty('max-width','calc(100vw - 24px)','important');
          pop.style.setProperty('max-height','calc(100dvh - 24px)','important');
          pop.style.setProperty('overflow-y','auto','important');
          pop.style.setProperty('left',margin+'px','important');
          pop.style.setProperty('top',margin+'px','important');
          const anchor=trigger.getBoundingClientRect();
          const rect=pop.getBoundingClientRect();
          const left=Math.max(margin,Math.min(anchor.left,vw-rect.width-margin));
          let top=anchor.bottom+8;
          if(top+rect.height>vh-margin) top=anchor.top-rect.height-8;
          top=Math.max(margin,Math.min(top,vh-rect.height-margin));
          pop.style.setProperty('left',Math.round(left)+'px','important');
          pop.style.setProperty('top',Math.round(top)+'px','important');
        } else {
          if(pop.parentNode!==wrap) wrap.appendChild(pop);
          pop.style.removeProperty('position');
          pop.style.removeProperty('transform');
          pop.style.removeProperty('top');
          pop.style.removeProperty('left');
          pop.style.removeProperty('right');
          pop.style.removeProperty('inset-inline-start');
          pop.style.removeProperty('width');
          pop.style.removeProperty('max-height');
          pop.style.removeProperty('overflow-y');
          pop.hidden=false;
        }
        visible.setAttribute('aria-expanded','true');
      }
      visible.addEventListener('focus',function(){});
      visible.addEventListener('blur',function(){
        if(!pop.hidden) return;
        const val=visible.value.trim();
        if(!val){ if(original.value) setValue('',''); return; }
        const dateText=originalType==='datetime-local'?val.replace(/\s+\d{1,2}:\d{2}$/,''):val;
        const timeMatch=originalType==='datetime-local'?val.match(/(\d{1,2}:\d{2})$/):null;
        const iso=self.fromJalali(dateText);
        if(iso && (originalType!=='datetime-local' || (timeMatch && /^([01]?\d|2[0-3]):[0-5]\d$/.test(timeMatch[1])))){ if(withinBounds(iso)){setValue(iso); visible.setCustomValidity('');} else {visible.setCustomValidity('تاریخ باید در محدوده مجاز باشد.');} }
        else visible.setCustomValidity('تاریخ شمسی معتبر وارد کنید؛ نمونه: ۱۴۰۵/۰۸/۰۵');
      });
      visible.addEventListener('input',function(){visible.setCustomValidity('');});
      visible.addEventListener('keydown',function(e){if(e.key==='ArrowDown'||e.key==='Enter'){e.preventDefault();open();}if(e.key==='Escape')close();});
      trigger.addEventListener('click',function(){if(pop.hidden)open();else close();});
      pop.addEventListener('click',function(e){
        const btn=e.target.closest('button'); if(!btn)return;
        const action=btn.dataset.cal;
        if(action==='prev'||action==='next'){
          viewMonth+=action==='prev'?-1:1;
          if(viewMonth<1){viewMonth=12;viewYear--;} if(viewMonth>12){viewMonth=1;viewYear++;}
          render();return;
        }
        if(action==='today'){
          const p=self.localDateParts(new Date());
          const todayISO=self.fromJalali(p.year+'/'+p.month+'/'+p.day);
          if(originalType==='datetime-local'){draftISO=todayISO;pickerMode='time';Promise.resolve().then(render);}
          else setValue(todayISO);
          return;
        }
        if(action==='clear'){setValue('','');return;}
        if(action==='back-date'){pickerMode='date';render();return;}
        if(action==='confirm'){
          if(!draftISO){visible.setCustomValidity('ابتدا یک تاریخ انتخاب کنید.');return;}
          setValue(draftISO,'',draftTime);
          return;
        }
        if(btn.dataset.day){
          const selectedISO=self.fromJalali(viewYear+'/'+viewMonth+'/'+btn.dataset.day);
          if(originalType==='datetime-local'){draftISO=selectedISO;pickerMode='time';Promise.resolve().then(render);}
          else setValue(selectedISO);
        }
      });
      pop.addEventListener('change',function(e){
        const control=e.target.closest('select[data-time]');
        if(!control)return;
        const hour=pop.querySelector('select[data-time="hour"]');
        const minute=pop.querySelector('select[data-time="minute"]');
        if(hour&&minute) draftTime=hour.value+':'+minute.value;
      });
      document.addEventListener('click',function(e){
        // On mobile the popup is portaled to body. A day click re-renders pop.innerHTML,
        // detaching the clicked button before this document listener runs. Use the
        // original event path so an internal popup click is never mistaken for outside.
        const path=typeof e.composedPath==='function'?e.composedPath():[];
        const clickedInsidePopup=path.indexOf(pop)!==-1 || pop.contains(e.target);
        if(!wrap.contains(e.target)&&!clickedInsidePopup)close();
      });
      window.addEventListener('resize',function(){if(!pop.hidden){if(isMobileCalendar()&&pop.parentNode!==document.body){open();}else if(!isMobileCalendar()&&pop.parentNode===document.body){close();open();}}});
      original.addEventListener('change',updateFromISO);
      if(original.form) original.form.addEventListener('reset',function(){setTimeout(function(){updateFromISO();render();},0);});
      render();
    }
  };
  window.PMS.JalaliCalendar=JalaliCalendar;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){JalaliCalendar.init();});
  else JalaliCalendar.init();
})();