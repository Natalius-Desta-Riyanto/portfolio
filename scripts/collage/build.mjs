import {chromium} from '@playwright/test';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {writeFile} from 'node:fs/promises';
import sharp from 'sharp';

// Each collage owns its layout: frames are absolutely placed on a 1280×720 canvas.
// Shot crops are in source CSS pixels (captures are 1440px wide).
const raw=n=>pathToFileURL(resolve('scripts/collage/raw',`${n}.png`)).href;
const SHOT_W=1440;

const collages=[
 {
  file:'padun-collage',
  theme:{bg:'radial-gradient(120% 90% at 0% 0%,#f7e6cf 0%,rgba(247,230,207,0) 55%),radial-gradient(90% 90% at 100% 100%,#b9dfe5 0%,rgba(185,223,229,0) 60%),#e9f1ee',ink:'#123f47',muted:'#3f6a70',pill:'#174f58',pillInk:'#fff',accent:'#1f6670',titleFont:'"Iowan Old Style","Palatino","Georgia",serif',titleWeight:500,grid:'rgba(18,63,71,.035)'},
  kicker:'Reconciliation workspace',
  title:['Padun'],
  tagline:['Ledger and bank,','reconciled with an','independent review.'],
  flow:['Import','Match','Review'],
  badge:'Synthetic showcase',
  stat:[{value:'±3 days',label:'Exact, one-to-one matching window'}],
  footer:'Screenshots from the live demo · Synthetic records',
  layout:`
   h1{left:44px;top:78px;font-size:76px}
   .tagline{left:48px;top:184px}
   .flow{left:48px;top:300px}
   .stats{left:48px;top:520px;width:330px}
   .badge{left:48px;top:400px;right:auto}`,
  frames:[
   {shot:'padun-batches',label:'Reconciliation register',x:420,y:44,w:660,h:380,rotate:-2},
   {shot:'padun-exceptions',label:'Exceptions to investigate',x:840,y:250,w:400,h:260,rotate:3,zoom:1.35,sx:250,sy:150},
   {shot:'padun-batch',label:'Batch overview',x:540,y:440,w:440,h:210,rotate:-1,zoom:1.2,sx:240,sy:150,labelSide:'bottom'},
  ],
 },
 {
  file:'lendsight-collage',
  theme:{bg:'radial-gradient(70% 60% at 50% 0%,#24496a 0%,rgba(36,73,106,0) 70%),linear-gradient(160deg,#18354a 0%,#10212f 100%)',ink:'#ffffff',muted:'#b7c6d2',pill:'#f0b35b',pillInk:'#1b2a36',accent:'#f0b35b',titleFont:'-apple-system,"Helvetica Neue",Arial,sans-serif',titleWeight:700,grid:'rgba(255,255,255,.04)',chipBorder:'rgba(255,255,255,.45)'},
  kicker:'Portfolio intelligence',
  title:['LendSight'],
  tagline:['Evidence before conclusions.'],
  flow:['Ingest','SQL marts','Dashboard'],
  badge:'Observed + simulated data',
  stat:[{value:'US$302.6 bn',label:'Outstanding · World Bank IBRD'}],
  footer:'Screenshots from the live demo · World Bank IBRD data (CC BY 4.0)',
  layout:`
   .kicker{left:0;right:0;top:40px;text-align:center}
   h1{left:0;right:0;top:66px;text-align:center;font-size:68px}
   .tagline{left:0;right:0;top:146px;text-align:center;font-size:24px}
   .flow{left:0;right:0;top:192px;justify-content:center}
   .stats{left:48px;top:96px;width:230px}
   .stats strong{font-size:30px}`,
  frames:[
   {shot:'lendsight-overview',label:'Portfolio overview',x:250,y:262,w:780,h:400},
   {shot:'lendsight-vintage',label:'Vintage cohorts',x:36,y:350,w:340,h:226,rotate:-5,zoom:1.6,sx:255,sy:296},
   {shot:'lendsight-findings',label:'Findings with evidence',x:900,y:300,w:340,h:226,rotate:4,zoom:1.3,sx:250,sy:160},
  ],
 },
 {
  file:'risk-collage',
  theme:{bg:'#f3f1ea',ink:'#161c14',muted:'#55604f',pill:'#161c14',pillInk:'#fff',accent:'#b7ec5f',titleFont:'-apple-system,"Helvetica Neue",Arial,sans-serif',titleWeight:800,grid:'rgba(22,28,20,.035)',titleTracking:'-.04em'},
  kicker:'Consumer lending · Case study',
  title:['Credit Risk','Analytics'],
  tagline:['Lending risk, without losing','sight of opportunity.'],
  flow:['Clean','Segment','Explain'],
  badge:'Descriptive case study',
  stat:[{value:'307,511',label:'Current applications'},{value:'8.1%',label:'Payment difficulty'}],
  footer:'Screenshots from the live dashboard · Historical lending data',
  layout:`
   h1{left:42px;top:84px;font-size:84px;line-height:.92}
   .tagline{left:48px;top:268px;font-size:22px}
   .flow{left:48px;top:344px}
   .stats{left:48px;top:470px;display:flex;gap:40px}
   .stats div{width:auto}
   .rule{position:absolute;left:576px;top:96px;bottom:70px;width:1px;background:rgba(22,28,20,.15)}
   .accent-block{position:absolute;left:1010px;top:132px;width:240px;height:290px;border-radius:16px;background:#b7ec5f}`,
  extra:'<div class="accent-block"></div>',
  frames:[
   {shot:'risk-segments',label:'Compare stable segments',x:610,y:110,w:622,h:290,zoom:1.06,sx:40,sy:368},
   {shot:'risk-findings',label:'What deserves attention',x:610,y:452,w:300,h:180,sx:0,sy:110,labelSide:'bottom'},
   {shot:'risk-methodology',label:'Built to be challenged',x:932,y:452,w:300,h:180,sx:0,sy:40,labelSide:'bottom'},
  ],
 },
];

