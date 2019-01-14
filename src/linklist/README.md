# 单向链表

在计算机科学中, 一个 **链表** 是数据元素的线性集合, 元素的线性顺序不是由它们在内存中的物理位置给出的。 相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列。

在最简单的形式下，每个节点由数据和到序列中下一个节点的引用(换句话说，链接)组成。这种结构允许在迭代期间有效地从序列中的任何位置插入或删除元素。

更复杂的变体添加额外的链接，允许有效地插入或删除任意元素引用。链表的一个缺点是访问时间是线性的(而且难以管道化)。

更快的访问，如随机访问，是不可行的。与链表相比，数组具有更好的缓存位置。

![Linked List](https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg)

## 基本操作的API及示例

### 追加

```text
append(value)
向链表中追加一个节点，参数为要追加的节点的值，返回链表的头结点
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
描述：
    1——>2——>null
```
    
### 向前追加

```text
prepend(value)
向链表头部之前添加一个节点，该节点会成为新的头结点，参数为要添加的节点的值，返回链表的头结点
示例： 
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.prepend(0);
描述：
    0——>1——>2——>null
```
    
### 弹出尾节点

```text
pop()
推出尾节点，返回推出的节点
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.prepend(0);
    linklist.pop();
描述：
  0——>1——>null
```

### 推出头结点

```text
shift()
推出头节点，返回推出的节点
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.append(3);
    linklist.shift();
描述：
    2——>3——>null
```
    
### 清空链表

```text
clear()
清空链表
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.clear();
描述：
    null
```

### 查找节点

```text
findNode(arg|value)
查找链表中的节点，参数为节点的值或者查询条件函数，返回查找的节点
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.findNode(value=>value===1);
描述：
    1——>2——>null
```

### 删除节点

```text
deleteNode(arg|value)
删除链表中的节点，参数为节点的值或者查询条件函数，返回删除的节点
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.deleteNode(1);
    linklist.deleteNode(value=>value===2);
描述：
    2——>null
```

### 向后插入

```text
insertAfter(value,node)
在某个节点后插入一个新节点，第一个参数为要插入的新节点的值，第二个参数为要在其后插入新节点的节点，返回true或false
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    let node = linklist.findNode(1);
    linklist.insertAfter(3,node);
描述：
    1——>3——>2——>null
```

### 获取头结点

```text
getHeadNode()
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    let headNode = linklist.getHeadNode();
描述：
    1——>2——>null
```

### 获取尾结点

```text
getTailNode()
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    let headNode = linklist.getTailNode();
描述：
    1——>2——>null
```

### 转换字符串

```text
toString()
将链表转为字符串
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    let str = linklist.toString();   // 1,2
描述：
    1——>2——>null
```

### 转双向链表

```text
toDoubleLinkList()
将单向链表转换为双向链表
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    let doublelinklist = linklist.toDoubleLinkList();
描述：
    1<——>2——>null
```

### 转循环链表

```text
toCycleLinkList()
将单向链表转换为双向链表
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    let cyclelinklist = linklist.toCycleLinkList();
```

### 链表转数组

```text
toArray()
将链表转为数组
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    let array = linklist.toArray();  // [1,2]
描述：
    1——>2——>null
```

### 数组转链表

```text
fromArray(array)
该方法为静态方法，可以将数组装换为单向链表，参数为待转换的数组，返回值为转换后的单向链表
示例：
    LinkList.fromArray([1,2,3,4,5]);
描述：
    1——>2——>3——>4——>5——>null
```

### 链表长度

```text
Size
该属性用去获取链表的长度
示例：
    let linklist = new LinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.append(3);
    let size = linklist.Size;  // 3
描述：
    1——>2——>3——>null
```