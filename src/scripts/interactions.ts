const root=document.documentElement;
document.querySelectorAll<HTMLElement>('[data-enhance]').forEach(el=>el.hidden=false);

// Theme: the inline head script applies the saved or system preference before paint.
const theme=document.querySelector<HTMLButtonElement>('.theme-toggle');
const syncTheme=()=>theme?.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));
syncTheme();
theme?.addEventListener('click',()=>{
 root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
 syncTheme();
 try{localStorage.setItem('ndr-theme',root.dataset.theme);}catch{}
});

// Native disclosures preserve keyboard behaviour and work without JavaScript.
document.querySelectorAll<HTMLDetailsElement>('details').forEach(details=>{
 details.addEventListener('keydown',event=>{if(event.key==='Escape'&&details.open){details.open=false;details.querySelector('summary')?.focus();}});
 details.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>details.open=false));
});
const menus=Array.from(document.querySelectorAll<HTMLDetailsElement>('.navigation,.language'));
menus.forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)menus.forEach(other=>{if(other!==menu)other.open=false;});}));
document.addEventListener('click',event=>menus.forEach(menu=>{if(menu.open&&!menu.contains(event.target as Node))menu.open=false;}));

// Cursor light (dark mode only in CSS): track the pointer once per frame.
if(matchMedia('(pointer: fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 let x=0,y=0,queued=false;
 addEventListener('pointermove',event=>{x=event.clientX;y=event.clientY;if(queued)return;queued=true;
  requestAnimationFrame(()=>{queued=false;root.style.setProperty('--mx',`${x}px`);root.style.setProperty('--my',`${y}px`);});
 },{passive:true});
 document.addEventListener('pointerleave',()=>{root.style.setProperty('--mx','-999px');root.style.setProperty('--my','-999px');});
}

// Header gains a border once the page scrolls.
const header=document.querySelector<HTMLElement>('.site-header');
const syncHeader=()=>header?.classList.toggle('is-scrolled',scrollY>8);
addEventListener('scroll',syncHeader,{passive:true});syncHeader();

// Copy email: the mailto link remains the primary, no-JS path.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button=>{
 const label=button.querySelector('span');const original=label?.textContent||'';let timer:ReturnType<typeof setTimeout>;
 button.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(button.dataset.copy!);}catch{return;}
  if(label)label.textContent=button.dataset.copied||original;
  button.classList.add('is-copied');clearTimeout(timer);
  timer=setTimeout(()=>{if(label)label.textContent=original;button.classList.remove('is-copied');},2000);
 });
});

// Section navigation follows ordinary anchors; manual scrolling updates the menu.
if(document.querySelector('.hero')){
 const sections=Array.from(document.querySelectorAll<HTMLElement>('main>section[id]'));
 const links=Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-section]'));
 let scheduled=false;
 const update=()=>{
  scheduled=false;let active=sections[0]?.id;
  for(const section of sections)if(section.getBoundingClientRect().top<=innerHeight*.35)active=section.id;
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)active=sections.at(-1)?.id??active;
  links.forEach(link=>{if(link.dataset.section===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
 };
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});
 addEventListener('resize',update);update();
}

