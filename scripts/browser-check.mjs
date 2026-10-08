import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/Users/calculus/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const base=process.env.TEST_URL||'http://127.0.0.1:4321';
const output='qa';await mkdir(output,{recursive:true});const errors=[];let checks=0;
const locales=['','id/','ja/','de/','zh/'];const widths=[360,390,768,1280,1440];
for(const locale of locales){for(const width of widths){const page=await browser.newPage({viewport:{width,height:960}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${base}/${locale}`,{waitUntil:'networkidle'});
 if(await page.locator('h1').count()!==1)throw Error('Missing H1');
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)throw Error(`Overflow ${locale} ${width}`);
 if(width===1440 || width===390)await page.screenshot({path:`${output}/${locale.replace('/','')||'en'}-${width}.png`,fullPage:true});
 if(width>=768 && !await page.locator('.desktop-nav').isVisible())throw Error('Desktop navigation missing');
 if(width===390){await page.locator('.navigation summary').click();await page.locator('.navigation a').first().click();await page.waitForURL(`**/${locale}work/`);}
 await page.goto(`${base}/${locale}work/sakuara/`,{waitUntil:'networkidle'});await page.locator('.language summary').click();await page.locator('.language a').filter({hasText:'DE'}).click();await page.waitForURL('**/de/work/sakuara/');
 await page.close();checks++;}}
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await page.goto(base);await page.keyboard.press('Tab');if(await page.locator('.skip-link').evaluate(el=>el!==document.activeElement))throw Error('Skip link not first');await page.keyboard.press('Enter');await page.locator('.navigation summary').focus();await page.keyboard.press('Enter');await page.keyboard.press('Escape');if(await page.locator('.navigation').getAttribute('open')!==null)throw Error('Escape failed');
await page.goto(`${base}/work/`);await page.locator('[data-filter=analytics]').click();if(await page.locator('article:visible').count()!==2)throw Error('Project filter failed');await page.locator('[data-filter=all]').click();if(await page.locator('article:visible').count()!==4)throw Error('Reset filter failed');await page.close();
const nojs=await browser.newContext({javaScriptEnabled:false});const nj=await nojs.newPage();await nj.goto(`${base}/zh/work/`);if(await nj.locator('article').count()!==4)throw Error('No-JS content missing');await nojs.close();
if(errors.length)throw Error(errors.join('\n'));await browser.close();const report={checks,viewports:widths,locales:['en','id','ja','de','zh'],pageErrors:errors,verified:['responsive overflow','mobile navigation','language context retention','skip link','menu Escape','reduced-motion configuration','project filters','no-JavaScript content']};await writeFile(`${output}/browser-report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
