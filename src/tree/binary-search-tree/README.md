# 二叉排序树 BinarySearchTree\<T>
二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。

一棵空树或者具有下列性质的二叉树：

1. 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
2. 若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
3. 任意节点的左、右子树也分别为二叉查找树；
4. 没有键值相等的节点。

![BinarySearchTree](https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Binary_search_tree.svg/150px-Binary_search_tree.svg.png)

## 基本操作的API及示例
### 属性

#### 根节点 Root
##### Root: BinarySearchTreeNode\<T>
``` text
实例:
const tree = new BinarySearchTree();
tree.insert(1);
const root = tree.Root;
```

### 方法
#### 构造器 Constructor
##### new BinarySearchTree(compareKey?: keyof T)
``` text
实例:
const tree = new BinarySearchTree();

const tree2 = new BinarySearchTree<{key:number}>("key");
```

#### 插入 insert
##### insert(value: T): BinarySearchTreeNode\<T>
``` text
实例:
const tree = new BinarySearchTree();
tree.insert(1);
```

#### 删除 remove
##### remove(value: T): boolean
``` text
实例:
const tree = new BinarySearchTree();
tree.insert(1);
tree.remove(1);
```

#### 清空 clear
##### clear(): void
``` text
实例:
const tree = new BinarySearchTree();
tree.insert(1);
tree.clear();
```

#### 查找 find
##### find(value: T): BinarySearchTreeNode\<T>
``` text
实例:
const tree = new BinarySearchTree();
tree.insert(1);
tree.find(1);

const tree2 = new BinarySearchTree<{key:number,value?:any}>();
tree2.insert({key: 1, value: "test"});
tree2.find({key: 1});
```

#### 包含 contains
##### contains(value: T): boolean
``` text
实例:
const tree = new BinarySearchTree();
tree.insert(1);
let existed = tree.contains(1);
console.log(existed);
// true

const tree2 = new BinarySearchTree<{key:number,value?:any}>();
tree2.insert({key: 1, value: "test"});
let existed = tree2.contains({key: 1});
console.log(existed);
// true
```

#### 获取排序列表 getAscSeq
##### getAscSeq(value: T): T[]
``` text
实例:
const tree = new BinarySearchTree();
tree.insert(2);
tree.insert(1);
tree.insert(3);
let seqList = tree.getAscSeq();
console.log(seqList);
// [1, 2, 3];

```