'use strict';
const test = require('ava');
const {Heap} = require('../.');

test('insert', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.is(heap._head.key, 70);
  t.is(heap._head.value, 'G');
  t.is(heap._head.degree, 0);
  t.is(heap._head.parent, null);
  t.is(heap._head.child, null);
  t.is(heap._head.sibling.key, 50);
  t.is(heap._head.sibling.value, 'E');
  t.is(heap._head.sibling.degree, 1);
  t.is(heap._head.sibling.parent, null);
  t.is(heap._head.sibling.child.key, 60);
  t.is(heap._head.sibling.child.value, 'F');
  t.is(heap._head.sibling.child.degree, 0);
  t.is(heap._head.sibling.child.child, null);
  t.is(heap._head.sibling.child.sibling, null);
  t.is(heap._head.sibling.sibling.key, 10);
  t.is(heap._head.sibling.sibling.value, 'A');
  t.is(heap._head.sibling.sibling.degree, 2);
  t.is(heap._head.sibling.sibling.parent, null);
  t.is(heap._head.sibling.sibling.sibling, null);
  t.is(heap._head.sibling.sibling.child.key, 30);
  t.is(heap._head.sibling.sibling.child.value, 'C');
  t.is(heap._head.sibling.sibling.child.degree, 1);
  t.is(heap._head.sibling.sibling.child.child.key, 40);
  t.is(heap._head.sibling.sibling.child.child.value, 'D');
  t.is(heap._head.sibling.sibling.child.child.degree, 0);
  t.is(heap._head.sibling.sibling.child.child.child, null);
  t.is(heap._head.sibling.sibling.child.child.sibling, null);
  t.is(heap._head.sibling.sibling.child.sibling.key, 20);
  t.is(heap._head.sibling.sibling.child.sibling.value, 'B');
  t.is(heap._head.sibling.sibling.child.sibling.degree, 0);
  t.is(heap._head.sibling.sibling.child.sibling.parent.key, 10);
  t.is(heap._head.sibling.sibling.child.sibling.parent.value, 'A');
  t.is(heap._head.sibling.sibling.child.sibling.parent.degree, 2);
  t.is(heap._head.sibling.sibling.child.sibling.sibling, null);
  t.is(heap._head.sibling.sibling.child.sibling.child, null);
});

test('head', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.is(heap.head.key, 70);
  t.is(heap.head.value, 'G');
  t.is(heap.head.degree, 0);
  t.is(heap.head.parent, null);
  t.is(heap.head.child, null);
  t.deepEqual(heap.head.sibling, heap._head.sibling);
});

test('size', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.is(heap.size, 7);
});

test('clear', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.deepEqual(heap.clear(), new Heap());
  t.is(heap.head, null);
  t.is(heap.size, 0);
});

test('extremum', t => {
  const heap = new Heap();
  heap
    .insert(60, 'F')
    .insert(50, 'E')
    .insert(40, 'D')
    .insert(30, 'C')
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(70, 'G');

  const extremum = heap.extremum();

  t.is(extremum.key, 10);
  t.is(extremum.value, 'A');
  t.is(extremum.degree, 1);
  t.deepEqual(extremum, heap._head.sibling);
});

test('extremumKey', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.is(heap.extremumKey(), 10);
  t.is(heap.extremumKey(), heap._head.sibling.sibling.key);
});

test('extremumValue', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.is(heap.extremumValue(), 'A');
  t.is(heap.extremumValue(), heap._head.sibling.sibling.value);
});

test('heapTrees', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.is(heap.heapTrees(), 3);
});

test('includes', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.true(heap.includes(10));
  t.true(heap.includes(20));
  t.true(heap.includes(30));
  t.true(heap.includes(40));
  t.true(heap.includes(50));
  t.true(heap.includes(60));
  t.true(heap.includes(70));
  t.false(heap.includes(80));
});

test('isEmpty', t => {
  const heap = new Heap();
  t.true(heap.isEmpty());
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.false(heap.isEmpty());
});

