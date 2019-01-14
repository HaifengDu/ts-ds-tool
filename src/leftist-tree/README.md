# 左偏树 LeftistTree\<T>

左偏树是一种可并堆的实现。左偏树是一棵二叉树，它的节点除了和二叉树的节点一样具有左右子树指针（left, right）外，还有两个属性： 键值和距离（英文文献中称为s-value）。键值用于比较节点的大小。距离的定义如下：

当且仅当节点 i 的左子树且右子树为空时，节点被称作外节点（实际上保存在二叉树中的节点都是内节点，外节点是逻辑上存在而无需保存。把一颗二叉树补上全部的外节点，则称为extended binary tree）。节点i的距离是节点 i 到它的后代中的最近的外节点所经过的边数。特别的，如果节点 i 本身是外节点，则它的距离为0;而空节点的距离规定为 -1。

![LeftistTree](https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=9c3171f5c98065386fe7ac41f6b4ca21/8694a4c27d1ed21b01d6da5eae6eddc451da3f69.jpg)


## 基本操作的API及示例
### 属性

#### 节点个数 Count
##### Count:number
``` text
实例:
const leftistTree = new LeftistTree();
const count = LeftistTree.Count;
console.log(count);
//0
```

#### 根节点 Root
##### Root:LeftistTreeNode\<T>
``` text
实例:
const leftistTree = new LeftistTree();
const root = LeftistTree.Root;
```

### 方法

#### 插入 insert
##### insert(value: T):LeftistTreeNode\<T>
``` text
实例:
const leftistTree = new LeftistTree();
const node = leftistTree.insert(1);
console.log(node.Value);
// 1
```

#### 删除最小节点 deleteExtremum
##### deleteExtremum(): T
``` text
实例:
const leftistTree = new LeftistTree();
leftistTree.insert(3);
leftistTree.insert(1);
leftistTree.insert(2);
const value = leftistTree.deleteExtremum();
console.log(value);
// 1
```

#### 查找最小节点 findExtremum
##### findExtremum(): T
``` text
实例:
const leftistTree = new LeftistTree();
leftistTree.insert(3);
leftistTree.insert(1);
leftistTree.insert(2);
const value = leftistTree.findExtremum();
console.log(value);
// 1
描述：
此方法不删除元素
```

#### 合并堆 union
##### union(tree: LeftistTree\<T>): LeftistTree\<T>
``` text
实例:
const leftistTree = new LeftistTree();
leftistTree.insert(5);
leftistTree.insert(4);
leftistTree.insert(6);
const leftistTree2 = new LeftistTree();
leftistTree2.insert(3);
leftistTree2.insert(1);
leftistTree2.insert(2);
leftistTree.union(leftistTree2);
console.log(leftistTree.Count);
// 6
console.log(leftistTree.findExtremum());
// 1
```

#### 是否为空 isEmpty
##### isEmpty(): boolean
``` text
实例:
const leftistTree = new LeftistTree();
const isEmpty = leftistTree.isEmpty();
console.log(isEmpty);
// true
```