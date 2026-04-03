/* ============================================================
   GLOSSÁRIO CLAUDE CODE — Shared Components
   Sidebar, search, mobile toggle, active state
   ============================================================ */

function renderSidebar(activePage) {
  const nav = [
    { section: 'Começar', items: [
      { label: 'Início', href: '/', id: 'home' },
      { label: 'Cursos Anthropic', href: '/pages/cursos.html', id: 'cursos' },
      { label: 'Meu Setup', href: '/pages/dashboard.html', id: 'dashboard' },
    ]},
    { section: 'Glossário', items: [
      { label: 'Conceitos básicos', href: '/pages/basicos.html', id: 'basicos' },
      { label: 'Ferramentas Claude Code', href: '/pages/ferramentas.html', id: 'ferramentas' },
      { label: 'Desenvolvimento', href: '/pages/desenvolvimento.html', id: 'desenvolvimento' },
      { label: 'Arquivos e estrutura', href: '/pages/arquivos.html', id: 'arquivos' },
      { label: 'Comandos', href: '/pages/comandos.html', id: 'comandos' },
    ]},
  ];

  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <h2>Glossário</h2>
      <span>Claude Code</span>
    </div>

    <div class="search-box">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
      </svg>
      <input type="text" id="search-input" placeholder="Buscar termo…">
    </div>

    <nav class="sidebar-nav">
      ${nav.map(group => `
        <div class="sidebar-section">
          <div class="sidebar-section-label">${group.section}</div>
          ${group.items.map(item => `
            <a class="sidebar-link ${item.id === activePage ? 'active' : ''}" href="${item.href}">
              ${item.label}
            </a>
          `).join('')}
        </div>
      `).join('')}
    </nav>

    <div class="sidebar-footer">
      <a href="https://anthropic.skilljar.com/" target="_blank">Anthropic Academy ↗</a>
    </div>
  `;

  // Search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const rows = document.querySelectorAll('.term-row');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = q === '' || text.includes(q) ? '' : 'none';
    });
  });
}

function renderMobileToggle() {
  const toggle = document.createElement('button');
  toggle.className = 'mobile-toggle';
  toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z" clip-rule="evenodd"/></svg>`;
  toggle.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  document.body.prepend(toggle);

  // Close sidebar on link click (mobile)
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}

function renderThemeToggle() {
  const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Alternar tema');

  const saved = localStorage.getItem('glossario-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function updateIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark ? sunSVG : moonSVG;
  }

  updateIcon();

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('glossario-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('glossario-theme', 'dark');
    }
    updateIcon();
  });

  document.body.appendChild(btn);
}

function renderClaudinho() {
  // Determine base path (root or pages/)
  const isSubpage = window.location.pathname.includes('/pages/');
  const basePath = isSubpage ? '/..' : '';

  const container = document.createElement('div');
  container.className = 'claudinho';
  container.setAttribute('aria-label', 'Voltar ao topo');
  container.setAttribute('title', 'Voltar ao topo');
  container.innerHTML = `
    <img class="claudinho-open" src="${basePath}/icons/claudinho-open.svg" alt="Claudinho">
    <img class="claudinho-closed" src="${basePath}/icons/claudinho-closed.svg" alt="Claudinho piscando">
  `;

  // Back to top + jump
  container.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    container.classList.add('jump');
    container.addEventListener('animationend', () => {
      container.classList.remove('jump');
    }, { once: true });
  });

  document.body.appendChild(container);

  // Blink: 2 rapid blinks every 35 seconds
  function doBlink() {
    container.classList.add('blink');
    setTimeout(() => { container.classList.remove('blink'); }, 120);
    setTimeout(() => { container.classList.add('blink'); }, 280);
    setTimeout(() => { container.classList.remove('blink'); }, 400);
  }

  setInterval(doBlink, 35000);
  // First blink after 4 seconds
  setTimeout(doBlink, 4000);
}

// Run immediately — script is loaded at end of body
renderMobileToggle();
renderThemeToggle();
renderClaudinho();
