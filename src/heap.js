'use strict';
const Node = require('./node');

class Heap {
  constructor(comparatorFn) {
    this._head = null;
    this._size = 0;
    this._compare = comparatorFn || this._defaultComparatorFn;
  }

  get head() {
    return this._head;
  }

  get size() {
    return this._size;
  }

  _addSubTree(x, y) {
    y.parent = x;
    y.sibling = x.child;
    x.child = y;
    x._degree += 1;
  }

  _defaultComparatorFn(x, y) {
    if (x.key > y.key) {
      return 1;
    }

    if (x.key < y.key) {
      return -1;
    }

    return 0;
  }

  _mergeHeaps(x, y) {
    let {head: xRoot} = x;
    let {head: yRoot} = y;

    const node = new Node();
    let last = node;

    while (xRoot && yRoot) {
      if (xRoot.degree <= yRoot.degree) {
        last.sibling = xRoot;
        xRoot = xRoot.sibling;
      } else {
        last.sibling = yRoot;
        yRoot = yRoot.sibling;
      }

      last = last.sibling;
    }

    last.sibling = xRoot || yRoot;
    return node.sibling;
  }

  clear() {
    this._size = 0;
    this._head = null;
    return this;
  }

  isEmpty() {
    return !this._head && this._size === 0;
  }

  roots() {
    const roots = [];
    let {head: root} = this;

    while (root) {
      roots.push(root);
      root = root.sibling;
    }

    return roots;
  }
}

module.exports = Heap;
