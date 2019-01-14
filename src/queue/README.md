# 队列 Queue\<T>

队列是一种先进先出的线性表，通过使用数组或链表实现，在后端进行插入操作，在前端进行删除操作

## 基本操作的API及示例

### 入队 enqueue
##### LinkNode\<T> enqueue(T node);
``` text
实例:
const queue = new Queue();
queue.enqueue(2);
```

### 出队 dequeue
##### LinkNode\<T> dequeue();
``` text
实例:
const queue = new Queue();
queue.enqueue(2);
const node = queue.dequeue();
描述：
此操作队列为空时返回null
```

### 判断队空 isEmpty
##### bollean isEmpty();
``` text
实例:
const queue = new Queue();
const isEmpty = queue.isEmpty();
```

### 查看栈顶元素 peek
##### LinkNode\<T> peek();
``` text
实例:
const queue = new Queue();
queue.enqueue(2);
const node = queue.peek();
描述：
此操作元素不出栈
```

