# Glossário Claude Code — Roadmap de Evolução

> Relatório compilado em 2026-04-03.
> Este documento organiza todas as melhorias pendentes, bugs, e próximas etapas do projeto.
> O objetivo é ir alimentando o glossário ao longo do tempo, de forma incremental.

---

## Como referenciar este projeto

Para retomar o trabalho em qualquer conversa futura, diga algo como:

- "Quero trabalhar no glossário" ou "abre o projeto glossario-claude"
- O projeto fica em: `/Users/fernandoostlund/glossario-claude`
- Deploy: `glossario-claudinho.vercel.app`
- Stack: HTML/CSS/JS puro (sem framework), Vercel hosting

---

## 1. Bugs e correções urgentes

### 1.1 Busca do Dashboard não dispara corretamente
- **O quê**: O campo de busca na página "Meu Setup" não filtra os cards ao digitar.
- **Causa provável**: O event listener é registrado inline no `<script>` ao final do HTML, mas o `input` event pode não estar propagando corretamente após interação com os filtros.
- **Onde**: `pages/dashboard.html`, linhas 895-924 (script inline)
- **Ação**: Debugar o JS, testar se o evento `input` está sendo capturado. Considerar mover para arquivo externo `dashboard.js`.

### 1.2 Mobile — hierarquia tipográfica invertida
- **O quê**: Na versão mobile, o subtítulo (`.page-desc`, 18px) fica proporcionalmente maior que o título (`.page-title`, reduzido para 40px).
- **Onde**: `styles.css`, media query `@media (max-width: 860px)` — falta regra para `.page-desc`.
- **Ação**: Adicionar `.page-desc { font-size: 14px; }` dentro do breakpoint mobile.

### 1.3 Mobile — Claudinho sobrepondo texto
- **O quê**: O mascote fica por cima do conteúdo em telas pequenas.
- **Onde**: `styles.css`, linha 511 (`width: 48px; bottom: 16px; right: 16px;`)
- **Ação**: Reduzir para `width: 36px` em telas < 480px, ou adicionar `pointer-events: none` ao container de texto quando Claudinho está sobrepondo. Considerar esconder em telas muito pequenas.

---

## 2. Melhorias de UX/UI

### 2.1 Página interna para cada item do Setup
- **O quê**: Cada skill, agente, hook e MCP deve ser clicável, abrindo uma página interna com:
  - Explicação detalhada em linguagem simples ("como se explicasse para uma criança de 5 anos")
  - Exemplos práticos de uso
  - Contexto de quando usar e quando não usar
  - Print ou GIF mostrando o resultado
- **Volume**: ~65 páginas internas (48 skills + 12 agentes + 1 hook + 4 MCPs)
- **Sugestão de implementação por fases**:
  - Fase 1: Template HTML para página de detalhe + 5 páginas piloto (ship, frontend-design, dangerous-command-guard, Playwright, time-optimizer)
  - Fase 2: Gerar as demais em lotes de 10-15

### 2.2 Humanizar TODOS os textos
- **O quê**: Rodar `/humanizer` em todo o conteúdo do site. Problemas atuais:
  - Uso excessivo de travessões (—)
  - Linguagem formal demais, tom de IA
  - Falta de personalidade e voz própria
  - Descrições muito secas nos cards do dashboard
- **Ação**: Reescrever textos com tom conversacional, como se o Fernando estivesse explicando para um amigo designer que nunca viu código.

### 2.3 Breakpoint adicional para mobile pequeno
- **O quê**: Só existe 1 breakpoint (860px). Falta um para celulares pequenos.
- **Ação**: Adicionar `@media (max-width: 480px)` com ajustes finos de font-size, padding e spacing.

### 2.4 Transições suaves ao filtrar/buscar
- **O quê**: Quando filtra ou busca no dashboard, os cards aparecem/desaparecem instantaneamente.
- **Ação**: Adicionar `transition: opacity 0.2s ease` nas seções e categorias.

---

## 3. Novos termos para o Glossário (72 termos pesquisados)

### 3.1 Conceitos de IA / LLM (12 termos)
| Termo | Definição curta |
|-------|----------------|
| Temperature | Controla o quão "criativo" ou "previsível" o modelo é. Alta = mais variado. Baixa = mais seguro. |
| System Prompt | Instrução invisível que define como a IA se comporta. Um briefing antes de começar. |
| Few-shot | Dar exemplos no prompt para a IA entender o padrão que você quer. |
| Zero-shot | Pedir algo sem dar nenhum exemplo. Ela tenta entender só pela instrução. |
| RAG | A IA busca info em documentos externos antes de responder, em vez de confiar só na memória. |
| Embeddings | Transformar texto em números para a IA comparar significados. Coordenadas num mapa de palavras. |
| Fine-tuning | Treinar um modelo com dados específicos. Aulas particulares para a IA. |
| Alucinação | Quando a IA inventa informação com cara de verdade. Parece confiante, mas está errada. |
| Grounding | Técnicas para manter a IA ancorada em fatos reais. |
| Streaming | Resposta aparece palavra por palavra em tempo real. |
| Latência | Tempo de espera entre enviar o prompt e receber resposta. |
| Janela de Contexto | Tamanho máximo de texto que a IA consegue "ver" de uma vez. |

