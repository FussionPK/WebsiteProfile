const PROJECTS = [
  { title:'C & Python Systems', desc:'Multithreaded schedulers, hashing utilities, SQLite tooling, structured C CRUD.', tags:['C','Python','Concurrency'], media:'assets/images/9557275.png' },
  { title:'Red Team Range', desc:'Custom vuln VMs, automation scripts, adversary emulation, scoring engine.', tags:['Kali','Automation','Security'], media:'assets/images/redblue.png' },
  { title:'Blue Team Lab', desc:'Elastic + Suricata stack, detection scripts, log enrichment & response tooling.', tags:['Linux','Docker','SIEM'], media:'assets/images/homelab.png' }
];

export function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  grid.innerHTML = PROJECTS.map(p=>`<article class="project-card"><div class="project-card__media"><img src="${p.media}" alt="${p.title}" loading="lazy" width="320" height="180" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" /></div><h3 class="project-card__title">${p.title}</h3><p class="project-card__desc">${p.desc}</p><div class="project-card__tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></article>`).join('');
}
