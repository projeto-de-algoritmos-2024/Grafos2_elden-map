


export function generateMST(graph) {

}



[[1,23,234,324,123], [], []]
2313123


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
    if (!this.adjacencyList[node1]) {
      this.addNode(node1);
    }
    if (!this.adjacencyList[node2]) {
      this.addNode(node2);
    }
    this.adjacencyList[node1].push(node2);
    this.adjacencyList[node2].push(node1); 
  }


  printGraph() {
    for (let node in this.adjacencyList) {
      console.log(`${node} -> ${this.adjacencyList[node].join(', ')}`);
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

          if (graph.adjacencyList[item.id].includes(item2.id)) {
            return;
          }

          graph.addEdge(item.id, item2.id);
        }
      });

    }
  });

  return graph;

}
