class Graph {
  constructor() {
    this.adjacencyList = {};
    this.startNode = undefined;
  }

  addNode(node) {
    if (!this.adjacencyList[node]) {

      if (this.startNode === undefined) {
        this.startNode = node;
      }

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


  printGraph() {
    for (let node in this.adjacencyList) {
      console.log(`${node} -> ${this.adjacencyList[node].map(edge => `${edge.node} (${edge.weight})`).join(', ')}`);
    }
  }

}


class MinHeap {
  constructor() {
      this.heap = [];
  }
  
  push(element) {
    this.heap.push(element);
    this.shiftUp();
}

pop() {
    if (this.heap.length === 1) {
        return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.shiftDown();
    return min;
}

shiftUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        let parent = this.heap[parentIndex];

        if (element[0] >= parent[0]) break;

        this.heap[index] = parent;
        index = parentIndex;
    }
    this.heap[index] = element;
}

shiftDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;

        if (leftChildIndex < length) {
            leftChild = this.heap[leftChildIndex];
            if (leftChild[0] < element[0]) {
                swap = leftChildIndex;
            }
        }

        if (rightChildIndex < length) {
            rightChild = this.heap[rightChildIndex];
            if (
                (swap === null && rightChild[0] < element[0]) ||
                (swap !== null && rightChild[0] < leftChild[0])
            ) {
                swap = rightChildIndex;
            }
        }

        if (swap === null) break;

        this.heap[index] = this.heap[swap];
        index = swap;
    }
    this.heap[index] = element;
}

isEmpty() {
    return this.heap.length === 0;
}
}

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

function calculateWeight(node1, node2) {
  
  const node1X = node1.x;
  const node1Y = node1.y;
  const node2X = node2.x;
  const node2Y = node2.y;
  const distance = Math.sqrt(Math.pow(node1X - node2X, 2) + Math.pow(node1Y - node2Y, 2));
  return distance;

}

export function connectItems(data, category) {

  const graph = new Graph();

  data.forEach(item => {
    if (item.category === category) {
      graph.addNode(item.id);
    }
  });

  data.forEach(item => {
    if (item.category === category) {
      
      data.forEach(item2 => {
        if (item2.category === category) {

          if (item.id === item2.id) {
            return;
          }

          graph.addEdge(item, item2);
        }
      });

    }
  });

  return graph;

}

