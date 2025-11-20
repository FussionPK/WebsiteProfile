import { initTyping } from './modules/typing.js';
import { applyStoredTheme, initThemeControls } from './modules/theme.js';
import { renderProjects } from './modules/projects.js';
import { animateCounters, setCounterTargets } from './modules/counters.js';
import { fetchGitHubStats } from './modules/github.js';
import { initRadarChart, refreshChartTheme } from './modules/chart.js';
import { enableSmoothScroll } from './modules/smoothScroll.js';
import { initNavigation } from './modules/navigation.js';

// Entry point
window.addEventListener('DOMContentLoaded', async () => {
  applyStoredTheme();
  initThemeControls();
  initNavigation();
  enableSmoothScroll();

  // Typing effect
  initTyping(["Threat Modeling","Linux Hardening","C Systems","Python Tooling","Purple Teaming","Secure Automation"], 'typed');

  // Projects
  renderProjects();

  // GitHub + counters
  try {
    const stats = await fetchGitHubStats('FussionPK');
    setCounterTargets(stats.commits || 100, stats.repos || 13, stats.followers || 2);
  } catch { /* fallbacks already handled */ }
  animateCounters();

  // Chart
  initRadarChart();
  window.addEventListener('themechange', refreshChartTheme);

  // Year
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();

  // Scroll top button
  const scrollBtn = document.getElementById('scrollTop');
  if(scrollBtn){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 400){ scrollBtn.hidden = false; scrollBtn.classList.add('show'); }
      else { scrollBtn.classList.remove('show'); scrollBtn.hidden = true; }
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }

  // Contact form (simulated send)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(form && status){
    form.addEventListener('submit', e => {
      e.preventDefault();
      if(!form.checkValidity()){ status.textContent = 'Please fill all required fields.'; return; }
      status.textContent = 'Sending…';
      setTimeout(() => { status.textContent = 'Message sent (simulated).'; form.reset(); }, 900);
    });
  }
});
