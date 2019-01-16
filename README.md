# ts-ds-tool
`ts-ds-tool` a tool library of Data Structure and Algorithms based on typescript

[![npm package](https://img.shields.io/npm/v/ts-ds-tool.svg?style=flat-square)](https://www.npmjs.org/package/ts_ds_tool) [![Build Status](https://travis-ci.org/HaifengDu/ts_ds_tool.svg?branch=master)](https://travis-ci.org/HaifengDu/ts_ds_tool) [![codecov](https://codecov.io/gh/HaifengDu/ts_ds_tool/branch/master/graph/badge.svg)](https://codecov.io/gh/HaifengDu/ts_ds_tool)

# Quick Start

## Install

### 1.Use NPM ( Recommend )

``
npm install ts-ds-tool --save
``

### 2.Import in Browser
Use the script tags in the browser to directly import the file and use the global variable DataStructure. We provide files such as ts-ds-tool/data-structure.min.js in the `ts-ds-tool/dist` directory in the npm package, or via [unpkg](https://unpkg.com/ts-ds-tool/) Download it.


``` html
<script src="https://unpkg.com/ts-ds-tool/dist/data-structure.min.js"></script>

```

## Included data structures &#128296;

* Linked List &#10004;
* Double Linked List &#10004;
* Cycle Linked List &#10004;
* Queue &#10004;
* Stack &#10004;
* Skip List &#10004;
* Max Heap &#10004;
* Min Heap &#10004;
* Priority Queue &#10004;
* Binomial Heap &#10004;
* Leftist Tree &#10004;
* HashTable &#10004;
* HashMap &#10004;
* HashSet &#10004;
* Tree Map &#10004;
* Tree Set &#10004;
* Disjoint Set &#10004;
* Basic Binary Tree &#10004;
* Binary Search Tree &#10004;
* AVL Tree &#10004;
* Red Black Tree &#10004;
* Fenwick Tree &#10004;
* Huffman Tree &#10004;
* Graph &#10004;

## Included algorithms &#128296;

* binary search &#10004;
* longest common sequence &#10004;
* kmp &#10004;
* levenshtein distance &#10004;
* max sub array &#10004;
* min and max &#10004;
* bellman ford &#10004;
* dijkstra &#10004;
* floyd warshall &#10004;
* breadth first search &#10004;
* depth first search &#10004;
* isconnected &#10004;
* isEulerGraph &#10004;
* getEulerCircuit &#10004;
* kruskal &#10004;
* prim &#10004;
* tarjan &#10004;
* topo-sort &#10004;
* tsp branch and bound &#10004;
* gcd &#10004;
* lcm &#10004;
* combination &#10004;
* combination repeat &#10004;
* permutation &#10004;
* power set &#10004;
* bubble sort &#10004;
* insert sort &#10004;
* merge sort &#10004;
* quick sort repeat &#10004;
* selection sort &#10004;
* shell sort &#10004;

## Import
``` js
import { Queue } from 'ts-ds-tool';
import { breadthFirstSearch } from 'ts-ds-tool';

import { sort } from 'ts-ds-tool';
import { math } from 'ts-ds-tool';
```

## Run:

```sh
$ git clone git@github.com:HaifengDu/ts_ds_tool.git
$ cd ts_ds_tool
$ npm install
```

This will setup the library dependencies for you.

To run tests, run

```sh
$ npm run test
```

To lint your code, run

```sh
$ npm run lint
```

To generate test coverage, run

```sh
$ npm run ci
```

To compile typescript, run
```sh
$ npm run tsc
```

To only build, run
```sh
$ npm run build:dist
```

To compile and build, run

```sh
$ npm run build
```

## License &#128064;

This project is licensed under the MIT License.