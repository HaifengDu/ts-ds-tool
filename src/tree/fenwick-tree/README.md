# 树状数组 FenwickTree
树状数组(Binary Indexed Tree(B.I.T), Fenwick Tree)是一个查询和修改复杂度都为log(n)的数据结构。主要用于查询任意两位之间的所有元素之和，但是每次只能修改一个元素的值；经过简单修改可以在log(n)的复杂度下进行范围修改，但是这时只能查询其中一个元素的值(如果加入多个辅助数组则可以实现区间修改与区间查询)。

![FenwickTree](https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=a565892f4790f60310bd9415587bd87e/0dd7912397dda14482d369acbfb7d0a20df486d1.jpg)
## 基本操作的API及示例


### 属性

#### 值属性 TreeArray
##### TreeArray: number[]
``` text
实例:
const tree = new FenwickTree(1);
tree.increase(1, 1);
const treeArray = tree.TreeArray;
console.log(treeArray);
//[0, 1]
描述:默认第一项为零
```

#### 节点数量 Count
##### Count: number
``` text
实例:
const tree = new FenwickTree(1);
tree.increase(1, 1);
const count = tree.Count;
console.log(count);
//1
```

### 方法

#### 按位增加
##### increase(position: number, value: number):FenwickTree;

``` text
实例:
const tree = new FenwickTree(2);
tree.increase(1, 1);
tree.increase(2, 3);
```

#### 计算第一位到指定位置的和
##### query(position: number):number;

``` text
实例:
const tree = new FenwickTree(1);
tree.increase(1, 1);
tree.increase(2, 3);
tree.increase(3, 3);
tree.increase(4, 2);
let total = tree.query(3);
console.log(total);
// 7
total = tree.query(2);
console.log(total);
// 4
描述:
数组越界抛出IndexOutOfBoundsException异常
```

#### 计算区间和
##### queryRange(start: number, end: number)
``` text
实例:
const tree = new FenwickTree(1);
tree.increase(1, 1);
tree.increase(2, 3);
tree.increase(3, 3);
tree.increase(4, 2);
let total = tree.queryRange(2, 3);
console.log(total);
// 6
total = tree.queryRange(1, 4);
console.log(total);
// 7
描述:
start>end时抛出异常
```