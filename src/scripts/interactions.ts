const root=document.documentElement;
try{const saved=localStorage.getItem('ndr-theme');if(saved==='light'||saved==='dark')root.dataset.theme=saved;}catch{}
document.querySelectorAll<HTMLElement>('[data-enhance]').forEach(el=>el.hidden=false);
const theme=document.querySelector<HTMLButtonElement>('.theme-toggle');
const syncTheme=()=>theme?.setAttribute('aria-pressed',String(root.dataset.theme==='light'));
syncTheme();theme?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';syncTheme();try{localStorage.setItem('ndr-theme',root.dataset.theme);}catch{}});
// Native disclosures preserve keyboard behaviour and work without JavaScript.
document.querySelectorAll<HTMLDetailsElement>('details').forEach(details=>{
 details.addEventListener('keydown',event=>{if(event.key==='Escape'){details.open=false;details.querySelector('summary')?.focus();}});
 details.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>details.open=false));
});
document.addEventListener('click',event=>document.querySelectorAll<HTMLDetailsElement>('.navigation[open],.language[open]').forEach(menu=>{if(!menu.contains(event.target as Node))menu.open=false;}));
// Home anchors resolve natively to the continuous page sections.
// Progressive tabs: all case-study explanations stay available without JS.
const caseTabs=Array.from(document.querySelectorAll<HTMLButtonElement>('[data-case-tab]'));
if(caseTabs.length){
 const tablist=caseTabs[0].parentElement!;tablist.setAttribute('role','tablist');
 const select=(index:number)=>caseTabs.forEach((tab,i)=>{tab.setAttribute('role','tab');tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;const panel=document.getElementById(tab.getAttribute('aria-controls')!);if(panel){panel.setAttribute('role','tabpanel');panel.hidden=i!==index;panel.tabIndex=0;}});
 caseTabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(i));tab.addEventListener('keydown',event=>{let next=i;if(event.key==='ArrowRight')next=(i+1)%caseTabs.length;else if(event.key==='ArrowLeft')next=(i+caseTabs.length-1)%caseTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=caseTabs.length-1;else return;event.preventDefault();select(next);caseTabs[next].focus();});});
 document.querySelector('.case-study')?.classList.add('has-case-tabs');select(0);
}

// Native horizontal scrolling keeps swipe, keyboard and no-JS access available.
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(carousel=>{
 const track=carousel.querySelector<HTMLElement>('.selected-projects')!;
 const cards=Array.from(track.querySelectorAll<HTMLElement>('.work-card'));
 const prev=carousel.querySelector<HTMLButtonElement>('[data-prev]')!;
 const next=carousel.querySelector<HTMLButtonElement>('[data-next]')!;
 const count=carousel.querySelector<HTMLElement>('.carousel-count')!;
 let index=0;
 const sync=()=>{index=cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-track.offsetLeft-track.scrollLeft)<Math.abs(cards[best].offsetLeft-track.offsetLeft-track.scrollLeft)?i:best,0);prev.disabled=index===0;next.disabled=index===cards.length-1;count.textContent=`${String(index+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;};
 const go=(target:number)=>{const card=cards[Math.max(0,Math.min(cards.length-1,target))];track.scrollTo({left:card.offsetLeft-track.offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 prev.addEventListener('click',()=>go(index-1));next.addEventListener('click',()=>go(index+1));
 track.addEventListener('scroll',sync,{passive:true});
 track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'){event.preventDefault();go(index+1);}else if(event.key==='ArrowLeft'){event.preventDefault();go(index-1);}else if(event.key==='Home'){event.preventDefault();go(0);}else if(event.key==='End'){event.preventDefault();go(cards.length-1);}});
 new ResizeObserver(sync).observe(track);sync();
});

// Section navigation follows ordinary anchors; manual scrolling updates the menu.
const homeSections=Array.from(document.querySelectorAll<HTMLElement>('main>section[id]'));
if(document.querySelector('.editorial-hero')){
 document.documentElement.classList.add('section-journey');
 const links=Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-section]'));
 let scheduled=false;
 const updateSection=()=>{scheduled=false;let active=homeSections[0]?.id;for(const section of homeSections){if(section.getBoundingClientRect().top<=innerHeight*.35)active=section.id;}links.forEach(link=>{if(link.dataset.section===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});};
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateSection);}},{passive:true});
 addEventListener('resize',updateSection);updateSection();
}

// Arc navigation: pointer intent, explicit activation, and keyboard focus.
const orbit=document.querySelector<HTMLElement>('[data-case-workspace]');
const orbitButton=orbit?.querySelector<HTMLButtonElement>('.orbit-trigger');
const orbitPanel=orbit?.querySelector<HTMLElement>('.project-sidebar');
if(orbit&&orbitButton&&orbitPanel){
 orbit.classList.add('orbit-ready');let pinned=false;let closeTimer:ReturnType<typeof setTimeout>;
 const show=(open:boolean)=>{orbit.classList.toggle('orbit-open',open);orbitButton.setAttribute('aria-expanded',String(open));orbitPanel.inert=!open;};
 const enter=()=>{clearTimeout(closeTimer);show(true);};
 const leave=()=>{clearTimeout(closeTimer);closeTimer=setTimeout(()=>{if(!pinned&&!orbitPanel.contains(document.activeElement))show(false);},320);};
 for(const el of [orbitButton,orbitPanel]){el.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')enter();});el.addEventListener('pointerleave',leave);}
 orbitButton.addEventListener('click',()=>{pinned=!pinned;show(pinned);});
 const orbitLinks=Array.from(orbitPanel.querySelectorAll<HTMLAnchorElement>('a'));
 orbitButton.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();pinned=true;show(true);requestAnimationFrame(()=>requestAnimationFrame(()=>(orbitLinks.find(link=>link.getAttribute('aria-current')==='page')||orbitLinks[0])?.focus()));}});
 orbitPanel.addEventListener('keydown',event=>{const i=orbitLinks.indexOf(document.activeElement as HTMLAnchorElement);let target=i;if(event.key==='ArrowDown'||event.key==='ArrowRight')target=(i+1)%orbitLinks.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')target=(i-1+orbitLinks.length)%orbitLinks.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=orbitLinks.length-1;else return;event.preventDefault();orbitLinks[target]?.focus();});
 orbitPanel.addEventListener('focusin',enter);
 document.addEventListener('pointerdown',event=>{if(!orbitPanel.contains(event.target as Node)&&!orbitButton.contains(event.target as Node)){pinned=false;show(false);}});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&orbit.classList.contains('orbit-open')){pinned=false;show(false);orbitButton.focus();}});
 orbitPanel.addEventListener('focusout',()=>{setTimeout(()=>{if(!pinned&&!orbitPanel.contains(document.activeElement))show(false);},0);});
 show(false);
}
