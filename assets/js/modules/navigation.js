export function initNavigation(){
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('primaryNav');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('nav--open');
    if(!expanded){
      const firstLink = menu.querySelector('a');
      firstLink && firstLink.focus();
    } else {
      toggle.focus();
    }
  });
  // Close on escape
  menu.addEventListener('keydown', e => {
    if(e.key === 'Escape'){ toggle.click(); }
  });
}
