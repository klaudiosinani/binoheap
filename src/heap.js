'use strict';

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

  clear() {
    this._size = 0;
    this._head = null;
    return this;
  }

  isEmpty() {
    return !this._head && this._size === 0;
  }
}

module.exports = Heap;
