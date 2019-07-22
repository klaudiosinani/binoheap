'use strict';

class Node {
  constructor(key, value) {
    this._key = key;
    this._value = value;
  }

  get key() {
    return this._key;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  toPair() {
    return [this._key, this._value];
  }
}

module.exports = Node;
