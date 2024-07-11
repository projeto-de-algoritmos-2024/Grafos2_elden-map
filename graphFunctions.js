


export function generateMST(graph) {

}


function calculateWeight(node1, node2) {
  
  const node1X = node1.x;
  const node1Y = node1.y;
  const node2X = node2.x;
  const node2Y = node2.y;
  const distance = Math.sqrt(Math.pow(node1X - node2X, 2) + Math.pow(node1Y - node2Y, 2));
  return distance;

}
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


  printGraph() {
    for (let node in this.adjacencyList) {
      console.log(`${node} -> ${this.adjacencyList[node].map(edge => `${edge.node} (${edge.weight})`).join(', ')}`);
    }
  }

}

export function connectItems(data) {

  const graph = new Graph();

  data.forEach(item => {
    if (item.category === "Site of Grace") {
      graph.addNode(item.id);
    }
  });

  data.forEach(item => {
    if (item.category === "Site of Grace") {
      
      data.forEach(item2 => {
        if (item2.category === "Site of Grace") {

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
