#!/usr/bin/env node

var NeighborNode = (function () {
  function NeighborNode(label, neighbors) {
    this.label = label;
    this.neighbors = neighbors || [];
  }

  //  1-2-3    (1,0)→ []          • return any suitable datatype
  //   \| |    (1,1)→ [2,4]       • order doesn't matter
  //    4-5-6  (1,2)→ [1,2,3,4,5] • results should be unique

  NeighborNode.getNeighborhood = function (node, depth) {
    if (depth === undefined) { depth = 0; }
    var neighborhood = {};
    var queue = node.neighbors;
    for (var i=0; i < depth; i++) {
      for (var x of queue) {
        neighborhood[x.label] = x;
      }
      queue = [];
      for (var s in neighborhood) {
        for (var z of neighborhood[s].neighbors) {
            if (!(z.label in neighborhood)) {
            queue.push(z);
          }
        }
      }
    }
    var out = [];
    for (var k in neighborhood) { out.push(neighborhood[k]); }
    return out;
  };

  NeighborNode.prototype.printNeighborhood = function (depth) {
    var objs = NeighborNode.getNeighborhood(this, depth);
    console.log(`${this.label},${depth} → [${objs.map(function(z) {return z.label}).join(', ')}]`);
  };
  
  NeighborNode.printNodelist = function (nodes) {
    for (var n of nodes) {
      console.log(`${n.label} → [${n.neighbors.map(function(z) {return z.label}).join(', ')}]`);
    }
  };

  return NeighborNode;
})();

// 1-2-3
//  \| |
//   4-5-6
var nodes = [];
for (var i=0; i < 7; i++) { nodes[i] = new NeighborNode(String(i)); }
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
