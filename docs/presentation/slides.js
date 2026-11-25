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
function metricCell(row, rtfValue, maxScale) {
  const cell = row.insertCell();
  if (rtfValue === undefined || rtfValue === null || rtfValue === '') {
    cell.textContent = '—';
    cell.style.textAlign = 'right';
    return cell;
  }
  const val = Number(rtfValue);
  cell.className = 'metric';
  cell.style.setProperty('--length', Math.min(100, 100 * val / maxScale) + '%');
  if (val >= 1) cell.classList.add('over');
  cell.textContent = val.toFixed(6);
  return cell;
}

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

// ---------- 性能页 1：全部 RTF（支持 2 线程 / 12 线程 / 跨线程全景 3 个视图切换） ----------
function findPerf(batchGroup, model, mode, indexRate, chunkFactor) {
  return records.perf.find(r =>
    r.batch_group === batchGroup &&
    r.model === model &&
    r.mode === mode &&
    Number(r.index_rate) === Number(indexRate) &&
    (chunkFactor === undefined ? true : String(r.chunk_factor) === String(chunkFactor))
  );
}

const speedViews = [
  {
    id: 'th2',
    label: '2 线程 · 端侧受限基准（23 组）',
    caption: '2026-11-24～25 实测，v0.2.2，Windows 11 CPU，PyTorch 2.5.1，显式 --torch-threads 2。LLVC 同时测 cf=1（13 ms）与 cf=4（52 ms），含评估期无损缓存；RVC 与 QuickVC 推理代码零改动。每组 6 段 16 kHz 音频，共 382.189 s（RVC/QuickVC 流式有效 381.900 s）。',
    render(table) {
      tableHeader(table, ['算法归属','模型 / 编号','配置（块长 / 索引）','流式 RTF','非流式 RTF','流式 / 非流式']);
      const body = table.createTBody();
      const streams = records.perf.filter(r => r.batch_group === '2026-11-25_th2' && r.mode === 'stream');
      for (const s of streams) {
        const n = findPerf('2026-11-25_th2', s.model, 'non-stream', s.index_rate);
        const row = body.insertRow();
        const cfg = s.algorithm === 'llvc'
          ? `cf=${s.chunk_factor}（${Number(s.chunk_ms)} ms）`
          : (s.algorithm === 'llvc/rvc' ? `100 ms · idx=${Number(s.index_rate)}` : '100 ms');
        cells(row, [s.algorithm, s.model + ' · ' + records.models[s.model].vc, cfg]);
        metricCell(row, s.rtf, 4.4);
        metricCell(row, n.rtf, 4.4);
        const ratio = row.insertCell();
        ratio.style.textAlign = 'right';
        ratio.textContent = (Number(s.rtf) / Number(n.rtf)).toFixed(2) + '×';
      }
    }
  },
  {
    id: 'th12',
    label: '12 线程 · 默认满核基准（20 组）',
    caption: '2026-11-19～20 实测，v0.1.23，Windows 11 CPU，PyTorch 2.5.1，默认 torch_threads=12。LLVC 固定 cf=1（13 ms），RVC 与 QuickVC 为 100 ms 窗口。计时包含必要预处理、特征/F0 提取、检索、合成与后处理，排除模型加载与文件读写。',
    render(table) {
      tableHeader(table, ['算法归属','模型 / 编号','配置（块长 / 索引）','流式 RTF','非流式 RTF','流式 / 非流式']);
      const body = table.createTBody();
      const streams = records.perf.filter(r => r.batch_group === '2026-11-20_th12' && r.mode === 'stream');
      for (const s of streams) {
        const n = findPerf('2026-11-20_th12', s.model, 'non-stream', s.index_rate);
        const row = body.insertRow();
        const cfg = s.algorithm === 'llvc'
          ? 'cf=1（13 ms）'
          : (s.algorithm === 'llvc/rvc' ? `100 ms · idx=${Number(s.index_rate)}` : '100 ms');
        cells(row, [s.algorithm, s.model + ' · ' + records.models[s.model].vc, cfg]);
        metricCell(row, s.rtf, 4.4);
        metricCell(row, n.rtf, 4.4);
        const ratio = row.insertCell();
        ratio.style.textAlign = 'right';
        ratio.textContent = (Number(s.rtf) / Number(n.rtf)).toFixed(2) + '×';
      }
    }
  },
  {
    id: 'compare',
    label: '12 vs 2 线程全景对比（43 组）',
    caption: '两阶段全部 43 组数据并列对照：非流式对多核高度敏感（12→2 线程普遍升 1.6–4.1×）；流式下 QuickVC 由实时转为积压，RVC 稳态音色几乎持平（串行受限），唯独 LLVC 凭 cf=4（52 ms）在 2 线程下反超 12 线程 cf=1。',
    render(table) {
      tableHeader(table, ['算法归属','模型 / 索引','非流式 (12线程)','非流式 (2线程)','流式默认块 (12线程)','流式默认块 (2线程)','LLVC cf=4 (2线程)']);
      const body = table.createTBody();
      const baseLines = records.perf.filter(r => r.batch_group === '2026-11-20_th12' && r.mode === 'stream');
      for (const s12 of baseLines) {
        const n12 = findPerf('2026-11-20_th12', s12.model, 'non-stream', s12.index_rate);
        const n2 = findPerf('2026-11-25_th2', s12.model, 'non-stream', s12.index_rate);
        const s2 = findPerf('2026-11-25_th2', s12.model, 'stream', s12.index_rate, s12.algorithm === 'llvc' ? '1' : '');
        const s2cf4 = s12.algorithm === 'llvc' ? findPerf('2026-11-25_th2', s12.model, 'stream', '0.0', '4') : null;
        const row = body.insertRow();
        const name = s12.algorithm === 'llvc/rvc'
          ? `${s12.model} · idx=${Number(s12.index_rate)}`
          : `${s12.model} · ${records.models[s12.model].vc}`;
        cells(row, [s12.algorithm, name]);
        metricCell(row, n12.rtf, 4.4);
        metricCell(row, n2.rtf, 4.4);
        metricCell(row, s12.rtf, 4.4);
        metricCell(row, s2.rtf, 4.4);
        metricCell(row, s2cf4 ? s2cf4.rtf : '', 4.4);
      }
    }
  }
];