// Project slider: native horizontal scroll stays usable without JavaScript; buttons step one card.
document.querySelectorAll<HTMLElement>('[data-slider]').forEach(slider=>{
 const track=slider.querySelector<HTMLElement>('.project-track')!;
 const controls=slider.querySelector<HTMLElement>('.slider-controls')!;
 const [prev,next]=Array.from(controls.querySelectorAll<HTMLButtonElement>('[data-slide]'));
 const count=controls.querySelector<HTMLElement>('.slider-count');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const step=()=>{const card=track.firstElementChild as HTMLElement|null;return card?card.offsetWidth+parseFloat(getComputedStyle(track).columnGap):track.clientWidth;};
 const sync=()=>{
  const max=track.scrollWidth-track.clientWidth;
  controls.hidden=max<=1;prev.disabled=track.scrollLeft<=1;next.disabled=track.scrollLeft>=max-1;
  if(count){const total=track.children.length,i=next.disabled?total:Math.min(total,Math.round(track.scrollLeft/step())+1);
   count.textContent=`${String(i).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;}
 };
 controls.querySelectorAll<HTMLButtonElement>('[data-slide]').forEach(button=>button.addEventListener('click',()=>
  track.scrollBy({left:Number(button.dataset.slide)*step(),behavior:reduce.matches?'auto':'smooth'})));
 let queued=false;
 track.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;sync();});}},{passive:true});
 addEventListener('resize',sync);
 slider.dataset.ready='';sync();
});

// Case-study gallery: one screenshot per slide; chips stay plain anchors without JavaScript.
document.querySelectorAll<HTMLElement>('[data-gallery]').forEach(gallery=>{
 const track=gallery.querySelector<HTMLElement>('.gallery-track')!;
 const slides=Array.from(track.querySelectorAll<HTMLElement>('.gallery-slide'));
 const tabs=Array.from(gallery.querySelectorAll<HTMLAnchorElement>('[data-gallery-index]'));
 const caption=gallery.querySelector<HTMLElement>('.gallery-caption');
 const [prev,next]=Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-gallery-step]'));
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let current=-1;
 const show=(i:number)=>{
  if(i===current)return;current=i;
  if(caption)caption.textContent=slides[i].dataset.caption||'';
  tabs.forEach((tab,j)=>{if(j===i){tab.setAttribute('aria-current','true');tab.parentElement!.parentElement!.scrollTo({left:tab.offsetLeft-24,behavior:'smooth'});}else tab.removeAttribute('aria-current');});
  if(prev)prev.disabled=i===0;if(next)next.disabled=i===slides.length-1;
 };
 const go=(i:number)=>{i=Math.max(0,Math.min(slides.length-1,i));track.scrollTo({left:i*track.clientWidth,behavior:reduce.matches?'auto':'smooth'});};
 gallery.querySelectorAll<HTMLButtonElement>('[data-gallery-step]').forEach(button=>button.addEventListener('click',()=>go(current+Number(button.dataset.galleryStep))));
 tabs.forEach((tab,i)=>tab.addEventListener('click',event=>{event.preventDefault();go(i);}));
 track.addEventListener('keydown',event=>{
  const step=event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0;
  if(step){event.preventDefault();go(current+step);}
 });
 let queued=false;
 track.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;show(Math.round(track.scrollLeft/track.clientWidth));});}},{passive:true});
 gallery.dataset.ready='';show(0);
});

// Case-study rail: progress bars per section, plus a focus mode. The selected section stays
// sharp while the others soften, so the rail is useful even when the whole case fits on screen.
const tocLinks=Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc]'));
if(tocLinks.length){
 const targets=tocLinks.map(link=>document.querySelector<HTMLElement>(link.hash)!);
 const chips=tocLinks[0].closest('ol')!;
 const main=document.querySelector<HTMLElement>('.case-main')!;
 let scheduled=false,active=-1,locked=false,unlock:ReturnType<typeof setTimeout>;
 const select=(index:number)=>{
  if(index===active)return;active=index;
  main.classList.add('is-focusing');
  targets.forEach((target,i)=>target.classList.toggle('is-focused',i===index));
  tocLinks.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  // On narrow screens the rail is a horizontal chip bar: keep the active chip visible.
  if(chips.scrollWidth>chips.clientWidth){const chip=tocLinks[index];chips.scrollTo({left:chip.offsetLeft-chips.clientWidth/2+chip.offsetWidth/2,behavior:'smooth'});}
 };
 const update=()=>{
  scheduled=false;
  const line=innerHeight*.35,atEnd=innerHeight+scrollY>=document.documentElement.scrollHeight-4;
  let reading=0;
  targets.forEach((target,i)=>{
   const box=target.getBoundingClientRect();
   const progress=atEnd?1:Math.min(1,Math.max(0,(line-box.top)/Math.max(box.height,1)));
   tocLinks[i].style.setProperty('--p',progress.toFixed(3));
   tocLinks[i].toggleAttribute('data-read',progress>=.98);
   if(box.top<=line)reading=i;
  });
  // A chosen section stays selected until the visitor scrolls on their own.
  if(!locked)select(atEnd&&scrollY>0?targets.length-1:reading);
 };
 const choose=(index:number)=>{
  select(index);locked=true;clearTimeout(unlock);
  const release=()=>{clearTimeout(unlock);unlock=setTimeout(()=>{locked=false;},150);};
  addEventListener('scrollend',release,{once:true});unlock=setTimeout(()=>{locked=false;},1200);
 };
 tocLinks.forEach((link,i)=>link.addEventListener('click',()=>choose(i)));
 targets.forEach((target,i)=>target.addEventListener('click',()=>{if(i!==active)choose(i);}));
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});
 addEventListener('resize',update);update();
}

// Project arc: cards sit on a semicircle; rotating it brings another project to the centre.
// Server-rendered offsets keep the arc intact without JavaScript; links always navigate.
document.querySelectorAll<HTMLElement>('[data-arc]').forEach(arc=>{
 const items=Array.from(arc.querySelectorAll<HTMLElement>('[data-arc-item]'));
 const links=items.map(item=>item.querySelector('a')!);
 const count=items.length,half=Math.floor(count/2);
 const offsets=items.map(item=>Number(item.style.getPropertyValue('--offset'))||0);
 const sheet=matchMedia('(max-width: 640px)');
 const rotate=(shift:number)=>{
  if(!shift)return;
  items.forEach((item,i)=>{
   const next=((offsets[i]-shift+half)%count+count)%count-half;
   const wraps=Math.abs(next-offsets[i])>Math.abs(shift);
   if(wraps)item.style.transition='none';
   item.style.setProperty('--offset',String(next));item.style.setProperty('--abs',String(Math.abs(next)));
   offsets[i]=next;
   if(wraps){void item.offsetWidth;item.style.transition='';}
  });
 };
 arc.querySelectorAll<HTMLButtonElement>('[data-arc-step]').forEach(button=>button.addEventListener('click',()=>rotate(Number(button.dataset.arcStep))));
 // Keyboard: focusing a card centres it; arrow keys move between neighbours on the arc.
 links.forEach((link,i)=>{
  link.addEventListener('focus',()=>{if(!sheet.matches)rotate(offsets[i]);});
  link.addEventListener('keydown',event=>{
   const step=event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0;if(!step)return;
   event.preventDefault();links[offsets.indexOf(step)]?.focus();
  });
 });
 // Swipe or drag sideways to rotate; a drag never triggers navigation.
 const stage=arc.querySelector<HTMLElement>('.arc-stage')!;let startX=0,dragging=false,dragged=false;
 stage.addEventListener('pointerdown',event=>{if(sheet.matches)return;startX=event.clientX;dragging=true;dragged=false;});
 stage.addEventListener('pointermove',event=>{
  if(!dragging)return;const dx=event.clientX-startX;
  if(Math.abs(dx)>48){rotate(dx<0?1:-1);startX=event.clientX;dragged=true;}
 });
 addEventListener('pointerup',()=>dragging=false);
 stage.addEventListener('click',event=>{if(dragged){event.preventDefault();dragged=false;}},true);
 // Bottom sheet: the card nearest the centre of the strip stays sharp; the rest blur.
 const track=arc.querySelector<HTMLElement>('.arc-track')!;let framed=false;
 const focusCentre=()=>{framed=false;if(!sheet.matches)return;
  const mid=track.getBoundingClientRect().left+track.clientWidth/2;
  const distances=items.map(item=>{const box=item.getBoundingClientRect();return Math.abs(box.left+box.width/2-mid);});
  const nearest=distances.indexOf(Math.min(...distances));
  items.forEach((item,i)=>item.style.setProperty('--abs',i===nearest?'0':'1'));
 };
 track.addEventListener('scroll',()=>{if(!framed){framed=true;requestAnimationFrame(focusCentre);}},{passive:true});
 // Opening the overlay brings the current project to the centre and moves focus into it.
 arc.addEventListener('toggle',event=>{
  if((event as ToggleEvent).newState!=='open')return;
  const current=links.findIndex(link=>link.hasAttribute('aria-current'));if(current<0)return;
  if(sheet.matches){links[current].scrollIntoView({inline:'center',block:'nearest',behavior:'instant'});focusCentre();}
  else rotate(offsets[current]);
  links[current].focus({preventScroll:true});
 });
});
