export function enableSmoothScroll(){
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link=>{
    link.addEventListener('click',e=>{
      const id = link.getAttribute('href');
      if(id.length > 1){
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          const start = window.scrollY;
          const end = target.getBoundingClientRect().top + start - 60; // offset for sticky nav
          const duration = 600;
          let startTs;
          function ease(t){ return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }
          function step(ts){
            if(!startTs) startTs = ts;
            const progress = Math.min((ts-startTs)/duration,1);
            const eased = ease(progress);
            window.scrollTo(0, start + (end-start)*eased);
            if(progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      }
    });
  });
}
