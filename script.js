// New frontend script: accessible interactions, theme persistence, dynamic rendering
(function(){
    const TYPED_WORDS = ["Threat Modeling","Linux Hardening","C Systems","Python Tooling","Purple Teaming","Secure Automation"];
    let typedIndex=0, letterIndex=0, deleting=false;
    const typedEl = () => document.getElementById('typed');

    function typeLoop(){
        const el = typedEl();
        if(!el) return;
        const word = TYPED_WORDS[typedIndex];
        if(!deleting){
            letterIndex++;
            el.textContent = word.slice(0, letterIndex);
            if(letterIndex === word.length){
                deleting = true;
                return setTimeout(typeLoop,1500);
            }
        } else {
            letterIndex--;
            el.textContent = word.slice(0, letterIndex);
            if(letterIndex === 0){
                deleting = false;
                typedIndex = (typedIndex+1) % TYPED_WORDS.length;
            }
        }
        setTimeout(typeLoop, deleting ? 55 : 110);
    }

    // Theme persistence
    const body = document.body;
    const darkBtn = document.getElementById('darkBtn');
    const lightBtn = document.getElementById('lightBtn');
        function applyMode(mode){
            const isLight = mode === 'light';
            body.classList.toggle('light-mode', isLight);
            localStorage.setItem('pref-theme', mode);
            darkBtn.setAttribute('aria-pressed', String(!isLight));
            lightBtn.setAttribute('aria-pressed', String(isLight));
            // update chart + ensure button contrast maintained
            buildChart();
        }
    const stored = localStorage.getItem('pref-theme');
    applyMode(stored === 'light' ? 'light':'dark');
    darkBtn.addEventListener('click',()=>applyMode('dark'));
    lightBtn.addEventListener('click',()=>applyMode('light'));

    // Accessible mobile nav
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.addEventListener('click',()=>{
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.setAttribute('aria-hidden', expanded ? 'true':'false');
        if(!expanded){ navMenu.querySelector('a').focus(); }
    });
    // Close menu on link click (mobile)
    navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
        if(window.matchMedia('(max-width:860px)').matches){
            navToggle.setAttribute('aria-expanded','false');
            navMenu.setAttribute('aria-hidden','true');
        }
    }));

    // Scroll top button
    const scrollBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll',()=>{
        if(window.scrollY > 400){ scrollBtn.hidden=false; scrollBtn.classList.add('show'); } else { scrollBtn.classList.remove('show'); scrollBtn.hidden=true; }
    });
    scrollBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

    // Dynamic projects data
    const PROJECTS = [
        { title:'C & Python Systems', desc:'Multithreaded schedulers, hashing utilities, SQLite tooling, structured C CRUD.', tags:['C','Python','Concurrency'], media:'9557275.png' },
        { title:'Red Team Range', desc:'Custom vuln VMs, automation scripts, adversary emulation, scoring engine.', tags:['Kali','Automation','Security'], media:'redblue.png' },
        { title:'Blue Team Lab', desc:'Elastic + Suricata stack, detection scripts, log enrichment & response tooling.', tags:['Linux','Docker','SIEM'], media:'homelab.png' }
    ];
    function renderProjects(){
        const grid = document.getElementById('projectsGrid');
        if(!grid) return;
        grid.innerHTML = PROJECTS.map(p=>`<article class="project-card"><div class="project-card__media"><img src="${p.media}" alt="${p.title}" loading="lazy" width="320" height="180" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" /></div><h3 class="project-card__title">${p.title}</h3><p class="project-card__desc">${p.desc}</p><div class="project-card__tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></article>`).join('');
    }

    // Counters animation
    function initCounters(){
        const values = document.querySelectorAll('.counter__value');
        const obs = new IntersectionObserver(entries=>{
            entries.forEach(e=>{
                if(e.isIntersecting){
                    const el = e.target; const target = +el.dataset.target; let cur=0; const inc=Math.max(1,Math.ceil(target/100));
                    const tick = () => { cur+=inc; if(cur>=target){ cur=target; } el.textContent=cur; if(cur<target){ requestAnimationFrame(tick); } };
                    tick();
                    obs.unobserve(el);
                }
            });
        },{ threshold:0.4 });
        values.forEach(v=>obs.observe(v));
    }

    // Chart build with compliant colors only
    function buildChart(){
        const ctx = document.getElementById('skillsChart');
        if(!ctx) return;
        const css = getComputedStyle(document.body);
        const accent = css.getPropertyValue('--accent').trim() || '#ff6a00';
        const text = css.getPropertyValue('--text').trim() || accent;
        if(window.skillsChart){ window.skillsChart.destroy(); }
        window.skillsChart = new Chart(ctx.getContext('2d'), {
            type:'radar',
            data:{
                labels:['Linux','C','Python','Docker','Security','Networking'],
                datasets:[{
                    label:'Proficiency',
                    data:[85,70,80,60,76,66],
                    backgroundColor:'rgba(255,106,0,0.18)',
                    borderColor:accent,
                    pointBackgroundColor:accent,
                    pointBorderColor:text
                }]
            },
            options:{
                responsive:true,
                plugins:{ legend:{ labels:{ color:text } } },
                scales:{
                    r:{
                        angleLines:{ color:'rgba(255,106,0,0.25)' },
                        grid:{ color:'rgba(255,106,0,0.25)' },
                        pointLabels:{ color:text, font:{ size:12 } },
                        ticks:{ display:false }
                    }
                }
            }
        });
    }

    // Form (client-side simulation)
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const valid = form.checkValidity();
        if(!valid){ formStatus.textContent = 'Please fill all required fields.'; return; }
        formStatus.textContent = 'Sending…';
        setTimeout(()=>{ formStatus.textContent='Message sent (simulated).'; form.reset(); },900);
    });

    // Year auto-fill
    const yr = document.getElementById('year'); if(yr) yr.textContent = new Date().getFullYear();

    // Init all
        // GitHub API integration for counters
        async function loadGitHubActivity(){
            const username = 'FussionPK';
            let repos = 13, followers = 2, commits = 100; // fallbacks match existing placeholders
            try {
                const userResp = await fetch(`https://api.github.com/users/${username}`);
                if(userResp.ok){
                    const userData = await userResp.json();
                    repos = userData.public_repos || repos;
                    followers = userData.followers || followers;
                }
                // Approximate commit count via recent public push events
                const eventsResp = await fetch(`https://api.github.com/users/${username}/events/public`);
                if(eventsResp.ok){
                    const events = await eventsResp.json();
                    let pushCommits = 0;
                    for(const ev of events){
                        if(ev.type === 'PushEvent' && ev.payload && Array.isArray(ev.payload.commits)){
                            pushCommits += ev.payload.commits.length;
                        }
                    }
                    // If we got any push commits, scale a simple heuristic (not total lifetime commits)
                    if(pushCommits > 0){
                        commits = Math.max(commits, pushCommits * 5); // heuristic multiplier
                    }
                }
            } catch(err){
                console.warn('GitHub activity fetch failed, using fallbacks', err);
            }
            // Update DOM data targets (order: commits, repos, followers)
            const values = document.querySelectorAll('.counter__value');
            if(values.length >= 3){
                values[0].dataset.target = commits;
                values[1].dataset.target = repos;
                values[2].dataset.target = followers;
                // reset visible numbers before animation
                values.forEach(v=>v.textContent='0');
            }
        }

        renderProjects();
        typeLoop();
        loadGitHubActivity().then(()=>{
            initCounters();
        });
        buildChart();
        // Smooth scrolling (custom eased for internal anchors)
        function smoothScroll(target){
            if(!target) return; const start = window.scrollY; const end = target.getBoundingClientRect().top + start - 10; // slight offset
            const duration = 650; const startTime = performance.now();
            function easeInOutQuad(t){ return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }
            function frame(now){
                const elapsed = now - startTime; const progress = Math.min(elapsed/duration,1); const eased = easeInOutQuad(progress);
                window.scrollTo(0, start + (end - start)*eased);
                if(progress < 1){ requestAnimationFrame(frame); }
            }
            requestAnimationFrame(frame);
        }
        document.querySelectorAll('a[href^="#"]').forEach(a=>{
            a.addEventListener('click',e=>{
                const hash = a.getAttribute('href');
                if(hash.length > 1){
                    const target = document.querySelector(hash);
                    if(target){
                        e.preventDefault();
                        // close mobile nav if open
                        if(window.matchMedia('(max-width:860px)').matches){
                            navToggle.setAttribute('aria-expanded','false');
                            navMenu.setAttribute('aria-hidden','true');
                        }
                        smoothScroll(target);
                    }
                }
            });
        });
})();