### 3.2 Conceitos do Claude Code (8 termos)
| Termo | Definição curta |
|-------|----------------|
| Session | Uma conversa contínua. Fecha e abre = sessão nova, mas memória e arquivos continuam. |
| Permissions | Sistema de segurança: o Claude pede autorização antes de executar certas ações. |
| Sandbox | Ambiente isolado onde o Claude roda coisas sem afetar seu computador. |
| Tool Use | Quando a IA chama funções externas (ler arquivo, buscar na web) em vez de só gerar texto. |
| Artifacts | Peças de conteúdo que a IA gera e você pode usar: código, HTML, imagens, documentos. |
| Compact | Quando a conversa fica grande, o Claude resume o histórico para liberar espaço. |
| Custo | Cada mensagem gasta tokens, e tokens custam dinheiro. Opus custa mais que Haiku. |
| Slash Command | Comandos que começam com "/" como /help ou /clear. Atalhos para ações rápidas. |

### 3.3 Conceitos de Desenvolvimento (16 termos)
| Termo | Definição curta |
|-------|----------------|
| Variável de Ambiente | Valor secreto guardado fora do código (senhas, chaves). Fica no .env. |
| Localhost | Seu computador funcionando como servidor. Só existe na sua máquina. |
| Porta | Número que identifica qual serviço está rodando. O "apartamento" do prédio. |
| Servidor | Computador que espera pedidos e manda respostas. |
| Cliente | O lado que faz o pedido. Seu navegador é um cliente. |
| Endpoint | Endereço específico de uma API. O "balcão" certo numa loja. |
| REST | Padrão para APIs usando URLs e verbos (GET, POST). |
| Webhook | Aviso automático que um serviço manda para outro quando algo acontece. |
| Middleware | Código no meio do caminho entre pedido e resposta. |
| CI/CD | Automação que testa e publica código toda vez que você faz push. |
| Docker | Empacota seu projeto com tudo que precisa para rodar em qualquer lugar. |
| Container | A "caixa" isolada que o Docker cria para rodar seu projeto. |
| Cron Job | Tarefa agendada que roda sozinha. Despertador para o computador. |
| Runtime | Momento em que o código está rodando de verdade. |
| Dependência | Pacote externo que seu projeto precisa. O node_modules está cheio delas. |
| Compilar | Transformar código humano em algo que a máquina entende. |

### 3.4 Conceitos de Git avançado (13 termos)
| Termo | Definição curta |
|-------|----------------|
| Branch | Versão paralela do projeto para experimentar sem bagunçar o principal. |
| Merge | Juntar uma branch de volta na principal. |
| Pull Request | Pedido para que suas mudanças sejam revisadas antes de publicar. |
| Fork | Cópia independente de um projeto no GitHub. |
| Clone | Baixar cópia completa de um repositório para sua máquina. |
| Diff | Diferença entre duas versões. Mostra o que mudou. |
| Stash | Guardar mudanças temporariamente sem commit. Colocar no bolso. |
| Conflito | Duas pessoas mudaram a mesma linha. Git não sabe qual manter. |
| Rebase | Reorganizar histórico de commits. Deixa mais limpo. |
| .gitignore | Arquivo que diz ao Git o que ignorar (node_modules, .env). |
| HEAD | Ponteiro que indica em qual commit você está agora. |
| Staging Area | Área intermediária entre editar e fazer commit. |
| Remote / Origin | O repositório na nuvem (GitHub). |

### 3.5 Conceitos Web (10 termos)
| Termo | Definição curta |
|-------|----------------|
| DOM | Estrutura da página HTML como árvore. JavaScript mexe no DOM. |
| Responsivo | Design que se adapta a diferentes tamanhos de tela. |
| Viewport | Área visível da tela do usuário. |
| Breakpoint | Ponto onde o layout muda para outro tamanho de tela. |
| CDN | Servidores espalhados que entregam arquivos mais rápido. |
| SSL / HTTPS | Cadeado verde. Conexão criptografada e segura. |
| DNS | Traduz nomes de site para endereços IP. Agenda telefônica da internet. |
| Cookie | Arquivo que o site guarda no navegador para lembrar de você. |
| Cache | Cópia local para carregar mais rápido na próxima vez. |
| URL / Route | Endereço completo de uma página. Route é o pedaço depois do domínio. |

### 3.6 Conceitos de Arquivo / Sistema (8 termos)
| Termo | Definição curta |
|-------|----------------|
| stdout / stderr | Saída normal de um comando vs saída de erros. Dois canais separados. |
| Pipe | Conecta saída de um comando na entrada de outro. |
| Flag / Argumento | Opções extras num comando. Em "ls -la", o "-la" é uma flag. |
| Binário | Arquivo executável que o computador roda. Não é legível por humanos. |
| Symlink | Atalho que aponta para outro arquivo ou pasta. |
| chmod | Comando que muda permissões de arquivo. |
| Processo | Programa rodando na máquina. Cada aba do navegador é um processo. |
| Exit Code | Número que um comando retorna. 0 = deu certo. Outro = deu errado. |

