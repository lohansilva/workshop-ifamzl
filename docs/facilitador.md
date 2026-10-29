# 🎤 Guia do facilitador

Material de apoio para conduzir a oficina de 1 hora. O roteiro que os alunos seguem é o [README](../README.md).

| | |
|---|---|
| **Público** | Estudantes com noções básicas de programação e Git |
| **Duração** | 60 min, mão na massa |
| **Ferramentas** | GitHub Codespaces + GitHub Copilot (plano Free ou Student), sem instalar nada |
| **Resultado** | Cada aluno sai com um repositório próprio (specs, código e histórico de commits) e o jogo publicado no GitHub Pages |
| **Mensagem central** | *A IA escreve; você especifica, revisa e decide.* |

---

## 1. Preparação

### Duas semanas antes

- [ ] Publique este repositório na sua conta (ou organização) e marque **Settings → General → Template repository**.
- [ ] Envie aos alunos a [mensagem pré-oficina](#5-mensagem-pré-oficina). A verificação do GitHub Education pode levar dias.

### Uma semana antes: ensaio (não pule)

- [ ] Faça a oficina inteira com uma conta **Copilot Free**, de preferência uma conta nova, cronometrando cada passo.
- [ ] No fim, confira o consumo de cota clicando no ícone do Copilot na barra de status do editor. É isso que diz se o plano Free aguenta o roteiro. O roteiro completo usa cerca de 15 interações com o agente. Se a cota ficar no limite, corte o "teste rápido" do Passo 0, os refinamentos opcionais e o bônus.
- [ ] Guarde o resultado do ensaio como **plano B**: crie no repositório do template uma branch `gabarito` com as specs e o código do ensaio. Quem usa o template recebe só a `main`, mas qualquer pessoa consegue consultar a branch pelo GitHub.
- [ ] Se a oficina for em laboratório, teste a rede. Estes domínios precisam estar liberados:
  - `github.com`;
  - `*.github.dev` e `*.app.github.dev` (Codespaces e a porta do jogo);
  - `*.githubcopilot.com` (Copilot);
  - `registry.npmjs.org` (servidor local via `npx`).

### No dia

- [ ] Projete o README do template na tela.
- [ ] Peça para os alunos fazerem o **Passo 0** enquanto o pessoal chega. Criar o Codespace é a etapa mais lenta.
- [ ] Deixe o seu Codespace aberto para demonstrar cada fase ao vivo, sempre um passo à frente da turma.

---

## 2. Roteiro minuto a minuto

| Tempo | Bloco | O que você faz | Mensagem-chave |
|---|---|---|---|
| 0:00–0:05 | Abertura | Mostre o jogo do ensaio rodando no Pages e explique *vibe coding* × SDD com o diagrama do README. | "Hoje vocês não vão programar: vão **especificar e revisar**. Quem digita o código é o Copilot." |
| 0:05–0:12 | Passo 0 | Circule ajudando quem travou na criação do Codespace ou no login do Copilot. Abra `.github/copilot-instructions.md` na tela. | "Esse arquivo é o contexto que a IA lê em **toda** conversa. É a memória do projeto." |
| 0:12–0:14 | Passo 1 | Leia a `IDEIA.md` em voz alta. | "Ideia vaga gera código vago." |
| 0:14–0:24 | Passo 2 | Rode `/1-requisitos` na sua tela, escolha um critério EARS e pergunte à turma: "dá para testar isso jogando?". | "Revisar 40 linhas de requisito é muito mais barato que revisar 300 linhas de código." |
| 0:24–0:31 | Passo 3 | Abra o preview do design e mostre o diagrama e a tabela do `CONFIG`. | "O design é onde decidimos a estrutura **antes** que ela vire código difícil de mudar." |
| 0:31–0:36 | Passo 4 | Mostre a rastreabilidade (`_Requisitos: 1.1_`) e o "Como verificar". | "Tarefa pequena gera revisão pequena e erro pequeno." |
| 0:36–0:51 | Passo 5 | Ajude com os bugs. Incentive o `/corrigir-bug` no lugar de "conserta aí". | "Bug também passa pela spec: qual requisito ele quebra?" |
| 0:51–0:57 | Passo 6 | Peça para cada aluno colar o link do jogo no [mural](#mural-de-jogos-opcional). | "O histórico de commits de vocês conta a história do processo." |
| 0:57–1:00 | Encerramento | Recapitule o fluxo e aponte o "Indo além" do README. | "Esse fluxo funciona em qualquer ferramenta: Copilot, Kiro, Spec Kit, Claude Code..." |

> 💡 **Mostre o "segredo".** Em algum momento do Passo 2, abra `.github/prompts/1-requisitos.prompt.md`. Os alunos percebem que o "modo spec" é só um prompt bem escrito e versionado no repositório, que eles mesmos podem criar em qualquer projeto.

---

## 3. Por que estas escolhas

### De onde veio o fluxo

O roteiro adapta o fluxo do workshop de SDD do Kiro para ferramentas gratuitas:

| No Kiro | Nesta oficina (Copilot no Codespaces) |
|---|---|
| Sessão *Spec* (requisitos → design → tarefas, com aprovação entre as fases) | Prompt files `/1-requisitos`, `/2-design` e `/3-tarefas` + commit em cada portão |
| `.kiro/specs/requirements.md`, `design.md` e `tasks.md` | `specs/requirements.md`, `design.md` e `tasks.md` |
| Critérios em EARS | Critérios em EARS, em português (`QUANDO ..., O SISTEMA DEVE ...`) |
| *Steering files* (inclusão `always`) | `.github/copilot-instructions.md` |
| *Steering* com `fileMatch` | `.github/instructions/specs.instructions.md` com `applyTo: "specs/**"` |
| *Analyze requirements* | Refinamento sugerido no Passo 2 ("aponte ambiguidades...") |
| *Correctness properties* (PBT) | Seção "Propriedades de corretude" do design |
| *Start task* | `/4-implementar N` |
| *Bugfix spec* | `/corrigir-bug` |
| "Prolongue o jogo" | `/nova-funcionalidade` |

### Escolhas técnicas

- **Codespaces:** nada para instalar nas máquinas e o mesmo ambiente para todos. A conta pessoal gratuita inclui 120 core-horas por mês, cerca de 60 h numa máquina de 2 núcleos, o que sobra para a oficina.
- **Copilot Free ou Student:** o modo Agent está incluído no plano Free, mas a cota é limitada. Por isso o roteiro é enxuto, com cerca de 15 interações. O plano Free só permite seleção automática de modelo, então os prompts não fixam nenhum.
- **Prompt files em vez de uma ferramenta pronta de SDD:** não precisa instalar nada, e o prompt de cada fase fica **visível** para o aluno. Ferramentas como o Spec Kit ficam como próximo passo.
- **HTML/JS puro, sem build:** o que a IA gera roda direto e publica no GitHub Pages sem configuração extra.
- **Jogo com emojis:** resultado visual em minutos, sem arquivos de imagem ou som.

---

## 4. Na hora do aperto

### Problemas que você vai ver

| Situação | O que fazer |
|---|---|
| Aluno sem Copilot ativo | Ative em <https://github.com/settings/copilot> e recarregue a janela do Codespace. |
| A cota acabou no meio | O aluno continua em dupla com um colega ou acompanha pelo gabarito. |
| O agente "fugiu" da spec (criou `package.json`, usou framework, implementou várias tarefas de uma vez) | **Undo** e depois: "Siga as instruções do projeto e implemente só a tarefa N." É um ótimo momento para mostrar à turma por que a revisão existe. |
| Os comandos `/` não aparecem | O chat precisa estar no painel lateral e no modo Agent. Se não resolver: `Ctrl+Shift+P` → **Developer: Reload Window**. |
| O jogo não reage | Falta foco (clicar na página) ou há erro no Console (`F12`). |
| A aba do jogo não abriu | O navegador bloqueou o pop-up. Abra pela aba **Ports** → 8080 → 🌐. |
| Codespace lento para criar | Peça paciência. Em último caso, delete e crie de novo. |

### Plano B

- **Atrasou?** Pule a personalização do Passo 1, faça os Passos 3 e 4 sem refinamentos e use `/4-implementar 2-5` para fazer várias tarefas de uma vez.
- **O Copilot caiu para todo mundo?** Siga em modo demonstração na sua tela. Os alunos copiam os arquivos da branch `gabarito` para o próprio repositório e publicam no Pages. O aprendizado do processo continua, porque eles leem e discutem as specs do gabarito.

### Adaptando para outro projeto

- Troque a `IDEIA.md` pela nova ideia.
- Se não for um jogo de canvas, ajuste a stack e a estrutura em `.github/copilot-instructions.md`.
- Os prompts das fases são genéricos e funcionam sem mudanças. Revise só os exemplos de refinamento no README.

### Mural de jogos (opcional)

Habilite **Discussions** no repositório do template (**Settings → General → Features**) e crie um tópico "🎮 Mural de jogos" para os alunos colarem o link do jogo publicado. É um ótimo fechamento, e todo mundo joga o jogo de todo mundo.

### Depois da oficina

Lembre a turma de **apagar o Codespace** em <https://github.com/codespaces> para não consumir a cota gratuita. O código já está salvo no repositório.

---

## 5. Mensagem pré-oficina

Copie, ajuste e envie de 1 a 2 semanas antes:

```text
Olá! Na oficina "Da ideia ao GitHub com IA" vamos construir e publicar um jogo usando GitHub Copilot, direto no navegador. Não precisa instalar nada, mas precisa de 5 minutos de preparação ANTES:

1. Crie uma conta no GitHub (se ainda não tiver): https://github.com/signup
2. Ative o Copilot gratuito: https://github.com/settings/copilot
3. Estudante? Peça o GitHub Education (dá mais cota de Copilot): https://education.github.com/pack
   A aprovação pode levar alguns dias, então faça hoje.
4. No dia, leve seu login e senha do GitHub (e o app de autenticação, se você usa 2FA).

Roteiro da oficina: <LINK DO REPOSITÓRIO TEMPLATE>
```
