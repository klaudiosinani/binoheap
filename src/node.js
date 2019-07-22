'use strict';

class Node {
  constructor(key, value) {
    this._key = key;
    this._value = value;
    this._degree = 0;
    this._parent = null;
    this._child = null;
    this._sibling = null;
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

  get degree() {
    return this._degree;
  }

  get parent() {
    return this._parent;
  }

  set parent(node) {
    this._parent = node;
  }

  get child() {
    return this._child;
  }

  set child(node) {
    this._child = node;
  }

  get sibling() {
    return this._sibling;
  }

  set sibling(node) {
    this._sibling = node;
  }

  toPair() {
    return [this._key, this._value];
  }
}

module.exports = Node;
