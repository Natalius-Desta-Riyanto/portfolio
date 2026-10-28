import {readdir,readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const root=resolve('dist');
async function walk(dir){const list=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=join(dir,entry.name);if(entry.isDirectory())list.push(...await walk(p));else if(p.endsWith('.html')&&!p.endsWith('indonesia-map.html')&&!p.includes(join('demo','sakuara')))list.push(p);}return list;}
const pages=await walk(root);let links=0;
for(const p of pages){const html=await readFile(p,'utf8');if(/Math Tutor|Math Mentor|CC Academy|href="[^"]*teaching/.test(html))throw Error(`Removed content present: ${p}`);if((html.match(/<h1[ >]/g)||[]).length!==1)throw Error(`Expected one h1: ${p}`);for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(!url.startsWith('/')||url.startsWith('//'))continue;const clean=url.split('#')[0].split('?')[0];const base=process.env.BASE_PATH||'/';const relative=clean.startsWith(base)?clean.slice(base.length):clean.slice(1);let target=join(root,relative);if(clean.endsWith('/'))target=join(target,'index.html');await stat(target).catch(()=>{throw Error(`Broken internal link ${url} in ${p}`)});links++;}}
const projectSource=await readFile('src/data/site.ts','utf8');
const projectCount=[...projectSource.matchAll(/slug:'/g)].length;
const expected=5*(6+projectCount)+1;
if(pages.length!==expected)throw Error(`Expected ${expected} pages, got ${pages.length}`);
console.log(`PASS: ${pages.length} static pages, ${links} internal links/assets, one H1 per page.`);
const demoDir=join(root,'demo','sakuara');
const demoHtml=await readFile(join(demoDir,'index.html'),'utf8');
if(!demoHtml.includes("connect-src 'none'")||!demoHtml.includes('noindex,nofollow'))throw Error('Demo isolation metadata missing');
const demoJs=(await Promise.all((await readdir(join(demoDir,'assets'))).filter(p=>p.endsWith('.js')).map(p=>readFile(join(demoDir,'assets',p),'utf8')))).join('\n');
if(!demoJs.includes('Quick login · Try the demo')||/https:\/\/[a-z0-9-]+\.supabase\.(co|net)|sb_publishable_[A-Za-z0-9]+/i.test(demoJs))throw Error('Expected isolated demo build without cloud configuration');
console.log('PASS: Sakuara demo has quick login, connection-blocking CSP, and no embedded Supabase project configuration.');
