import { Heap, Node } from '../..';

// Create a max-ordered binomial heap
const heap = new Heap<string>((x, y) => y.key - x.key);

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

const node = new Node<string>(1, 'A');
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

const heap2 = new Heap<string>((x, y) => y.key - x.key);

heap2.insert(8, 'H').insert(9, 'I');
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
