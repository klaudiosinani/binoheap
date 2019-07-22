'use strict';

class Node {
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._parent = null;
    this._child = null;
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

  get parent() {
    return this._parent;
  }

  set parent(node) {
    this._parent = node;
  }

  toPair() {
    return [this._key, this._value];
  }
}

module.exports = Node;
