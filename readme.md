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

A binomial heap data structure, is a specific implementation of the heap data structure, comprised of collections of binomial trees that are linearly linked together, where each tree is an minimum or maximum ordered heap. Binomial heaps are similar to binary heaps but they have a more specific structure and allow for efficient `O(log n)` heap merging.

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

Additionally, to create a **max-ordered binomial heap**, where the nodes of each binomial tree obey the **max-heap property**, according to which the parent node is always greater than or equal to its children nodes, we provide as argument to the `Heap` class on, instantiation, a binary comparator function `compareMax(x, y)`, which returns a negative number when the node `x` is greater than the node `y`, zero when equal and a positive number when less than.

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
- [kiu](https://github.com/klaussinani/kiu) - FIFO Queues for ES6
- [mheap](https://github.com/klaussinani/mheap) - Binary min & max heaps for ES6
- [prioqueue](https://github.com/klaussinani/prioqueue) - Priority queues for ES6
- [singlie](https://github.com/klaussinani/singlie) - Singly circular & linear linked lists for ES6

## Team

- Klaus Sinani [(@klaussinani)](https://github.com/klaussinani)

## License

[MIT](https://github.com/klaussinani/binoheap/blob/master/license.md)
