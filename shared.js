/* ============================================================
   GLOSSARIO CLAUDE CODE — Shared Components
   Sidebar, search, mobile toggle, theme, Claudinho interativo
   ============================================================ */

function renderSidebar(activePage) {
  const nav = [
    { section: 'Comecar', items: [
      { label: 'Inicio', href: '/', id: 'home' },
      { label: 'Cursos Anthropic', href: '/pages/cursos.html', id: 'cursos' },
      { label: 'Meu Setup', href: '/pages/dashboard.html', id: 'dashboard' },
    ]},
    { section: 'Glossario', items: [
      { label: 'Conceitos basicos', href: '/pages/basicos.html', id: 'basicos' },
      { label: 'Ferramentas Claude Code', href: '/pages/ferramentas.html', id: 'ferramentas' },
      { label: 'Desenvolvimento', href: '/pages/desenvolvimento.html', id: 'desenvolvimento' },
      { label: 'Arquivos e estrutura', href: '/pages/arquivos.html', id: 'arquivos' },
      { label: 'Comandos', href: '/pages/comandos.html', id: 'comandos' },
      { label: 'IA e LLMs', href: '/pages/ia.html', id: 'ia' },
      { label: 'Git avancado', href: '/pages/git-avancado.html', id: 'git-avancado' },
      { label: 'Conceitos Web', href: '/pages/web.html', id: 'web' },
    ]},
  ];

  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <h2>Glossario</h2>
      <span>Claude Code</span>
    </div>

    <div class="search-box">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
      </svg>
      <input type="text" id="search-input" placeholder="Buscar termo...">
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
      <a href="https://anthropic.skilljar.com/" target="_blank">Anthropic Academy &#8599;</a>
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
  toggle.setAttribute('aria-label', 'Abrir menu');
  toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z" clip-rule="evenodd"/></svg>`;
  toggle.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  document.body.prepend(toggle);

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

/* ============================================================
   CLAUDINHO — Mascote interativo
   - Pisca a cada 20s
   - Foge do cursor (impossivel clicar)
   - Dicas a cada 18 min
   - Easter egg: 55s perseguindo = Pac-Man
   ============================================================ */

function renderClaudinho() {
  const basePath = window.location.pathname.includes('/pages/') ? '/..' : '';

  const container = document.createElement('div');
  container.className = 'claudinho';
  container.innerHTML = `
    <img class="claudinho-open" src="${basePath}/icons/claudinho-open.svg" alt="Claudinho">
    <img class="claudinho-closed" src="${basePath}/icons/claudinho-closed.svg" alt="Claudinho piscando">
  `;
  document.body.appendChild(container);

  // ── Position state — Claudinho fica SEMPRE no canto inferior direito ──
  // Area de dodge: 200px de largura x 150px de altura no canto inferior direito
  const CORNER_PADDING = 12;
  const DODGE_AREA_W = 200;
  const DODGE_AREA_H = 150;

  function getCornerBounds() {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    return {
      minX: window.innerWidth - DODGE_AREA_W - CORNER_PADDING,
      maxX: window.innerWidth - w - CORNER_PADDING,
      minY: window.innerHeight - DODGE_AREA_H - CORNER_PADDING,
      maxY: window.innerHeight - h - CORNER_PADDING,
    };
  }

  let bounds = getCornerBounds();
  let posX = bounds.maxX;
  let posY = bounds.maxY;
  container.style.position = 'fixed';
  container.style.bottom = 'auto';
  container.style.right = 'auto';
  container.style.left = posX + 'px';
  container.style.top = posY + 'px';

  // ── Blink every 20 seconds ──
  function doBlink() {
    container.classList.add('blink');
    setTimeout(() => { container.classList.remove('blink'); }, 120);
    setTimeout(() => { container.classList.add('blink'); }, 280);
    setTimeout(() => { container.classList.remove('blink'); }, 400);
  }
  setInterval(doBlink, 20000);
  setTimeout(doBlink, 3000);

  // ── Cursor dodge system — contido no canto inferior direito ──
  const DODGE_RADIUS = 100;
  let mouseX = -1000, mouseY = -1000;
  let chaseStartTime = 0;
  let isChasing = false;
  let chaseTimer = null;
  let pacmanUnlocked = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function getClaudinhoCenter() {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    return { x: posX + w / 2, y: posY + h / 2 };
  }

  function dodgeLoop() {
    const center = getClaudinhoCenter();
    const dx = center.x - mouseX;
    const dy = center.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < DODGE_RADIUS && dist > 0) {
      const angle = Math.atan2(dy, dx);
      const force = (DODGE_RADIUS - dist) / DODGE_RADIUS;
      const moveX = Math.cos(angle) * force * 25;
      const moveY = Math.sin(angle) * force * 25;

      // Clamp to corner bounds
      bounds = getCornerBounds();
      posX = Math.max(bounds.minX, Math.min(bounds.maxX, posX + moveX));
      posY = Math.max(bounds.minY, Math.min(bounds.maxY, posY + moveY));

      container.style.left = posX + 'px';
      container.style.top = posY + 'px';

      // Track chase time for easter egg
      if (!isChasing) {
        isChasing = true;
        chaseStartTime = Date.now();
        chaseTimer = setInterval(() => {
          if (Date.now() - chaseStartTime >= 55000 && !pacmanUnlocked) {
            pacmanUnlocked = true;
            clearInterval(chaseTimer);
            launchPacMan();
          }
        }, 500);
      }
    } else {
      // Mouse far away — reset chase, slowly drift back to home position
      if (isChasing) {
        isChasing = false;
        chaseStartTime = 0;
        if (chaseTimer) clearInterval(chaseTimer);
        chaseTimer = null;
      }
      // Gently return to default corner position
      bounds = getCornerBounds();
      const homeX = bounds.maxX;
      const homeY = bounds.maxY;
      posX += (homeX - posX) * 0.03;
      posY += (homeY - posY) * 0.03;
      container.style.left = posX + 'px';
      container.style.top = posY + 'px';
    }

    requestAnimationFrame(dodgeLoop);
  }

  requestAnimationFrame(dodgeLoop);

  // ── Tips every 18 minutes ──
  const tips = [
    "Sabia que o /ship salva e publica tudo num comando so?",
    "Dica: o agente Explore vasculha seu codigo inteiro em segundos.",
    "O Playwright testa seu site sozinho. Tipo um robo QA particular.",
    "Ta perdido no Git? O git-guide te salva sem drama.",
    "O /humanizer tira a cara de IA de qualquer texto.",
    "Memoria do Claude: ele lembra de voce entre conversas. Serio.",
    "O safe-guard checa se um comando e perigoso antes de rodar.",
    "Hooks rodam automaticamente. Voce nem precisa lembrar deles.",
    "O /frontend-design cria interfaces que nao parecem feitas por IA.",
    "MCP Servers conectam o Claude com Gmail, Calendar, Supabase...",
    "O agente ui-researcher define paleta, tipografia e tokens pra voce.",
    "Quer automatizar apresentacoes? O Deck Automator faz isso.",
    "O /simplify revisa seu codigo e sugere melhorias.",
    "Skills sao como manuais: o Claude le e segue as instrucoes.",
    "Voce tem 48 skills instaladas. Isso e poder de fogo serio.",
    "O nano-banana gera imagens com IA direto do terminal.",
    "Worktrees: o Claude trabalha numa copia sem mexer nos seus arquivos.",
    "O /loop roda qualquer comando de tempos em tempos. Tipo um cron.",
    "Subagentes: o Claude cria ajudantes que trabalham em paralelo.",
    "Tenta me pegar por 55 segundos e ve o que acontece...",
  ];

  let tipIndex = 0;
  let shuffledTips = [...tips].sort(() => Math.random() - 0.5);

  function showTip() {
    if (tipIndex >= shuffledTips.length) {
      shuffledTips = [...tips].sort(() => Math.random() - 0.5);
      tipIndex = 0;
    }

    // Remove existing tip
    const existing = document.querySelector('.claudinho-tip');
    if (existing) existing.remove();

    const bubble = document.createElement('div');
    bubble.className = 'claudinho-tip';
    bubble.textContent = shuffledTips[tipIndex++];

    document.body.appendChild(bubble);

    // Position above Claudinho
    const rect = container.getBoundingClientRect();
    bubble.style.left = Math.max(8, Math.min(rect.left - 40, window.innerWidth - 260)) + 'px';
    bubble.style.bottom = (window.innerHeight - rect.top + 8) + 'px';

    requestAnimationFrame(() => {
      bubble.classList.add('visible');
    });

    // Auto-close after 7s
    setTimeout(() => {
      bubble.classList.remove('visible');
      setTimeout(() => bubble.remove(), 300);
    }, 7000);

    // Close on click
    bubble.style.pointerEvents = 'auto';
    bubble.style.cursor = 'pointer';
    bubble.addEventListener('click', () => {
      bubble.classList.remove('visible');
      setTimeout(() => bubble.remove(), 300);
    });

    // Do a little blink when showing tip
    doBlink();
  }

  // First tip after 2 minutes, then every 18 minutes
  setTimeout(showTip, 120000);
  setInterval(showTip, 18 * 60 * 1000);

  // ── Resize handler ──
  window.addEventListener('resize', () => {
    bounds = getCornerBounds();
    posX = Math.max(bounds.minX, Math.min(bounds.maxX, posX));
    posY = Math.max(bounds.minY, Math.min(bounds.maxY, posY));
    container.style.left = posX + 'px';
    container.style.top = posY + 'px';
  });
}

