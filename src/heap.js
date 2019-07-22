'use strict';

class Heap {
  constructor() {
    this._head = null;
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  isEmpty() {
    return !this._head && this._size === 0;
  }
}

module.exports = Heap;