test('merge', t => {
  const heap1 = new Heap();
  heap1
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  const heap2 = new Heap();
  heap2
    .insert(80, 'H')
    .insert(90, 'I');

  heap1.merge(heap2);

  t.is(heap1._head.key, 70);
  t.is(heap1._head.value, 'G');
  t.is(heap1._head.degree, 0);
  t.is(heap1._head.parent, null);
  t.is(heap1._head.child, null);
  t.is(heap1._head.sibling.key, 10);
  t.is(heap1._head.sibling.value, 'A');
  t.is(heap1._head.sibling.degree, 3);
  t.is(heap1._head.sibling.parent, null);
  t.is(heap1._head.sibling.sibling, null);
  t.is(heap1._head.sibling.child.key, 50);
  t.is(heap1._head.sibling.child.value, 'E');
  t.is(heap1._head.sibling.child.degree, 2);
  t.is(heap1._head.sibling.child.child.key, 80);
  t.is(heap1._head.sibling.child.child.value, 'H');
  t.is(heap1._head.sibling.child.child.degree, 1);
  t.is(heap1._head.sibling.child.child.child.key, 90);
  t.is(heap1._head.sibling.child.child.child.value, 'I');
  t.is(heap1._head.sibling.child.child.child.degree, 0);
  t.is(heap1._head.sibling.child.child.child.child, null);
  t.is(heap1._head.sibling.child.child.child.sibling, null);
  t.is(heap1._head.sibling.child.child.sibling.key, 60);
  t.is(heap1._head.sibling.child.child.sibling.value, 'F');
  t.is(heap1._head.sibling.child.child.sibling.degree, 0);
  t.is(heap1._head.sibling.child.child.sibling.child, null);
  t.is(heap1._head.sibling.child.child.sibling.sibling, null);
  t.is(heap1._head.sibling.child.sibling.key, 30);
  t.is(heap1._head.sibling.child.sibling.value, 'C');
  t.is(heap1._head.sibling.child.sibling.degree, 1);
  t.is(heap1._head.sibling.child.sibling.parent.key, 10);
  t.is(heap1._head.sibling.child.sibling.parent.value, 'A');
  t.is(heap1._head.sibling.child.sibling.parent.degree, 3);
  t.is(heap1._head.sibling.child.sibling.child.key, 40);
  t.is(heap1._head.sibling.child.sibling.child.value, 'D');
  t.is(heap1._head.sibling.child.sibling.child.degree, 0);
  t.is(heap1._head.sibling.child.sibling.child.child, null);
  t.is(heap1._head.sibling.child.sibling.child.sibling, null);
  t.is(heap1._head.sibling.child.sibling.sibling.key, 20);
  t.is(heap1._head.sibling.child.sibling.sibling.value, 'B');
  t.is(heap1._head.sibling.child.sibling.sibling.degree, 0);
  t.is(heap1._head.sibling.child.sibling.sibling.child, null);
  t.is(heap1._head.sibling.child.sibling.sibling.sibling, null);
  t.is(heap1._head.sibling.child.sibling.parent.key, 10);
  t.is(heap1._head.sibling.child.sibling.parent.value, 'A');
  t.is(heap1._head.sibling.child.sibling.parent.degree, 3);
  t.is(heap1.size, 9);
});

test('removeExtremum', t => {
  const heap = new Heap();
  heap
    .insert(60, 'F')
    .insert(50, 'E')
    .insert(40, 'D')
    .insert(30, 'C')
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(70, 'G');

  const extremum = heap._head.sibling;
  t.deepEqual(heap.removeExtremum(), extremum);

  t.is(heap._head.key, 20);
  t.is(heap._head.value, 'B');
  t.is(heap._head.degree, 1);
  t.is(heap._head.parent, null);
  t.is(heap._head.child.key, 70);
  t.is(heap._head.child.value, 'G');
  t.is(heap._head.child.degree, 0);
  t.is(heap._head.child.child, null);
  t.is(heap._head.child.sibling, null);

  t.is(heap._head.sibling.key, 30);
  t.is(heap._head.sibling.value, 'C');
  t.is(heap._head.sibling.degree, 2);
  t.is(heap._head.sibling.child.key, 50);
  t.is(heap._head.sibling.child.value, 'E');
  t.is(heap._head.sibling.child.degree, 1);
  t.is(heap._head.sibling.child.child.key, 60);
  t.is(heap._head.sibling.child.child.value, 'F');
  t.is(heap._head.sibling.child.child.degree, 0);
  t.is(heap._head.sibling.child.child.child, null);
  t.is(heap._head.sibling.child.child.sibling, null);
  t.is(heap._head.sibling.child.sibling.key, 40);
  t.is(heap._head.sibling.child.sibling.value, 'D');
  t.is(heap._head.sibling.child.sibling.degree, 0);
  t.is(heap._head.sibling.child.sibling.child, null);
  t.is(heap._head.sibling.child.sibling.sibling, null);
  t.is(heap._head.sibling.child.sibling.parent.key, 30);
  t.is(heap._head.sibling.child.sibling.parent.value, 'C');
  t.is(heap._head.sibling.child.sibling.parent.degree, 2);
  t.is(heap._head.sibling.child.sibling.parent.parent, null);
  t.is(heap._head.sibling.child.sibling.parent.sibling, null);
  t.is(heap.size, 6);
});

