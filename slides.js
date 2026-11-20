"use strict";
const $ = id => document.getElementById(id);
function el(tag, text, cls) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}
function family(m) {return m.family === 'llvc' ? 'llvc' : 'llvc/' + m.family;}
function target(m) {return {m:'男声目标', f:'女声目标'}[m.target] || '目标未标注';}
function tableHeader(table, labels) {
  const row = table.createTHead().insertRow();
  for (const label of labels) row.append(el('th', label));
}
function cells(row, values) {for (const value of values) row.insertCell().textContent = value;}
const catalog = $('catalog');
tableHeader(catalog, ['算法归属','转换模型','权重 / 文件','内容与 F0','目标']);
const catalogBody = catalog.createTBody();
for (const [name, m] of Object.entries(records.models).sort((a,b)=>Number(a[1].vc.slice(7))-Number(b[1].vc.slice(7)))) {
  const row = catalogBody.insertRow();
  cells(row, [family(m), m.vc]);
  const file = row.insertCell();
  file.append(el('strong',name),el('small',m.file));
  cells(row,[m.c+' · '+m.f,target(m)]);
}
const perf = $('rtf');
tableHeader(perf,['算法归属','模型 / 编号','索引比例','流式 RTF','非流式 RTF']);
const tbody = perf.createTBody();
for (const s of records.perf.filter(r=>r.mode === 'stream')) {
  const n = records.perf.find(r=>r.model === s.model && r.index_rate === s.index_rate && r.mode === 'non-stream');
  const row = tbody.insertRow();
  cells(row,[s.algorithm,s.model+' · '+records.models[s.model].vc,s.algorithm==='llvc/rvc'?Number(s.index_rate):'—']);
  for (const data of [s,n]) {
    const cell = row.insertCell();
    cell.className='metric';
    cell.style.setProperty('--length',100*Number(data.rtf)/3.3+'%');
    if(Number(data.rtf)>=1) cell.classList.add('over');
    cell.textContent = Number(data.rtf).toFixed(6);
  }
}
const player=$('player'), trackName=$('track-name');
let active=null, activeInput='', current=0;
function mark() {
  if (!active) return;
  active.classList.toggle('playing', !player.paused);
  active.setAttribute('aria-pressed',String(!player.paused));
}
function stop() {
  player.pause();
  if(active){active.classList.remove('playing');active.setAttribute('aria-pressed','false');}
  active=null;activeInput='';
  player.removeAttribute('src');player.load();
  trackName.textContent='尚未选择';
}
function soundButton(text,input,src,description) {
  const btn=el('button',text,'sound');
  btn.setAttribute('aria-label',description); btn.title=description; btn.setAttribute('aria-pressed','false');
  btn.dataset.src=src;
  btn.onclick=async ()=>{
    try {
      if(active===btn && !player.paused){player.pause();return;}
      if(active!==btn){
        // 仅同一原句的不同转换结果才能按播放时间配对。
        const seek=$('sync').checked && activeInput===input && !player.ended ? player.currentTime : 0;
        stop();
        active=btn; activeInput=input; trackName.textContent=description;
        player.src=src;
        if(seek>0)player.currentTime=seek;
      }
      await player.play();
      mark();
    } catch(error){if(active===btn && error.name!=='AbortError')trackName.textContent='播放失败，请检查音频文件：'+src;}
  };
  return btn;
}
for(const event of ['play','pause','ended'])player.addEventListener(event,mark);

function renderMatrix(container, lab, group) {
  const names=records.pairs[group];
  const table=el('table',undefined,'matrix');
  const header=table.createTHead().insertRow();
  header.append(el('th','配置 / 目标'));
  names.forEach((name,i)=>{
    const th=el('th');
    th.append(el('small',i?'男声输入':'女声输入'),el('strong',name),soundButton('原音',name,records.inputs[name],name+' · 原音'));
    header.append(th);
  });
  const body=table.createTBody();
  for(const cfg of lab.rows){
    const m=records.models[cfg.model], row=body.insertRow();
    const label=el('th');label.scope='row';
    label.append(el('small',family(m)+' · '+m.vc),el('strong',cfg.model),el('small',m.f+' · '+target(m)+(m.family==='rvc'?' · 索引 '+cfg.index:'')));
    row.append(label);
    names.forEach(name=>{
      const cell=row.insertCell(), pair=el('div',undefined,'pair');
      let rec;
      for(const [mode,text] of [[1,'流式'],[0,'非流式']]){
        rec=records.tracks[[name,cfg.model,cfg.index,mode].join('|')];
        const description=[name,cfg.model,text,...(m.family==='rvc'?['索引 '+cfg.index]:[])].join(' · ');
        pair.append(soundButton(text,name,rec.src,description));
      }
      const pitch=rec.pitch===''?'':(' · '+(Number(rec.pitch)>0?'+':'')+rec.pitch+' 半音');
      cell.append(pair,el('small',rec.hz/1000+' kHz'+pitch));
    });
  }
  container.replaceChildren(table);
}
for(const lab of records.cases){
  const page=el('section');page.id=lab.id;page.dataset.title=lab.nav;page.hidden=true;
  page.append(el('p','试听对照','eyebrow'),el('h1',lab.title),el('p',lab.design,'intro'));
  const tabs=el('div',undefined,'tabs'), matrix=el('div',undefined,'overflow');
  for(const group of lab.groups){
    const btn=el('button',group);
    btn.setAttribute('aria-pressed',String(group===lab.groups[0]));
    btn.onclick=()=>{
      if(btn.getAttribute('aria-pressed')==='true')return;
      stop();for(const sibling of tabs.children)sibling.setAttribute('aria-pressed',String(sibling===btn));
      renderMatrix(matrix,lab,group);
    };
    tabs.append(btn);
  }
  renderMatrix(matrix,lab,lab.groups[0]);
  page.append(tabs,matrix,el('p',lab.listen,'caption'));
  $('experiments').append(page);
}
const pages=[...document.querySelectorAll('main section')];
pages.forEach((page,i)=>{
  const label={0:'项目简介',2:'性能测量',4:'成对试听'}[i];
  if(label)$('menu').append(el('h3',label));
  const link=el('a',page.dataset.title);link.href='#'+page.id;$('menu').append(link);
});
function show() {
  stop();current=Math.max(0,pages.findIndex(p=>p.id===location.hash.slice(1)));
  pages.forEach((p,i)=>p.hidden=i!==current);
  [...$('menu').querySelectorAll('a')].forEach((a,i)=>{if(i===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('dock').hidden=current<4;
  $('page-count').textContent=(current+1)+' / '+pages.length;
  $('prev').disabled=current===0;$('next').disabled=current===pages.length-1;
  window.scrollTo(0,0);
}
function turn(step){if(pages[current+step])location.hash=pages[current+step].id;}
$('prev').onclick=()=>turn(-1);$('next').onclick=()=>turn(1);
window.addEventListener('hashchange',show);
window.addEventListener('keydown',e=>{
  if(e.target.closest('audio,input')||e.altKey||e.metaKey||e.ctrlKey)return;
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();turn(e.key==='ArrowRight'?1:-1);}
});
show();