### 3.7 Workflow e Automação (5 termos)
| Termo | Definição curta |
|-------|----------------|
| Workflow | Sequência de passos para completar uma tarefa. Manual ou automatizado. |
| Pipeline | Workflow automatizado onde cada etapa alimenta a próxima. |
| Build | Processo de transformar código-fonte em algo pronto para publicar. |
| Linter | Ferramenta que verifica erros de estilo no código. Corretor ortográfico para programadores. |
| Hot Reload | Navegador atualiza sozinho enquanto você edita o código. |

---

## 4. Auditoria técnica completa

### 4.1 Acessibilidade
- [ ] Botões sem `:focus` / `:focus-visible` (mobile-toggle, theme-toggle, dash-filter)
- [ ] Inputs com `outline: none` sem alternativa de foco
- [ ] Filtros do dashboard sem `aria-pressed` para screen readers
- [ ] Contraste do accent (#d97757) sobre sidebar bg (#f5f4ef) = 5.2:1 (falha WCAG AA para texto pequeno)
- [ ] Mobile toggle sem `aria-label`

### 4.2 Performance
- [ ] ~25 cores hardcoded em vez de CSS variables (dificulta manutenção dark mode)
- [ ] 11 pesos de fonte sendo carregados (poderia ser 6-7)
- [ ] CSS duplicado: `.search-box` e `.dash-search` são quase idênticos
- [ ] JavaScript inline no dashboard.html deveria ser arquivo separado

### 4.3 Código
- [ ] Sem sistema de spacing (gaps hardcoded: 32px, 16px, 12px sem lógica)
- [ ] Sem null checks no JavaScript (`getElementById` pode falhar silenciosamente)
- [ ] Inline styles repetidos no index.html (`style="color: var(--accent);"` x7)
- [ ] Falta segundo breakpoint para celulares pequenos (480px)

---

## 5. Visão de futuro — novas funcionalidades

### 5.1 Abas/seções planejadas
- [ ] **Meus Processos** — workflows pessoais do Fernando documentados
- [ ] **Meus Workflows** — tipos de workflow (design, dev, publicação)
- [ ] **Links úteis** — vídeos do YouTube, ferramentas, referências
- [ ] **Recursos** — links para documentação, cursos, comunidades

### 5.2 Estrutura ideal
O glossário vai evoluir de "mini-site de referência" para "base de conhecimento pessoal":
```
glossario-claude/
├── index.html              (home)
├── pages/
│   ├── cursos.html          (cursos Anthropic)
│   ├── dashboard.html       (meu setup)
│   ├── basicos.html         (termos básicos)
│   ├── ferramentas.html     (termos ferramentas)
│   ├── desenvolvimento.html (termos dev)
│   ├── arquivos.html        (termos arquivos)
│   ├── comandos.html        (termos comandos)
│   ├── ia.html              (NOVO: termos de IA/LLM)
│   ├── git-avancado.html    (NOVO: termos Git avançados)
│   ├── web.html             (NOVO: termos Web)
│   ├── workflows.html       (NOVO: processos e workflows)
│   ├── links.html           (NOVO: vídeos, ferramentas, recursos)
│   └── setup/               (NOVO: páginas de detalhe)
│       ├── ship.html
│       ├── frontend-design.html
│       ├── playwright.html
│       └── ... (65 páginas)
```

---

## 6. Ordem sugerida de implementação

### Sprint 1 — Correções urgentes
1. Fix mobile typography (page-desc responsive)
2. Fix Claudinho overlap no mobile
3. Fix busca do dashboard
4. Adicionar breakpoint 480px

### Sprint 2 — Qualidade de texto
5. Rodar /humanizer em todos os textos existentes
6. Reescrever descrições do dashboard com tom conversacional

### Sprint 3 — Novos termos
7. Criar página ia.html (12 termos IA/LLM)
8. Criar página git-avancado.html (13 termos)
9. Criar página web.html (10 termos)
10. Expandir páginas existentes com termos faltantes

### Sprint 4 — Páginas de detalhe
11. Criar template de página interna para items do setup
12. Gerar 5 páginas piloto
13. Escalar para as demais

### Sprint 5 — Novas seções
14. Workflows e processos pessoais
15. Links e recursos (YouTube, ferramentas)
16. Melhorias de acessibilidade e performance

---

## 7. Referência rápida do projeto

| Item | Valor |
|------|-------|
| **Diretório** | `/Users/fernandoostlund/glossario-claude` |
| **URL** | `glossario-claudinho.vercel.app` |
| **Stack** | HTML + CSS + JS (sem framework) |
| **Fontes** | Crimson Pro, Outfit, Inter, JetBrains Mono |
| **Cores** | Accent `#d97757`, BG `#faf9f5` / `#1a1a19` |
| **Deploy** | Vercel (via `/ship`) |
| **Mascote** | Claudinho (SVG, pisca a cada 35s) |
