#二叉堆 Heap\<T>

二叉堆是一种特殊的堆，二叉堆是完全二元树（二叉树）或者是近似完全二元树（二叉树）。二叉堆有两种：最大堆和最小堆。最大堆：父结点的键值总是大于或等于任何一个子节点的键值；最小堆：父结点的键值总是小于或等于任何一个子节点的键值。
![Heap](https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=74466a96fad3572c72ef948eeb7a0842/77c6a7efce1b9d16836da71efbdeb48f8c546422.jpg)


### api适用于最大堆和最小堆，此api以最大堆为例
## 基本操作的API及示例

### Constructor
##### new MaxHeap(key ?: keyof T)
``` text
实例:
const MaxHeap = new MaxHeap();

const MaxHeap = new MaxHeap<{key:number}>("key");
```

### 插入 add
##### MaxHeap add(T value)
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);
```

### 取堆顶 poll
##### poll(): T
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

const value = maxHeap.poll();
console.log(value);
// 3
```

### 删除 remove
##### remove(item: ((item: T) => boolean)|T): boolean
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

maxHeap.remove(2);
maxHeap.remove(item => item === 3);
```

### 查看堆顶 peek
##### peek(): T
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

const value = maxHeap.peek();
console.log(value);
// 3

描述：
不影响堆结构
```

### 是否为空 isEmpty
##### isEmpty(): boolean
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

const value = maxHeap.isEmpty();
console.log(value);
// false
```

### 查找 find
##### find(): T
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

maxHeap.find(2);
const value = maxHeap.find(item => item === 2);
console.log(value);
// 2
```

### 查找所有 findAll
##### findAll(): T[]
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

const value = maxHeap.findAll(item => item > 1);
console.log(value);
// [1, 2]
```


### 清空 clear
##### clear(): void
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

maxHeap.clear();
console.log(maxHeap.Size);
// 0
```

### 清空 entries
##### entries(): T[]
``` text
实例:
const maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(3);

const values = maxHeap.entries();
console.log(values);
// [1, 2, 3]
```