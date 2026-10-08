const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const root=document.documentElement;
try {const saved=localStorage.getItem('ndr-theme');if(saved==='light'||saved==='dark')root.dataset.theme=saved;} catch {}
document.querySelectorAll<HTMLElement>('[data-enhance]').forEach(el=>el.hidden=false);
const theme=document.querySelector<HTMLButtonElement>('.theme-toggle');
function syncTheme(){theme?.setAttribute('aria-pressed',String(root.dataset.theme==='light'));}
syncTheme();theme?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';syncTheme();try{localStorage.setItem('ndr-theme',root.dataset.theme);}catch{}});
document.querySelectorAll<HTMLDetailsElement>('details').forEach(details=>{details.addEventListener('keydown',e=>{if(e.key==='Escape'){details.open=false;details.querySelector('summary')?.focus();}});details.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>details.open=false));});
document.addEventListener('click',e=>document.querySelectorAll('details[open]').forEach(d=>{if(!d.contains(e.target as Node))d.removeAttribute('open');}));
document.querySelectorAll<HTMLElement>('[data-system]').forEach(system=>{
 let view:'build'|'data'='build';let selected=0;
 const nodes=Array.from(system.querySelectorAll<HTMLButtonElement>('[data-node]'));
 const refresh=()=>{nodes.forEach((node,i)=>{const active=i===selected;node.classList.toggle('is-selected',active);node.setAttribute('aria-pressed',String(active));const label=node.querySelector('[data-node-label]');if(label)label.textContent=node.dataset[view+'Label']||'';});const current=nodes[selected];const title=system.querySelector('[data-detail-title]');const detail=system.querySelector('[data-detail]');if(title)title.textContent=current.dataset[view+'Label']||'';if(detail)detail.textContent=current.dataset[view+'Detail']||'';system.dataset.mode=view;};
 nodes.forEach((node,i)=>node.addEventListener('click',()=>{selected=i;refresh();}));
 system.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(button=>button.addEventListener('click',()=>{view=button.dataset.view as 'build'|'data';system.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));refresh();}));
 if(matchMedia('(pointer:fine)').matches){system.addEventListener('pointermove',e=>{if(reducedMotion.matches)return;const box=system.getBoundingClientRect();system.style.setProperty('--tilt-x',`${((e.clientY-box.top)/box.height-.5)*-3}deg`);system.style.setProperty('--tilt-y',`${((e.clientX-box.left)/box.width-.5)*3}deg`);});system.addEventListener('pointerleave',()=>{system.style.setProperty('--tilt-x','0deg');system.style.setProperty('--tilt-y','0deg');});}
});
document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll<HTMLElement>('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden&&!reducedMotion.matches)card.animate([{opacity:.45,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'ease-out'});});}));
const progress=document.querySelector<HTMLElement>('.reading-progress');let frame=0;
const updateProgress=()=>{frame=0;const height=root.scrollHeight-innerHeight;progress?.style.setProperty('--progress',String(height>0?Math.min(1,scrollY/height):0));document.querySelector('.site-header')?.classList.toggle('is-scrolled',scrollY>16);};
addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(updateProgress);},{passive:true});addEventListener('resize',updateProgress);updateProgress();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{entry.target.classList.toggle('is-visible',entry.isIntersecting);if(entry.isIntersecting&&!reducedMotion.matches&&!entry.target.hasAttribute('data-revealed')){entry.target.setAttribute('data-revealed','');entry.target.animate([{opacity:.45,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,easing:'cubic-bezier(.2,.65,.3,1)'});}});},{threshold:.12});
document.querySelectorAll('.project-row,.perspective-copy,.perspective-pair,.system-explorer').forEach(el=>observer.observe(el));
document.addEventListener('visibilitychange',()=>root.classList.toggle('page-hidden',document.hidden));

