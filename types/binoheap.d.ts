declare namespace node {
  export interface Constructor {
    new <T = any>(key: number, value: T): Instance<T>;
  }

  export interface Instance<T> {
    value: T;
    parent: Instance<T> | null;
    readonly key: number;
    toPair(): [number, T];
  }
}

declare namespace heap {
  export interface Constructor {
    new <T = any>(): Instance<T>;
  }

  export interface Instance<T> {}
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
