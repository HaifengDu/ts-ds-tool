# 哈希 HashMap\<T>
HashMap是受限的哈希表，只能通过字符串作为键，由于不需要序列化和类型转换，速度快于HashMap。具体详见哈希表

## 基本操作的API及示例

### Constructor
##### new HashMap(number? size)
``` text
实例:
const hashMap = new HashMap();

const array = Array(50).fill(0);
const hashMap2 = new HashMap(array.length);
```

### 插入 put
##### HashMap put(any key, T value)
``` text
实例:
const hashMap = new HashMap();
hashMap.put("1", 1);
描述：
对象类型通过JSON序列化为字符串
```

### 获取 get
##### T get(any key)
``` text
实例:
const hashMap = new HashMap();
hashMap.put("1", 1);

hashMap.get("1");
// 1
```
### 删除 remove
##### bollean remove(any key)
``` text
实例:
const hashMap = new HashMap();
hashMap.put("1", 1);

hashMap.remove("1");
// true
```

### 是否包含指定的key contains
##### bollean contains(any key)
``` text
实例:
const hashMap = new HashMap();
hashMap.put("1", 1);

hashMap.contains("1");
// true
```

### 获取所有键  keys
##### string[] keys()
``` text
实例:
const hashMap = new HashMap();
hashMap.put("1", 1);
hashMap.put("2", 2);
hashMap.put("3", 3);
hashMap.put("4", 4);
const keys = hashMap.getKeys();
// ["1", "2", "3", "4"]
```


### 获取所有值  values
##### string[] values()
``` text
实例:
const hashMap = new HashMap();
hashMap.put("1", 1);
hashMap.put("2", 2);
hashMap.put("3", 3);
hashMap.put("4", 4);
const keys = hashMap.values();
// [1, 2, 3, 4]
```