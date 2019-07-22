declare namespace node {
  export interface Constructor {
    new <T = any>(key: number, value: T): Instance<T>;
  }

  export interface Instance<T> {
    readonly key: number;
    value: T;
    parent: Instance<T> | null;
    child: Instance<T> | null;
    sibling: Instance<T> | null;
    toPair(): [number, T];
  }
}

declare namespace heap {
  interface Node<T> extends node.Instance<T> {}

  export interface Constructor {
    new <T = any>(comparatorFn?: (x: Node<T>, y: Node<T>) => number): Instance<T>;
  }

  export interface Instance<T> {
    readonly size: number;
    isEmpty(): boolean;
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