const speedTabs = $('speed-tabs'), perfTable = $('rtf'), speedCaption = $('speed-caption');
function renderSpeed(viewId) {
  const view = speedViews.find(v => v.id === viewId) || speedViews[0];
  perfTable.replaceChildren();
  view.render(perfTable);
  speedCaption.textContent = view.caption;
  for (const btn of speedTabs.children) {
    btn.setAttribute('aria-pressed', String(btn.dataset.view === view.id));
  }
}
for (const view of speedViews) {
  const btn = el('button', view.label);
  btn.dataset.view = view.id;
  btn.onclick = () => renderSpeed(view.id);
  speedTabs.append(btn);
}
renderSpeed('th2');

// ---------- 性能页 2：LLVC 块长与线程权衡专题 ----------
const llvcTable = $('llvc-table');
tableHeader(llvcTable, ['模型','条件（线程 · 块长）','均块耗时','块内余量','整体 RTF','完成即发送 / 边界','较 2 线程 cf=1']);
const llvcBody = llvcTable.createTBody();
for (const modelName of ['llvc', 'llvc-hfg', 'llvc-nc']) {
  const r12 = findPerf('2026-11-20_th12', modelName, 'stream', 0, '1');
  const r2c1 = findPerf('2026-11-25_th2', modelName, 'stream', 0, '1');
  const r2c4 = findPerf('2026-11-25_th2', modelName, 'stream', 0, '4');
  const rowsData = [
    {label: '12 线程 · cf=1（13 ms）', rec: r12, note: '旧基准'},
    {label: '2 线程 · cf=1（13 ms）', rec: r2c1, note: '基准 1.00×'},
    {label: '2 线程 · cf=4（52 ms）', rec: r2c4, note: (Number(r2c1.rtf) / Number(r2c4.rtf)).toFixed(2) + '× 提速'},
  ];
  for (const item of rowsData) {
    const rec = item.rec, row = llvcBody.insertRow();
    const chunkMs = Number(rec.chunk_ms), meanMs = Number(rec.mean_block_ms);
    const margin = chunkMs - meanMs;
    const sched = rec.immediate_ms
      ? `${Number(rec.immediate_ms).toFixed(1)} / ${Number(rec.boundary_ms).toFixed(0)} ms`
      : '积压，不估算';
    cells(row, [
      modelName + ' · ' + records.models[modelName].vc,
      item.label,
      meanMs.toFixed(3) + ' ms',
      (margin >= 0 ? '+' : '') + margin.toFixed(3) + ' ms',
    ]);
    metricCell(row, rec.rtf, 1.2);
    cells(row, [sched, item.note]);
  }
}

