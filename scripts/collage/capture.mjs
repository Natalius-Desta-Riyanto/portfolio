import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const out='scripts/collage/raw';await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const ctx=(height=900)=>browser.newContext({viewport:{width:1440,height},deviceScaleFactor:2,colorScheme:'light'});
const settle=p=>p.waitForLoadState('networkidle').catch(()=>{}).then(()=>p.waitForTimeout(1200));
const shot=async(p,name)=>{await settle(p);await p.screenshot({path:`${out}/${name}.png`});console.log('saved',name,p.url());};
const nav=async(p,text)=>{await p.getByRole('link',{name:text}).first().click().catch(()=>p.getByText(text,{exact:false}).first().click());};

async function padun(){
 const c=await ctx();const p=await c.newPage();
 await p.goto('https://padun-desta.vercel.app/',{waitUntil:'networkidle'});
 await p.getByRole('button',{name:'Analyst'}).click();await settle(p);
 if(await p.getByRole('button',{name:/Sign in/}).isVisible())await p.getByRole('button',{name:/Sign in/}).click();
 await shot(p,'padun-batches');
 await nav(p,'Exceptions');await shot(p,'padun-exceptions');
 await nav(p,'Review queue');await shot(p,'padun-review');
 await nav(p,'Audit trail');await shot(p,'padun-audit');
 await nav(p,'Batches');await settle(p);await p.getByText('Open batch').first().click();await shot(p,'padun-batch');
 await c.close();
}
async function lendsight(){
 const c=await ctx();const p=await c.newPage();
 await p.goto('https://lendsight-plum.vercel.app/',{waitUntil:'networkidle'});
 await p.getByRole('button',{name:/Quick login/}).click();
 await p.waitForURL('**/observed/**',{timeout:30000}).catch(()=>{});
 for(const v of ['Overview','Delinquency','Vintage','Concentration','Findings']){await nav(p,v);await shot(p,`lendsight-${v.toLowerCase()}`);}
 await c.close();
}
async function risk(){
 const c=await ctx(1400);const p=await c.newPage();
 await p.goto('https://desta-data-analytics.github.io/credit-risk-analytics/',{waitUntil:'networkidle'});
 await shot(p,'risk-top');
 for(const id of ['findings','segments','methodology']){await p.evaluate(i=>{const el=document.getElementById(i);el&&window.scrollTo(0,el.getBoundingClientRect().top+scrollY-20)},id);await shot(p,`risk-${id}`);}
 await c.close();
}
const only=process.argv[2];
for(const f of [padun,lendsight,risk].filter(f=>!only||f.name===only)){try{await f()}catch(e){console.log('ERR',f.name,e.message)}}
await browser.close();