test('roots', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.deepEqual(heap.roots(), [heap._head, heap._head.sibling, heap._head.sibling.sibling]);
});

test('search', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  t.deepEqual(heap.search(10), heap._head.sibling.sibling);
  t.deepEqual(heap.search(20), heap._head.sibling.sibling.child.sibling);
  t.deepEqual(heap.search(30), heap._head.sibling.sibling.child);
  t.deepEqual(heap.search(40), heap._head.sibling.sibling.child.child);
  t.deepEqual(heap.search(50), heap._head.sibling);
  t.deepEqual(heap.search(60), heap._head.sibling.child);
  t.deepEqual(heap.search(70), heap._head);
  t.is(heap.search(80), undefined);
});

test('updateKey', t => {
  const heap = new Heap();
  heap
    .insert(10, 'A')
    .insert(20, 'B')
    .insert(30, 'C')
    .insert(40, 'D')
    .insert(50, 'E')
    .insert(60, 'F')
    .insert(70, 'G');

  heap.updateKey(40, 40);
  t.is(heap._head.sibling.sibling.child.child.key, 40);
  heap.updateKey(40, 80);
  t.is(heap._head.sibling.sibling.child.child.key, 40);
  heap.updateKey(40, 5);

  t.is(heap._head.key, 70);
  t.is(heap._head.value, 'G');
  t.is(heap._head.degree, 0);
  t.is(heap._head.parent, null);
  t.is(heap._head.child, null);
  t.is(heap._head.sibling.key, 50);
  t.is(heap._head.sibling.value, 'E');
  t.is(heap._head.sibling.degree, 1);
  t.is(heap._head.sibling.parent, null);
  t.is(heap._head.sibling.child.key, 60);
  t.is(heap._head.sibling.child.value, 'F');
  t.is(heap._head.sibling.child.degree, 0);
  t.is(heap._head.sibling.child.child, null);
  t.is(heap._head.sibling.child.sibling, null);
  t.is(heap._head.sibling.sibling.key, 5);
  t.is(heap._head.sibling.sibling.value, 'D');
  t.is(heap._head.sibling.sibling.degree, 2);
  t.is(heap._head.sibling.sibling.parent, null);
  t.is(heap._head.sibling.sibling.sibling, null);
  t.is(heap._head.sibling.sibling.child.key, 10);
  t.is(heap._head.sibling.sibling.child.value, 'A');
  t.is(heap._head.sibling.sibling.child.degree, 1);
  t.is(heap._head.sibling.sibling.child.child.key, 30);
  t.is(heap._head.sibling.sibling.child.child.value, 'C');
  t.is(heap._head.sibling.sibling.child.child.degree, 0);
  t.is(heap._head.sibling.sibling.child.child.child, null);
  t.is(heap._head.sibling.sibling.child.child.sibling, null);
  t.is(heap._head.sibling.sibling.child.sibling.key, 20);
  t.is(heap._head.sibling.sibling.child.sibling.value, 'B');
  t.is(heap._head.sibling.sibling.child.sibling.degree, 0);
  t.is(heap._head.sibling.sibling.child.sibling.parent.key, 5);
  t.is(heap._head.sibling.sibling.child.sibling.parent.value, 'D');
  t.is(heap._head.sibling.sibling.child.sibling.parent.degree, 2);
  t.is(heap._head.sibling.sibling.child.sibling.sibling, null);
  t.is(heap._head.sibling.sibling.child.sibling.child, null);
  t.is(heap.size, 7);
});
