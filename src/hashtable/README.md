# 哈希表 HashTable\<T>
哈希表是根据键直接访问在内存存储位置的数据结构，它通过计算一个关于键值的函数，将所查询的数据映射到表中的一个位置来访问记录，加快访问速度，这种映射函数称为散列函数，存放记录的数组称作散列表。

![HashTable](https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=249bc83ec45c10383073c690d378f876/c9fcc3cec3fdfc035f8e2b9cd63f8794a4c22624.jpg)

## 基本操作的API及示例

### 设置默认槽大小
##### [s] void setDefaultTableSize(number size)
``` text
实例:
HashTable.setDefaultTableSize(50);
//哈希槽大小此时为50
const hashTable = new HashTable();
const tableSize = hashTable.TableSize;
console.log(tableSize);
// 50
```


### Constructor
##### new HashTable(number size = HashTable.DEFAULT_TABLE_SIZE)
``` text
实例:
const hashTable = new HashTable();

const array = Array(50).fill(0);
const hashTable2 = new HashTable(array.length);
```

### 插入 put
##### HashTable put(any key, T value)
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);
描述：
对象类型通过JSON序列化为字符串
```

### 获取 get
##### T get(any key)
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

hashTable.get("1");
hashTable.get(2);
hashTable.get({key: 3});
hashTable.get(function(){});
```
### 删除 remove
##### bollean remove(any key)
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

hashTable.remove("1");
hashTable.remove(2);
hashTable.remove({key: 3});
hashTable.remove(function(){});
```

### 是否包含指定的key contains
##### bollean contains(any key)
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

hashTable.contains("1");
hashTable.contains(2);
hashTable.contains({key: 3});
hashTable.contains(function(){});
```

### 获取未hash之前的key  getKeys
##### string[] getKeys()
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

const keys = hashTable.getKeys();
// ["1", "2", "{\"key\":3}","function(){}"]
```

### 获取未序列化之前的key  getOrignalKeys
##### string[] getOrignalKeys()
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

const keys = hashTable.getOrignalKeys();
// ["1", 2, {key:3},function(){}]
```

### 获取所有的值  values
##### T[] values()
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

const keys = hashTable.values();
// [1, 2, 3, 4]
```

### 清空  clear
##### void clear()
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

hashTable.clear();
console.log(hashTable.Count);
// 0
```

### 获取hash计算后的key  getHashKey
##### string getHashKey(any key)
``` text
实例:
const hashTable = new HashTable();
hashTable.put("1", 1);
hashTable.put(2, 2);
hashTable.put({key: 3}, 3);
hashTable.put(function(){}, 4);

hashTable.getHashKey("1");
hashTable.getHashKey(2);
hashTable.getHashKey({key: 3});
hashTable.getHashKey(function(){});
// 0
```