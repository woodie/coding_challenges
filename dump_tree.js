#!/usr/bin/env node

"use strict";

var Iterator = (function () {
  function Iterator(node) {
    this.stack = [node];
  }
  Iterator.prototype.next = function () {
    if (this.hasNext()) {
      var node = this.stack.pop();
      for (let child of node.children.reverse()) {
        this.stack.push(child);
      }
      return node;
    } else {
      return null;
    }
  }
  Iterator.prototype.hasNext = function () {
    return (this.stack.length > 0);
  }
  return Iterator;
})();

var Node = (function () {
  function Node(value, children) {
    this.value = value;
    this.children = (typeof children === 'undefined') ? [] :
        Array.isArray(children) ? children : [children];
  }
  return Node;
})();

var Tree = (function () {
  function Tree(node) {
    this.root = root;
  };
  Tree.prototype.to_s = function () {
    return Tree.to_string(this.root);
  };
  Tree.prototype.print = function () {
    Tree.print_tree(this.root);
  };
  Tree.to_string = function (node) {
    var memo = node.value + ": "
    for (let sub of node.children) {
      memo += Tree.to_string(sub);
    }
    return memo;
  };
  Tree.print_tree = function (node) {
    process.stdout.write(node.value + ": ");
    for (let sub of node.children) {
      Tree.print_tree(sub);
    }
  };
  return Tree;
})();

//        "ab"
//        /  \
//      "ef"  "gh"
//     / | \    \
//  "x" "y" "z"  "p"

var root = new Node("ab", [new Node("ef", [
    new Node("x"), new Node("y"), new Node("z")]),
    new Node("gh", new Node("p"))])

console.log(Tree.to_string(root));
Tree.print_tree(root);
console.log('');
var tree = new Tree(root);
console.log(tree.to_s());
tree.print();
console.log('');

var iter = new Iterator(root);
while(iter.hasNext()) {
  process.stdout.write(iter.next().value + ": ");
}
console.log('');

/*

ab: ef: x: y: z: gh: p:
ab: ef: x: y: z: gh: p:
ab: ef: x: y: z: gh: p:
ab: ef: x: y: z: gh: p:
ab: ef: x: y: z: gh: p:

*/
