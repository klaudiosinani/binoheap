<h1 align="center">
  Binoheap
</h1>

<h4 align="center">
  Binomial heaps for ES6
</h4>

<p align="center">
  <a href="https://travis-ci.com/klaussinani/binoheap">
    <img alt="Build Status" src="https://travis-ci.com/klaussinani/binoheap.svg?branch=master">
  </a>
  <a href='https://coveralls.io/github/klaussinani/binoheap?branch=master'>
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/klaussinani/binoheap/badge.svg?branch=master">
  </a>
</p>

## Description

ES6 implementation of the binomial heap data structure with TypeScript support.

Visit the [contributing guidelines](https://github.com/klaussinani/binoheap/blob/master/contributing.md#translating-documentation) to learn more on how to translate this document into more languages.

## Contents

- [Description](#description)
- [Install](#install)
- [In Depth](#in-depth)
- [Usage](#usage)
- [API](#api)
- [Development](#development)
- [Related](#related)
- [Team](#team)
- [License](#license)

## Install

### Yarn

```bash
yarn add binoheap
```

### NPM

```bash
npm install binoheap
```

## In Depth

A binomial heap data structure, is a specific implementation of the heap data structure, comprised of collections of binomial trees that are linearly linked together, where each tree is a minimum or maximum ordered heap. Binomial heaps are similar to binary heaps but they have a more specific structure and allow for efficient `O(log n)` heap merging.

A binomial heap is implemented as a set of binomial trees, compared to a binary heap that has the shape of a single binary tree, which are defined recursively as follows:

- A binomial tree of order `0` is a single node.
- A binomial tree of order `k` has a root node whose children are roots of binomial trees of orders `k−1`, `k−2`, ..., `2`, `1`, `0`.

A binomial tree of order `k` has `2^k` nodes and height `k`. Because of its unique structure, a binomial tree of order `k` can be constructed from two trees of order `k−1` by attaching one of them as the leftmost child of the root of the other. This feature is central to the merge operation of a binomial heap, which is its major advantage over other conventional heaps.

Additionally, each tree in the binomial heap should satisfy the binomial heap properties:

- There can only be either one or zero binomial trees for each order, including zero order.
- Each binomial tree in a heap obeys the minimum-heap property or the maximum-heap property, if the heap is either minimum or maximum ordered:
  - Minimum-Heap Property: the key of a node is greater than or equal to the key of its parent.
  - Maximum-Heap Property: the key of a node is smaller than or equal to the key of its parent.

The first property implies that a binomial heap with `n` nodes consists of at most `1 + log2 n` binomial trees. The second property ensures that the root of each binomial tree contains the smallest or the largest key in the tree, which applies to the entire heap.

Binoheap binomial heaps are implemented using doubly linear linked lists for storing nodes, thus parent nodes point directly to their children and the child nodes point back to their parent. Each node contains a `parent`, `sibling` & `child` pointer, as well as a `key`, a `value` and a `degree` property.

## Usage

Binoheap exposes a chainable API, that can be utilized through a simple and minimal syntax, allowing you to combine methods effectively.

To create a **min-ordered binomial heap**, where the nodes of each binomial tree obey the **min-heap property**, according to which the parent node is always smaller than or equal to its children nodes, we provide as argument to the `Heap` class, on instantiation, a binary comparator function `compareMin(x, y)`, which returns a positive number when the node `x` is greater than node `y`, zero when equal and a negative number when less than.

Additionally, to create a **max-ordered binomial heap**, where the nodes of each binomial tree obey the **max-heap property**, according to which the parent node is always greater than or equal to its children nodes, we provide as argument to the `Heap` class, on instantiation, a binary comparator function `compareMax(x, y)`, which returns a negative number when the node `x` is greater than the node `y`, zero when equal and a positive number when less than.

By default, if no comparator function is provided on instantiation, a **min-ordered binomial heap** instance is returned, where the `key` value of each node is used for maintaining the **min-heap property** by the comparator function.

Usage examples can be also found at the [`test`](https://github.com/klaussinani/binoheap/tree/master/test) directory.

```js
'use strict';
const {Heap, Node} = require('binoheap');

// Create a max-ordered binomial heap
const heap = new Heap((x, y) => y.key - x.key);

heap.isEmpty();
//=> true

heap.insert(1, 'A');
//=> Heap {
// size: 1,
// head: Node { key: 1, value: 'A', degree: 0, parent: null, child: null, sibling: null } }

heap.isEmpty();
//=> false

heap.size;
//=> 1

heap.head;
//=> Node { key: 1, value: 'A', degree: 0, parent: null, child: null, sibling: null }

heap.head.toPair();
//=> [1, 'A']

const node = new Node(1, 'A');
//=> Node { key: 1, value: 'A', degree: 0, parent: null, child: null, sibling: null }

heap.head.key === node.key;
//=> true

heap.head.value === node.value;
//=> true

heap.head.degree === node.degree;
//=> true

heap
  .insert(2, 'B')
  .insert(3, 'C')
  .insert(4, 'D')
  .insert(5, 'E')
  .insert(6, 'F')
  .insert(7, 'G');
//=> Heap {
// size: 7,
// head: Node { key: 7, value: 'G', degree: 0, parent: null, child: null, sibling: [Node] } }

heap.head.siblings();
//=> [
//  Node { key: 6, value: 'F', degree: 1, parent: null, child: [Node], sibling: [Node] },
//  Node { key: 4, value: 'D', degree: 2, parent: null, child: [Node], sibling: null }
// ]

// Returns the node with the maximum key value
heap.extremum();
//=> Node { key: 7, value: 'G', degree: 0, parent: null, child: null, sibling: [Node] }

heap.extremumKey();
//=> 7

heap.extremumValue();
//=> 'G'

heap.roots();
//=> [
//  Node { key: 7, value: 'G', degree: 0, parent: null, child: null, sibling: [Node] },
//  Node { key: 6, value: 'F', degree: 1, parent: null, child: [Node], sibling: [Node] },
//  Node { key: 4, value: 'D', degree: 2, parent: null, child: [Node], sibling: null }
// ]

heap.includes(100);
//=> false

heap.includes(2);
//=> true

heap.search(1);
//=> Node { key: 1, value: 'A', degree: 0, parent: [Node], child: null, sibling: null }

heap.search(20);
//=> undefined

// Remove and return the node with the maximum key value
heap.removeExtremum();
//=> Node { key: 7, value: 'G', degree: 0, parent: null, child: null, sibling: [Node] }

heap.head;
//=> Node { key: 6, value: 'F', degree: 1, parent: null, child: [Node], sibling: [Node] }

heap.size;
//=> 6

const heap2 = new Heap((x, y) => y.key - x.key));

heap2
  .insert(8, 'H')
  .insert(9, 'I');
//=> Heap {
// size: 2,
// head: Node { key: 9, value: 'I', degree: 1, parent: null, child: [Node], sibling: null } }

heap2.updateKey(8, 15);
//=> Heap {
// size: 2,
// head: Node { key: 15, value: 'H', degree: 1, parent: null, child: [Node], sibling: null } }

heap.merge(heap2);
//=> Heap {
// size: 8,
// head: Node { key: 15, value: 'H', degree: 3, parent: null, child: [Node], sibling: null } }

heap.head.descendants();
//=> [
//  Node { key: 4, value: 'D', degree: 2, parent: [Node], child: [Node], sibling: [Node] }
//  Node { key: 2, value: 'B', degree: 1, parent: [Node], child: [Node], sibling: [Node] },
//  Node { key: 1, value: 'A', degree: 0, parent: [Node], child: null, sibling: null },
// ]
```

## API

#### heap.`head`

- Return Type: `Node | null`

Returns the head node of the heap. If the heap is empty then `null` is returned.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap.insert(10, 'A');
//=> Heap {
// size: 1,
// head: Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null } }
heap.head;
// => Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null }
```

#### heap.`size`

- Return Type: `Number`

Returns the total number of nodes residing in the heap.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
heap.size;
// => 3
```

#### heap.`clear()`

- Return Type: `Heap`

Mutates the heap by removing all residing nodes and returns it empty.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
heap.size;
// => 3
heap.clear();
//=> Heap {
// size: 0,
// head: null }
heap.size;
//=> 0
```

#### heap.`extremum()`

- Return Type: `Node | undefined`

Returns the node corresponding to the minimum `key` value, if the heap is minimum-ordered or the node corresponding to the maximum `key`, if the heap is maximum-ordered. If the heap is empty then `undefined` is returned.

```js
const {Heap} = require('binoheap');

// Create a minimum-ordered heap
const minHeap = new Heap((x, y) => x.key - y.key);

minHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
minHeap.extremum();
//=> Node { key: 10, value: 'A', degree: 1, parent: null, child: [Node], sibling: null }

// Create a maximum-ordered heap
const maxHeap = new Heap((x, y) => y.key - x.key);

maxHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
maxHeap.extremum();
//=> Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] }
```

#### heap.`extremumKey()`

- Return Type: `Number | undefined`

Returns the minimum `key` value, if the heap is minimum-ordered or the maximum `key` value, if the heap is maximum-ordered. If the heap is empty then `undefined` is returned.

```js
const {Heap} = require('binoheap');

// Create a minimum-ordered heap
const minHeap = new Heap((x, y) => x.key - y.key);

minHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
minHeap.extremumKey();
//=> 10

// Create a maximum-ordered heap
const maxHeap = new Heap((x, y) => y.key - x.key);

maxHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
maxHeap.extremumKey();
//=> 30
```

#### heap.`extremumValue()`

- Return Type: `Any | undefined`

Returns the `value` corresponding to the node with the minimum `key` in the heap, if the heap is minimum-ordered or the `value` corresponding to the node with the maximum `key`, if the heap is maximum-ordered.  If the heap is empty then `undefined` is returned.

```js
const {Heap} = require('binoheap');

// Create a minimum-ordered heap
const minHeap = new Heap((x, y) => x.key - y.key);

minHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
minHeap.extremumValue();
//=> 'A'

// Create a maximum-ordered heap
const maxHeap = new Heap((x, y) => y.key - x.key);

maxHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
maxHeap.extremumKey();
//=> 'C'
```

#### heap.`heapTrees()`

- Return Type: `Number`

Returns the number of binomial trees that the heap is comprised of.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
heap.heapTrees();
//=> 2
```

#### heap.`includes(key)`

- Return Type: `Boolean`

Traverses the nodes in the binomial heap level by level, from left to right & from top to bottom, and determines whether the heap includes a node with the given `key` value, returning `true` or `false` as appropriate.

##### **`key`**

- Type: `Number`

Node `key` to search for.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
heap.includes(20);
//=> true
heap.includes(5);
//=> false
```

#### heap.`insert(key, value)`

- Return Type: `Heap`

Mutates the heap by inserting a new node at the appropriate location. Returns the heap itself.

##### **`key`**

- Type: `Number`

Can be any number that will correspond to the `key` of the created node.

##### **`value`**

- Type: `Any`

Can be any value that will stored in the created node.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap.insert(10, 'A');
//=> Heap {
// size: 1,
// head: Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null } }
heap
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
```

#### heap.`isEmpty()`

- Return Type: `Boolean`

Determines whether the heap is empty, returning `true` or `false` as appropriate.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap.isEmpty();
// => true
heap.insert(10, 'A');
//=> Heap {
// size: 1,
// head: Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null } }
heap.isEmpty();
// => false
```

#### heap.`merge(heap)`

- Return Type: `Heap`

Mutates the `Heap` instance by merging it with the given binomial heap. Returns the resulting merged heap.

##### **`heap`**

- Type: `Heap`

Heap to merge with the `Heap` instance.

```js
const {Heap} = require('binoheap');

const heap1 = new Heap();

heap1
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }

const heap2 = new Heap();

heap2
  .insert(40, 'D')
  .insert(50, 'E')
  .insert(60, 'F');
//=> Heap {
// size: 3,
// head: Node { key: 60, value: 'F', degree: 0, parent: null, child: null, sibling: [Node] } }

heap1.merge(heap2);
//=> Heap {
// size: 6,
// head: Node { key: 30, value: 'C', degree: 1, parent: null, child: [Node], sibling: [Node] } }
```

#### heap.`removeExtremum()`

- Return Type: `Node | undefined`

Mutates the heap by removing the node corresponding to the minimum `key` value, if the heap is minimum-ordered or the node corresponding to the maximum `key` if the heap is maximum-ordered. 
The removed node is returned by the method if the heap is not empty. If the heap is empty then `undefined` is returned instead.

##### **`key`**

- Type: `Number`

Can be any number that corresponds to the `key` of an existing node.

```js
const {Heap} = require('binoheap');

// Create a minimum-ordered heap
const minHeap = new Heap((x, y) => x.key - y.key);

minHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
minHeap.removeExtremum();
//=> Node { key: 10, value: 'A', degree: 1, parent: null, child: [Node], sibling: null }
minHeap;
//=> Heap {
// size: 2,
// head: Node { key: 20, value: 'B', degree: 1, parent: null, child: [Node], sibling: null } }

// Create a maximum-ordered heap
const maxHeap = new Heap((x, y) => y.key - x.key);

maxHeap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
maxHeap.removeExtremum();
//=> Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] }
maxHeap;
//=> Heap {
// size: 2,
// head: Node { key: 20, value: 'B', degree: 1, parent: null, child: [Node], sibling: null } }
```

#### heap.`roots()`

- Return Type: `Array<Node>`

Traverses the root nodes of the binomial trees residing in the heap and stores of each traversed root node in an array. At the end of the traversal, the method returns the array which will contain all tree root nodes in ascending `degree` order.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
heap.roots();
//=> [
//  Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] },
//  Node { key: 10, value: 'A', degree: 1, parent: null, child: [Node], sibling: null }
// ]
```

#### heap.`search(key)`

- Return Type: `Node | undefined`

Traverses the nodes in the binomial heap level by level, from left to right & from top to bottom, and determines whether the heap includes a node with the given `key` value, returning node itself, without mutating the heap, or `undefined` as appropriate.

##### **`key`**

- Type: `Number`

Node `key` to search for.

```js
const {Heap} = require('binoheap');

const heap = new Heap();

heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C');
//=> Heap {
// size: 3,
// head: Node { key: 30, value: 'C', degree: 0, parent: null, child: null, sibling: [Node] } }
heap.search(10);
//=>  Node { key: 10, value: 'A', degree: 1, parent: null, child: [Node], sibling: null }
heap.includes(5);
//=> undefined
```

#### heap.`updateKey(key, newKey)`

- Return Type: `Heap`

Traverses the nodes in the binomial heap level by level, from left to right & from top to bottom, and determines whether the heap includes a node with the given `key` value. If the node is found then, its `key` value is mutated by replacing it with the new `newKey` one. Returns the heap itself.

The method can be used to **only decrease or increase** the key value of targeted nodes if the binomial heap is either **minimum** or **maximum** ordered.

##### **`key`**

- Type: `Number`

Can be any number that corresponds to the `key` of an existing node.

##### **`newKey`**

- Type: `Number`

New number value to be used as node key.

```js
const {Heap} = require('binoheap');

// Create a minimum-ordered heap
const minHeap = new Heap((x, y) => x.key - y.key);

minHeap
  .insert(10, 'A')
  .insert(20, 'B');
//=> Heap {
// size: 2,
// head: Node { key: 10, value: 'A', degree: 1, parent: null, child: [Node], sibling: null } }
minHeap.head;
//=> Node { key: 10, value: 'A', degree: 1, parent: null, child: [Node], sibling: null }
minHeap.head.child;
//=> Node { key: 20, value: 'B', degree: 0, parent: [Node], child: null, sibling: null }

minHeap.updateKey(20, 5);
//=> Heap {
// size: 2,
// head: Node { key: 5, value: 'B', degree: 1, parent: null, child: [Node], sibling: null } }
minHeap.head;
//=> Node { key: 5, value: 'B', degree: 1, parent: null, child: [Node], sibling: null }
minHeap.head.child;
//=> Node { key: 10, value: 'A', degree: 0, parent: [Node], child: null, sibling: null }


// Create a maximum-ordered heap
const maxHeap = new Heap((x, y) => y.key - x.key);

maxHeap
  .insert(10, 'A')
  .insert(20, 'B');
//=> Heap {
// size: 2,
// head: Node { key: 20, value: 'B', degree: 1, parent: null, child: [Node], sibling: null } }
maxHeap.head;
//=> Node { key: 20, value: 'B', degree: 1, parent: null, child: [Node], sibling: null }
maxHeap.head.child;
//=> Node { key: 10, value: 'A', degree: 0, parent: [Node], child: null, sibling: null }

maxHeap.update(10, 25);
//=> Heap {
// size: 2,
// head: Node { key: 25, value: 'A', degree: 1, parent: null, child: [Node], sibling: null } }
maxHeap.head;
//=> Node { key: 25, value: 'A', degree: 1, parent: null, child: [Node], sibling: null }
maxHeap.head.child;
//=> Node { key: 20, value: 'B', degree: 0, parent: [Node], child: null, sibling: null }
```

Available, along with the `Heap` exposed class, is the `Node` class, mainly useful for testing purposes, since it can be utilized to compare heap nodes. The class has a binary constructor method, with a `key` and a `value` parameter, corresponding to the key and the value stored in the created instance, respectively.

#### node.`key`

- Return Type: `Number`

The `key` corresponding to the node instance.

```js
const {Node} = require('binoheap');

const node = new Node(10, 'A');
// => Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null }
node.key;
//=> 10
```

#### node.`value`

- Return Type: `Any`

The value that the node contains.

```js
const {Node} = require('binoheap');

const node = new Node(10, 'A');
//=> Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null }
node.value;
//=> 'A'
node.value = 'B'
//=> Node { key: 10, value: 'B', degree: 0, parent: null, child: null, sibling: null }
node.value;
//=> 'B'
```

#### node.`degree`

- Return Type: `Number`

Degree of the node.

```js
const {Heap} = require('binoheap');

const heap = new Heap();
//=> Heap {
// size: 0,
// head: null }
heap.insert(10, 'A').head;
//=> Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null } }
heap.head.degree;
//=> 1
heap.insert(20, 'B').head;
//=> Node { key: 10, value: 'A', degree: 1, parent: null, child: [Node], sibling: null } }
heap.head.degree;
//=> 1
```

#### node.`parent`

- Return Type: `Node | null`

The parent node of the node instance.

```js
const {Node} = require('binoheap');

const node1 = new Node(10, 'A');
// => Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null }
node1.parent;
//=> null
const node2 = new Node(20, 'B');
// => Node { key: 20, value: 'B', degree: 0, parent: null, child: null, sibling: null }
node1.parent = node2;
// => Node { key: 10, value: 'A', degree: 0, parent: [Node], child: null, sibling: null }
```

#### node.`child`

- Return Type: `Node | null`

The child node of the node instance.

```js
const {Node} = require('binoheap');

const node1 = new Node(10, 'A');
// => Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null }
node1.child;
//=> null
const node2 = new Node(20, 'B');
// => Node { key: 20, value: 'B', degree: 0, parent: null, child: null, sibling: null }
node1.child = node2;
// => Node { key: 10, value: 'A', degree: 0, parent: null, child: [Node], sibling: null }
```

#### node.`child`

- Return Type: `Node | null`

The sibling node of the node instance.

```js
const {Node} = require('binoheap');

const node1 = new Node(10, 'A');
// => Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: null }
node1.sibling;
//=> null
const node2 = new Node(20, 'B');
// => Node { key: 20, value: 'B', degree: 0, parent: null, child: null, sibling: null }
node1.sibling = node2;
// => Node { key: 10, value: 'A', degree: 0, parent: null, child: null, sibling: [Node] }
```

#### node.`siblings()`

- Return Type: `Array<Node>`

Traverses all sibling nodes of the `Node` instance and stores them in an array. The array is returned at the end of the traversal.

```js
const {Heap} = require('binoheap');

const heap = new Heap();
//=> Heap {
// size: 0,
// head: null } }
heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C')
  .insert(40, 'D')
  .insert(50, 'E')
  .insert(60, 'F')
  .insert(70, 'G');
//=> Heap {
// size: 7,
// head: Node { key: 70, value: 'G', degree: 0, parent: null, child: [Node], sibling: null } }
heap.head.siblings();
//=> [
// Node { key: 50, value: 'E', degree: 1, parent: null, child: [Node], sibling: [Node] },
// Node { key: 10, value: 'A', degree: 2, parent: null, child: [Node], sibling: null }
// ]
```

#### node.`descendants()`

- Return Type: `Array<Node>`

Traverses all the descendant nodes of the `Node` instance, through the `Node#child` pointer, and stores each one of them in an array. The array is returned at the end of the traversal.

```js
const {Heap} = require('binoheap');

const heap = new Heap();
//=> Heap {
// size: 0,
// head: null } }
heap
  .insert(10, 'A')
  .insert(20, 'B')
  .insert(30, 'C')
  .insert(40, 'D');
//=> Heap {
// size: 7,
// head: Node { key: 10, value: 'A', degree: 2, parent: null, child: [Node], sibling: null } }
heap.head.descendants();
//=> [
// Node { key: 30, value: 'C', degree: 1, parent: [Node], child: [Node], sibling: [Node] },
// Node { key: 40, value: 'D', degree: 0, parent: [Node], child: , sibling: null }
// ]
```

#### node.`toPair()`

- Return Type: `[Number, Any]`

Returns an ordered-pair/2-tuple, where the first element is a number corresponding to the `key` of the node, and the last one is a value, that can be of any type, corresponding to the `value` stored in the node.

```js
const {Heap, Node} = require('binoheap');

const heap = new Heap();
const node = new Node(5, 'B');

node.toPair();
//=> [5, 'B']
heap.insert(10, 'A').head.toPair();
//=> [10, 'A']
```

## Development

For more info on how to contribute to the project, please read the [contributing guidelines](https://github.com/klaussinani/binoheap/blob/master/contributing.md).

- Fork the repository and clone it to your machine
- Navigate to your local fork: `cd binoheap`
- Install the project dependencies: `npm install` or `yarn install`
- Lint the code and run the tests: `npm test` or `yarn test`

## Related

- [avlbinstree](https://github.com/klaussinani/avlbinstree) - AVL self-balancing binary search trees for ES6
- [binstree](https://github.com/klaussinani/binstree) - Binary search trees for ES6
- [doublie](https://github.com/klaussinani/doublie) - Doubly circular & linear linked lists for ES6
- [dsforest](https://github.com/klaussinani/dsforest) - Disjoint-set forests for ES6
- [kiu](https://github.com/klaussinani/kiu) - FIFO Queues for ES6
- [mheap](https://github.com/klaussinani/mheap) - Binary min & max heaps for ES6
- [prioqueue](https://github.com/klaussinani/prioqueue) - Priority queues for ES6
- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/binoheap/blob/master/license.md)
