import {chromium} from '@playwright/test';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import sharp from 'sharp';

// Captures one screenshot per screen/section of each live demo for the case-study slides.
const out='public/media/gallery';await mkdir(out,{recursive:true});
const manifestPath='src/data/gallery.json';
const manifest=JSON.parse(await readFile(manifestPath,'utf8').catch(()=>'{}'));
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const settle=p=>p.waitForLoadState('networkidle').catch(()=>{}).then(()=>p.waitForTimeout(1200));
const click=async(p,name)=>{
 for(const role of ['link','button','tab']){const l=p.getByRole(role,{name,exact:true}).first();if(await l.count()&&await l.isVisible()){await l.click();return;}}
 await p.getByText(name,{exact:true}).first().click();
};

async function run(slug,url,views,setup){
 const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:'light'});
 const p=await ctx.newPage();
 await p.goto(url,{waitUntil:'networkidle'});
 if(setup)await setup(p);
 const items=[];
 for(const [i,v] of views.entries()){
  try{
   await v.go(p);await settle(p);
   const file=`${slug}-${String(i+1).padStart(2,'0')}.webp`;
   await sharp(await p.screenshot()).resize(1600).webp({quality:82}).toFile(`${out}/${file}`);
   items.push({src:`media/gallery/${file}`,label:v.label});console.log(slug,v.label);
  }catch(e){console.log('ERR',slug,v.label,e.message.split('\n')[0]);}
 }
 manifest[slug]=items;await ctx.close();
}
const nav=label=>({label,go:p=>click(p,label)});
const section=(label,match)=>({label,go:p=>p.evaluate(m=>{
 const el=[...document.querySelectorAll('p,span,div')].find(n=>n.children.length===0&&n.textContent.trim().toLowerCase().startsWith(m));
 if(el)window.scrollTo(0,el.getBoundingClientRect().top+scrollY-90);
},match)});

const jobs={
 padun:()=>run('padun','https://padun-desta.vercel.app/',[
  nav('Batches'),
  {label:'Batch overview',go:p=>p.getByText('Open batch').first().click()},
  nav('Exceptions'),
  {label:'Exception detail',go:async p=>{await click(p,'Exceptions');await settle(p);await p.getByText('Inspect').first().click();}},
  nav('Review queue'),
  nav('Audit trail'),
 ],async p=>{await p.getByRole('button',{name:'Analyst'}).click();await settle(p);
  if(await p.getByRole('button',{name:/Sign in/}).isVisible())await p.getByRole('button',{name:/Sign in/}).click();}),
 lendsight:()=>run('lendsight','https://lendsight-plum.vercel.app/',[
  nav('Overview'),nav('Delinquency'),nav('Vintage'),nav('Concentration'),nav('Findings'),
  {label:'Simulation track',go:async p=>{await click(p,'Overview');await settle(p);await p.getByText('Simulation',{exact:true}).first().click();}},
  {label:'Datasets',go:p=>p.getByText('Datasets',{exact:true}).first().click()},
 ],async p=>{await p.getByRole('button',{name:/Quick login/}).click();await p.waitForURL('**/observed/**',{timeout:30000}).catch(()=>{});}),
 'credit-risk-analytics':()=>run('credit-risk-analytics','https://desta-data-analytics.github.io/credit-risk-analytics/',[
  {label:'Portfolio overview',go:p=>p.evaluate(()=>scrollTo(0,0))},
  section('Executive readout','01 ·'),
  section('Risk segmentation','02 ·'),
  section('Affordability','03 ·'),
  section('Prior applications','04 ·'),
  section('Evidence & limitations','05 ·'),
 ]),
 stockwise:()=>run('stockwise','https://desta-data-analytics.github.io/stockwise/',[
  nav('Overview'),nav('Demand forecast'),
  {label:'Purchase plan',go:p=>p.getByRole('button',{name:/^Purchase plan/}).first().click()},
  nav('Data workspace'),
 ]),
 sakuara:()=>run('sakuara','https://natalius-desta-riyanto.github.io/portfolio/demo/sakuara/',[
  nav('Overview'),nav('Accounts'),nav('Transactions'),nav('FX Vault'),nav('Analytics'),nav('Budgets'),nav('Goals'),
 ],async p=>{await p.getByRole('button',{name:/Quick login/}).click();await settle(p);}),
};
const only=process.argv.slice(2);
for(const [slug,job] of Object.entries(jobs))if(!only.length||only.includes(slug))await job();
await writeFile(manifestPath,JSON.stringify(manifest,null,1)+'\n');
await browser.close();