const frame=f=>{
 const zoom=f.zoom||1,size=f.w*zoom,scale=size/SHOT_W;
 const pos=f.labelSide==='bottom'?'bottom:-16px;top:auto':'top:-18px';
 return `<figure class="frame" style="left:${f.x}px;top:${f.y}px;width:${f.w}px;height:${f.h}px;transform:rotate(${f.rotate||0}deg)">
  <div class="shot" style="background-image:url('${raw(f.shot)}');background-size:${size}px auto;background-position:${-(f.sx||0)*scale}px ${-(f.sy||0)*scale}px"></div>
  <figcaption class="label" style="${pos}">${f.label}</figcaption>
 </figure>`;
};

const html=c=>{const t=c.theme;return `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1280px;height:720px;overflow:hidden;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;color:${t.ink};background:${t.bg}}
.canvas{position:relative;width:1280px;height:720px;background-image:linear-gradient(${t.grid} 1px,transparent 1px),linear-gradient(90deg,${t.grid} 1px,transparent 1px);background-size:40px 40px}
.kicker{position:absolute;left:48px;top:44px;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.badge{position:absolute;right:48px;top:34px;padding:10px 18px;border-radius:999px;background:${t.pill};color:${t.pillInk};font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
h1{position:absolute;font-family:${t.titleFont};font-weight:${t.titleWeight};line-height:.98;letter-spacing:${t.titleTracking||'-.025em'}}
.tagline{position:absolute;font-size:25px;line-height:1.22;font-weight:500}
.flow{position:absolute;display:flex;align-items:center;gap:10px;font-size:13px;font-weight:500}
.flow span{padding:7px 12px;border:1px solid ${t.chipBorder||t.ink};border-radius:6px}
.flow i{font-style:normal;opacity:.7}
.frame{position:absolute;z-index:2;background:#fff;border-radius:12px;box-shadow:0 24px 60px rgba(8,20,30,.28),0 2px 6px rgba(8,20,30,.12)}
.shot{position:absolute;inset:0;border-radius:12px;background-repeat:no-repeat}
.label{position:absolute;left:18px;padding:9px 16px;border-radius:999px;background:${t.pill};color:${t.pillInk};font-size:14px;font-weight:700;white-space:nowrap;box-shadow:0 6px 16px rgba(0,0,0,.18)}
.stats{position:absolute}
.stats strong{display:block;font-size:44px;font-weight:700;letter-spacing:-.02em;line-height:1}
.stats small{display:block;margin-top:8px;font-size:15px;line-height:1.45;color:${t.muted}}
.stats b{display:block;width:28px;height:4px;margin-bottom:14px;border-radius:2px;background:${t.accent}}
footer{position:absolute;left:48px;right:48px;bottom:24px;display:flex;justify-content:space-between;font-size:11.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${t.muted}}
${c.layout}
</style></head><body><div class="canvas">
 ${c.extra||''}
 <div class="kicker">${c.kicker}</div>
 <div class="badge">${c.badge}</div>
 <h1>${c.title.join('<br>')}</h1>
 <p class="tagline">${c.tagline.join('<br>')}</p>
 <div class="flow">${c.flow.map(f=>`<span>${f}</span>`).join('<i>→</i>')}</div>
 <div class="stats">${c.stat.map(s=>`<div><b></b><strong>${s.value}</strong><small>${s.label}</small></div>`).join('')}</div>
 ${c.frames.map(frame).join('')}
 <footer><span>${c.footer}</span><span>Natalius Desta Riyanto</span></footer>
</div></body></html>`;};

const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1.25});
for(const c of collages){
 const file=resolve('scripts/collage/raw',`${c.file}.html`);
 await writeFile(file,html(c));
 await page.goto(pathToFileURL(file).href,{waitUntil:'load'});
 const png=await page.screenshot({type:'png'});
 await sharp(png).webp({quality:86}).toFile(`public/media/${c.file}.webp`);
 console.log('built',c.file);
}
await browser.close();
