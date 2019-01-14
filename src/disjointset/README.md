# 并查集 DisjointSet<T>
在计算机科学中，并查集是一种树型的数据结构，用于处理一些不交集（Disjoint Sets）的合并及查询问题。有一个联合-查找算法（union-find algorithm）定义了两个用于此数据结构的操作：

Find：确定元素属于哪一个子集。它可以被用来确定两个元素是否属于同一子集。
Union：将两个子集合并成同一个集合。
由于支持这两种操作，一个不相交集也常被称为联合-查找数据结构（union-find data structure）或合并-查找集合（merge-find set）。其他的重要方法，MakeSet，用于创建单元素集合。

![DisjointSet](https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=ff063a13d42a283457ab3e593adca28f/c8177f3e6709c93def9024f99f3df8dcd1005459.jpg)
## 基本操作的API及示例
### 方法

###方法
#### 构造器 Constructor
##### new DisjointSet(key?: keyof T);
``` text
实例:
const disjointSet = new DisjointSet();

const disjointSet2 = new DisjointSet<{key:number}>("key");
```

#### 创建集合 makeSet
##### makeSet(value: T):DisjointSet<T>
``` text
实例:
const disjointSet = new DisjointSet();
disjointSet.makeSet("A");
```

#### 合并集合 union
##### makeSet(value1: T, value2: T):DisjointSet<T>
``` text
实例:
const disjointSet = new DisjointSet();
disjointSet.makeSet("A");
disjointSet.makeSet("B");
disjointSet.makeSet("A", "B");
描述:
参数为null时抛出异常
```

#### 查找根级 find
##### find(value1: T): string
``` text
实例:
const disjointSet = new DisjointSet();
disjointSet.makeSet("A");
disjointSet.makeSet("B");
disjointSet.makeSet("A", "B");
const key = disjointSet.find("B");
console.log(key);
// A
```

#### 是否在同一集合中 inSameSet
##### inSameSet(value1: T, value1: T): boolean
``` text
实例:
const disjointSet = new DisjointSet();
disjointSet.makeSet("A");
disjointSet.makeSet("B");
disjointSet.makeSet("A", "B");
const isSame = disjointSet.inSameSet("A", "B");
console.log(isSame);
// true
```