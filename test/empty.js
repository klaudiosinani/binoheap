'use strict';
const test = require('ava');
const {Heap} = require('../.');

test('head', t => {
  const heap = new Heap();
  t.is(heap.head, null);
});

test('size', t => {
  const heap = new Heap();
  t.is(heap.size, 0);
});

test('clear', t => {
  const heap = new Heap();
  t.deepEqual(heap.clear(), new Heap());
});

test('extremum', t => {
  const heap = new Heap();
  t.deepEqual(heap.extremum(), undefined);
});

test('extremumKey', t => {
  const heap = new Heap();
  t.deepEqual(heap.extremumKey(), undefined);
});

test('extremumValue', t => {
  const heap = new Heap();
  t.deepEqual(heap.extremumValue(), undefined);
});

test('heapTrees', t => {
  const heap = new Heap();
  t.deepEqual(heap.heapTrees(), 0);
});

test('includes', t => {
  const heap = new Heap();
  t.false(heap.includes(10));
});

test('isEmpty', t => {
  const heap = new Heap();
  t.true(heap.isEmpty());
});

test('merge', t => {
  const heap1 = new Heap();
  const heap2 = new Heap();
  t.deepEqual(heap1.merge(heap2), heap1);
  t.deepEqual(heap1, heap2);
});

test('removeExtremum', t => {
  const heap = new Heap();
  t.is(heap.removeExtremum(), undefined);
});

test('roots', t => {
  const heap = new Heap();
  t.deepEqual(heap.roots(), []);
});

test('search', t => {
  const heap = new Heap();
  t.is(heap.search(), undefined);
});

test('updateKey', t => {
  const heap = new Heap();
  t.deepEqual(heap.updateKey(10, 20), new Heap());
});
