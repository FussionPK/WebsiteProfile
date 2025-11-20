export function animateCounters(){
  const values = document.querySelectorAll('.counter__value');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const el = e.target; const target = +el.dataset.target; let cur=0; const inc=Math.max(1,Math.ceil(target/100));
        const tick = () => { cur+=inc; if(cur>=target){ cur=target; } el.textContent=cur; if(cur<target){ requestAnimationFrame(tick); } };
        tick();
        obs.unobserve(el);
      }
    });
  }, { threshold:0.4 });
  values.forEach(v=>obs.observe(v));
}

export function setCounterTargets(commits, repos, followers){
  const values = document.querySelectorAll('.counter__value');
  if(values.length >= 3){
    values[0].dataset.target = commits;
    values[1].dataset.target = repos;
    values[2].dataset.target = followers;
    values.forEach(v=>v.textContent='0');
  }
}
