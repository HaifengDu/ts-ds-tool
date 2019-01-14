# 哈希集合 HashSet\<T>
哈希集合实现了Set接口，它不允许集合中出现重复元素，底层实现为哈希表(HashTable)，但是已集合元素为键，已布尔类型为值。具体详见哈希表(HashTable)

## 基本操作的API及示例

###通过数组构造集合 fromArray
##### [s] HashSet fromArray(T[] array)
``` text
实例:
const array = Array.from({length:10}).map((item, index) => index);
const hashSet = HashSet.fromArray(array);

```

### Constructor
##### new HashSet(number capacity = HashSet.DEFAULT_TABLE_SIZE)
``` text
实例:
const hashSet = new HashSet();

const array = Array(50).fill(0);
const hashSet2 = new HashSet(array.length);
```

### 插入 add
##### HashSet add(T value)
``` text
实例:
const hashSet = new HashSet();
hashSet.add("1");
描述：
对象类型通过JSON序列化为字符串
```
### 删除 remove
##### HashSet remove(T value)
``` text
实例:
const hashSet = new HashSet();
hashSet.add("1");

hashSet.remove("1");
```

### 是否存在 has
##### boolean has(T value)
``` text
实例:
const hashSet = new HashSet();
hashSet.add("1");

hashSet.has("1");
```

### 清空 clear
##### void clear()
``` text
实例:
const hashSet = new HashSet();
hashSet.add("1");

hashSet.clear();
console.log(hashSet.Size);
// 0
```

### 获取所有值 entries
##### T[] entries()
``` text
实例:
const hashSet = new HashSet();
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(4);

const values = hashSet.entries();
console.log(values);
// [1, 2, 3, 4]
```

### 差集 diff
##### T[] diff(AbstractSet<T> set)
``` text
实例:
const hashSet = new HashSet();
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(4);

const hashSet2 = new HashSet();
hashSet2.add(2);
hashSet2.add(3);
hashSet2.add(4);
hashSet2.add(5);

const values = hashSet.diff(hashSet2);
console.log(values);
// [1]
```

### 并集 union
##### T[] union(AbstractSet<T> set)
``` text
实例:
const hashSet = new HashSet();
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(4);

const hashSet2 = new HashSet();
hashSet2.add(2);
hashSet2.add(3);
hashSet2.add(4);
hashSet2.add(5);

const values = hashSet.union(hashSet2);
console.log(values);
// [1, 2, 3, 4, 5]
```

### 交集 intersect
##### T[] intersect(AbstractSet<T> set)
``` text
实例:
const hashSet = new HashSet();
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(4);

const hashSet2 = new HashSet();
hashSet2.add(2);
hashSet2.add(3);
hashSet2.add(4);
hashSet2.add(5);

const values = hashSet.intersect(hashSet2);
console.log(values);
// [2, 3, 4]
```