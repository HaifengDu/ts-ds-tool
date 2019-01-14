# 优先队列 PriorityQueue\<T>

普通的队列是一种先进先出的数据结构，元素在队列尾追加，而从队列头删除。在优先队列中，元素被赋予优先级。当访问元素时，具有最高优先级的元素最先删除。优先队列具有最高级先出 （first in, largest out）的行为特征。

## 基本操作的API及示例

### 查看头部 peek
##### peek(): T

```text
示例：
    const queue = new PriorityQueue();
    const head = queue.peek();
```
    
### 入队 enqueue
##### enqueue(value: T,prioriry: number): PriorityQueue

```text
示例： 
    const queue = new PriorityQueue();
    queue.enqueue(1,1);
    queue.enqueue(2,3);
```
    
### 出队 dequeue
##### dequeue(): PriorityQueueNode\<T>

```text
示例：
    const queue = new PriorityQueue();
    queue.enqueue(1,1);
    queue.enqueue(2,3);
    const node = queue.dequeue();
    console.log(node.value);
    // 2
```

### 调整优先级 changePriority
##### changePriority(value: T, newPriority: number): void

```text
示例：
    let queue = new PriorityQueue();
    queue.enqueue(1,1);
    queue.enqueue(2,2);
    queue.changePriority(1,3);
```
    
### 清空队列 clear
##### clear(): void

```text
示例：
    let queue = new PriorityQueue();
    queue.enqueue(1,1);
    queue.enqueue(2,2);
    queue.clear();
    console.log(queue.isEmpty())
    // true
```

### 是否为空 isEmpty
##### isEmpty(): boolean

```text
isEmpty()
示例：
    const queue = new PriorityQueue();
    queue.enqueue(1,1);
    queue.enqueue(2,2);
    let isEmpty = queue.isEmpty();
    console.log(isEmpty);
    // false
    queue.clear();
    isEmpty = queue.isEmpty();
    console.log(isEmpty);
    // true
```

### 是否存在 has
##### has(value: T): boolean

```text
示例：
    const queue = new PriorityQueue();
    queue.enqueue(1,1);
    queue.enqueue(2,2);
    let exist = queue.has(2);
    console.log(true);
    // true
    exist = queue.has(3);
    console.log(exist);
    // false
```