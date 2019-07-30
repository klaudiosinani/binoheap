'use strict';
const test = require('ava');
const {Node} = require('../.');

test('key', t => {
  const node = new Node(10, 'A');
  t.is(node.key, 10);
});

test('value', t => {
  const node = new Node(10, 'A');
  t.is(node.value, 'A');
  node.value = 'B';
  t.is(node.value, 'B');
});

test('degree', t => {
  const node = new Node(10, 'A');
  t.is(node.degree, 0);
  node._degree += 1;
  t.is(node.degree, 1);
});

test('parent', t => {
  const node = new Node(20, 'B');
  t.is(node.parent, null);
  const parent = new Node(10, 'A');
  parent._degree += 1;
  node.parent = parent;
  t.is(node.parent.key, 10);
  t.is(node.parent.value, 'A');
  t.is(node.parent.degree, 1);
  t.deepEqual(node.parent, parent);
});

test('child', t => {
  const node = new Node(10, 'A');
  t.is(node.child, null);
  const child = new Node(20, 'B');
  node.child = child;
  node._degree += 1;
  t.is(node.child.key, 20);
  t.is(node.child.value, 'B');
  t.is(node.child.degree, 0);
  t.deepEqual(node.child, child);
});

test('sibling', t => {
  const node = new Node(10, 'A');
  t.is(node.sibling, null);
  const sibling = new Node(20, 'B');
  node.sibling = sibling;
  t.is(node.sibling.key, 20);
  t.is(node.sibling.value, 'B');
  t.is(node.sibling.degree, 0);
  t.deepEqual(node.sibling, sibling);
});

test('siblings', t => {
  const node = new Node(10, 'A');
  t.deepEqual(node.siblings(), []);
  const sibling1 = new Node(20, 'B');
  const sibling2 = new Node(30, 'C');
  sibling1.sibling = sibling2;
  node.sibling = sibling1;
  t.deepEqual(node.siblings(), [sibling1, sibling2]);
});

test('descendants', t => {
  const node = new Node(10, 'A');
  t.deepEqual(node.descendants(), []);
  const child1 = new Node(20, 'B');
  const child2 = new Node(30, 'C');
  child1.child = child2;
  node.child = child1;
  t.deepEqual(node.descendants(), [child1, child2]);
});

test('toPair', t => {
  const node = new Node(10, 'A');
  t.deepEqual(node.toPair(), [10, 'A']);
});
