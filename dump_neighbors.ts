#!/usr/bin/env typescript

class NeighborNode {
  label: String;
  neighbors: Array<NeighborNode>;

  constructor(label: String, neighbors?: Array<NeighborNode>) {
    this.label = label;
    this.neighbors = neighbors || [];
  }

  //  1-2-3    (1,0)→ []          • return any suitable datatype
  //   \| |    (1,1)→ [2,4]       • order doesn't matter
  //    4-5-6  (1,2)→ [1,2,3,4,5] • results should be unique

  static getNeighborhood(node, depth=0) {
    // zero depth must return an empty collection
    if (depth < 1) { return []; }
    var neighborhood = {};
    // populate neighborhood with node's neighbors
    for (let z of node.neighbors) { neighborhood[z.label] = z }
    // and collect [depth -1] neighbors
    for (var i=1; i < depth; i++) {
      for (let k in neighborhood) {
        let n = neighborhood[k];
        for (let z of n.neighbors) { neighborhood[z.label] = z }
      }
    }
    var out = [];
    for (let k in neighborhood) { out.push(neighborhood[k]); }
    return out;
  }

  printNeighborhood(depth) {
    var objs = NeighborNode.getNeighborhood(this, depth);
    console.log(`${this.label},${depth} → [${objs.map(function(z) {return z.label}).join(',')}]`);
  }
  
  static printNodelist(nodes) {
    for (let n of nodes) {
      console.log(`${n.label} → [${n.neighbors.map(function(z) {return z.label}).join(',')}]`);
    }
  }
}

// 1-2-3
//  \| |
//   4-5-6
var nodes = [];
for (let i=0; i < 7; i++) { nodes[i] = new NeighborNode(String(i)); }
nodes[1].neighbors = [nodes[2], nodes[4]];
nodes[2].neighbors = [nodes[1], nodes[3], nodes[4]];
nodes[3].neighbors = [nodes[2], nodes[4], nodes[5]];
nodes[4].neighbors = [nodes[1], nodes[2], nodes[5]];
nodes[5].neighbors = [nodes[3], nodes[4], nodes[6]];
//NeighborNode.printNodelist(nodes);

nodes[1].printNeighborhood(0);
nodes[1].printNeighborhood(1);
nodes[1].printNeighborhood(2);

/*

1,0 → []
1,1 → [2, 4]
1,2 → [1, 2, 3, 4, 5]

*/
