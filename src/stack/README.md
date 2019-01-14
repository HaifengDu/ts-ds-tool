# 栈 Stack\<T>

栈是一种运算受限的线性表，其受限之处在于只能在链表或数组的一端进行插入或删除操作，因而按照后进先出的原理工作。

![Stack](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/200px-Data_stack.svg.png)


## 基本操作的API及示例

### 入栈 push
##### LinkNode\<T> push(T node);
``` text
实例:
const stack = new Stack();
stack.push(2);
```

### 出栈 pop
##### LinkNode\<T> pop();
``` text
实例:
const stack = new Stack();
stack.push(2);
const node = stack.pop();
```

### 判断栈空 isEmpty
``` text
实例:
const stack = new Stack();
const isEmpty = stack.isEmpty();
```

### 查看栈顶元素 peek
##### LinkNode\<T> peek();
``` text
实例:
const stack = new Stack();
stack.push(2);
const node = stack.peek();
描述：
此操作元素不出栈
```

