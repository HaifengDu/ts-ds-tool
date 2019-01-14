# 双向链表

双向链表也叫双链表，是链表的一种，它的每个数据结点中都有两个指针，分别指向直接后继和直接前驱。所以，从双向链表中的任意一个结点开始，都可以很方便地访问它的前驱结点和后继结点。

![Doubly Linked List](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Doubly-linked-list.svg/610px-Doubly-linked-list.svg.png)

## 基本操作的API及示例

### 追加

```text
append(value)
向链表中追加一个节点，参数为要追加的节点的值，返回链表的头结点
示例：
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
描述：
    1<——>2——>null
```
    
### 向前追加

```text
prepend(value)
向链表头部之前添加一个节点，该节点会成为新的头结点，参数为要添加的节点的值，返回链表的头结点
示例： 
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.prepend(0);
描述：
    0<——>1<——>2——>null
```
    
### 弹出尾节点

```text
pop()
推出尾节点，返回推出的节点
示例：
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.prepend(0);
    linklist.pop();
描述：
  0<——>1——>null
```

### 推出头结点

```text
shift
推出头节点，返回推出的节点
示例：
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.append(3);
    linklist.shift();
描述：
    2<——>3——>null
```
    
### 清空链表

```text
clear
清空链表
示例：
    let linklist = new DoubleLinkList();
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
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.findNode(value=>value===1);
描述：
    1<——>2——>null
```

### 删除节点

```text
deleteNode(arg|value)
删除链表中的节点，参数为节点的值或者查询条件函数，返回删除的节点
示例：
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.append(3);
    linklist.deleteNode(1);
    linklist.deleteNode(value=>value===2);
描述：
    2<——>3——>null
```

### 向后插入

```text
insertAfter(value,node)
在某个节点后插入一个新节点，第一个参数为要插入的新节点的值，第二个参数为要在其后插入新节点的节点，返回true或false
示例：
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    let node = linklist.findNode(1);
    linklist.insertAfter(3,node);
描述：
    1<——>3<——>2——>null
```

### 获取头结点

```text
getHeadNode()
示例：
    let linklist = new DoubleLinkList();
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
    let linklist = new DoubleLinkList();
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
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    let str = linklist.toString();   // 1,2
描述：
    1——>2——>null
```

```text
toArray
将链表转为数组
示例：
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    let array = linklist.toArray();  // [1,2]
描述：
    1<——>2——>null
```

### 数组转链表

```text
fromArray
该方法为静态方法，可以将数组装换为单向链表，参数为待转换的数组，返回值为转换后的单向链表
示例：
    DoubleLinkList.fromArray([1,2,3,4,5]);
描述：
    1<——>2<——>3<——>4<——>5——>null
```

### 链表长度

```text
Size
该属性用去获取链表的长度
示例：
    let linklist = new DoubleLinkList();
    linklist.append(1);
    linklist.append(2);
    linklist.append(3);
    let size = linklist.Size;  // 3
描述：
    1<——>2<——>3<——>null
```