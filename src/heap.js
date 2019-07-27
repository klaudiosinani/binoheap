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

  extremum() {
    let {head: ext} = this;

    if (!ext) {
      return undefined;
    }

    let {sibling: next} = ext;

    while (next) {
      if (this._compare(ext, next) > 0) {
        ext = next;
      }

      next = next.sibling;
    }

    return ext;
  }

  extremumKey() {
    const ext = this.extremum();

    if (ext) {
      return ext.key;
    }

    return undefined;
  }

  insert(key, value) {
    const heap = new Heap();
    heap._head = new Node(key, value);
    heap._size += 1;
    return this.merge(heap);
  }

  isEmpty() {
    return !this._head && this._size === 0;
  }

  merge(heap) {
    let head = this._mergeHeaps(this, heap);

    if (head) {
      let prev;
      let curr = head;
      let {sibling: next} = head;

      while (next) {
        const {sibling: postNext} = next;

        if (curr.degree !== next.degree || (postNext && postNext.degree === curr.degree)) {
          [prev, curr] = [curr, next];
        } else if (this._compare(curr, next) < 0) {
          curr.sibling = postNext;
          this._addSubTree(curr, next);
        } else {
          if (prev) {
            prev.sibling = next;
          } else {
            head = next;
          }

          this._addSubTree(next, curr);
          curr = next;
        }

        next = postNext;
      }

      this._size += heap.size;
      this._head = head;
    }

    return this;
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
