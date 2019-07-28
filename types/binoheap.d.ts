declare namespace node {
  export interface Constructor {
    new <T = any>(key: number, value: T): Instance<T>;
  }

  export interface Instance<T> {
    readonly key: number;
    value: T;
    readonly degree: number;
    parent: Instance<T> | null;
    child: Instance<T> | null;
    sibling: Instance<T> | null;
    descendants(): Array<Instance<T>>;
    siblings(): Array<Instance<T>>;
    toPair(): [number, T];
  }
}

declare namespace heap {
  interface Node<T> extends node.Instance<T> {}

  export interface Constructor {
    new <T = any>(comparatorFn?: (x: Node<T>, y: Node<T>) => number): Instance<T>;
  }

  export interface Instance<T> {
    readonly head: Node<T> | null;
    readonly size: number;
    clear(): this;
    extremum(): Node<T> | undefined;
    extremumKey(): number | undefined;
    extremumValue(): T | undefined;
    heapTrees(): number;
    insert(key: number, value: T): this;
    isEmpty(): boolean;
    merge(heap: Instance<T>): this;
    removeExtremum(): Node<T> | undefined;
    roots(): Array<Node<T>>;
  }
}

declare namespace binoheap {
  export interface Heap<T = any> extends heap.Instance<T> {}
  export interface Node<T = any> extends node.Instance<T> {}
}

declare const binoheap: {
  Heap: heap.Constructor;
  Node: node.Constructor;
};

export = binoheap;
