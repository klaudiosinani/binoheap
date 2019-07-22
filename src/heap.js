'use strict';

class Heap {
  constructor(comparatorFn) {
    this._head = null;
    this._size = 0;
    this._compare = comparatorFn || this._defaultComparatorFn;
  }

  get size() {
    return this._size;
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

  isEmpty() {
    return !this._head && this._size === 0;
  }
}

module.exports = Heap;
