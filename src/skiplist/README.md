# 跳跃表 SkipList\<T>

跳跃列表是按层建造的。底层是一个普通的有序链表。每个更高层都充当下面列表的“快速跑道”，这里在第i层中的元素按某个固定的概率 p（通常为 1/2 或 1/4）出现在第 i+1 层中。每个元素平均出现在 1/1-p 个列表中，而最高层的元素（通常是在跳跃列表前端的一个特殊的头元素）在 ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/89a058995d1439fb242df41c0f04c365003c4798)（即基于 1/p的n的对数）个列表中出现。
跳跃列表不像某些传统平衡树数据结构那样提供绝对的最坏情况性能保证。由于用来建造跳跃列表采用随机选取元素进入更高层的方法，在小概率情况下会生成一个不平衡的跳跃列表（最坏情况是在最底层仅有一个元素进入了更高层，此时跳跃列表的查找与普通列表一致）。但是在实际中它工作的很好，随机化平衡方案比在平衡二叉查找树中用的确定性平衡方案容易实现。跳跃列表在并行计算中也很有用，这里的插入可以在跳跃列表不同的部分并行的进行，而不用全局的数据结构重新平衡。

![SkipList](https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Skip_list.svg/400px-Skip_list.svg.png)

## 基本操作的API及示例

###属性

#### 层级 Level
##### Level:number
``` text
实例:
const skiplist = new SkipList();
const level = skiplist.Level;
console.log(level);
//0

```

#### 节点个数 Count
##### Count:number
``` text
实例:
const skiplist = new SkipList();
const count = skiplist.Count;
console.log(count);
//0
```


###方法
#### Constructor
##### new SkipList(compareKey?: keyof T);
``` text
实例:
const skiplist = new SkipList();

const skiplist2 = new SkipList<{key:number}>("key");
```

#### 插入 insert
##### insert(item: T): SkipList\<T>;
``` text
const skiplist = new SkipList();
skiplist.insert(2);
skiplist.insert(3);
```

#### 删除 deleteNode
##### deleteNode(item: T): SkipList\<T>;
``` text
const skiplist = new SkipList();
skiplist.insert(2);
skiplist.deleteNode(2);
```

#### 删除 remove
##### remove(item: T): SkipList\<T>;
``` text
const skiplist = new SkipList();
skiplist.insert(2);
skiplist.remove(2);
```

#### 查找 findNode
##### findNode(item: T): SkipListNode\<T>;
``` text
const skiplist = new SkipList();
skiplist.insert(2);
const node1 = skiplist.findNode(2);
console.log(node1.getItem());
//2

const skiplist = new SkipList<{key:number,value?:string}>("key");
skiplist.insert({key:3,value:"skiplist"});
skiplist.insert({key:2,value:"hashtable"});
skiplist.insert({key:4,value:"queue"});
const node2 = skiplist.findNode({key:3});
console.log(node2.getItem());
//{key:3,value:"skiplist"}

```

#### 是否为空 isEmpty
##### isEmpty(): boolean;
``` text
const skiplist = new SkipList();
const isEmpty = skiplist.isEmpty();
console.log(isEmpty);
//false
```