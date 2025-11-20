export function applyStoredTheme() {
  const stored = localStorage.getItem('pref-theme');
  applyTheme(stored === 'light' ? 'light':'dark');
}

export function initThemeControls() {
  const darkBtn = document.getElementById('darkBtn');
  const lightBtn = document.getElementById('lightBtn');
  darkBtn?.addEventListener('click',()=>applyTheme('dark'));
  lightBtn?.addEventListener('click',()=>applyTheme('light'));
}

export function applyTheme(mode){
  const body = document.body;
  const darkBtn = document.getElementById('darkBtn');
  const lightBtn = document.getElementById('lightBtn');
  const isLight = mode === 'light';
  body.classList.toggle('light-mode', isLight);
  localStorage.setItem('pref-theme', mode);
  if(darkBtn) darkBtn.setAttribute('aria-pressed', String(!isLight));
  if(lightBtn) lightBtn.setAttribute('aria-pressed', String(isLight));
  // trigger custom event for chart/theme dependent modules
  window.dispatchEvent(new CustomEvent('themechange',{ detail:{ mode } }));
}