// ---------- 性能页 3：关键流式点位的分块与延迟参考表 ----------
const cadenceTable = $('cadence-table');
tableHeader(cadenceTable, ['算法 / 模型','线程','新增块 / 历史','整块均值','整体 RTF','完成即发送 / 边界']);
const cadenceBody = cadenceTable.createTBody();
const cadenceItems = [
  findPerf('2026-11-25_th2', 'llvc-nc', 'stream', 0, '4'),
  findPerf('2026-11-25_th2', 'llvc-hfg', 'stream', 0, '4'),
  findPerf('2026-11-25_th2', 'llvc', 'stream', 0, '4'),
  findPerf('2026-11-20_th12', 'llvc', 'stream', 0, '1'),
  findPerf('2026-11-25_th2', 'llvc', 'stream', 0, '1'),
  findPerf('2026-11-20_th12', 'quickvc', 'stream', 0, ''),
  findPerf('2026-11-25_th2', 'quickvc', 'stream', 0, ''),
  findPerf('2026-11-20_th12', 'rvc-no-f0', 'stream', 0, ''),
  findPerf('2026-11-25_th2', 'guanguanV1', 'stream', 0, ''),
  findPerf('2026-11-25_th2', 'zhanzhanv2-xi', 'stream', 0.75, ''),
];
for (const rec of cadenceItems) {
  const row = cadenceBody.insertRow();
  const tag = rec.algorithm === 'llvc'
    ? `${rec.model} (cf=${rec.chunk_factor})`
    : (rec.algorithm === 'llvc/rvc' ? `${rec.model} (idx=${Number(rec.index_rate)})` : rec.model);
  const sched = rec.immediate_ms
    ? `${Number(rec.immediate_ms).toFixed(1)} / ${Number(rec.boundary_ms).toFixed(0)} ms`
    : '积压，不估算';
  cells(row, [
    `${rec.algorithm} · ${tag}`,
    rec.torch_threads + ' 线程',
    `${Number(rec.chunk_ms)} ms / ${Number(rec.history_ms)} ms`,
    Number(rec.mean_block_ms).toFixed(2) + ' ms',
  ]);
  metricCell(row, rec.rtf, 4.4);
  cells(row, [sched]);
}

// ---------- 音频播放器与试听实验页（保持原逻辑不变） ----------
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
for(const [idx, lab] of records.cases.entries()){
  const page=el('section');page.id=lab.id;page.dataset.title=lab.nav;page.hidden=true;
  if(idx===0) page.dataset.group='成对试听';
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
pages.forEach(page=>{
  if(page.dataset.group)$('menu').append(el('h3',page.dataset.group));
  const link=el('a',page.dataset.title);link.href='#'+page.id;$('menu').append(link);
});
function show() {
  stop();current=Math.max(0,pages.findIndex(p=>p.id===location.hash.slice(1)));
  pages.forEach((p,i)=>p.hidden=i!==current);
  [...$('menu').querySelectorAll('a')].forEach((a,i)=>{if(i===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('dock').hidden=!pages[current].closest('#experiments');
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
