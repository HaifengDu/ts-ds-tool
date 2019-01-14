# 二叉树
在计算机科学中，二叉树是每个结点最多有两个子树的树结构。通常子树被称作“左子树”（left subtree）和“右子树”（right subtree）。二叉树常被用于实现二叉查找树和二叉堆。
一棵深度为k，且有2^k-1个节点的二叉树，称为满二叉树。这种树的特点是每一层上的节点数都是最大节点数。而在一棵二叉树中，除最后一层外，若其余层都是满的，并且最后一层或者是满的，或者是在右边缺少连续若干节点，则此二叉树为完全二叉树。具有n个节点的完全二叉树的深度为floor(log2n)+1。深度为k的完全二叉树，至少有2k-1个叶子节点，至多有2k-1个节点。
![BinaryTree](https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fc0ad608e6c4b7452099bf44ae957572/9213b07eca806538fa88f4329adda144ad3482b5.jpg)


## 基本操作的API及示例

## 节点 BasicBinaryTreeNode\<T>
### 属性

#### 值属性 Value
##### Value: T
``` text
实例:
const node = new BasicBinaryTreeNode(1);
const value = node.Value;
console.log(value);
//1
```

#### 左节点 Left
##### Left: BasicBinaryTreeNode\<T>
``` text
实例:
const node = new BasicBinaryTreeNode(1);
const left = node.Left;
```

#### 左节点 Right
##### Right: BasicBinaryTreeNode\<T>
``` text
实例:
const node = new BasicBinaryTreeNode(1);
const right = node.Right;
```

### 方法

#### 设值 setValue
##### setValue(value: T):void
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
console.log(node.Value);
//1
```

#### 设左节点 setLeft
##### setLeft(node: BasicBinaryTreeNode\<T>):void
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const leftNode = new BasicBinaryTreeNode(2);
node.setLeft(leftNode);
```
#### 设右节点 setRight
##### setRight(node: BasicBinaryTreeNode\<T>):void
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
```

#### 删除子节点 removeChild
##### setRight(node: BasicBinaryTreeNode\<T>):boolean
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
node.removeChild(rightNode);
```

#### 获取树高 getHeight
##### getHeight(): number
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
console.log(node.getHeight());
//2
```

#### 获取平衡因子 balanceFactor
##### balanceFactor(): number
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
console.log(node.balanceFactor());
//-1
```

#### 获取兄弟节点 getSibling
##### getSibling(): BasicBinaryTreeNode\<T>
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
const leftNode = new BasicBinaryTreeNode(2);
node.setLeft(leftNode);
const sibling = rightNode.getSibling();
```

#### 获取叔父节点 getUncle
##### getUncle(): BasicBinaryTreeNode\<T>
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(0);
const rightNode = new BasicBinaryTreeNode(1);
node.setRight(rightNode);
const leftNode = new BasicBinaryTreeNode(2);
node.setLeft(leftNode);

const leftLeftNode = new BasicBinaryTreeNode(3);
leftNode.setLeft(leftLeftNode);
const leftRightNode = new BasicBinaryTreeNode(4);
leftNode.setRight(leftLeftNode);

const sibling = leftLeftNode.getUncle();
```

## 二叉树 BasicBinaryTree

### 方法
#### 先序遍历 preTraversal
##### <font color="#00ff00">\[s]</font> preTraversal(root: BasicBinaryTreeNode\<T>): T[]

``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
const leftNode = new BasicBinaryTreeNode(3);
node.setLeft(leftNode);
const values = BasicBinaryTree.preTraversal(node);
console.log(values);
// [1, 3, 2]
```

#### 中序遍历 inTraversal
##### <font color="#00ff00">\[s]</font> inTraversal(root: BasicBinaryTreeNode\<T>): T[]
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
const leftNode = new BasicBinaryTreeNode(3);
node.setLeft(leftNode);
const values = BasicBinaryTree.inTraversal(node);
console.log(values);
// [3, 1, 2]
```

#### 后序遍历 postOrderTraversal
##### <font color="#00ff00">\[s]</font> postOrderTraversal(root: BasicBinaryTreeNode\<T>): T[]
``` text
实例:
const node = new BasicBinaryTreeNode();
node.setValue(1);
const rightNode = new BasicBinaryTreeNode(2);
node.setRight(rightNode);
const leftNode = new BasicBinaryTreeNode(3);
node.setLeft(leftNode);
const values = BasicBinaryTree.postOrderTraversal(node);
console.log(values);
// [3, 2, 1]
```