// Video is loaded on visibility, pauses offscreen, and respects motion preferences.
document.querySelectorAll<HTMLElement>('[data-motion-hero]').forEach(figure=>{
 const video=figure.querySelector<HTMLVideoElement>('video');const button=figure.classList.contains('ambient-video')?document.querySelector<HTMLButtonElement>('.background-control'):figure.querySelector<HTMLButtonElement>('[data-motion-toggle]');if(!video||!button)return;
 const ambient=figure.classList.contains('ambient-video');
 let inView=ambient;let userPaused=false;let failed=false;video.muted=true;
 const sync=()=>{const playing=!video.paused;const label=playing?button.dataset.pauseLabel:button.dataset.playLabel;button.setAttribute('aria-label',label||'');button.title=label||'';button.setAttribute('aria-pressed',String(playing));const icon=button.querySelector('[data-motion-icon]');if(icon){const playIcon=icon.querySelector<HTMLElement>('[data-play-icon]');const pauseIcon=icon.querySelector<HTMLElement>('[data-pause-icon]');if(playIcon&&pauseIcon){playIcon.hidden=playing;pauseIcon.hidden=!playing;}else icon.textContent=playing?'Ⅱ':'▶';}};
 const update=()=>{if(inView&&!document.hidden&&!reducedMotion.matches&&!userPaused&&!failed){if(!video.getAttribute('src'))video.src=video.dataset.src||'';void video.play().then(sync).catch(()=>{sync();});}else{video.pause();sync();}};
 if(!ambient){const visibility=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;update();},{threshold:.2});visibility.observe(figure);}else{update();addEventListener('pageshow',update);addEventListener('focus',update);document.addEventListener('pointerdown',()=>{if(video.paused)update();},{passive:true});}
 button.addEventListener('click',()=>{failed=false;if(!video.paused){userPaused=true;video.pause();sync();}else{userPaused=false;if(!video.getAttribute('src'))video.src=video.dataset.src||'';void video.play().then(sync).catch(()=>sync());}});
 video.addEventListener('play',sync);video.addEventListener('pause',sync);video.addEventListener('error',()=>{failed=true;video.pause();sync();});document.addEventListener('visibilitychange',update);reducedMotion.addEventListener('change',update);
});

// Native scroll snapping supports touch, buttons, and focused keyboard navigation.
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(carousel=>{
 const track=carousel.querySelector<HTMLElement>('[data-track]')!;
 const slides=Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'));
 const previous=carousel.querySelector<HTMLButtonElement>('[data-prev]')!;
 const next=carousel.querySelector<HTMLButtonElement>('[data-next]')!;
 const count=carousel.querySelector<HTMLElement>('[data-slide-count]')!;
 let index=0;track.tabIndex=0;
 const sync=()=>{index=Math.max(0,Math.min(slides.length-1,Math.round(track.scrollLeft/track.clientWidth)));count.textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;previous.disabled=index===0;next.disabled=index===slides.length-1;};
 const move=(step:number)=>{const target=Math.max(0,Math.min(slides.length-1,index+step));track.scrollTo({left:target*track.clientWidth,behavior:reducedMotion.matches?'instant':'smooth'});};
 previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 track.addEventListener('scroll',sync,{passive:true});
 track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});
 const resize=new ResizeObserver(()=>{track.scrollTo({left:index*track.clientWidth,behavior:'instant'});sync();});resize.observe(track);sync();
});

const portfolioSections=Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
if(portfolioSections.length){
 const activeSections=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;document.querySelectorAll<HTMLAnchorElement>('[data-section-link]').forEach(link=>{if(link.dataset.sectionLink===entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-15% 0px -60% 0px',threshold:0});portfolioSections.forEach(section=>activeSections.observe(section));
}

// Align section navigation with the actual sticky header, including mobile menus.
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link=>{
 link.addEventListener('click',event=>{
  const id=link.getAttribute('href')?.slice(1);if(!id)return;
  const target=document.getElementById(id);if(!target)return;
  event.preventDefault();document.querySelectorAll<HTMLDetailsElement>('details[open]').forEach(menu=>menu.open=false);
  if(location.hash!==`#${id}`)history.pushState(null,'',`#${id}`);
  requestAnimationFrame(()=>{
   const headerHeight=document.querySelector('header')?.getBoundingClientRect().height||0;
   const top=target.getBoundingClientRect().top+scrollY-headerHeight-12;
   scrollTo({top:Math.max(0,top),behavior:reducedMotion.matches?'instant':'smooth'});
  });
 });
});

// Recalculate the header offset and preserve the visible section on rotation/resize.
const stickyHeader=document.querySelector<HTMLElement>('header');
const alignSection=(target:HTMLElement)=>scrollTo({top:Math.max(0,target.getBoundingClientRect().top+scrollY-(stickyHeader?.getBoundingClientRect().height||0)-12),behavior:'instant'});
const measureHeader=()=>root.style.setProperty('--header-height',`${stickyHeader?.getBoundingClientRect().height||88}px`);
measureHeader();if(stickyHeader)new ResizeObserver(measureHeader).observe(stickyHeader);
let resizeTimer=0;let anchoredSection:HTMLElement|null=null;
addEventListener('resize',()=>{
 if(!resizeTimer)anchoredSection=portfolioSections.find(section=>Math.abs(section.getBoundingClientRect().top-(stickyHeader?.getBoundingClientRect().height||0)-12)<100)||null;
 clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>{measureHeader();if(anchoredSection)alignSection(anchoredSection);resizeTimer=0;},150);
});
addEventListener('load',()=>{const target=document.getElementById(location.hash.slice(1));if(target)alignSection(target);});
