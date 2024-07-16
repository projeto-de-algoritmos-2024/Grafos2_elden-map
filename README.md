# Elden Map

**Número da Lista**: 22<br>
**Conteúdo da Disciplina**: Grafos 2<br>

## Alunos

| Matrícula  | Aluno                      |
| ---------- | -------------------------- |
| 21/1031646 | Bruno Medeiros de Oliveira |
| 21/1031762 | Leonardo Lago Moreno       |

## Sobre

O Elden Map é uma aplicação interativa desenvolvida para a disciplina de Grafos 2. Este projeto utiliza a árvore geradora mínima (MST), para traçar conexões eficientes entre todos os pontos de interesse no jogo Elden Ring. O objetivo é auxiliar jogadores a planejar suas rotas de forma otimizada, conectando todos os pontos de interesse com a menor distância total possível.

## Screenshots

### mapa exibindo MST das graças ( pontos de save do jogo ):
![eldengraces](https://github.com/user-attachments/assets/a7e8d71b-50cf-412a-994f-bae4a6a04d74)

### mapa exibindo MST das principais regiões do jogo:
![eldenplaces](https://github.com/user-attachments/assets/28e9705b-9f6f-496a-a3bc-05994ee2f129)

### mapa exibindo MST de chaves escondidas pelo jogo:
![eldenkeys](https://github.com/user-attachments/assets/209631b3-0797-4449-a1d4-36625dd18c70)

## Vídeo

[![Ver video](https://img.youtube.com/vi/OVsm_pfziLM/0.jpg)](https://www.youtube.com/watch?v=OVsm_pfziLM)

## Instalação

**Linguagem**: HTML, CSS, JavaScript<br>

### Pré-requisitos

- Live Server (extensão do VSCode) ou
- Python ou
- Node.js

### Como instalar

#### Usando Live Server (VSCode Extension)

1. Abra o arquivo `index.html` no seu editor de código (VSCode).
2. Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

#### Usando Python

1. Abra um terminal na pasta do projeto.
2. Execute o comando:
   ```bash
   python -m http.server 8000
   ```
3. Acesse `http://localhost:8000` no seu navegador.

#### Usando Node.js

1. Instale o `http-server` globalmente, se ainda não tiver:
   ```bash
   npm install -g http-server
   ```
2. Navegue até a pasta do projeto no terminal e execute:
   ```bash
   http-server
   ```
3. Acesse `http://localhost:8080` no seu navegador.

## Uso

### Navegação no Mapa

Após seguir os passos de instalação, acesse o site no endereço fornecido pelo servidor local (Live Server, Python ou Node.js). Lá, você poderá selecionar diferentes categorias de pontos de interesse do jogo (como "Sites of Grace") e visualizar a árvore geradora mínima que conecta todos esses pontos.

### Seleção de Categorias

1. Utilize o menu suspenso no canto superior esquerdo para selecionar a categoria desejada.
2. Clique no botão "Atualizar Mapa" para atualizar as conexões no mapa.

## Aplicações de Grafos

### Algoritmo de Prim para Árvore Geradora Mínima

A aplicação utiliza o algoritmo de Prim para calcular a árvore geradora mínima (MST) que conecta todos os pontos de interesse no jogo. A MST é útil para encontrar a forma mais eficiente de conectar todos os pontos com a menor distância total, o que ajuda os jogadores a planejar suas rotas.

#### Estrutura de Dados do Grafo

A classe `Graph` é usada para representar o grafo, onde cada nó é um ponto de interesse do jogo e cada aresta é uma conexão entre esses pontos com um peso correspondente à distância euclidiana entre eles.

```javascript
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addNode(node) {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = [];
    }
  }

  addEdge(node1, node2) {
    const weight = calculateWeight(node1, node2);
    this.adjacencyList[node1.id].push({
      node: node2.id,
      weight: weight
    });
  }

  // usada para debugar
  printGraph() {
    for (let node in this.adjacencyList) {
      console.log(`${node} -> ${this.adjacencyList[node].map(edge => `${edge.node} (${edge.weight})`).join(', ')}`);
    }
  }
}
```

#### Algoritmo de Prim

A função `prim` implementa o algoritmo de Prim para encontrar a árvore geradora mínima. Utiliza uma estrutura de dados MinHeap para selecionar de forma eficiente as arestas de menor peso.

```javascript
export function prim(graph) {
  const startNode = graph.startNode; 
  const minHeap = new MinHeap();
  minHeap.push([0, startNode, startNode]);
  const visited = Array(graph.length).fill(false);
  let mstCost = 0;
  const mstEdges = [];

  while (!minHeap.isEmpty()) {
      const [cost, u , v] = minHeap.pop();

      if (visited[u]) continue;

      visited[u] = true;
      mstCost += cost;

      if (cost !== 0) {
          mstEdges.push([v, u, cost]);
      }
      
      for (const edge of graph.adjacencyList[u]) {
          if (!visited[edge.node]) {
              minHeap.push([edge.weight, edge.node, u]);
          }
      }
  }

  return { mstCost, mstEdges };
}
```

### Demonstração

Para ver a aplicação em ação, selecione diferentes categorias de pontos de interesse e visualize como os pontos são conectados no mapa. A árvore geradora mínima traçada ajudará a encontrar a rota mais eficiente entre todos os pontos selecionados.
