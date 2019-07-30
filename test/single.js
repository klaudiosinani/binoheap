'use strict';
const test = require('ava');
const {Heap, Node} = require('../.');

test('insert', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.is(heap._head.key, 10);
  t.is(heap._head.value, 'A');
  t.is(heap._head.parent, null);
  t.is(heap._head.child, null);
  t.is(heap._head.sibling, null);
});

test('head', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.is(heap.head.key, 10);
  t.is(heap.head.value, 'A');
  t.is(heap.head.parent, null);
  t.is(heap.head.child, null);
  t.is(heap.head.sibling, null);
  t.deepEqual(heap.head, new Node(10, 'A'));
});

test('size', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.is(heap.size, 1);
});

test('clear', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.deepEqual(heap.head, new Node(10, 'A'));
  t.is(heap.size, 1);
  t.deepEqual(heap.clear(), new Heap());
  t.is(heap.head, null);
  t.is(heap.size, 0);
});

test('extremum', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.deepEqual(heap.extremum(), new Node(10, 'A'));
});

test('extremumKey', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.is(heap.extremumKey(), 10);
});

test('extremumValue', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.is(heap.extremumValue(), 'A');
});

test('heapTrees', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.is(heap.heapTrees(), 1);
});

test('includes', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.true(heap.includes(10));
  t.false(heap.includes(20));
});

test('isEmpty', t => {
  const heap = new Heap();
  t.true(heap.isEmpty());
  heap.insert(10, 'A');
  t.false(heap.isEmpty());
});

test('merge', t => {
  const heap1 = new Heap();
  heap1.insert(10, 'A');
  const heap2 = new Heap();
  t.deepEqual(heap1.merge(heap2), heap1);
  t.deepEqual(heap1.head, new Node(10, 'A'));
  t.is(heap1.size, 1);
});

test('removeExtremum', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.deepEqual(heap.head, new Node(10, 'A'));
  t.is(heap.size, 1);
  t.deepEqual(heap.removeExtremum(), new Node(10, 'A'));
  t.is(heap.head, null);
  t.is(heap.size, 0);
});

test('roots', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.deepEqual(heap.roots(), [new Node(10, 'A')]);
});

test('search', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.deepEqual(heap.search(10), new Node(10, 'A'));
  t.is(heap.search(20), undefined);
});

test('updateKey', t => {
  const heap = new Heap();
  heap.insert(10, 'A');
  t.deepEqual(heap.head, new Node(10, 'A'));
  t.is(heap.size, 1);
  heap.updateKey(10, 20);
  t.deepEqual(heap.head, new Node(10, 'A'));
  t.is(heap.size, 1);
  heap.updateKey(10, 5);
  t.deepEqual(heap.head, new Node(5, 'A'));
  t.is(heap.size, 1);
});
