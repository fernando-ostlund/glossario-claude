# CLAUDE.md — Glossario Claude Code

## Sobre o projeto

Base de conhecimento pessoal do Fernando Ostlund. Site estatico em HTML/CSS/JS puro, deployado na Vercel.

- **Diretorio:** `/Users/fernandoostlund/glossario-claude`
- **URL:** `glossario-claudinho.vercel.app`
- **Vercel project:** configurado via `vercel.json` (cleanUrls, sem trailing slash)

## Estrutura de arquivos

```
glossario-claude/
├── index.html          Home com navegacao rapida
├── styles.css          Todos os estilos (light + dark mode)
├── shared.js           Sidebar, search, theme toggle, Claudinho mascote
├── favicon.svg         Icone do site
├── vercel.json         Config de deploy
├── ROADMAP.md          Backlog completo com bugs, termos novos, sprints
├── icons/              SVGs do Claudinho e icones Lucide
└── pages/
    ├── cursos.html       Roteiro de cursos Anthropic Academy
    ├── basicos.html      Termos basicos (CLI, terminal, IDE...)
    ├── ferramentas.html  Termos de ferramentas (skill, agent, MCP...)
    ├── desenvolvimento.html  Termos de dev (Git, API, framework...)
    ├── arquivos.html     Tipos de arquivo (.md, .tsx, .env...)
    ├── comandos.html     Comandos do terminal (ls, cd, git push...)
    └── dashboard.html    Dashboard "Meu Setup" (skills, agentes, hooks, MCPs)
```

## Design system

- **Fontes:** Crimson Pro (titulos), Outfit (subtitulos), Inter (corpo), JetBrains Mono (codigo)
- **Cores light:** bg `#faf9f5`, card `#ffffff`, text `#3d3d3a`, accent `#d97757`
- **Cores dark:** bg `#1a1a19`, card `#232322`, text `#c8c6be`, accent `#e08a6d`
- **Sidebar:** fixa, 260px, com busca e navegacao
- **Botoes:** pill shape (border-radius: 100px)
- **Breakpoint mobile:** 860px (precisa de segundo em 480px)

## Regras para trabalhar neste projeto

1. **Tom de voz:** linguagem simples, conversacional, sem jargao. Como se estivesse explicando para um amigo que nunca viu codigo. Sempre rodar `/humanizer` nos textos antes de publicar.
2. **Sem framework:** este projeto e HTML/CSS/JS puro. Nao adicionar React, Tailwind, bundlers ou qualquer dependencia.
3. **Dark mode obrigatorio:** toda nova feature ou pagina deve funcionar nos dois temas. Usar CSS variables existentes.
4. **Responsivo:** testar em mobile (860px e 480px). Claudinho nao pode sobrepor texto.
5. **Consistencia visual:** seguir o design system existente. Nao inventar cores ou fontes novas.
6. **Cada pagina e standalone:** todas importam `styles.css` e `shared.js`. Sidebar e gerada via `renderSidebar('id-da-pagina')`.
7. **Deploy via /ship:** nunca fazer push manual. Usar sempre o workflow `/ship`.
8. **ROADMAP.md e a fonte de verdade:** antes de implementar algo novo, consultar o roadmap. Depois de implementar, atualizar o roadmap.
9. **Datas:** sempre incluir data (YYYY-MM-DD) em relatorios, changelogs e entradas do roadmap.
10. **Acessibilidade:** novos elementos interativos precisam de aria-label, focus states e contraste adequado.

## Contexto do Fernando

Fernando e designer e fundador da OneGoodDesign. Nao e programador. Usa Claude Code como ferramenta principal de trabalho. Este glossario e a base de consulta dele para tudo que encontra no dia a dia. O projeto vai crescer continuamente com novos termos, paginas de detalhe, workflows pessoais, links de referencia e recursos.

## Proximos passos

Consultar `ROADMAP.md` para a lista completa de sprints organizadas por prioridade.