/* ============================================================
   PAC-MAN DO CLAUDINHO
   Estilo Atari, terminal preto, sons 8-bit via Web Audio API
   ============================================================ */

function launchPacMan() {
  // Prevent duplicate
  if (document.querySelector('.pacman-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'pacman-overlay';
  overlay.innerHTML = `
    <div class="pacman-header">CLAUDINHO PAC-MAN</div>
    <canvas id="pacman-canvas" width="420" height="420"></canvas>
    <div class="pacman-score">SCORE: <span id="pac-score">0</span> | HIGH: <span id="pac-high">0</span></div>
    <button class="pacman-close">ESC</button>
    <div class="pacman-instructions">ARROW KEYS or WASD to move</div>
  `;
  document.body.appendChild(overlay);

  const canvas = document.getElementById('pacman-canvas');
  const ctx = canvas.getContext('2d');
  const closeBtn = overlay.querySelector('.pacman-close');
  const scoreEl = document.getElementById('pac-score');
  const highEl = document.getElementById('pac-high');

  let highScore = parseInt(localStorage.getItem('claudinho-pacman-high') || '0');
  highEl.textContent = highScore;

  // ── Audio system (Web Audio API) ──
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playTone(freq, duration, type, vol) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || 'square';
    osc.frequency.value = freq;
    gain.gain.value = vol || 0.08;
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playWaka() {
    playTone(200 + Math.random() * 200, 0.08, 'square', 0.06);
  }

  function playDeath() {
    [300, 250, 200, 150, 100].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.15, 'sawtooth', 0.1), i * 120);
    });
  }

  function playPowerUp() {
    [400, 500, 600, 800].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.1, 'square', 0.08), i * 80);
    });
  }

  // ── Background music (simple chiptune loop) ──
  let musicInterval = null;
  const melody = [262, 294, 330, 349, 392, 349, 330, 294];
  let melodyIdx = 0;

  function startMusic() {
    musicInterval = setInterval(() => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = melody[melodyIdx % melody.length];
      gain.gain.value = 0.03;
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
      melodyIdx++;
    }, 300);
  }

  function stopMusic() {
    if (musicInterval) clearInterval(musicInterval);
  }

  // ── Game constants ──
  const TILE = 20;
  const COLS = 21;
  const ROWS = 21;
  const FPS = 10;

  // Simple maze (1 = wall, 0 = path, 2 = token, 3 = power pellet)
  const MAP_TEMPLATE = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
    [1,3,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1],
    [1,1,1,1,2,1,1,1,0,1,1,1,0,1,1,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,1,1,0,0,0,1,1,0,1,2,1,1,1,1],
    [0,0,0,0,2,0,0,1,0,0,0,0,0,1,0,0,2,0,0,0,0],
    [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,0,0,0,0,0,0,0,0,1,2,1,1,1,1],
    [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
    [1,3,2,1,2,2,2,2,2,2,0,2,2,2,2,2,2,1,2,3,1],
    [1,1,2,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,2,1,1],
    [1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  ];

  let map, score, lives, player, ghosts, gameOver, gameWon;
  let wakaToggle = false;

  // Token symbols to draw
  const TOKEN_SYMBOLS = ['*', '+', '.', '~'];

  function resetGame() {
    map = MAP_TEMPLATE.map(row => [...row]);
    score = 0;
    lives = 3;
    gameOver = false;
    gameWon = false;
    player = { x: 10, y: 16, dir: 0, nextDir: 0, mouthOpen: true };
    ghosts = [
      { x: 9,  y: 10, dir: 0, color: '#ff6666', scared: false, scaredTimer: 0 },
      { x: 10, y: 10, dir: 1, color: '#66ccff', scared: false, scaredTimer: 0 },
      { x: 11, y: 10, dir: 2, color: '#ffcc66', scared: false, scaredTimer: 0 },
      { x: 10, y: 9,  dir: 3, color: '#ff99ff', scared: false, scaredTimer: 0 },
    ];
    scoreEl.textContent = '0';
    startMusic();
  }

  // Directions: 0=right, 1=down, 2=left, 3=up
  const DX = [1, 0, -1, 0];
  const DY = [0, 1, 0, -1];

  function canMove(x, y) {
    // Wrap around
    if (x < 0) x = COLS - 1;
    if (x >= COLS) x = 0;
    if (y < 0 || y >= ROWS) return false;
    return map[y][x] !== 1;
  }

  function moveEntity(entity) {
    let nx = entity.x + DX[entity.nextDir !== undefined ? entity.nextDir : entity.dir];
    let ny = entity.y + DY[entity.nextDir !== undefined ? entity.nextDir : entity.dir];

    // Wrap
    if (nx < 0) nx = COLS - 1;
    if (nx >= COLS) nx = 0;

    if (entity.nextDir !== undefined && canMove(nx, ny)) {
      entity.dir = entity.nextDir;
      entity.x = nx;
      entity.y = ny;
    } else {
      nx = entity.x + DX[entity.dir];
      ny = entity.y + DY[entity.dir];
      if (nx < 0) nx = COLS - 1;
      if (nx >= COLS) nx = 0;
      if (canMove(nx, ny)) {
        entity.x = nx;
        entity.y = ny;
      }
    }
  }

  function moveGhost(ghost) {
    // Simple AI: random direction changes, bias toward player
    const possibleDirs = [];
    for (let d = 0; d < 4; d++) {
      let nx = ghost.x + DX[d];
      let ny = ghost.y + DY[d];
      if (nx < 0) nx = COLS - 1;
      if (nx >= COLS) nx = 0;
      if (canMove(nx, ny)) possibleDirs.push(d);
    }

    if (possibleDirs.length === 0) return;

    // 40% chance to move toward player, 60% random
    if (Math.random() < 0.4 && !ghost.scared) {
      const dx = player.x - ghost.x;
      const dy = player.y - ghost.y;
      let preferred;
      if (Math.abs(dx) > Math.abs(dy)) {
        preferred = dx > 0 ? 0 : 2;
      } else {
        preferred = dy > 0 ? 1 : 3;
      }
      if (possibleDirs.includes(preferred)) {
        ghost.dir = preferred;
      } else {
        ghost.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
      }
    } else {
      // If scared, try to move away from player
      if (ghost.scared) {
        const dx = player.x - ghost.x;
        const dy = player.y - ghost.y;
        let away;
        if (Math.abs(dx) > Math.abs(dy)) {
          away = dx > 0 ? 2 : 0;
        } else {
          away = dy > 0 ? 3 : 1;
        }
        if (possibleDirs.includes(away)) {
          ghost.dir = away;
        } else {
          ghost.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        }
      } else {
        ghost.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
      }
    }

    let nx = ghost.x + DX[ghost.dir];
    let ny = ghost.y + DY[ghost.dir];
    if (nx < 0) nx = COLS - 1;
    if (nx >= COLS) nx = 0;
    if (canMove(nx, ny)) {
      ghost.x = nx;
      ghost.y = ny;
    }
  }

  function update() {
    if (gameOver || gameWon) return;

    // Move player
    moveEntity(player);
    player.mouthOpen = !player.mouthOpen;

    // Collect tokens
    const tile = map[player.y] && map[player.y][player.x];
    if (tile === 2) {
      map[player.y][player.x] = 0;
      score += 10;
      wakaToggle = !wakaToggle;
      if (wakaToggle) playWaka();
    } else if (tile === 3) {
      map[player.y][player.x] = 0;
      score += 50;
      playPowerUp();
      ghosts.forEach(g => { g.scared = true; g.scaredTimer = 30; });
    }

    scoreEl.textContent = score;

    // Move ghosts
    ghosts.forEach(g => {
      moveGhost(g);
      if (g.scared) {
        g.scaredTimer--;
        if (g.scaredTimer <= 0) g.scared = false;
      }
    });

    // Check collision with ghosts
    ghosts.forEach(g => {
      if (g.x === player.x && g.y === player.y) {
        if (g.scared) {
          // Eat ghost
          score += 200;
          playTone(600, 0.2, 'square', 0.1);
          g.x = 10; g.y = 10; g.scared = false;
        } else {
          lives--;
          playDeath();
          if (lives <= 0) {
            gameOver = true;
            stopMusic();
            if (score > highScore) {
              highScore = score;
              localStorage.setItem('claudinho-pacman-high', highScore.toString());
              highEl.textContent = highScore;
            }
          } else {
            player.x = 10; player.y = 16;
          }
        }
      }
    });

    // Check win
    let hasTokens = false;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (map[y][x] === 2 || map[y][x] === 3) { hasTokens = true; break; }
      }
      if (hasTokens) break;
    }
    if (!hasTokens) {
      gameWon = true;
      stopMusic();
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('claudinho-pacman-high', highScore.toString());
        highEl.textContent = highScore;
      }
    }
  }

  function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw map
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const tile = map[y][x];
        const px = x * TILE;
        const py = y * TILE;

        if (tile === 1) {
          ctx.fillStyle = '#1a2744';
          ctx.fillRect(px, py, TILE, TILE);
          ctx.strokeStyle = '#2a4a8a';
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 0.5, py + 0.5, TILE - 1, TILE - 1);
        } else if (tile === 2) {
          // Token — small symbol
          ctx.fillStyle = '#e08a6d';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(TOKEN_SYMBOLS[(x + y) % TOKEN_SYMBOLS.length], px + TILE/2, py + TILE/2);
        } else if (tile === 3) {
          // Power pellet — big pulsing dot
          const pulse = Math.sin(Date.now() / 200) * 2 + 6;
          ctx.fillStyle = '#e08a6d';
          ctx.beginPath();
          ctx.arc(px + TILE/2, py + TILE/2, pulse, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Draw player (Claudinho as Pac-Man shape)
    const ppx = player.x * TILE + TILE / 2;
    const ppy = player.y * TILE + TILE / 2;
    const mouthAngle = player.mouthOpen ? 0.3 : 0.05;
    const startAngle = player.dir * Math.PI / 2 + mouthAngle;
    const endAngle = player.dir * Math.PI / 2 - mouthAngle + Math.PI * 2;

    ctx.fillStyle = '#e08a6d';
    ctx.beginPath();
    ctx.arc(ppx, ppy, TILE / 2 - 1, startAngle, endAngle);
    ctx.lineTo(ppx, ppy);
    ctx.closePath();
    ctx.fill();

    // Eye
    const eyeAngle = player.dir * Math.PI / 2 - Math.PI / 4;
    const eyeX = ppx + Math.cos(eyeAngle) * 4;
    const eyeY = ppy + Math.sin(eyeAngle) * 4;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw ghosts (Claudinho outline style)
    ghosts.forEach(g => {
      const gx = g.x * TILE + TILE / 2;
      const gy = g.y * TILE + TILE / 2;
      const color = g.scared ? '#4444ff' : g.color;

      // Ghost body (classic shape)
      ctx.fillStyle = g.scared ? 'transparent' : color;
      ctx.strokeStyle = g.scared ? '#ffffff' : color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(gx, gy - 2, 7, Math.PI, 0);
      ctx.lineTo(gx + 7, gy + 6);
      // Wavy bottom
      ctx.lineTo(gx + 5, gy + 3);
      ctx.lineTo(gx + 2, gy + 6);
      ctx.lineTo(gx, gy + 3);
      ctx.lineTo(gx - 2, gy + 6);
      ctx.lineTo(gx - 5, gy + 3);
      ctx.lineTo(gx - 7, gy + 6);
      ctx.lineTo(gx - 7, gy - 2);
      ctx.closePath();
      if (g.scared) {
        ctx.stroke();
      } else {
        ctx.fill();
      }

      // Eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(gx - 3, gy - 3, 2.5, 0, Math.PI * 2);
      ctx.arc(gx + 3, gy - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = g.scared ? '#fff' : '#000';
      ctx.beginPath();
      ctx.arc(gx - 3, gy - 3, 1, 0, Math.PI * 2);
      ctx.arc(gx + 3, gy - 3, 1, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw lives
    for (let i = 0; i < lives; i++) {
      ctx.fillStyle = '#e08a6d';
      ctx.beginPath();
      ctx.arc(16 + i * 20, canvas.height - 8, 6, 0.3, Math.PI * 2 - 0.3);
      ctx.lineTo(16 + i * 20, canvas.height - 8);
      ctx.closePath();
      ctx.fill();
    }

    // Game over / win text
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff4444';
      ctx.font = '28px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 16);
      ctx.fillStyle = '#888';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('Press ENTER to restart', canvas.width / 2, canvas.height / 2 + 20);
    }

    if (gameWon) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e08a6d';
      ctx.font = '24px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('VOCE VENCEU!', canvas.width / 2, canvas.height / 2 - 16);
      ctx.fillStyle = '#888';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('Press ENTER to play again', canvas.width / 2, canvas.height / 2 + 20);
    }
  }

  // ── Input ──
  function handleKey(e) {
    if (e.key === 'Escape') {
      closeGame();
      return;
    }

    if ((gameOver || gameWon) && e.key === 'Enter') {
      resetGame();
      return;
    }

    switch(e.key) {
      case 'ArrowRight': case 'd': case 'D': player.nextDir = 0; break;
      case 'ArrowDown':  case 's': case 'S': player.nextDir = 1; break;
      case 'ArrowLeft':  case 'a': case 'A': player.nextDir = 2; break;
      case 'ArrowUp':    case 'w': case 'W': player.nextDir = 3; break;
    }
    e.preventDefault();
  }

  document.addEventListener('keydown', handleKey);
  closeBtn.addEventListener('click', closeGame);

  let gameLoop;

  function closeGame() {
    stopMusic();
    clearInterval(gameLoop);
    document.removeEventListener('keydown', handleKey);
    overlay.remove();
    audioCtx.close().catch(() => {});
  }

  // ── Start ──
  resetGame();

  // Startup sound
  playPowerUp();

  gameLoop = setInterval(() => {
    update();
    draw();
  }, 1000 / FPS);

  draw();
}

// ── Init ──
renderMobileToggle();
renderThemeToggle();
renderClaudinho();
