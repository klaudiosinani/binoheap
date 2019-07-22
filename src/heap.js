'use strict';

class Heap {
  constructor() {
    this._head = null;
    this._size = 0;
  }

  get size() {
    return this._size;
  }
}

module.exports = Heap;
