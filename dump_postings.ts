#!/usr/bin/env typescript

class PostingsListNode {
  label: string;
  order: number;
  next: PostingsListNode;
  jump: PostingsListNode;
  constructor(label: string, next?: PostingsListNode, jump?: PostingsListNode) {
    this.label = label;
    this.order = -1;
    this.next = next || null;
    this.jump = jump || null;
  }

  to_string() {
    var memo = `[${this.label}:${this.order}]→ `;
    if (this.next) {
      memo += this.next.to_string();
    } else {
      memo += 'x';
    }
    return memo;
  }

  static set_jump_order_recursive(node: PostingsListNode, order?: number) {
    order = order || 0;
    if (node && node.order === -1) {
      node.order = ++order;
      PostingsListNode.set_jump_order_recursive(node.jump, order);
      PostingsListNode.set_jump_order_recursive(node.next, order);
    }
  }

  static set_jump_order_iterative(head: PostingsListNode) {
    var stack = [];
    var order = 0;
    stack.push(head);
    while (stack.length > 0) {
      var node = stack[stack.length - 1];
      stack.pop();
      if (node && node.order === -1) {
        node.order = ++order;
        stack.push(node.next);
        stack.push(node.jump);
      }
    }
  }
}

//        ↱-------↘
// [a]→ [b]→ [c]→ [d]→ x
//   ↳-------↗ |   ↑↓
//        ↖___↙

function example_list() {
  var _d = new PostingsListNode('d');
  var _c = new PostingsListNode('c', _d);
  var _b = new PostingsListNode('b', _c, _d);
  var _a = new PostingsListNode('a', _b, _c);
  _d.jump = _d;
  _c.jump = _b;
  return _a;
}

var e1 = example_list();
PostingsListNode.set_jump_order_recursive(e1);
console.log(e1.to_string());
var e2 = example_list();
PostingsListNode.set_jump_order_iterative(e2);
console.log(e2.to_string());

/*

[a:1]→ [b:3]→ [c:2]→ [d:4]→ x
[a:1]→ [b:3]→ [c:2]→ [d:4]→ x

*/
