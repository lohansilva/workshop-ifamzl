# Requisitos — Chuva de Bugs

## Introdução
Chuva de Bugs é um jogo de navegador para quem quer uma partida rápida e simples. O jogador controla um dev, coleta cafés e desvia de bugs que caem do céu. A graça é fazer a maior pontuação possível antes de perder todas as vidas.

## Glossário
- **Dev**: personagem controlado pelo jogador.
- **Café**: item coletável que aumenta a pontuação.
- **Bug**: item que reduz uma vida quando encosta no dev.
- **Vida**: oportunidade restante do jogador antes do fim da partida.
- **Recorde**: maior pontuação registrada no navegador.

## Requisitos

### Requisito 1 — Fluxo de partida
**História de usuário:** Como jogador, quero iniciar e reiniciar uma partida, para que eu possa jogar novamente quando quiser.

**Critérios de aceitação**
- **1.1** O SISTEMA DEVE exibir uma tela inicial com o nome do jogo e a instrução para pressionar Espaço para começar.
- **1.2** QUANDO o jogador pressionar Espaço na tela inicial, O SISTEMA DEVE iniciar uma partida e exibir a tela de jogo.
- **1.3** SE o jogador perder todas as vidas, ENTÃO O SISTEMA DEVE exibir a tela de fim de jogo.
- **1.4** QUANDO o jogador pressionar Espaço na tela de fim de jogo, O SISTEMA DEVE iniciar uma nova partida.

### Requisito 2 — Controle do dev
**História de usuário:** Como jogador, quero mover o dev horizontalmente, para que eu consiga coletar cafés e desviar de bugs.

**Critérios de aceitação**
- **2.1** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE mover o dev para a esquerda quando o jogador pressionar a seta esquerda ou a tecla A.
- **2.2** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE mover o dev para a direita quando o jogador pressionar a seta direita ou a tecla D.
- **2.3** SE o dev alcançar uma borda lateral, ENTÃO O SISTEMA DEVE impedir que ele ultrapasse a área do jogo.
- **2.4** ENQUANTO a partida não estiver em andamento, O SISTEMA DEVE ignorar os comandos de movimento.

### Requisito 3 — Coleta e colisão
**História de usuário:** Como jogador, quero coletar cafés e evitar bugs, para que eu possa aumentar minha pontuação e preservar minhas vidas.

**Critérios de aceitação**
- **3.1** O SISTEMA DEVE fazer cafés e bugs surgirem no alto da área do jogo em posições horizontais variadas.
- **3.2** QUANDO o dev encostar em um café, O SISTEMA DEVE remover o café e aumentar a pontuação em 1 ponto.
- **3.3** QUANDO o dev encostar em um bug, O SISTEMA DEVE remover o bug e reduzir as vidas em 1.
- **3.4** QUANDO um café ou bug alcançar o chão sem encostar no dev, O SISTEMA DEVE removê-lo sem alterar a pontuação ou as vidas.

### Requisito 4 — Dificuldade progressiva
**História de usuário:** Como jogador, quero que a partida fique mais desafiadora com o tempo, para que eu tenha um objetivo além de sobreviver aos primeiros segundos.

**Critérios de aceitação**
- **4.1** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE aumentar gradualmente a velocidade de queda dos itens.
- **4.2** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE aumentar gradualmente a frequência de surgimento dos itens.

### Requisito 5 — Informações da partida
**História de usuário:** Como jogador, quero acompanhar minha pontuação e minhas vidas, para que eu saiba como estou na partida.

**Critérios de aceitação**
- **5.1** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE exibir a pontuação no topo da tela.
- **5.2** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE exibir a quantidade de vidas restantes no topo da tela.
- **5.3** QUANDO a partida terminar, O SISTEMA DEVE exibir a pontuação da partida na tela de fim de jogo.
- **5.4** QUANDO a partida terminar, O SISTEMA DEVE exibir o recorde na tela de fim de jogo.

### Requisito 6 — Recorde persistente
**História de usuário:** Como jogador, quero manter meu melhor resultado, para que eu possa tentar superá-lo em outra partida ou em outro dia.

**Critérios de aceitação**
- **6.1** QUANDO a pontuação da partida superar o recorde atual, O SISTEMA DEVE atualizar o recorde com a nova pontuação.
- **6.2** QUANDO o jogador abrir o jogo depois de fechar a página, O SISTEMA DEVE manter o recorde salvo anteriormente.
- **6.3** SE não existir recorde salvo, ENTÃO O SISTEMA DEVE considerar o recorde como 0.

## Fora do escopo
- Som e música.
- Multiplayer.
- Login.
- Ranking online.
- Níveis ou fases.

## Suposições
- Os comandos de teclado são aceitos enquanto a página do jogo estiver em foco.
- A partida começa e reinicia quando o jogador pressiona Espaço na tela correspondente.
- O jogador começa cada partida com 3 vidas.
- Itens que encostam no dev desaparecem após a colisão.
- A posição horizontal dos itens é escolhida de forma variada, sem exigir uma distribuição específica.