'use strict';

class Node {
  constructor(key) {
    this._key = key;
  }

  get key() {
    return this._key;
  }
}

module.exports = Node;
