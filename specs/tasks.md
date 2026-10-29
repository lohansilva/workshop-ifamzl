# Plano de implementação — Chuva de Bugs

> Como usar: rode `/4-implementar N` para cada tarefa, teste no navegador e faça commit.

- [x] 1. Criar o esqueleto visível do jogo
  - Criar a página com um canvas centralizado e o estilo de fundo escuro.
  - Criar `CONFIG` com as dimensões do canvas e os valores iniciais do jogador.
  - Criar o ponto de entrada com um loop `requestAnimationFrame` usando delta time.
  - Desenhar uma tela inicial visível com o nome do jogo e a instrução de início.
  - **Arquivos:** `index.html`, `style.css`, `src/config.js`, `src/main.js`
  - **Como verificar:** abrir o jogo no navegador → o canvas fica centralizado e mostra o nome "Chuva de Bugs" e a instrução para pressionar Espaço.
  - _Requisitos: 1.1_

- [ ] 2. Implementar o fluxo e o controle do dev
  - Criar o estado de início, jogo e fim de jogo no motor da partida.
  - Fazer Espaço iniciar e reiniciar a partida, com o dev começando na parte inferior.
  - Implementar movimento pelas setas e pelas teclas A/D somente durante a partida.
  - Limitar o dev às bordas horizontais do canvas.
  - **Arquivos:** `src/game.js`, `src/main.js`, `src/config.js`
  - **Como verificar:** pressionar Espaço → a tela de jogo aparece; pressionar ←, →, A e D → o dev se move; manter uma direção na borda → o dev não ultrapassa o canvas; pressionar Espaço durante o jogo → nada reinicia.
  - _Requisitos: 1.2, 1.4, 2.1, 2.2, 2.3, 2.4_

- [ ] 3. Adicionar itens, colisões e dificuldade progressiva
  - Criar cafés e bugs em posições horizontais variadas no alto do canvas.
  - Atualizar a queda dos itens e removê-los ao chegar ao chão.
  - Detectar colisões do dev com cafés e bugs e remover os itens após a colisão.
  - Aumentar gradualmente a velocidade de queda e a frequência de surgimento.
  - **Arquivos:** `src/game.js`, `src/config.js`
  - **Como verificar:** iniciar uma partida → cafés e bugs aparecem e caem; deixar um item passar → ele desaparece sem alterar o estado; encostar em um café ou bug → o item desaparece; aguardar a partida → os itens passam a cair mais rápido e surgir com maior frequência.
  - _Requisitos: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2_

- [ ] 4. Implementar pontuação, vidas e recorde
  - Exibir pontuação e vidas durante a partida, começando com 3 vidas e 0 pontos.
  - Atualizar a pontuação ao coletar cafés e reduzir vidas ao encostar em bugs.
  - Mudar para a tela de fim de jogo quando as vidas chegarem a zero.
  - Ler, atualizar e salvar o recorde no armazenamento do navegador e exibi-lo no fim de jogo.
  - **Arquivos:** `src/game.js`, `src/storage.js`, `src/config.js`
  - **Como verificar:** coletar um café → a pontuação aumenta 1; encostar em um bug → as vidas diminuem 1; perder as 3 vidas → a tela de fim mostra pontuação e recorde; recarregar a página depois de uma pontuação maior → o recorde continua salvo.
  - _Requisitos: 1.3, 3.2, 3.3, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3_

- [ ] 5. Polir a apresentação e conferir todos os critérios
  - Ajustar cores, tamanhos, emojis, textos em português e centralização para a tela definida no design.
  - Conferir caminhos relativos, ausência de números ajustáveis fora de `CONFIG` e funcionamento sem dependências externas.
  - Jogar uma partida completa, testar início, controles, colisões, dificuldade, fim de jogo e persistência do recorde.
  - Corrigir apenas problemas encontrados na conferência e registrar a verificação final.
  - **Arquivos:** `index.html`, `style.css`, `src/config.js`, `src/main.js`, `src/game.js`, `src/storage.js`
  - **Como verificar:** abrir o jogo pelo servidor local, recarregar e executar o fluxo completo → todas as telas, controles, itens, pontuações, vidas, dificuldade e recorde funcionam conforme os requisitos, sem erros no console.
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3_

## Correções

<vazio por enquanto; o comando /corrigir-bug escreve aqui>