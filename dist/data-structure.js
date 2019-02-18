(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.DataStructure = {})));
}(this, (function (exports) { 'use strict';

    var CollectionEnumerator = function CollectionEnumerator(array) {
        this.array = array;
        this.index = 0;
    };

    var prototypeAccessors = { Current: { configurable: true } };
    CollectionEnumerator.prototype.next = function next () {
        this.index++;
        return this;
    };
    prototypeAccessors.Current.get = function () {
        return {
            value: this.array[this.index],
            done: this.index === this.array.length - 1,
        };
    };

    Object.defineProperties( CollectionEnumerator.prototype, prototypeAccessors );
    var Collection = function Collection () {};

    Collection.prototype.getEnumerator = function getEnumerator () {
        return new CollectionEnumerator(this.toArray());
    };
    Collection.prototype.toArray = function toArray () {
        var arr = [];
        this.__iterate(function (item, index) {
            arr[index] = item;
        });
        return arr;
    };

    var DoubleLinkNode = function DoubleLinkNode(value, next, prev) {
        if ( next === void 0 ) next = null;
        if ( prev === void 0 ) prev = null;

        this.value = value;
        this.next = next;
        this.prev = prev;
    };

    var prototypeAccessors$1 = { Value: { configurable: true },Next: { configurable: true },Prev: { configurable: true } };
    prototypeAccessors$1.Value.get = function () {
        return this.value;
    };
    prototypeAccessors$1.Next.get = function () {
        return this.next;
    };
    prototypeAccessors$1.Prev.get = function () {
        return this.prev;
    };
    DoubleLinkNode.prototype.setValue = function setValue (value) {
        this.value = value;
    };
    DoubleLinkNode.prototype.setNext = function setNext (node) {
        this.next = node;
        if (node) {
            node.prev = this;
        }
    };
    DoubleLinkNode.prototype.toString = function toString () {
        return ("" + (this.value));
    };

    Object.defineProperties( DoubleLinkNode.prototype, prototypeAccessors$1 );

    var DoubleLinkList = (function (Collection$$1) {
        function DoubleLinkList() {
            Collection$$1.call(this);
            this.headNode = null;
            this.tailNode = null;
            this.size = 0;
        }

        if ( Collection$$1 ) DoubleLinkList.__proto__ = Collection$$1;
        DoubleLinkList.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
        DoubleLinkList.prototype.constructor = DoubleLinkList;

        var prototypeAccessors = { Size: { configurable: true } };
        prototypeAccessors.Size.get = function () {
            return this.size;
        };
        DoubleLinkList.prototype.append = function append (value) {
            this.size++;
            if (!this.headNode) {
                this.headNode = this.tailNode = new DoubleLinkNode(value, null, null);
                return this.headNode;
            }
            if (this.headNode === this.tailNode) {
                this.tailNode = new DoubleLinkNode(value);
                this.headNode.setNext(this.tailNode);
                return this.headNode;
            }
            var tailNode = new DoubleLinkNode(value);
            this.tailNode.setNext(tailNode);
            this.tailNode = tailNode;
            return this.headNode;
        };
        DoubleLinkList.prototype.prepend = function prepend (value) {
            if (!this.headNode) {
                this.headNode = this.tailNode = new DoubleLinkNode(value);
            }
            else {
                var headNode = this.headNode;
                this.headNode = new DoubleLinkNode(value);
                this.headNode.setNext(headNode);
            }
            this.size++;
            return this.headNode;
        };
        DoubleLinkList.prototype.emptyList = function emptyList () {
            this.headNode = this.tailNode = null;
            this.size = 0;
        };
        DoubleLinkList.prototype.clear = function clear () {
            this.emptyList();
        };
        DoubleLinkList.prototype.deleteNode = function deleteNode (arg) {
            var this$1 = this;

            var temp = this.headNode;
            var result = false;
            var prevNode;
            while (temp) {
                var match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
                if (match) {
                    this$1.size--;
                    result = true;
                    if (temp === this$1.headNode) {
                        this$1.headNode = temp.Next;
                    }
                    else if (temp === this$1.tailNode) {
                        prevNode.setNext(null);
                        this$1.tailNode = prevNode;
                    }
                    else {
                        prevNode.setNext(temp.Next);
                    }
                }
                if (temp.Next && temp.Next === this$1.headNode)
                    { break; }
                if (this$1.size === 0) {
                    this$1.emptyList();
                    break;
                }
                prevNode = temp;
                temp = temp.Next;
            }
            return result;
        };
        DoubleLinkList.prototype.findNode = function findNode (arg) {
            var temp = this.headNode;
            var result;
            while (temp) {
                var match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
                if (match) {
                    result = temp;
                    break;
                }
                temp = temp.Next;
            }
            return result;
        };
        DoubleLinkList.prototype.insertAfter = function insertAfter (value, oriNode) {
            var newNode = new DoubleLinkNode(value);
            if (oriNode) {
                var nextNode = oriNode.Next;
                if (!nextNode) {
                    this.tailNode = newNode;
                }
                newNode.setNext(nextNode);
                oriNode.setNext(newNode);
                return true;
            }
            return false;
        };
        DoubleLinkList.prototype.getHeadNode = function getHeadNode () {
            return this.headNode;
        };
        DoubleLinkList.prototype.getTailNode = function getTailNode () {
            return this.tailNode;
        };
        DoubleLinkList.prototype.shift = function shift () {
            if (this.size === 0) {
                return null;
            }
            else if (this.size === 1) {
                this.tailNode = null;
            }
            var temp = this.headNode;
            this.headNode = temp.Next;
            this.size--;
            return temp;
        };
        DoubleLinkList.prototype.pop = function pop () {
            var this$1 = this;

            var temp = this.headNode;
            var result;
            var prevNode;
            if (this.size === 0) {
                return null;
            }
            else if (this.size === 1) {
                result = this.headNode;
                this.emptyList();
            }
            else {
                while (temp) {
                    if (!temp.Next) {
                        result = temp;
                        this$1.tailNode = prevNode;
                        prevNode.setNext(null);
                        break;
                    }
                    prevNode = temp;
                    temp = temp.Next;
                }
                this.size--;
            }
            return result;
        };
        DoubleLinkList.prototype.__iterate = function __iterate (fn) {
            var this$1 = this;

            var temp = this.headNode, index = 0;
            while (temp) {
                fn(temp, index);
                index++;
                var nextNode = temp.Next;
                if (!nextNode || nextNode === this$1.headNode)
                    { break; }
                temp = nextNode;
            }
        };
        DoubleLinkList.prototype.toString = function toString () {
            return this.toArray().map(function (node) { return node.toString(); }).toString();
        };
        DoubleLinkList.fromArray = function fromArray (arr) {
            if (!arr) {
                return new DoubleLinkList();
            }
            var linkList = new DoubleLinkList();
            arr.forEach(function (item) {
                linkList.append(item);
            });
            return linkList;
        };

        Object.defineProperties( DoubleLinkList.prototype, prototypeAccessors );

        return DoubleLinkList;
    }(Collection));

    var LinkNode = function LinkNode(value, next) {
        if ( next === void 0 ) next = null;

        this.value = value;
        this.next = next;
    };

    var prototypeAccessors$2 = { Value: { configurable: true },Next: { configurable: true } };
    prototypeAccessors$2.Value.get = function () {
        return this.value;
    };
    prototypeAccessors$2.Next.get = function () {
        return this.next;
    };
    LinkNode.prototype.setValue = function setValue (value) {
        this.value = value;
    };
    LinkNode.prototype.setNext = function setNext (node) {
        this.next = node;
    };
    LinkNode.prototype.toString = function toString () {
        return ("" + (this.value));
    };

    Object.defineProperties( LinkNode.prototype, prototypeAccessors$2 );

    var LinkList = (function (Collection$$1) {
        function LinkList() {
            Collection$$1.call(this);
            this.headNode = null;
            this.tailNode = null;
            this.size = 0;
        }

        if ( Collection$$1 ) LinkList.__proto__ = Collection$$1;
        LinkList.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
        LinkList.prototype.constructor = LinkList;

        var prototypeAccessors = { Size: { configurable: true } };
        prototypeAccessors.Size.get = function () {
            return this.size;
        };
        LinkList.prototype.append = function append (value) {
            this.size++;
            if (!this.headNode) {
                this.headNode = this.tailNode = new LinkNode(value);
                return this.headNode;
            }
            if (this.headNode === this.tailNode) {
                this.tailNode = new LinkNode(value);
                this.headNode.setNext(this.tailNode);
                return this.headNode;
            }
            var tailNode = new LinkNode(value);
            this.tailNode.setNext(tailNode);
            this.tailNode = tailNode;
            return this.headNode;
        };
        LinkList.prototype.prepend = function prepend (value) {
            if (!this.headNode) {
                this.headNode = this.tailNode = new LinkNode(value);
            }
            else {
                this.headNode = new LinkNode(value, this.headNode);
            }
            this.size++;
            return this.headNode;
        };
        LinkList.prototype.emptyList = function emptyList () {
            this.headNode = this.tailNode = null;
            this.size = 0;
        };
        LinkList.prototype.clear = function clear () {
            this.emptyList();
        };
        LinkList.prototype.deleteNode = function deleteNode (arg) {
            var this$1 = this;

            var temp = this.headNode;
            var result = false;
            var prevNode;
            while (temp) {
                var match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
                if (match) {
                    this$1.size--;
                    result = true;
                    if (temp === this$1.headNode) {
                        this$1.headNode = temp.Next;
                    }
                    else if (temp === this$1.tailNode) {
                        prevNode.setNext(null);
                        this$1.tailNode = prevNode;
                    }
                    else {
                        prevNode.setNext(temp.Next);
                    }
                }
                if (temp.Next && temp.Next === this$1.headNode)
                    { break; }
                if (this$1.size === 0) {
                    this$1.emptyList();
                    break;
                }
                prevNode = temp;
                temp = temp.Next;
            }
            return result;
        };
        LinkList.prototype.findNode = function findNode (arg) {
            var temp = this.headNode;
            var result;
            while (temp) {
                var match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
                if (match) {
                    result = temp;
                    break;
                }
                temp = temp.Next;
            }
            return result;
        };
        LinkList.prototype.insertAfter = function insertAfter (value, oriNode) {
            var newNode = new LinkNode(value);
            if (oriNode) {
                var nextNode = oriNode.Next;
                if (!nextNode || nextNode === this.headNode) {
                    this.tailNode = newNode;
                }
                newNode.setNext(nextNode);
                oriNode.setNext(newNode);
                this.size++;
                return true;
            }
            return false;
        };
        LinkList.prototype.getHeadNode = function getHeadNode () {
            return this.headNode;
        };
        LinkList.prototype.getTailNode = function getTailNode () {
            return this.tailNode;
        };
        LinkList.prototype.shift = function shift () {
            if (this.size === 0) {
                return null;
            }
            else if (this.size === 1) {
                this.tailNode = null;
            }
            var temp = this.headNode;
            this.headNode = temp.Next;
            this.size--;
            return temp;
        };
        LinkList.prototype.pop = function pop () {
            var this$1 = this;

            var temp = this.headNode;
            var result;
            var prevNode;
            if (this.size === 0) {
                return null;
            }
            if (this.size === 1) {
                result = this.headNode;
                this.emptyList();
                return result;
            }
            while (temp) {
                var nextNode = temp.Next;
                if (!nextNode || nextNode === this$1.headNode) {
                    result = temp;
                    this$1.tailNode = prevNode;
                    prevNode.setNext(nextNode);
                    break;
                }
                prevNode = temp;
                temp = nextNode;
            }
            this.size--;
            return result;
        };
        LinkList.prototype.__iterate = function __iterate (fn) {
            var this$1 = this;

            var temp = this.headNode, index = 0;
            while (temp) {
                fn(temp, index);
                index++;
                var nextNode = temp.Next;
                if (!nextNode || nextNode === this$1.headNode) {
                    break;
                }
                temp = nextNode;
            }
        };
        LinkList.prototype.toString = function toString () {
            return this.toArray().map(function (node) { return node.toString(); }).toString();
        };
        LinkList.fromArray = function fromArray (arr) {
            if (!arr) {
                return new LinkList();
            }
            var linkList = new LinkList();
            arr.forEach(function (item) {
                linkList.append(item);
            });
            return linkList;
        };
        LinkList.prototype.toDoubleLinkList = function toDoubleLinkList () {
            if (!this.headNode) {
                return new DoubleLinkList();
            }
            var arr = this.toArray();
            var doubleListList = new DoubleLinkList();
            arr.forEach(function (item) {
                doubleListList.append(item.Value);
            });
            return doubleListList;
        };
        LinkList.prototype.toCycleLinkList = function toCycleLinkList () {
            var cyclelinklist = new CycleLinkList();
            this.toArray().forEach(function (node) {
                cyclelinklist.append(node.Value);
            });
            return cyclelinklist;
        };

        Object.defineProperties( LinkList.prototype, prototypeAccessors );

        return LinkList;
    }(Collection));

    var CycleLinkList = function CycleLinkList() {
        this.linklist = new LinkList();
    };

    var prototypeAccessors$3 = { Size: { configurable: true } };
    CycleLinkList.prototype.setCircle = function setCircle () {
        this.getTailNode().setNext(this.getHeadNode());
    };
    prototypeAccessors$3.Size.get = function () {
        return this.linklist.Size;
    };
    CycleLinkList.prototype.append = function append (value) {
        var result = this.linklist.append(value);
        this.setCircle();
        return result;
    };
    CycleLinkList.prototype.prepend = function prepend (value) {
        var result = this.linklist.prepend(value);
        this.setCircle();
        return result;
    };
    CycleLinkList.prototype.deleteNode = function deleteNode (arg) {
        var isFirstOrLast = this.linklist.findNode(arg) === this.getHeadNode()
            || this.linklist.findNode(arg) === this.getTailNode(), result = this.linklist.deleteNode(arg);
        if (isFirstOrLast) {
            this.setCircle();
        }
        return result;
    };
    CycleLinkList.prototype.findNode = function findNode (arg) {
        return this.linklist.findNode(arg);
    };
    CycleLinkList.prototype.getHeadNode = function getHeadNode () {
        return this.linklist.getHeadNode();
    };
    CycleLinkList.prototype.getTailNode = function getTailNode () {
        return this.linklist.getTailNode();
    };
    CycleLinkList.prototype.shift = function shift () {
        var result = this.linklist.shift();
        if (this.Size) {
            this.setCircle();
        }
        return result;
    };
    CycleLinkList.prototype.pop = function pop () {
        var result = this.linklist.pop();
        if (this.Size) {
            this.setCircle();
        }
        return result;
    };
    CycleLinkList.prototype.insertAfter = function insertAfter (value, oriNode) {
        return this.linklist.insertAfter(value, oriNode);
    };
    CycleLinkList.prototype.clear = function clear () {
        this.linklist.clear();
    };
    CycleLinkList.prototype.toString = function toString () {
        return this.linklist.toString();
    };
    CycleLinkList.fromArray = function fromArray (arr) {
        if (!arr) {
            return new CycleLinkList();
        }
        var linkList = new CycleLinkList();
        arr.forEach(function (item) {
            linkList.append(item);
        });
        return linkList;
    };
    CycleLinkList.prototype.toArray = function toArray () {
        return this.linklist.toArray();
    };
    CycleLinkList.prototype.getEnumerator = function getEnumerator () {
        var temp = this.getHeadNode();
        var enumerator = {
            next: function () {
                temp = temp.Next;
                enumerator.Current = {
                    value: temp.Value,
                    done: false,
                };
                return enumerator;
            },
            Current: {
                value: temp.Value,
                done: false,
            },
        };
        return enumerator;
    };

    Object.defineProperties( CycleLinkList.prototype, prototypeAccessors$3 );

    var DoubleLinkListNode = function DoubleLinkListNode(value) {
        this.value = value;
    };

    var prototypeAccessors$4 = { Next: { configurable: true },Prev: { configurable: true } };
    DoubleLinkListNode.prototype.setNext = function setNext (node) {
        this.next = node;
    };
    DoubleLinkListNode.prototype.setPre = function setPre (node) {
        this.pre = node;
    };
    prototypeAccessors$4.Next.get = function () {
        return this.next;
    };
    prototypeAccessors$4.Prev.get = function () {
        return this.pre;
    };
    DoubleLinkListNode.prototype.toString = function toString () {
        return ("" + (this.value));
    };

    Object.defineProperties( DoubleLinkListNode.prototype, prototypeAccessors$4 );

    var DoubleLinkListCycle = function DoubleLinkListCycle() {
        this.headNode = null;
        this.tailNode = null;
        this.size = 0;
    };

    var prototypeAccessors$5 = { Size: { configurable: true } };
    prototypeAccessors$5.Size.get = function () {
        return this.size;
    };
    DoubleLinkListCycle.prototype.append = function append (node) {
        var currentNode = new DoubleLinkListNode(node);
        if (!this.tailNode) {
            this.headNode = this.tailNode = currentNode;
            this.headNode.setNext(this.tailNode);
            this.tailNode.setPre(this.headNode);
        }
        else {
            currentNode.setPre(this.tailNode);
            currentNode.setNext(this.headNode);
            this.tailNode.setNext(currentNode);
            this.headNode.setPre(currentNode);
            this.tailNode = currentNode;
        }
        this.size++;
        return this;
    };
    DoubleLinkListCycle.prototype.prepend = function prepend (node) {
        var currentNode = new DoubleLinkListNode(node);
        if (!this.headNode) {
            this.headNode = this.tailNode = currentNode;
            this.headNode.setNext(this.tailNode);
            this.tailNode.setPre(this.headNode);
        }
        else {
            this.headNode.setPre(currentNode);
            currentNode.setNext(this.headNode);
            currentNode.setPre(this.tailNode);
            this.tailNode.setNext(currentNode);
            this.headNode = currentNode;
        }
        this.size++;
        return this;
    };
    DoubleLinkListCycle.prototype.emptyList = function emptyList () {
        this.headNode = this.tailNode = null;
        this.size = 0;
    };
    DoubleLinkListCycle.prototype.shift = function shift () {
        var result = this.headNode;
        if (this.headNode === this.tailNode) {
            this.emptyList();
        }
        else {
            this.headNode = this.headNode.next;
            this.headNode.setPre(this.tailNode);
            this.size--;
        }
        return result;
    };
    DoubleLinkListCycle.prototype.pop = function pop () {
        var result = this.tailNode;
        if (this.headNode === this.tailNode) {
            this.emptyList();
        }
        else {
            this.tailNode = this.tailNode.Prev;
            this.tailNode.setNext(this.headNode);
            this.size--;
        }
        return result;
    };
    DoubleLinkListCycle.prototype.deleteNode = function deleteNode (arg) {
            var this$1 = this;

        var deleteArr = [];
        if (this.isEmpty()) {
            return deleteArr;
        }
        var cycleNode = this.headNode;
        var index = 0;
        while (cycleNode) {
            var match = typeof arg === "function" ? arg(cycleNode.value) : (cycleNode.value === arg);
            var deleteNode = null;
            if (match) {
                if (this$1.headNode === this$1.tailNode) {
                    this$1.emptyList();
                    break;
                }
                else {
                    cycleNode.Prev.setNext(cycleNode.Next);
                    cycleNode.Next.setPre(cycleNode.Prev);
                }
                deleteNode = cycleNode;
                deleteArr.push(index);
            }
            cycleNode = cycleNode.Next;
            var shouldBreak = cycleNode === this$1.headNode;
            if (deleteNode) {
                if (deleteNode === this$1.headNode) {
                    this$1.headNode = deleteNode.Next;
                }
                if (deleteNode === this$1.tailNode) {
                    this$1.tailNode = deleteNode.Prev;
                }
                deleteNode.setNext(null);
                deleteNode.setPre(null);
            }
            if (shouldBreak) {
                break;
            }
            index++;
        }
    };
    DoubleLinkListCycle.prototype.findNode = function findNode (arg) {
            var this$1 = this;

        var cycleNode = this.headNode;
        var result = null;
        while (cycleNode) {
            var match = typeof arg === "function" ? arg(cycleNode.value) : (cycleNode.value === arg);
            if (match) {
                result = cycleNode;
                break;
            }
            else if (cycleNode === this$1.tailNode) {
                break;
            }
            cycleNode = cycleNode.Next;
        }
        return result;
    };
    DoubleLinkListCycle.prototype.getHeadNode = function getHeadNode () {
        return this.headNode;
    };
    DoubleLinkListCycle.prototype.getTailNode = function getTailNode () {
        return this.tailNode;
    };
    DoubleLinkListCycle.prototype.isEmpty = function isEmpty () {
        return !this.Size;
    };
    DoubleLinkListCycle.prototype.toString = function toString () {
            var this$1 = this;

        var temp = this.headNode;
        var arr = [];
        while (temp) {
            arr.push(temp);
            temp = temp.Next;
            if (temp === this$1.headNode) {
                break;
            }
        }
        return arr.toString();
    };
    DoubleLinkListCycle.prototype.getEnumerator = function getEnumerator () {
        var temp = this.getHeadNode();
        var enumerator = {
            next: function () {
                temp = temp.Next;
                enumerator.Current = {
                    value: temp.value,
                    done: false,
                };
                return enumerator;
            },
            Current: {
                value: temp.value,
                done: false,
            },
        };
        return enumerator;
    };

    Object.defineProperties( DoubleLinkListCycle.prototype, prototypeAccessors$5 );

    var Queue = (function (Collection$$1) {
        function Queue() {
            Collection$$1.call(this);
            this.linkList = new LinkList();
        }

        if ( Collection$$1 ) Queue.__proto__ = Collection$$1;
        Queue.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
        Queue.prototype.constructor = Queue;
        Queue.prototype.isEmpty = function isEmpty () {
            return !this.linkList.getTailNode();
        };
        Queue.prototype.peek = function peek () {
            if (!this.linkList.getHeadNode()) {
                return null;
            }
            return this.linkList.getHeadNode().Value;
        };
        Queue.prototype.enqueue = function enqueue (value) {
            this.linkList.append(value);
        };
        Queue.prototype.dequeue = function dequeue () {
            var head = this.linkList.shift();
            return head ? head.Value : null;
        };
        Queue.prototype.toString = function toString () {
            return this.linkList.toString();
        };
        Queue.prototype.__iterate = function __iterate (fn) {
            var temp = this.linkList.getHeadNode(), index = 0;
            while (temp) {
                fn(temp, index);
                index++;
                temp = temp.Next;
            }
        };

        return Queue;
    }(Collection));

    var SkipListNode = function SkipListNode(item) {
        if ( item === void 0 ) item = null;

        this.item = item;
        this.next = [];
        this.prev = [];
    };
    SkipListNode.prototype.getItem = function getItem () {
        return this.item;
    };
    SkipListNode.prototype.getNext = function getNext (level) {
        return this.next[level];
    };
    SkipListNode.prototype.setNext = function setNext (level, node) {
        this.next[level] = node;
    };
    SkipListNode.prototype.getPrev = function getPrev (level) {
        return this.prev[level];
    };
    SkipListNode.prototype.setPrev = function setPrev (level, node) {
        this.prev[level] = node;
    };
    SkipListNode.prototype.deleteLastLevel = function deleteLastLevel () {
        this.next.length--;
    };
    SkipListNode.prototype.getNextLevel = function getNextLevel () {
        return this.next.length;
    };
    SkipListNode.prototype.getPrevLevel = function getPrevLevel () {
        return this.prev.length;
    };
    SkipListNode.prototype.getHeight = function getHeight () {
        return Math.max(this.getPrevLevel(), this.getNextLevel());
    };

    var SkipList = function SkipList(compareKey) {
        this.compareKey = compareKey;
        this.level = 0;
        this.count = 0;
        this.head = new SkipListNode();
    };

    var prototypeAccessors$6 = { Level: { configurable: true },Count: { configurable: true },Head: { configurable: true } };
    prototypeAccessors$6.Level.get = function () {
        return this.level;
    };
    prototypeAccessors$6.Count.get = function () {
        return this.count;
    };
    prototypeAccessors$6.Head.get = function () {
        return this.head;
    };
    SkipList.prototype.isEmpty = function isEmpty () {
        return this.count === 0;
    };
    SkipList.prototype.randomLevel = function randomLevel () {
        var k = 0;
        var random = parseInt((Math.random() * 10).toString(), 10);
        while (random % 2 === 0) {
            k++;
            random = parseInt((Math.random() * 10).toString(), 10);
        }
        return k > this.level ? this.level : k;
    };
    SkipList.prototype.findNode = function findNode (item) {
            var obj;

        var result = null;
        var temp = this.head;
        for (var i = this.level - 1; i >= 0; i--) {
            while (temp.getNext(i) && this.compare(temp.getNext(i).getItem(), this.compareKey ? ( obj = {}, obj[this.compareKey] = item, obj ) : item)) {
                temp = temp.getNext(i);
            }
        }
        if (!temp.getNext(0)) {
            return result;
        }
        var isEqual = false;
        if (this.compareKey) {
            isEqual = temp.getNext(0).getItem()[this.compareKey] === item;
        }
        else {
            isEqual = temp.getNext(0).getItem() === item;
        }
        if (isEqual) {
            result = temp.getNext(0);
        }
        return result;
    };
    SkipList.prototype.insert = function insert (item) {
        var updateNodes = this.findUpdateNodes(item);
        if (updateNodes[0] && updateNodes[0].getNext(0) && updateNodes[0].getNext(0).getItem() === item) {
            return this;
        }
        var level = this.randomLevel();
        if (level === this.level) {
            updateNodes[level] = this.head;
            this.level++;
        }
        this.insertNode(new SkipListNode(item), updateNodes, level);
        this.count++;
        return this;
    };
    SkipList.prototype.remove = function remove (item) {
            var this$1 = this;

        var node = this.findNode(item);
        if (node) {
            var height = node.getHeight();
            for (var i = 0; i < height; i++) {
                var prev = node.getPrev(i);
                var next = node.getNext(i);
                prev.setNext(i, next);
                if (next) {
                    next.setPrev(i, prev);
                }
            }
            while (this.level && !this.head.getNext(this.level - 1)) {
                this$1.head.deleteLastLevel();
                this$1.level--;
            }
            this.count--;
        }
        return this;
    };
    SkipList.prototype.getSkipTables = function getSkipTables () {
            var this$1 = this;

        var table = [];
        for (var index = 0; index < this.level; index++) {
            var levelTables = [];
            var temp = this$1.head;
            while (temp = temp.getNext(index)) {
                levelTables.push(temp);
            }
            table[index] = levelTables;
        }
        return table;
    };
    SkipList.prototype.toString = function toString () {
        var tables = this.getSkipTables();
        return tables.reverse().reduce(function (ori, item) {
            ori.push(item.map(function (node) { return node.getItem().toString(); }).toString());
            return ori;
        }, []).join("\n");
    };
    SkipList.prototype.compare = function compare (a, b) {
        if (this.compareKey) {
            return a[this.compareKey] < b[this.compareKey];
        }
        return a < b;
    };
    SkipList.prototype.findUpdateNodes = function findUpdateNodes (item) {
            var this$1 = this;

        var updateNodes = [];
        for (var i = this.level - 1; i >= 0; i--) {
            var tempNode = this$1.head.getNext(i);
            var prevNode = null;
            while (tempNode && this.compare(tempNode.getItem(), item)) {
                prevNode = tempNode;
                tempNode = tempNode.getNext(i);
            }
            if (tempNode) {
                updateNodes[i] = tempNode.getPrev(i);
            }
            else {
                updateNodes[i] = prevNode;
            }
        }
        return updateNodes;
    };
    SkipList.prototype.insertNode = function insertNode (node, updateNodes, level) {
        for (var i = level; i >= 0; i--) {
            var nextTemp = updateNodes[i].getNext(i);
            if (nextTemp) {
                nextTemp.setPrev(i, node);
                node.setNext(i, nextTemp);
            }
            updateNodes[i].setNext(i, node);
            node.setPrev(i, updateNodes[i]);
        }
    };

    Object.defineProperties( SkipList.prototype, prototypeAccessors$6 );

    var Stack = (function (Collection$$1) {
        function Stack() {
            Collection$$1.call(this);
            this.linkList = new LinkList();
        }

        if ( Collection$$1 ) Stack.__proto__ = Collection$$1;
        Stack.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
        Stack.prototype.constructor = Stack;
        Stack.prototype.push = function push (node) {
            return this.linkList.append(node);
        };
        Stack.prototype.pop = function pop () {
            var node = this.linkList.pop();
            if (node) {
                return node.Value;
            }
            return null;
        };
        Stack.prototype.peek = function peek () {
            if (!this.linkList.getTailNode()) {
                return null;
            }
            return this.linkList.getTailNode().Value;
        };
        Stack.prototype.isEmpty = function isEmpty () {
            return !this.linkList.getTailNode();
        };
        Stack.prototype.toString = function toString () {
            return this.linkList.toString();
        };
        Stack.prototype.__iterate = function __iterate (fn) {
            var temp = this.linkList.getHeadNode(), index = 0;
            while (temp) {
                fn(temp.Value, index);
                index++;
                temp = temp.Next;
            }
        };
        Stack.prototype.toArray = function toArray () {
            return Collection$$1.prototype.toArray.call(this).reverse();
        };

        return Stack;
    }(Collection));

    function compareFn(a, b) {
        return a <= b;
    }
    var BinomialHeap = function BinomialHeap(compare) {
        if ( compare === void 0 ) compare = compareFn;

        this.compare = compare;
        this.count = 0;
    };

    var prototypeAccessors$7 = { Count: { configurable: true },Head: { configurable: true } };
    prototypeAccessors$7.Count.get = function () {
        return this.count;
    };
    prototypeAccessors$7.Head.get = function () {
        return this.head;
    };
    BinomialHeap.prototype.setHead = function setHead (value) {
        this.head = new LinkNode({
            value: value,
            degree: 0,
        });
        this.count = 1;
    };
    BinomialHeap.prototype.clear = function clear () {
        this.head = null;
        this.count = 0;
    };
    BinomialHeap.prototype.isEmpty = function isEmpty () {
        return !this.head;
    };
    BinomialHeap.prototype.insert = function insert (value) {
        var heap = new BinomialHeap();
        heap.setHead(value);
        var newNode = heap.Head;
        this.union(heap);
        return newNode;
    };
    BinomialHeap.prototype.deleteExtremum = function deleteExtremum () {
        if (!this.head) {
            return null;
        }
        var deleteNode = this._findExtremum();
        if (!deleteNode.minPrev) {
            this.head = deleteNode.minNode.Next;
        }
        else {
            deleteNode.minPrev.setNext(deleteNode.minNode.Next);
        }
        var child = deleteNode.minNode.Value.child;
        var newHead = child;
        while (child) {
            child.Value.parent = null;
            child = child.Next;
        }
        var heap = new BinomialHeap(this.compare);
        heap.head = newHead;
        this.union(heap);
        this.count--;
        return deleteNode.minNode.Value.value;
    };
    BinomialHeap.prototype._findExtremum = function _findExtremum () {
            var this$1 = this;

        var next = this.head.Next;
        var minNode = this.head;
        var prev = this.head;
        var minPrev = null;
        var min = minNode.Value.value;
        while (next) {
            if (!this$1.compare(min, next.Value.value)) {
                minPrev = prev;
                minNode = next;
                min = minNode.Value.value;
            }
            prev = next;
            next = next.Next;
        }
        return { minNode: minNode, minPrev: minPrev };
    };
    BinomialHeap.prototype.findExtremum = function findExtremum () {
        if (!this.head) {
            return null;
        }
        return this._findExtremum().minNode.Value.value;
    };
    BinomialHeap.prototype.union = function union (heap) {
            var this$1 = this;

        if (!heap) {
            return this;
        }
        this.count += heap.Count;
        var newHead = this.mergeHeaps(heap);
        if (!newHead) {
            return this;
        }
        this.head = null;
        heap.head = null;
        var prev;
        var curr = newHead;
        var next = newHead.Next;
        while (next) {
            if (next.Value.degree !== curr.Value.degree ||
                (next.Next && next.Next.Value.degree === curr.Value.degree)) {
                prev = curr;
                curr = next;
            }
            else {
                if (this$1.compare(curr.Value.value, next.Value.value)) {
                    curr.setNext(next.Next);
                    this$1.link(curr, next);
                }
                else {
                    if (!prev) {
                        newHead = next;
                    }
                    else {
                        prev.setNext(next);
                    }
                    this$1.link(next, curr);
                    curr = next;
                }
            }
            next = curr.Next;
        }
        this.head = newHead;
        return this;
    };
    BinomialHeap.prototype.link = function link (tomerge, frommerge) {
        frommerge.setNext(tomerge.Value.child);
        frommerge.Value.parent = tomerge;
        tomerge.Value.child = frommerge;
        tomerge.Value.degree++;
    };
    BinomialHeap.prototype.mergeHeaps = function mergeHeaps (heap) {
        var thisHead = this.head;
        var thatHead = heap.Head;
        if (!thisHead) {
            return heap.head;
        }
        if (!thatHead) {
            return this.head;
        }
        var newHead;
        if (thisHead.Value.degree <= thatHead.Value.degree) {
            newHead = this.head;
            thisHead = thisHead.Next;
        }
        else {
            newHead = heap.head;
            thatHead = thatHead.Next;
        }
        var temp = newHead;
        while (thisHead && thatHead) {
            if (thisHead.Value.degree <= thatHead.Value.degree) {
                temp.setNext(thisHead);
                thisHead = thisHead.Next;
            }
            else {
                temp.setNext(thatHead);
                thatHead = thatHead.Next;
            }
            temp = temp.Next;
        }
        temp.setNext(thisHead ? thisHead : thatHead);
        return newHead;
    };

    Object.defineProperties( BinomialHeap.prototype, prototypeAccessors$7 );

    var Heap = function Heap() {
        this.container = [];
    };

    var prototypeAccessors$8 = { Size: { configurable: true } };
    prototypeAccessors$8.Size.get = function () {
        return this.container.length;
    };
    Heap.prototype.getLeftChildIndex = function getLeftChildIndex (parent) {
        return (2 * parent) + 1;
    };
    Heap.prototype.getRigthChildIndex = function getRigthChildIndex (parent) {
        return (2 * parent) + 2;
    };
    Heap.prototype.getParentIndex = function getParentIndex (index) {
        return Math.floor((index - 1) / 2);
    };
    Heap.prototype.getLeftChild = function getLeftChild (parent) {
        return this.container[this.getLeftChildIndex(parent)];
    };
    Heap.prototype.getRightChild = function getRightChild (parent) {
        return this.container[this.getRigthChildIndex(parent)];
    };
    Heap.prototype.getParent = function getParent (index) {
        return this.container[this.getParentIndex(index)];
    };
    Heap.prototype.hasLeftChild = function hasLeftChild (parent) {
        return this.getLeftChildIndex(parent) < this.container.length;
    };
    Heap.prototype.hasRightChild = function hasRightChild (parent) {
        return this.getRigthChildIndex(parent) < this.container.length;
    };
    Heap.prototype.hasParent = function hasParent (index) {
        return this.getParentIndex(index) >= 0;
    };
    Heap.prototype.swap = function swap (indexOne, indexTwo) {
        var temp = this.container[indexTwo];
        this.container[indexTwo] = this.container[indexOne];
        this.container[indexOne] = temp;
    };
    Heap.prototype.heapifyUp = function heapifyUp (customStartIndex) {
            var this$1 = this;

        var currentIndex = customStartIndex || this.container.length - 1;
        while (this.hasParent(currentIndex) && !this.compare(this.getParent(currentIndex), this.container[currentIndex])) {
            this$1.swap(currentIndex, this$1.getParentIndex(currentIndex));
            currentIndex = this$1.getParentIndex(currentIndex);
        }
    };
    Heap.prototype.heapifyDown = function heapifyDown (customStartIndex) {
            var this$1 = this;

        var currentIndex = customStartIndex || 0;
        var nextIndex = null;
        while (this.hasLeftChild(currentIndex)) {
            if (this$1.hasRightChild(currentIndex)
                && this$1.compare(this$1.getRightChild(currentIndex), this$1.getLeftChild(currentIndex))) {
                nextIndex = this$1.getRigthChildIndex(currentIndex);
            }
            else {
                nextIndex = this$1.getLeftChildIndex(currentIndex);
            }
            if (this$1.compare(this$1.container[currentIndex], this$1.container[nextIndex])) {
                break;
            }
            this$1.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    };
    Heap.prototype.poll = function poll () {
        if (this.container.length === 0) {
            return null;
        }
        if (this.container.length === 1) {
            return this.container.pop();
        }
        var item = this.container[0];
        this.container[0] = this.container.pop();
        this.heapifyDown();
        return item;
    };
    Heap.prototype.peek = function peek () {
        if (this.container.length === 0) {
            return null;
        }
        return this.container[0];
    };
    Heap.prototype.add = function add (item) {
        this.container.push(item);
        this.heapifyUp();
        return this;
    };
    Heap.prototype.remove = function remove (item) {
            var this$1 = this;

        var numberOfItemsToRemove = this.findAll(item).length;
        for (var iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            var indexToRemove = this$1.findAllIndex(item).pop();
            if (indexToRemove === (this$1.container.length - 1)) {
                this$1.container.pop();
            }
            else {
                this$1.container[indexToRemove] = this$1.container.pop();
                var parentItem = this$1.getParent(indexToRemove);
                if (this$1.hasLeftChild(indexToRemove) &&
                    (!parentItem || this$1.compare(parentItem, this$1.container[indexToRemove]))) {
                    this$1.heapifyDown(indexToRemove);
                }
                else {
                    this$1.heapifyUp(indexToRemove);
                }
            }
        }
        return numberOfItemsToRemove > 0;
    };
    Heap.prototype.toString = function toString () {
        return this.container.toString();
    };
    Heap.prototype.isEmpty = function isEmpty () {
        return !this.container.length;
    };
    Heap.prototype.find = function find (arg) {
            var this$1 = this;

        var temp = null;
        for (var index = 0; index < this.container.length; index++) {
            var element = this$1.container[index];
            var match = typeof arg === "function" ? arg(element) : arg === element;
            if (match) {
                temp = element;
                break;
            }
        }
        return temp;
    };
    Heap.prototype.findAll = function findAll (arg) {
        var temp = [];
        this.container.forEach(function (item) {
            var match = typeof arg === "function" ? arg(item) : arg === item;
            if (match) {
                temp.push(item);
            }
        });
        return temp;
    };
    Heap.prototype.clear = function clear () {
        this.container.length = 0;
    };
    Heap.prototype.entries = function entries () {
        return [].concat( this.container );
    };
    Heap.prototype.findAllIndex = function findAllIndex (arg) {
        var temp = [];
        this.container.forEach(function (item, index) {
            var match = typeof arg === "function" ? arg(item) : arg === item;
            if (match) {
                temp.push(index);
            }
        });
        return temp;
    };

    Object.defineProperties( Heap.prototype, prototypeAccessors$8 );

    var MaxHeap = (function (Heap$$1) {
        function MaxHeap(key) {
            Heap$$1.call(this);
            this.key = key;
        }

        if ( Heap$$1 ) MaxHeap.__proto__ = Heap$$1;
        MaxHeap.prototype = Object.create( Heap$$1 && Heap$$1.prototype );
        MaxHeap.prototype.constructor = MaxHeap;
        MaxHeap.prototype.compare = function compare (a, b) {
            if (this.key) {
                return a[this.key] >= b[this.key];
            }
            return a >= b;
        };

        return MaxHeap;
    }(Heap));

    var MinHeap = (function (Heap$$1) {
        function MinHeap(key) {
            Heap$$1.call(this);
            this.key = key;
        }

        if ( Heap$$1 ) MinHeap.__proto__ = Heap$$1;
        MinHeap.prototype = Object.create( Heap$$1 && Heap$$1.prototype );
        MinHeap.prototype.constructor = MinHeap;
        MinHeap.prototype.compare = function compare (a, b) {
            if (this.key) {
                return a[this.key] <= b[this.key];
            }
            return a <= b;
        };

        return MinHeap;
    }(Heap));

    var BasicBinaryTree = function BasicBinaryTree () {};

    BasicBinaryTree.preTraversal = function preTraversal (tree) {
        var arr = [];
        this._preTraversal(tree, function (item) {
            arr.push(item);
        });
        return arr;
    };
    BasicBinaryTree._preTraversal = function _preTraversal (tree, fn) {
        if (!tree) {
            return;
        }
        fn(tree.Value);
        this._preTraversal(tree.Left, fn);
        this._preTraversal(tree.Right, fn);
    };
    BasicBinaryTree.inTraversal = function inTraversal (tree) {
        var arr = [];
        this._inTraversal(tree, function (item) {
            arr.push(item);
        });
        return arr;
    };
    BasicBinaryTree._inTraversal = function _inTraversal (tree, fn) {
        if (!tree) {
            return;
        }
        this._inTraversal(tree.Left, fn);
        fn(tree.Value);
        this._inTraversal(tree.Right, fn);
    };
    BasicBinaryTree.postOrderTraversal = function postOrderTraversal (tree) {
        var arr = [];
        this._postOrderTraversal(tree, function (item) {
            arr.push(item);
        });
        return arr;
    };
    BasicBinaryTree._postOrderTraversal = function _postOrderTraversal (tree, fn) {
        if (!tree) {
            return;
        }
        this._postOrderTraversal(tree.Left, fn);
        this._postOrderTraversal(tree.Right, fn);
        fn(tree.Value);
    };
    BasicBinaryTree.getHeight = function getHeight (tree) {
        if (!tree) {
            return 0;
        }
        var length = 1;
        length += Math.max(this.getHeight(tree.Left), this.getHeight(tree.Right));
        return length;
    };

    var BasicBinaryTreeNode = function BasicBinaryTreeNode(value) {
        this.value = value;
    };

    var prototypeAccessors$9 = { Value: { configurable: true },Left: { configurable: true },Right: { configurable: true } };
    prototypeAccessors$9.Value.get = function () {
        return this.value;
    };
    prototypeAccessors$9.Left.get = function () {
        return this.left;
    };
    prototypeAccessors$9.Right.get = function () {
        return this.right;
    };
    BasicBinaryTreeNode.prototype.setValue = function setValue (value) {
        this.value = value;
    };
    BasicBinaryTreeNode.prototype.setLeft = function setLeft (node) {
        this.left = node;
        if (node) {
            this.left.parent = this;
        }
        return this;
    };
    BasicBinaryTreeNode.prototype.setRight = function setRight (node) {
        this.right = node;
        if (node) {
            this.right.parent = this;
        }
        return this;
    };
    BasicBinaryTreeNode.prototype.removeChild = function removeChild (node) {
        if (node === this.left) {
            this.left.parent = null;
            this.left = null;
            return true;
        }
        if (node === this.right) {
            this.right.parent = null;
            this.right = null;
            return true;
        }
        return false;
    };
    BasicBinaryTreeNode.prototype.getHeight = function getHeight () {
        return Math.max(this.getLeftHeight(), this.getRightHeight());
    };
    BasicBinaryTreeNode.prototype.getRightHeight = function getRightHeight () {
        if (!this.right) {
            return 0;
        }
        return this.right.getHeight() + 1;
    };
    BasicBinaryTreeNode.prototype.getLeftHeight = function getLeftHeight () {
        if (!this.left) {
            return 0;
        }
        return this.left.getHeight() + 1;
    };
    BasicBinaryTreeNode.prototype.balanceFactor = function balanceFactor () {
        return this.getLeftHeight() - this.getRightHeight();
    };
    BasicBinaryTreeNode.prototype.getSibling = function getSibling () {
        if (!this.parent) {
            return;
        }
        if (this.parent.Left === this) {
            return this.parent.Right;
        }
        return this.parent.Left;
    };
    BasicBinaryTreeNode.prototype.getUncle = function getUncle () {
        if (!this.parent) {
            return;
        }
        if (!this.parent.parent) {
            return;
        }
        var parent = this.parent;
        if (parent.parent.Left === parent) {
            return parent.parent.Right;
        }
        return parent.parent.Left;
    };
    BasicBinaryTreeNode.prototype.toString = function toString () {
        return BasicBinaryTree.inTraversal(this).toString();
    };

    Object.defineProperties( BasicBinaryTreeNode.prototype, prototypeAccessors$9 );

    function compareFn$1(a, b) {
        return a <= b;
    }
    var LeftistTreeNode = (function (BasicBinaryTreeNode$$1) {
        function LeftistTreeNode(value, rank) {
            BasicBinaryTreeNode$$1.call(this, value);
            this.rank = rank;
        }

        if ( BasicBinaryTreeNode$$1 ) LeftistTreeNode.__proto__ = BasicBinaryTreeNode$$1;
        LeftistTreeNode.prototype = Object.create( BasicBinaryTreeNode$$1 && BasicBinaryTreeNode$$1.prototype );
        LeftistTreeNode.prototype.constructor = LeftistTreeNode;

        var prototypeAccessors = { Rank: { configurable: true } };
        prototypeAccessors.Rank.set = function (rank) {
            this.rank = rank;
        };
        prototypeAccessors.Rank.get = function () {
            return this.rank;
        };

        Object.defineProperties( LeftistTreeNode.prototype, prototypeAccessors );

        return LeftistTreeNode;
    }(BasicBinaryTreeNode));
    var LeftistTree = function LeftistTree(compare, value) {
        if ( compare === void 0 ) compare = compareFn$1;

        this.compare = compare;
        this.count = 0;
        if (typeof value !== "undefined") {
            this.root = new LeftistTreeNode(value, 0);
            this.count = 1;
        }
    };

    var prototypeAccessors$1$1 = { Root: { configurable: true },Count: { configurable: true } };
    prototypeAccessors$1$1.Root.get = function () {
        return this.root;
    };
    prototypeAccessors$1$1.Count.get = function () {
        return this.count;
    };
    LeftistTree.prototype.isEmpty = function isEmpty () {
        return !this.root;
    };
    LeftistTree.prototype.fixNode = function fixNode (node) {
        var left = node.Left;
        var right = node.Right;
        if (left && right && left.Rank < right.Rank) {
            var temp = node.Right;
            node.setRight(node.Left);
            node.setLeft(temp);
        }
        else if (node.Right && !node.Left) {
            node.setLeft(node.Right);
            node.setRight(null);
        }
        if (node.Right) {
            node.Rank = node.Right.Rank + 1;
        }
        else {
            node.Rank = 0;
        }
    };
    LeftistTree.prototype._merge = function _merge (root1, root2) {
        if (!root1) {
            return root2;
        }
        if (!root2) {
            return root1;
        }
        if (!this.compare(root1.Value, root2.Value)) {
            var temp = root2;
            root2 = root1;
            root1 = temp;
        }
        root1.setRight(this._merge(root1.Right, root2));
        this.fixNode(root1);
        return root1;
    };
    LeftistTree.prototype.merge = function merge (tree2) {
        if (!tree2 || tree2.isEmpty()) {
            return this;
        }
        if (!this.root) {
            this.root = tree2.Root;
            this.count = tree2.Count;
            return this;
        }
        var root1 = this.Root;
        var root2 = tree2.Root;
        this.root = this._merge(root1, root2);
        this.count += tree2.Count;
        return this;
    };
    LeftistTree.prototype.findExtremum = function findExtremum () {
        if (!this.root) {
            return null;
        }
        return this.root.Value;
    };
    LeftistTree.prototype.insert = function insert (value) {
        var node = new LeftistTree(this.compare, value);
        this.merge(node);
        return node;
    };
    LeftistTree.prototype.deleteExtremum = function deleteExtremum () {
        if (!this.root) {
            return null;
        }
        var value = this.root.Value;
        this.root = this._merge(this.root.Left, this.root.Right);
        this.count--;
        return value;
    };

    Object.defineProperties( LeftistTree.prototype, prototypeAccessors$1$1 );

    var PriorityQueueNode = function PriorityQueueNode(value, priority) {
        this.value = value;
        this.priority = priority;
    };

    var prototypeAccessors$a = { Value: { configurable: true },Priority: { configurable: true } };
    prototypeAccessors$a.Value.get = function () {
        return this.value;
    };
    prototypeAccessors$a.Priority.get = function () {
        return this.priority;
    };
    PriorityQueueNode.prototype.toString = function toString () {
        return ("{\"priority\":" + (this.priority) + ",\"value\":" + (this.value) + "}");
    };

    Object.defineProperties( PriorityQueueNode.prototype, prototypeAccessors$a );
    var PriorityQueue = (function (Collection$$1) {
        function PriorityQueue() {
            Collection$$1.call(this);
            this.heap = new MaxHeap("Priority");
        }

        if ( Collection$$1 ) PriorityQueue.__proto__ = Collection$$1;
        PriorityQueue.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
        PriorityQueue.prototype.constructor = PriorityQueue;
        PriorityQueue.prototype.peek = function peek () {
            return this.heap.peek();
        };
        PriorityQueue.prototype.enqueue = function enqueue (value, priority) {
            this.heap.add(new PriorityQueueNode(value, priority));
            return this;
        };
        PriorityQueue.prototype.dequeue = function dequeue () {
            return this.heap.poll();
        };
        PriorityQueue.prototype.changePriority = function changePriority (value, priority) {
            this.heap.remove(function (item) { return item.Value === value; });
            this.heap.add(new PriorityQueueNode(value, priority));
        };
        PriorityQueue.prototype.has = function has (value) {
            return !!this.heap.find(function (item) { return item.Value === value; });
        };
        PriorityQueue.prototype.clear = function clear () {
            this.heap.clear();
        };
        PriorityQueue.prototype.isEmpty = function isEmpty () {
            return this.heap.isEmpty();
        };
        PriorityQueue.prototype.toString = function toString () {
            return this.heap.toString();
        };
        PriorityQueue.prototype.__iterate = function __iterate (fn) {
            this.heap.entries().forEach(function (item, index) { return fn(item.Value, index); });
        };

        return PriorityQueue;
    }(Collection));

    var NullPointerException = (function (Error) {
    	function NullPointerException () {
    		Error.apply(this, arguments);
    	}if ( Error ) NullPointerException.__proto__ = Error;
    	NullPointerException.prototype = Object.create( Error && Error.prototype );
    	NullPointerException.prototype.constructor = NullPointerException;

    	

    	return NullPointerException;
    }(Error));

    function hash(str) {
        var hashed = 0;
        for (var ii = 0; ii < str.length; ii++) {
            hashed = (31 * hashed + str.charCodeAt(ii)) | 0;
        }
        return smi(hashed);
    }
    function toString(value) {
        var type = typeof value;
        if (type === "string") {
            return value;
        }
        else if (type === "number" || type === "boolean" || type === "function") {
            return value.toString();
        }
        return JSON.stringify(value);
    }
    function defaultCompare(a, b, key) {
        if (key) {
            return a[key] >= b[key];
        }
        return a >= b;
    }
    function defaultEqualCompare(a, b) {
        if (a === b) {
            return 0;
        }
        return a > b ? 1 : -1;
    }
    function swap(arr, i, j) {
        var temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    function smi(i32) {
        return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
    }

    function defineHashNodeToString(node) {
        Object.defineProperty(node, "toString", {
            value: function () {
                return JSON.stringify(this);
            },
        });
    }
    var HashTable = function HashTable(size) {
        if ( size === void 0 ) size = HashTable.DEFAULT_TABLE_SIZE;

        this.buckets = Array(size).fill(null).map(function () { return new LinkList(); });
        this.count = 0;
        this.keys = {};
        this.threshold = size * HashTable.LOADFACTOR;
    };

    var prototypeAccessors$b = { Count: { configurable: true },TableSize: { configurable: true } };
    HashTable.setDefaultTableSize = function setDefaultTableSize (size) {
        this.DEFAULT_TABLE_SIZE = size;
    };
    prototypeAccessors$b.Count.get = function () {
        return this.count;
    };
    prototypeAccessors$b.TableSize.get = function () {
        return this.buckets.length;
    };
    HashTable.prototype.put = function put (key, value) {
        if (key === null || key === undefined) {
            throw new NullPointerException();
        }
        var tempKey = toString(key);
        var hashed = hash(tempKey);
        var keyHash = this.mod(hashed);
        var bucketLinkedList = this.buckets[keyHash];
        var node = bucketLinkedList.findNode(function (item) { return item.key === key; });
        if (node) {
            node.Value.value = value;
            return;
        }
        if (this.count >= this.threshold) {
            this.rehash();
            keyHash = this.mod(hashed);
            bucketLinkedList = this.buckets[keyHash];
        }
        this.keys[tempKey] = keyHash;
        bucketLinkedList.append({
            key: key,
            value: value,
        });
        this.count++;
        return this;
    };
    HashTable.prototype.get = function get (key) {
        var tempKey = toString(key);
        var hashed = hash(tempKey);
        var keyHash = this.mod(hashed);
        var bucketLinkedList = this.buckets[keyHash];
        var node = bucketLinkedList.findNode(function (item) { return item.key === key; });
        return node ? node.Value.value : null;
    };
    HashTable.prototype.remove = function remove (key) {
        var tempKey = toString(key);
        var hashed = hash(tempKey);
        var keyHash = this.mod(hashed);
        var bucketLinkedList = this.buckets[keyHash];
        var node = bucketLinkedList.findNode(function (item) { return item.key === key; });
        if (node) {
            this.count--;
            return bucketLinkedList.deleteNode(node.Value);
        }
        return false;
    };
    HashTable.prototype.contains = function contains (key) {
        return this.get(key) !== null;
    };
    HashTable.prototype.getKeys = function getKeys () {
        return Object.keys(this.keys);
    };
    HashTable.prototype.getOrignalKeys = function getOrignalKeys () {
        var arr = new Array(this.count);
        this.iterate(function (item, index) {
            arr[index] = item.key;
        });
        return arr;
    };
    HashTable.prototype.values = function values () {
        var arr = new Array(this.count);
        this.iterate(function (item, index) {
            arr[index] = item.value;
        });
        return arr;
    };
    HashTable.prototype.clear = function clear () {
        this.buckets.length = 0;
        this.keys = {};
        this.count = 0;
        this.buckets = Array(HashTable.DEFAULT_TABLE_SIZE)
            .fill(null).map(function () { return new LinkList(); });
    };
    HashTable.prototype.getHashKey = function getHashKey (key) {
        var tempKey = toString(key);
        return this.keys[tempKey];
    };
    HashTable.prototype.toString = function toString$$1 () {
        var arr = [];
        this.iterate(function (item) {
            var node = {
                key: item.key,
                value: item.value,
            };
            defineHashNodeToString(node);
            arr.push(node);
        });
        return arr.toString();
    };
    HashTable.prototype.iterate = function iterate (fn) {
            var this$1 = this;

        var iterateFlag = 0;
        for (var i = 0, count = this.buckets.length; i < count; i++) {
            var linkArr = this$1.buckets[i].toArray();
            var arrCount = iterateFlag;
            for (var j = arrCount, addCount = arrCount + linkArr.length; j < addCount; j++) {
                fn(linkArr[j - arrCount].Value, iterateFlag);
                iterateFlag++;
            }
        }
    };
    HashTable.prototype.rehash = function rehash () {
            var this$1 = this;

        var oldBuckets = this.buckets;
        var newCapacity = oldBuckets.length * 2 + 1;
        var newBuckets = Array(newCapacity).fill(null).map(function () { return new LinkList(); });
        this.buckets = newBuckets;
        this.keys = {};
        for (var i = 0, oldLen = oldBuckets.length; i < oldLen; i++) {
            oldBuckets[i].toArray().forEach(function (item) {
                var data = item.Value;
                var hashed = hash(toString(data.key));
                var keyHash = this$1.mod(hashed);
                newBuckets[keyHash].append(data);
                this$1.keys[toString(data.key)] = keyHash;
            });
        }
        oldBuckets.length = 0;
        this.threshold = newCapacity * HashTable.LOADFACTOR;
    };
    HashTable.prototype.mod = function mod (hashed) {
        var modulo = hashed % this.buckets.length;
        return hashed < 0 ? modulo * -1 : modulo;
    };

    Object.defineProperties( HashTable.prototype, prototypeAccessors$b );
    HashTable.DEFAULT_TABLE_SIZE = 11;
    HashTable.LOADFACTOR = 0.75;

    var HashMap = function HashMap(capacity) {
        this.map = new HashTable(capacity);
    };

    var prototypeAccessors$c = { Count: { configurable: true } };
    prototypeAccessors$c.Count.get = function () {
        return this.map.Count;
    };
    HashMap.prototype.put = function put (key, value) {
        var self = this;
        self.map.put(key, value);
        return self;
    };
    HashMap.prototype.get = function get (key) {
        return this.map.get(key);
    };
    HashMap.prototype.clear = function clear () {
        return this.map.clear();
    };
    HashMap.prototype.remove = function remove (key) {
        return this.map.remove(key);
    };
    HashMap.prototype.keys = function keys () {
        return this.map.getKeys();
    };
    HashMap.prototype.values = function values () {
        return this.map.values();
    };
    HashMap.prototype.contains = function contains (key) {
        return this.map.contains(key);
    };

    Object.defineProperties( HashMap.prototype, prototypeAccessors$c );

    var AbstractSet = function AbstractSet () {};

    AbstractSet.prototype.diff = function diff (set) {
        if (!set) {
            return this.entries();
        }
        var items = this.entries();
        var result = [];
        for (var i = 0, list = items; i < list.length; i += 1) {
            var element = list[i];

                if (!set.has(element)) {
                result.push(element);
            }
        }
        return result;
    };
    AbstractSet.prototype.union = function union (set) {
            var this$1 = this;

        if (!set) {
            return this.entries();
        }
        var items = set.entries();
        var thisItems = this.entries();
        for (var i = 0, list = items; i < list.length; i += 1) {
            var element = list[i];

                if (!this$1.has(element)) {
                thisItems.push(element);
            }
        }
        return thisItems;
    };
    AbstractSet.prototype.intersect = function intersect (set) {
        if (!set) {
            return [];
        }
        var result = [];
        var largeSet, smallItems;
        if (this.Size > set.Size) {
            largeSet = this;
            smallItems = set.entries();
        }
        else {
            largeSet = set;
            smallItems = this.entries();
        }
        for (var i = 0, list = smallItems; i < list.length; i += 1) {
            var element = list[i];

                if (largeSet.has(element)) {
                result.push(element);
            }
        }
        return result;
    };
    AbstractSet.prototype.isEmpty = function isEmpty () {
        return this.Size === 0;
    };

    var HashSet = (function (AbstractSet$$1) {
        function HashSet(capacity) {
            if ( capacity === void 0 ) capacity = HashSet.DEFAULT_TABLE_SIZE;

            AbstractSet$$1.call(this);
            this.hashtable = new HashTable(capacity);
        }

        if ( AbstractSet$$1 ) HashSet.__proto__ = AbstractSet$$1;
        HashSet.prototype = Object.create( AbstractSet$$1 && AbstractSet$$1.prototype );
        HashSet.prototype.constructor = HashSet;

        var prototypeAccessors = { Size: { configurable: true } };
        prototypeAccessors.Size.get = function () {
            return this.hashtable.Count;
        };
        HashSet.prototype.add = function add (item) {
            this.hashtable.put(item, true);
            return this;
        };
        HashSet.prototype.has = function has (element) {
            return this.hashtable.contains(element);
        };
        HashSet.prototype.remove = function remove (element) {
            return this.hashtable.remove(element);
        };
        HashSet.prototype.clear = function clear () {
            this.hashtable.clear();
        };
        HashSet.prototype.entries = function entries () {
            return this.hashtable.getOrignalKeys();
        };
        HashSet.prototype.diff = function diff (set) {
            return AbstractSet$$1.prototype.diff.call(this, set);
        };
        HashSet.prototype.union = function union (set) {
            return AbstractSet$$1.prototype.union.call(this, set);
        };
        HashSet.prototype.intersect = function intersect (set) {
            return AbstractSet$$1.prototype.intersect.call(this, set);
        };
        HashSet.fromArray = function fromArray (array) {
            var set = new HashSet(array.length);
            array.forEach(function (item) { return set.add(item); });
            return set;
        };

        Object.defineProperties( HashSet.prototype, prototypeAccessors );

        return HashSet;
    }(AbstractSet));
    HashSet.DEFAULT_TABLE_SIZE = 11;

    var ArraySet = (function (AbstractSet$$1) {
        function ArraySet() {
            AbstractSet$$1.call(this);
            this.set = [];
            this.count = 0;
        }

        if ( AbstractSet$$1 ) ArraySet.__proto__ = AbstractSet$$1;
        ArraySet.prototype = Object.create( AbstractSet$$1 && AbstractSet$$1.prototype );
        ArraySet.prototype.constructor = ArraySet;

        var prototypeAccessors = { Size: { configurable: true } };
        prototypeAccessors.Size.get = function () {
            return this.count;
        };
        ArraySet.prototype.has = function has (item) {
            if (item === undefined) {
                return this.set.indexOf(undefined) > -1;
            }
            if (!isNaN(item)) {
                return this.set.findIndex(function (model) { return JSON.stringify(model) === JSON.stringify(item) && !isNaN(model); }) > -1;
            }
            return this.set.findIndex(function (model) { return JSON.stringify(model) === JSON.stringify(item); }) > -1;
        };
        ArraySet.prototype.findIndex = function findIndex (item) {
            if (item === undefined) {
                return this.set.indexOf(item);
            }
            if (!isNaN(item)) {
                return this.set.findIndex(function (model) { return JSON.stringify(model) === JSON.stringify(item)
                    && !isNaN(model); });
            }
            return this.set.findIndex(function (model) { return JSON.stringify(model) === JSON.stringify(item); });
        };
        ArraySet.prototype.add = function add (item) {
            if (!this.has(item)) {
                this.set.push(item);
                this.count++;
            }
            return this;
        };
        ArraySet.prototype.entries = function entries () {
            return this.set;
        };
        ArraySet.prototype.remove = function remove (item) {
            var index = this.findIndex(item);
            if (index > -1) {
                this.set.splice(index, 1);
                this.count--;
                return true;
            }
            return false;
        };
        ArraySet.prototype.union = function union (set) {
            return AbstractSet$$1.prototype.union.call(this, set);
        };
        ArraySet.prototype.intersect = function intersect (set) {
            return AbstractSet$$1.prototype.intersect.call(this, set);
        };
        ArraySet.prototype.diff = function diff (set) {
            return AbstractSet$$1.prototype.diff.call(this, set);
        };

        Object.defineProperties( ArraySet.prototype, prototypeAccessors );

        return ArraySet;
    }(AbstractSet));

    var ENodeColor;
    (function (ENodeColor) {
        ENodeColor[ENodeColor["Red"] = 1] = "Red";
        ENodeColor[ENodeColor["Black"] = 2] = "Black";
    })(ENodeColor || (ENodeColor = {}));
    var BinarySearchTreeNode = (function (BasicBinaryTreeNode$$1) {
        function BinarySearchTreeNode(value) {
            BasicBinaryTreeNode$$1.call(this, value);
        }

        if ( BasicBinaryTreeNode$$1 ) BinarySearchTreeNode.__proto__ = BasicBinaryTreeNode$$1;
        BinarySearchTreeNode.prototype = Object.create( BasicBinaryTreeNode$$1 && BasicBinaryTreeNode$$1.prototype );
        BinarySearchTreeNode.prototype.constructor = BinarySearchTreeNode;

        var prototypeAccessors = { Color: { configurable: true } };
        prototypeAccessors.Color.get = function () {
            return this.color;
        };
        BinarySearchTreeNode.prototype.setColor = function setColor (color) {
            this.color = color;
        };
        BinarySearchTreeNode.prototype.setValue = function setValue (value) {
            BasicBinaryTreeNode$$1.prototype.setValue.call(this, value);
        };
        BinarySearchTreeNode.prototype.find = function find (value, compareKey) {
            var a, b;
            if (compareKey) {
                a = this.Value[compareKey];
                b = value[compareKey];
            }
            else {
                a = this.Value;
                b = value;
            }
            if (a === b) {
                return this;
            }
            if (a > b && this.Left) {
                return this.Left.find(value, compareKey);
            }
            if (a < b && this.Right) {
                return this.Right.find(value, compareKey);
            }
            return null;
        };
        BinarySearchTreeNode.prototype.findMin = function findMin () {
            if (!this.Left) {
                return this;
            }
            return this.Left.findMin();
        };
        BinarySearchTreeNode.prototype.findMax = function findMax () {
            if (!this.Right) {
                return this;
            }
            return this.Right.findMax();
        };
        BinarySearchTreeNode.prototype.insert = function insert (value, compareKey) {
            if (value === null || value === undefined) {
                return;
            }
            var compareFunc = function (a, b) { return a < b; };
            if (compareKey) {
                compareFunc = function (a, b) { return a[compareKey] < b[compareKey]; };
            }
            var resultNode;
            if (compareFunc(value, this.Value)) {
                if (this.Left) {
                    resultNode = this.Left.insert(value, compareKey);
                }
                else {
                    resultNode = new BinarySearchTreeNode(value);
                    this.setLeft(resultNode);
                }
            }
            else {
                if (this.Right) {
                    resultNode = this.Right.insert(value, compareKey);
                }
                else {
                    resultNode = new BinarySearchTreeNode(value);
                    this.setRight(resultNode);
                }
            }
            return resultNode;
        };
        BinarySearchTreeNode.prototype.contains = function contains (value, compareKey) {
            return !!this.find(value, compareKey);
        };

        Object.defineProperties( BinarySearchTreeNode.prototype, prototypeAccessors );

        return BinarySearchTreeNode;
    }(BasicBinaryTreeNode));

    var BinarySearchTree = function BinarySearchTree(compareKey) {
        this.compareKey = compareKey;
    };

    var prototypeAccessors$d = { Root: { configurable: true } };
    prototypeAccessors$d.Root.get = function () {
        return this.root;
    };
    prototypeAccessors$d.Root.set = function (node) {
        this.root = node;
    };
    BinarySearchTree.prototype.insert = function insert (value) {
        if (value === null || value === undefined) {
            return;
        }
        if (!this.root) {
            this.root = new BinarySearchTreeNode(value);
            return this.root;
        }
        return this.root.insert(value, this.compareKey);
    };
    BinarySearchTree.prototype.remove = function remove (value) {
        var node = this.find(value);
        if (!node) {
            return false;
        }
        this.removeNode(node);
        return true;
    };
    BinarySearchTree.prototype.clear = function clear () {
        this.Root = null;
    };
    BinarySearchTree.prototype.removeNode = function removeNode (node) {
        if (!node) {
            return false;
        }
        var nodeSuccessor;
        var successorChild = null;
        if (!node.Left || !node.Right) {
            nodeSuccessor = node;
        }
        else {
            nodeSuccessor = this.successor(node);
        }
        if (nodeSuccessor.Left) {
            successorChild = nodeSuccessor.Left;
        }
        else {
            successorChild = nodeSuccessor.Right;
        }
        if (successorChild) {
            successorChild.parent = nodeSuccessor.parent;
        }
        if (!nodeSuccessor.parent) {
            this.root = successorChild;
        }
        else if (nodeSuccessor.parent.Left === nodeSuccessor) {
            nodeSuccessor = this.copyNode(nodeSuccessor);
            nodeSuccessor.parent.setLeft(successorChild);
        }
        else {
            nodeSuccessor = this.copyNode(nodeSuccessor);
            nodeSuccessor.parent.setRight(successorChild);
        }
        node.setValue(nodeSuccessor.Value);
        return { successorChild: successorChild, nodeSuccessor: nodeSuccessor };
    };
    BinarySearchTree.prototype.successor = function successor (node) {
        var nodeSuccessor = node.Right;
        while (nodeSuccessor.Left) {
            nodeSuccessor = nodeSuccessor.Left;
        }
        return nodeSuccessor;
    };
    BinarySearchTree.prototype.copyNode = function copyNode (source) {
        var node = new BinarySearchTreeNode(source.Value);
        for (var key in source) {
            node[key] = source[key];
        }
        return node;
    };
    BinarySearchTree.prototype.contains = function contains (value) {
        if (!this.root) {
            return false;
        }
        return this.root.contains(value, this.compareKey);
    };
    BinarySearchTree.prototype.find = function find (value) {
        if (!this.root) {
            return null;
        }
        return this.root.find(value, this.compareKey);
    };
    BinarySearchTree.prototype.getAscSeq = function getAscSeq () {
        return BasicBinaryTree.inTraversal(this.root);
    };
    BinarySearchTree.prototype.toString = function toString () {
        if (!this.root) {
            return "";
        }
        return this.root.toString();
    };

    Object.defineProperties( BinarySearchTree.prototype, prototypeAccessors$d );

    function colorOf(node) {
        return node ? node.Color : ENodeColor.Black;
    }
    function leftOf(node) {
        return (node == null) ? null : node.Left;
    }
    function parentOf(node) {
        return !node ? null : node.parent;
    }
    function rightOf(node) {
        return !node ? null : node.Right;
    }
    function setColor(node, color) {
        if (node) {
            node.setColor(color);
        }
    }
    var RedBlackTree = (function (BinarySearchTree$$1) {
        function RedBlackTree(compareKey) {
            BinarySearchTree$$1.call(this, compareKey);
        }

        if ( BinarySearchTree$$1 ) RedBlackTree.__proto__ = BinarySearchTree$$1;
        RedBlackTree.prototype = Object.create( BinarySearchTree$$1 && BinarySearchTree$$1.prototype );
        RedBlackTree.prototype.constructor = RedBlackTree;
        RedBlackTree.prototype.insert = function insert (value) {
            if (value === null || value === undefined) {
                return;
            }
            var insertedNode = BinarySearchTree$$1.prototype.insert.call(this, value);
            if (insertedNode === this.Root) {
                insertedNode.setColor(ENodeColor.Black);
                return insertedNode;
            }
            insertedNode.setColor(ENodeColor.Red);
            this.blance(insertedNode);
            return insertedNode;
        };
        RedBlackTree.prototype.remove = function remove (value) {
            if (value === null || value === undefined) {
                return false;
            }
            var p = this.find(value);
            if (!p) {
                return false;
            }
            if (p.Left && p.Right) {
                var s = this.getSuccessor(p);
                p.setValue(s.Value);
                p = s;
            }
            var replacement = (p.Left ? p.Left : p.Right);
            if (replacement) {
                replacement.parent = p.parent;
                if (!p.parent)
                    { this.Root = replacement; }
                else if (p === p.parent.Left)
                    { p.parent.setLeft(replacement); }
                else
                    { p.parent.setRight(replacement); }
                p.setLeft(null);
                p.setRight(null);
                p.parent = null;
                if (p.Color === ENodeColor.Black) {
                    this.deleteFixUp(replacement);
                }
            }
            else if (!p.parent) {
                this.Root = null;
            }
            else {
                if (p.Color === ENodeColor.Black) {
                    this.deleteFixUp(p);
                }
                if (p.parent) {
                    if (p === p.parent.Left) {
                        p.parent.setLeft(null);
                    }
                    else if (p === p.parent.Right) {
                        p.parent.setRight(null);
                    }
                    p.parent = null;
                }
            }
            return true;
        };
        RedBlackTree.prototype.getSuccessor = function getSuccessor (t) {
            if (t == null)
                { return null; }
            else if (t.Right) {
                var p = t.Right;
                while (p.Left)
                    { p = p.Left; }
                return p;
            }
            else {
                var p$1 = t.parent;
                var ch = t;
                while (p$1 && ch === p$1.Right) {
                    ch = p$1;
                    p$1 = p$1.parent;
                }
                return p$1;
            }
        };
        RedBlackTree.prototype.deleteFixUp = function deleteFixUp (x) {
            var this$1 = this;

            while (x !== this.Root && colorOf(x) === ENodeColor.Black) {
                if (x === leftOf(parentOf(x))) {
                    var sib = rightOf(parentOf(x));
                    if (colorOf(sib) === ENodeColor.Red) {
                        setColor(sib, ENodeColor.Black);
                        setColor(parentOf(x), ENodeColor.Red);
                        this$1.leftRotate(parentOf(x), false);
                        sib = rightOf(parentOf(x));
                    }
                    if (colorOf(leftOf(sib)) === ENodeColor.Black &&
                        colorOf(rightOf(sib)) === ENodeColor.Black) {
                        setColor(sib, ENodeColor.Red);
                        x = parentOf(x);
                    }
                    else {
                        if (colorOf(rightOf(sib)) === ENodeColor.Black) {
                            setColor(leftOf(sib), ENodeColor.Black);
                            setColor(sib, ENodeColor.Red);
                            this$1.rightRotate(sib, false);
                            sib = rightOf(parentOf(x));
                        }
                        setColor(sib, colorOf(parentOf(x)));
                        setColor(parentOf(x), ENodeColor.Black);
                        setColor(rightOf(sib), ENodeColor.Black);
                        this$1.leftRotate(parentOf(x), false);
                        x = this$1.Root;
                    }
                }
                else {
                    var sib$1 = leftOf(parentOf(x));
                    if (colorOf(sib$1) === ENodeColor.Red) {
                        setColor(sib$1, ENodeColor.Black);
                        setColor(parentOf(x), ENodeColor.Red);
                        this$1.rightRotate(parentOf(x), false);
                        sib$1 = leftOf(parentOf(x));
                    }
                    if (colorOf(rightOf(sib$1)) === ENodeColor.Black &&
                        colorOf(leftOf(sib$1)) === ENodeColor.Black) {
                        setColor(sib$1, ENodeColor.Red);
                        x = parentOf(x);
                    }
                    else {
                        if (colorOf(leftOf(sib$1)) === ENodeColor.Black) {
                            setColor(rightOf(sib$1), ENodeColor.Black);
                            setColor(sib$1, ENodeColor.Red);
                            this$1.leftRotate(sib$1, false);
                            sib$1 = leftOf(parentOf(x));
                        }
                        setColor(sib$1, colorOf(parentOf(x)));
                        setColor(parentOf(x), ENodeColor.Black);
                        setColor(leftOf(sib$1), ENodeColor.Black);
                        this$1.rightRotate(parentOf(x), false);
                        x = this$1.Root;
                    }
                }
            }
            setColor(x, ENodeColor.Black);
        };
        RedBlackTree.prototype.blance = function blance (node) {
            if (node === this.Root) {
                return;
            }
            var parent = node.parent;
            if (parent.Color === ENodeColor.Black) {
                return;
            }
            var uncle = node.getUncle();
            var grandParent = parent.parent;
            if (uncle && uncle.Color === ENodeColor.Red) {
                parent.setColor(ENodeColor.Black);
                uncle.setColor(ENodeColor.Black);
                if (grandParent === this.Root) {
                    return;
                }
                grandParent.setColor(ENodeColor.Red);
                this.blance(parent.parent);
            }
            else {
                var parentNode;
                if (parent === parent.parent.Left) {
                    if (node === parent.Left) {
                        parentNode = this.rightRotate(grandParent);
                    }
                    else {
                        parentNode = this.leftRightRotate(grandParent);
                    }
                }
                else {
                    if (node === parent.Right) {
                        parentNode = this.leftRotate(grandParent);
                    }
                    else {
                        parentNode = this.rightLeftRotate(grandParent);
                    }
                }
                if (!parentNode.parent) {
                    this.Root = parentNode;
                    this.Root.setColor(ENodeColor.Black);
                }
                this.blance(parentNode);
            }
        };
        RedBlackTree.prototype.rightRotate = function rightRotate (grandParentNode, swapColor) {
            if ( swapColor === void 0 ) swapColor = true;

            var grandGrandParent = grandParentNode.parent;
            var grandParentNodeIsLeft;
            if (grandGrandParent) {
                grandParentNodeIsLeft = grandGrandParent.Left === grandParentNode;
            }
            var parentNode = grandParentNode.Left;
            var parentRightNode = parentNode.Right;
            parentNode.setRight(grandParentNode);
            grandParentNode.setLeft(parentRightNode);
            if (grandGrandParent) {
                if (grandParentNodeIsLeft) {
                    grandGrandParent.setLeft(parentNode);
                }
                else {
                    grandGrandParent.setRight(parentNode);
                }
            }
            else {
                parentNode.parent = null;
                this.Root = parentNode;
            }
            swapColor && this.swapColor(parentNode, grandParentNode);
            return parentNode;
        };
        RedBlackTree.prototype.leftRightRotate = function leftRightRotate (grandParentNode) {
            var parentNode = grandParentNode.Left;
            var childNode = parentNode.Right;
            var childLeftNode = childNode.Left;
            childNode.setLeft(parentNode);
            parentNode.setRight(childLeftNode);
            grandParentNode.setLeft(childNode);
            return this.rightRotate(grandParentNode);
        };
        RedBlackTree.prototype.leftRotate = function leftRotate (grandParentNode, swapColor) {
            if ( swapColor === void 0 ) swapColor = true;

            var grandGrandParent = grandParentNode.parent;
            var grandParentNodeIsLeft;
            if (grandGrandParent) {
                grandParentNodeIsLeft = grandGrandParent.Left === grandParentNode;
            }
            var parentNode = grandParentNode.Right;
            var parentLeftNode = parentNode.Left;
            parentNode.setLeft(grandParentNode);
            grandParentNode.setRight(parentLeftNode);
            if (grandGrandParent) {
                if (grandParentNodeIsLeft) {
                    grandGrandParent.setLeft(parentNode);
                }
                else {
                    grandGrandParent.setRight(parentNode);
                }
            }
            else {
                parentNode.parent = null;
                this.Root = parentNode;
            }
            swapColor && this.swapColor(parentNode, grandParentNode);
            return parentNode;
        };
        RedBlackTree.prototype.rightLeftRotate = function rightLeftRotate (grandParentNode) {
            var parentNode = grandParentNode.Right;
            var childNode = parentNode.Left;
            var childRightNode = childNode.Right;
            childNode.setRight(parentNode);
            parentNode.setLeft(childRightNode);
            grandParentNode.setRight(childNode);
            return this.leftRotate(grandParentNode);
        };
        RedBlackTree.prototype.swapColor = function swapColor (a, b) {
            var color = a.Color;
            a.setColor(b.Color);
            b.setColor(color);
        };

        return RedBlackTree;
    }(BinarySearchTree));

    var TreeMap = function TreeMap() {
        this.size = 0;
        this.tree = new RedBlackTree("key");
    };

    var prototypeAccessors$e = { Count: { configurable: true } };
    prototypeAccessors$e.Count.get = function () {
        return this.size;
    };
    TreeMap.prototype.put = function put (key, value) {
        var link = this.get(key);
        if (link) {
            var node = link.findNode(function (item) { return item.key === key; });
            if (node) {
                node.Value.value = value;
                return this;
            }
            link.append({ key: key, value: value });
            this.size++;
            return this;
        }
        this.size++;
        var hashKey = this.getHashKey(key);
        var treeNode = this.tree.insert({
            key: hashKey,
        });
        link = new LinkList();
        link.append({ key: key, value: value });
        treeNode.Value.value = link;
        return this;
    };
    TreeMap.prototype.get = function get (key) {
        var hashKey = this.getHashKey(key);
        var node = this.tree.find({ key: hashKey });
        if (node) {
            return node.Value.value;
        }
        return null;
    };
    TreeMap.prototype.getVal = function getVal (key) {
        var hashKey = this.getHashKey(key);
        var node = this.tree.find({ key: hashKey });
        if (node) {
            var link = node.Value.value;
            var val = link.findNode(function (item) { return item.key === key; });
            if (!val) {
                return null;
            }
            return val.Value.value;
        }
        return null;
    };
    TreeMap.prototype.clear = function clear () {
        this.size = 0;
        return this.tree.clear();
    };
    TreeMap.prototype.remove = function remove (key) {
        var hashKey = this.getHashKey(key);
        var node = this.get(key);
        if (node) {
            var success = node.deleteNode(function (item) { return item.key === key; });
            if (success) {
                this.size--;
                if (node.Size === 0) {
                    return this.tree.remove({ key: hashKey });
                }
                return true;
            }
        }
        return false;
    };
    TreeMap.prototype.keys = function keys () {
        return BasicBinaryTree.inTraversal(this.tree.Root)
            .map(function (item) { return item.value; }).reduce(function (ori, item) {
            return ori.concat(item.toArray().map(function (node) { return node.Value.key; }));
        }, []);
    };
    TreeMap.prototype.values = function values () {
        return BasicBinaryTree.inTraversal(this.tree.Root)
            .map(function (item) { return item.value; }).reduce(function (ori, item) {
            return ori.concat(item.toArray().map(function (node) { return node.Value.value; }));
        }, []);
    };
    TreeMap.prototype.contains = function contains (key) {
        return this.tree.contains({ key: key });
    };
    TreeMap.prototype.getHashKey = function getHashKey (key) {
        if (typeof key === "number" || typeof key === "string") {
            return key;
        }
        var hashKey = hash(toString(key));
        return hashKey;
    };

    Object.defineProperties( TreeMap.prototype, prototypeAccessors$e );

    var TreeSet = (function (AbstractSet$$1) {
        function TreeSet(compareKey) {
            AbstractSet$$1.call(this);
            this.size = 0;
            this.tree = new RedBlackTree(compareKey);
        }

        if ( AbstractSet$$1 ) TreeSet.__proto__ = AbstractSet$$1;
        TreeSet.prototype = Object.create( AbstractSet$$1 && AbstractSet$$1.prototype );
        TreeSet.prototype.constructor = TreeSet;

        var prototypeAccessors = { Size: { configurable: true } };
        TreeSet.prototype.add = function add (item) {
            if (this.tree.contains(item)) {
                return this;
            }
            this.tree.insert(item);
            this.size++;
            return this;
        };
        TreeSet.prototype.entries = function entries () {
            return BasicBinaryTree.inTraversal(this.tree.Root);
        };
        TreeSet.prototype.has = function has (item) {
            return this.tree.contains(item);
        };
        TreeSet.prototype.remove = function remove (item) {
            if (!this.tree.contains(item)) {
                return false;
            }
            this.size--;
            return this.tree.remove(item);
        };
        TreeSet.prototype.diff = function diff (set) {
            return AbstractSet$$1.prototype.diff.call(this, set);
        };
        TreeSet.prototype.union = function union (set) {
            return AbstractSet$$1.prototype.union.call(this, set);
        };
        TreeSet.prototype.intersect = function intersect (set) {
            return AbstractSet$$1.prototype.intersect.call(this, set);
        };
        prototypeAccessors.Size.get = function () {
            return this.size;
        };

        Object.defineProperties( TreeSet.prototype, prototypeAccessors );

        return TreeSet;
    }(AbstractSet));

    var AvlTree = (function (BinarySearchTree$$1) {
        function AvlTree(compareKey) {
            BinarySearchTree$$1.call(this, compareKey);
        }

        if ( BinarySearchTree$$1 ) AvlTree.__proto__ = BinarySearchTree$$1;
        AvlTree.prototype = Object.create( BinarySearchTree$$1 && BinarySearchTree$$1.prototype );
        AvlTree.prototype.constructor = AvlTree;
        AvlTree.prototype.insert = function insert (value) {
            var this$1 = this;

            if (value === null || value === undefined) {
                return;
            }
            BinarySearchTree$$1.prototype.insert.call(this, value);
            var node = this.find(value);
            while (node) {
                var temp = node.parent;
                this$1.blanceNode(node);
                node = temp;
            }
            return node;
        };
        AvlTree.prototype.remove = function remove (value) {
            var this$1 = this;

            if (value === null || value === undefined) {
                return false;
            }
            if (!this.Root) {
                return false;
            }
            var node = this.find(value);
            var result = this.removeNode(node);
            if (typeof result === "boolean" && !result) {
                return false;
            }
            var balanceNode = result.nodeSuccessor;
            while (balanceNode) {
                var temp = balanceNode.parent;
                this$1.blanceNode(balanceNode);
                balanceNode = temp;
            }
            return true;
        };
        AvlTree.prototype.blanceNode = function blanceNode (node) {
            if (node.balanceFactor() > 1) {
                if (node.Left.balanceFactor() > 0) {
                    this.rotateLeftLeft(node);
                }
                else {
                    this.rotateLeftRight(node);
                }
            }
            else if (node.balanceFactor() < -1) {
                if (node.Right.balanceFactor() > 0) {
                    this.rotateRightLeft(node);
                }
                else {
                    this.rotateRightRight(node);
                }
            }
        };
        AvlTree.prototype.rotateLeftLeft = function rotateLeftLeft (node) {
            var left = node.Left;
            var nodeIsLeft = false;
            if (node.parent) {
                nodeIsLeft = node.parent.Left === node;
            }
            if (node.parent) {
                if (nodeIsLeft) {
                    node.parent.setLeft(left);
                }
                else {
                    node.parent.setRight(left);
                }
            }
            else {
                this.Root = left;
                this.Root.parent = null;
            }
            node.setLeft(null);
            if (left.Right) {
                node.setLeft(left.Right);
            }
            left.setRight(node);
        };
        AvlTree.prototype.rotateLeftRight = function rotateLeftRight (node) {
            var left = node.Left;
            var leftRightNode = left.Right;
            left.setRight(null);
            if (leftRightNode.Left) {
                left.setRight(leftRightNode.Left);
            }
            leftRightNode.setLeft(left);
            node.setLeft(leftRightNode);
            this.rotateLeftLeft(node);
        };
        AvlTree.prototype.rotateRightRight = function rotateRightRight (node) {
            var right = node.Right;
            var nodeIsLeft = false;
            if (node.parent) {
                nodeIsLeft = node.parent.Left === node;
            }
            if (node.parent) {
                if (nodeIsLeft) {
                    node.parent.setRight(right);
                }
                else {
                    node.parent.setLeft(right);
                }
            }
            else {
                this.Root = right;
                this.Root.parent = null;
            }
            node.setRight(null);
            if (right.Left) {
                node.setRight(right.Left);
            }
            right.setLeft(node);
        };
        AvlTree.prototype.rotateRightLeft = function rotateRightLeft (node) {
            var right = node.Right;
            var rightLeftNode = right.Left;
            right.setLeft(null);
            if (rightLeftNode.Right) {
                right.setLeft(rightLeftNode.Right);
            }
            rightLeftNode.setRight(right);
            node.setRight(rightLeftNode);
            this.rotateRightRight(node);
        };

        return AvlTree;
    }(BinarySearchTree));

    var IndexOutOfBoundsException = (function (Error) {
    	function IndexOutOfBoundsException () {
    		Error.apply(this, arguments);
    	}if ( Error ) IndexOutOfBoundsException.__proto__ = Error;
    	IndexOutOfBoundsException.prototype = Object.create( Error && Error.prototype );
    	IndexOutOfBoundsException.prototype.constructor = IndexOutOfBoundsException;

    	

    	return IndexOutOfBoundsException;
    }(Error));

    var FenwickTree = function FenwickTree(tableSize) {
        this.tableSize = tableSize;
        this.treeArray = Array(tableSize + 1).fill(0);
    };

    var prototypeAccessors$f = { TreeArray: { configurable: true },Count: { configurable: true } };
    prototypeAccessors$f.TreeArray.get = function () {
        return this.treeArray;
    };
    prototypeAccessors$f.Count.get = function () {
        return this.treeArray.length;
    };
    FenwickTree.prototype.increase = function increase (position, value) {
            var this$1 = this;

        if (position < 1 || position > this.tableSize) {
            throw new IndexOutOfBoundsException("Position is out of allowed range");
        }
        for (var i = position; i <= this.tableSize; i += (i & -i)) {
            this$1.treeArray[i] += value;
        }
        return this;
    };
    FenwickTree.prototype.query = function query (position) {
            var this$1 = this;

        if (position < 1 || position > this.tableSize) {
            throw new IndexOutOfBoundsException("Position is out of allowed range");
        }
        var sum = 0;
        for (var i = position; i > 0; i -= (i & -i)) {
            sum += this$1.treeArray[i];
        }
        return sum;
    };
    FenwickTree.prototype.queryRange = function queryRange (start, end) {
        if (start > end) {
            throw new Error("Left index can not be greater then right one");
        }
        if (start === 1) {
            return this.query(end);
        }
        return this.query(end) - this.query(start - 1);
    };

    Object.defineProperties( FenwickTree.prototype, prototypeAccessors$f );

    var HuffmanTreeNode = function HuffmanTreeNode(value, weight) {
        this.value = value;
        this.weight = weight;
    };

    var prototypeAccessors$g = { Value: { configurable: true },Left: { configurable: true },Right: { configurable: true },Weight: { configurable: true } };

    prototypeAccessors$g.Value.get = function () {
        return this.value;
    };
    prototypeAccessors$g.Left.get = function () {
        return this.left;
    };
    prototypeAccessors$g.Left.set = function (value) {
        this.left = value;
    };
    prototypeAccessors$g.Right.get = function () {
        return this.right;
    };
    prototypeAccessors$g.Right.set = function (value) {
        this.right = value;
    };
    prototypeAccessors$g.Weight.get = function () {
        return this.weight;
    };
    HuffmanTreeNode.prototype.isLeaf = function isLeaf () {
        return !this.Left && !this.Right;
    };

    Object.defineProperties( HuffmanTreeNode.prototype, prototypeAccessors$g );

    var HuffmanTree = function HuffmanTree(array) {
        this.array = array;
        this.traversalFlag = 0;
        this.pathCache = {};
        this.buildTree();
    };

    var prototypeAccessors$h = { Root: { configurable: true } };
    prototypeAccessors$h.Root.get = function () {
        return this.root;
    };
    HuffmanTree.prototype.buildTree = function buildTree () {
            var this$1 = this;

        var heap = new MinHeap("Weight");
        var arr = [];
        if (this.array instanceof Array) {
            this.array.forEach(function (item) {
                arr.push({ value: item[0], weight: item[1] });
            });
        }
        else {
            for (var key in this$1.array) {
                var element = this$1.array[key];
                arr.push({ value: key, weight: element });
            }
        }
        arr.forEach(function (item) {
            heap.add(new HuffmanTreeNode(item.value, item.weight));
        });
        var parent = null;
        for (var i = 0; i < arr.length - 1; i++) {
            var last = heap.poll();
            var lastSecond = heap.poll();
            parent = new HuffmanTreeNode(null, last.Weight + lastSecond.Weight);
            parent.Left = last;
            parent.Right = lastSecond;
            heap.add(parent);
        }
        heap.clear();
        this.root = parent;
        this.createPath();
    };
    HuffmanTree.prototype.getPath = function getPath (value) {
        var path = this.pathCache[value];
        if (!path) {
            throw new Error(("Not Found '" + value + "' path"));
        }
        return path;
    };
    HuffmanTree.prototype.getText = function getText (codes) {
            var this$1 = this;

        var strArr = [];
        var node = this.root;
        for (var i = 0, list = codes; i < list.length; i += 1) {
            var element = list[i];

                if (element === "0") {
                node = node.Left;
            }
            else {
                node = node.Right;
            }
            if (node.isLeaf()) {
                strArr.push(node.Value);
                node = this$1.root;
            }
        }
        return strArr.join("");
    };
    HuffmanTree.prototype.createPath = function createPath (node, path) {
            if ( node === void 0 ) node = this.root;
            if ( path === void 0 ) path = "";

        if (!node) {
            return;
        }
        if (node.isLeaf()) {
            this.pathCache[node.Value] = path;
        }
        else {
            this.createPath(node.Left, path + "0");
            this.createPath(node.Right, path + "1");
        }
    };
    HuffmanTree.prototype.getWPL = function getWPL () {
            var this$1 = this;

        if (!this.root) {
            return 0;
        }
        this.traversalFlag = 0;
        var sum = 0;
        this.traversal(this.root, function (item) {
            if (!item.Left && !item.Right) {
                sum += item.Weight * this$1.traversalFlag;
            }
        });
        return sum;
    };
    HuffmanTree.prototype.traversal = function traversal (tree, fn) {
        if (!tree) {
            return;
        }
        fn(tree);
        this.traversalFlag++;
        this.traversal(tree.Left, fn);
        this.traversal(tree.Right, fn);
        this.traversalFlag--;
    };

    Object.defineProperties( HuffmanTree.prototype, prototypeAccessors$h );

    var HuffmanTreeBuilder = function HuffmanTreeBuilder () {};

    HuffmanTreeBuilder.buildTree = function buildTree (table) {
        return new HuffmanTree(table);
    };
    HuffmanTreeBuilder.encode = function encode (tree, text) {
        var pieces = text.split("");
        var encodeArr = [];
        pieces.forEach(function (item) {
            encodeArr.push(tree.getPath(item));
        });
        return this.bitStringToString(encodeArr.join(""));
    };
    HuffmanTreeBuilder.decode = function decode (tree, text) {
            var this$1 = this;

        var pieces = text.split("");
        var codes = [];
        var end = parseInt(pieces.pop(), 10);
        for (var i = 0, list = pieces; i < list.length; i += 1) {
            var element = list[i];

                var bitStr = this$1.lpad8(element.charCodeAt(0).toString(2));
            codes.push(bitStr);
        }
        var nodeStr = codes.join("");
        return tree.getText(nodeStr.substr(0, nodeStr.length - end));
    };
    HuffmanTreeBuilder.lpad8 = function lpad8 (str) {
        var length = 8;
        while (str.length < length) {
            str = "0" + str;
        }
        return str;
    };
    HuffmanTreeBuilder.bitStringToString = function bitStringToString (bitString) {
        var end = 8 - bitString.length % 8;
        var endArr = [];
        for (var index = 0; index < end; index++) {
            endArr.push("0");
        }
        bitString += endArr.join("");
        var encodeArr = [];
        for (var index$1 = 0; index$1 < bitString.length; index$1 += 8) {
            encodeArr.push(String.fromCharCode(parseInt(bitString.substr(index$1, 8), 2)));
        }
        return encodeArr.join("") + end;
    };

    function binarySearch(arr, target) {
        if (!arr || !arr.length) {
            return -1;
        }
        var start = 0;
        var end = arr.length - 1;
        var compare = typeof target === "function" ? target : function (a) { return defaultEqualCompare(target, a); };
        while (start <= end) {
            var mid = parseInt(((start + end) / 2).toString(), 10);
            var compareResult = compare(arr[mid]);
            if (compareResult === 0) {
                return mid;
            }
            if (compareResult === 1) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        return -1;
    }

    function getNext(word) {
        var next = [0];
        var wordIndex = 1;
        var prevIndex = 0;
        while (wordIndex < word.length) {
            if (word[prevIndex] === word[wordIndex]) {
                next[wordIndex] = prevIndex + 1;
                prevIndex++;
                wordIndex++;
            }
            else if (prevIndex === 0) {
                next[wordIndex] = 0;
                wordIndex++;
            }
            else {
                prevIndex = next[prevIndex - 1];
            }
        }
        return next;
    }
    function kmp(text, word) {
        if (text === null || text === undefined) {
            return -1;
        }
        if (word === null || word === undefined) {
            return -1;
        }
        if (word.length === 0) {
            return 0;
        }
        var next = getNext(word);
        var wordIndex = 0;
        var textIndex = 0;
        while (textIndex < text.length) {
            if (text[textIndex] === word[wordIndex]) {
                if (wordIndex === word.length - 1) {
                    return textIndex - wordIndex;
                }
                textIndex++;
                wordIndex++;
            }
            else if (wordIndex > 0) {
                wordIndex = next[wordIndex - 1];
            }
            else {
                wordIndex = 0;
                textIndex++;
            }
        }
        return -1;
    }

    function lcs(text1, text2) {
        if (!text1 || !text2) {
            return "";
        }
        var length1 = text1.length;
        var length2 = text2.length;
        var arr = new Array(length1 + 1);
        for (var index = 0; index <= length1; index++) {
            arr[index] = new Array(length2 + 1).fill(0);
        }
        for (var i$1 = 1; i$1 <= length1; i$1++) {
            for (var j$1 = 1; j$1 <= length2; j$1++) {
                if (text1[i$1 - 1] === text2[j$1 - 1]) {
                    arr[i$1][j$1] = arr[i$1 - 1][j$1 - 1] + 1;
                }
                else {
                    arr[i$1][j$1] = Math.max(arr[i$1][j$1 - 1], arr[i$1 - 1][j$1]);
                }
            }
        }
        if (!arr[length1][length2]) {
            return "";
        }
        var i = length1, j = length2;
        var columnArr = [];
        while (i > 0 && j > 0) {
            if (text1[i - 1] === text2[j - 1]) {
                columnArr.unshift(text1[i - 1]);
                i--;
                j--;
            }
            else if (arr[i][j] === arr[i][j - 1]) {
                j--;
            }
            else {
                i--;
            }
        }
        return columnArr.join("");
    }

    function lcstr(text1, text2) {
        if (!text1 || !text2) {
            return "";
        }
        var length1 = text1.length;
        var length2 = text2.length;
        var arr = new Array(length1 + 1);
        for (var index = 0; index <= length1; index++) {
            arr[index] = new Array(length2 + 1).fill(0);
        }
        var maxCol = 0, maxRow = 0, longestLength = 0;
        for (var i = 1; i <= length1; i++) {
            for (var j = 1; j <= length2; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    arr[i][j] = arr[i - 1][j - 1] + 1;
                }
                if (arr[i][j] > longestLength) {
                    longestLength = arr[i][j];
                    maxRow = i;
                    maxCol = j;
                }
            }
        }
        var subArr = [];
        while (arr[maxRow][maxCol] > 0) {
            subArr.unshift(text1[maxRow - 1]);
            maxRow--;
            maxCol--;
        }
        return subArr.join("");
    }
    function lcstropt(text1, text2) {
        if (!text1 || !text2) {
            return "";
        }
        var length1 = text1.length;
        var length2 = text2.length;
        var arr = new Array(length2 + 1).fill(0);
        var topArr = new Array(length2 + 1).fill(0);
        var maxCol = 0, longestLength = 0;
        for (var i = 1; i <= length1; i++) {
            for (var j = 1; j <= length2; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    arr[j] = topArr[j - 1] + 1;
                }
                else {
                    arr[j] = 0;
                }
                if (arr[j] > longestLength) {
                    longestLength = arr[j];
                    maxCol = j;
                }
            }
            for (var k = 0; k < arr.length; k++) {
                topArr[k] = arr[k];
            }
        }
        var subArr = [];
        while (longestLength > 0) {
            subArr.unshift(text2[maxCol - 1]);
            maxCol--;
            longestLength--;
        }
        return subArr.join("");
    }

    function levenshteinDistance(text1, text2) {
        var length1 = text1.length;
        var length2 = text2.length;
        var distanceArr = new Array(length1 + 1).fill(0).map(function () { return new Array(length2 + 1).fill(0); });
        for (var i = 0; i <= length1; i++) {
            distanceArr[i][0] = i;
        }
        for (var j = 0; j <= length2; j++) {
            distanceArr[0][j] = j;
        }
        for (var i$1 = 1; i$1 <= length1; i$1++) {
            for (var j$1 = 1; j$1 <= length2; j$1++) {
                var flag = text1[i$1 - 1] === text2[j$1 - 1] ? 0 : 1;
                distanceArr[i$1][j$1] = Math.min(distanceArr[i$1][j$1 - 1] + 1, distanceArr[i$1 - 1][j$1] + 1, distanceArr[i$1 - 1][j$1 - 1] + flag);
            }
        }
        return distanceArr[length1][length2];
    }

    function dpMaxSubArray(arr, key) {
        if (!arr || !arr.length) {
            return {
                low: -1,
                high: -1,
                sum: -Infinity,
            };
        }
        var boundary = 0;
        var low, high, maxSum = -Infinity;
        var tempBeginIndex = 0;
        for (var index = 0; index < arr.length; index++) {
            var element = key ? arr[index][key] : arr[index];
            if (boundary + element > element) {
                boundary += element;
            }
            else {
                boundary = element;
                tempBeginIndex = index;
            }
            if (boundary > maxSum) {
                maxSum = boundary;
                high = index;
                low = tempBeginIndex;
            }
        }
        return {
            low: low,
            high: high,
            sum: maxSum,
        };
    }

    function maxSubArray(arr, key) {
        if (!arr || !arr.length) {
            return {
                low: -1,
                high: -1,
                sum: -Infinity,
            };
        }
        return divideConquerMaxSubArray(arr, 0, arr.length - 1, key);
    }
    function divideConquerMaxSubArray(arr, low, high, key) {
        var getValTemp = getVal(key);
        if (low === high) {
            return {
                low: low,
                high: high,
                sum: getValTemp(arr[low]),
            };
        }
        var mid = Math.floor((low + high) / 2);
        var left = divideConquerMaxSubArray(arr, low, mid, key);
        var right = divideConquerMaxSubArray(arr, mid + 1, high, key);
        var cross = crossMaxSubArray(arr, low, mid, high, key);
        if (left.sum >= right.sum && left.sum >= cross.sum) {
            return left;
        }
        if (right.sum >= left.sum && right.sum >= cross.sum) {
            return right;
        }
        return cross;
    }
    function getVal(key) {
        if (key) {
            return function (val) { return val[key]; };
        }
        return function (val) { return val; };
    }
    function crossMaxSubArray(arr, low, mid, high, key) {
        var getValTemp = getVal(key);
        var leftMax = -Infinity;
        var sumLeft = 0;
        var maxLeftIndex;
        for (var i = mid; i >= low; i--) {
            sumLeft += getValTemp(arr[i]);
            if (sumLeft > leftMax) {
                leftMax = sumLeft;
                maxLeftIndex = i;
            }
        }
        var rightMax = -Infinity;
        var sumRight = 0;
        var maxRightIndex;
        for (var i$1 = mid + 1; i$1 <= high; i$1++) {
            sumRight += getValTemp(arr[i$1]);
            if (sumRight > rightMax) {
                rightMax = sumRight;
                maxRightIndex = i$1;
            }
        }
        return {
            low: maxLeftIndex,
            high: maxRightIndex,
            sum: leftMax + rightMax,
        };
    }

    function minAndMax(arr, compare) {
        if ( compare === void 0 ) compare = defaultCompare;

        if (!arr || !arr.length) {
            return null;
        }
        var length = arr.length;
        var min, max;
        var beginIndex = 0;
        if (length & 1) {
            beginIndex = 1;
            min = max = arr[0];
        }
        else {
            beginIndex = 2;
            min = compare(arr[0], arr[1]) ? arr[1] : arr[0];
            max = min === arr[0] ? arr[1] : arr[0];
        }
        var lt, gt;
        for (var index = beginIndex; index < length; index += 2) {
            var fisrt = arr[index];
            var last = arr[index + 1];
            if (compare(fisrt, last)) {
                lt = last;
                gt = fisrt;
            }
            else {
                lt = fisrt;
                gt = last;
            }
            if (compare(gt, max)) {
                max = gt;
            }
            if (compare(min, lt)) {
                min = lt;
            }
        }
        return {
            min: min,
            max: max,
        };
    }

    var GraphEdge = function GraphEdge(startVertex, endVertex, weight) {
        if ( weight === void 0 ) weight = 0;

        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    };

    var prototypeAccessors$i = { Weight: { configurable: true },EndVertex: { configurable: true },StartVertex: { configurable: true } };
    prototypeAccessors$i.Weight.get = function () {
        return this.weight;
    };
    prototypeAccessors$i.EndVertex.get = function () {
        return this.endVertex;
    };
    prototypeAccessors$i.StartVertex.get = function () {
        return this.startVertex;
    };

    Object.defineProperties( GraphEdge.prototype, prototypeAccessors$i );

    var GraphVertex = function GraphVertex(node, property) {
        this.property = property;
        this.indegree = 0;
        if (property) {
            var key = node[property];
            this.key = toString(key);
        }
        else {
            this.key = toString(node);
        }
        this.node = node;
        this.edges = new LinkList();
    };

    var prototypeAccessors$j = { InDegree: { configurable: true },Key: { configurable: true },Node: { configurable: true },Property: { configurable: true } };
    prototypeAccessors$j.InDegree.set = function (value) {
        this.indegree = value;
    };
    prototypeAccessors$j.Key.get = function () {
        return this.key;
    };
    prototypeAccessors$j.Node.get = function () {
        return this.node;
    };
    prototypeAccessors$j.Property.get = function () {
        return this.property;
    };
    GraphVertex.prototype.addUndirectedEdge = function addUndirectedEdge (endVertex, weight) {
        if (!endVertex) {
            throw new Error("end vertex is not empty");
        }
        var exist = this.edges.findNode(function (item) { return item.EndVertex.Key === endVertex.Key; });
        if (exist) {
            return false;
        }
        var edge = new GraphEdge(this, endVertex, weight);
        this.edges.append(edge);
        endVertex.addUndirectedEdge(this, weight);
    };
    GraphVertex.prototype.addEdge = function addEdge (endVertex, weight) {
        if (!endVertex) {
            throw new Error("end vertex is not empty");
        }
        var exist = this.edges.findNode(function (item) { return item.EndVertex.Key === endVertex.Key; });
        if (exist) {
            return false;
        }
        var edge = new GraphEdge(this, endVertex, weight);
        this.edges.append(edge);
        endVertex.InDegree = endVertex.getInDegree() + 1;
        return true;
    };
    GraphVertex.prototype.getEdges = function getEdges () {
        return this.edges;
    };
    GraphVertex.prototype.getEdge = function getEdge (endKey) {
        var edge = this.edges.findNode(function (item) { return item.EndVertex.Key === endKey; });
        if (edge) {
            return edge.Value;
        }
        return null;
    };
    GraphVertex.prototype.deleteEdgeByKey = function deleteEdgeByKey (endKey, directed) {
            if ( directed === void 0 ) directed = true;

        var edge = this.edges.findNode(function (item) { return item.EndVertex.key === endKey; });
        var success = this.edges.deleteNode(function (item) { return item.EndVertex.Key === endKey; });
        if (success) {
            if (directed) {
                edge.Value.EndVertex.InDegree = edge.Value.EndVertex.getInDegree() - 1;
            }
            else {
                edge.Value.EndVertex.deleteEdgeByKey(edge.Value.StartVertex.key, true);
            }
        }
        return success;
    };
    GraphVertex.prototype.deleteEdge = function deleteEdge (edge) {
        var success = this.edges.deleteNode(edge);
        if (success) {
            edge.EndVertex.InDegree = edge.EndVertex.getInDegree() - 1;
        }
        return success;
    };
    GraphVertex.prototype.hasEdge = function hasEdge () {
        return !!this.edges.Size;
    };
    GraphVertex.prototype.getInDegree = function getInDegree () {
        return this.indegree;
    };
    GraphVertex.prototype.getOutDegree = function getOutDegree () {
        return this.edges.Size;
    };
    GraphVertex.prototype.getDegree = function getDegree () {
        return this.getInDegree() + this.getOutDegree();
    };
    GraphVertex.prototype.getNeighbors = function getNeighbors () {
        var arr = [];
        var node = this.edges.getHeadNode();
        while (node) {
            arr.push(node.Value.EndVertex);
            node = node.Next;
        }
        return arr;
    };

    Object.defineProperties( GraphVertex.prototype, prototypeAccessors$j );

    var Graph = function Graph(directed) {
        if ( directed === void 0 ) directed = true;

        this.directed = directed;
        this.vertices = {};
        this.edges = {};
    };

    var prototypeAccessors$k = { Directed: { configurable: true } };
    prototypeAccessors$k.Directed.get = function () {
        return this.directed;
    };
    Graph.prototype.addVertex = function addVertex (vertex) {
        this.vertices[vertex.Key] = vertex;
        this.edges[vertex.Key] = vertex.getEdges();
        return this;
    };
    Graph.prototype.addEdgeByKey = function addEdgeByKey (start, end, weight) {
        var startVertex = this.findVertex(start);
        var endVertex = this.findVertex(end);
        if (!startVertex || !endVertex) {
            throw new Error("vertex has not found");
        }
        return this.addEdge(startVertex, endVertex, weight);
    };
    Graph.prototype.addEdge = function addEdge (start, end, weight) {
        if (!start) {
            throw new Error("vertex is not empty");
        }
        if (this.directed) {
            start.addEdge(end, weight);
        }
        else {
            start.addUndirectedEdge(end, weight);
        }
        return this;
    };
    Graph.prototype.deleteEdge = function deleteEdge (start, end) {
        if (!start) {
            throw new Error("vertex is not empty");
        }
        return start.deleteEdgeByKey(end, this.directed);
    };
    Graph.prototype.deleteEdgeByKey = function deleteEdgeByKey (start, end) {
        var startVertex = this.findVertex(start);
        if (startVertex) {
            return this.deleteEdge(startVertex, end);
        }
        return false;
    };
    Graph.prototype.getVertexs = function getVertexs () {
            var this$1 = this;

        var arr = [];
        for (var key in this$1.vertices) {
            arr.push(this$1.vertices[key]);
        }
        return arr;
    };
    Graph.prototype.getKeys = function getKeys () {
        return Object.keys(this.vertices);
    };
    Graph.prototype.getEdges = function getEdges () {
            var this$1 = this;

        var arr = [];
        for (var key in this$1.edges) {
            arr = arr.concat( this$1.edges[key].toArray().map(function (item) { return item.Value; }));
        }
        return arr;
    };
    Graph.prototype.findVertex = function findVertex (key) {
        return this.vertices[key];
    };
    Graph.prototype.findEdge = function findEdge (key) {
        return this.edges[key];
    };
    Graph.prototype.deleteVertex = function deleteVertex (key) {
            var this$1 = this;

        if (!(key in this.vertices)) {
            return false;
        }
        delete this.vertices[key];
        delete this.edges[key];
        for (var tempKey in this$1.vertices) {
            var element = this$1.vertices[tempKey];
            element.deleteEdgeByKey(key);
        }
        return true;
    };
    Graph.prototype.toAdjacencyMatrix = function toAdjacencyMatrix () {
            var this$1 = this;

        var keys = this.getKeys();
        var matrix = new Array(keys.length)
            .fill(0).map(function () { return new Array(keys.length).fill(Infinity); });
        var keyIndexs = {};
        var index = 0;
        for (var key in this$1.vertices) {
            keyIndexs[key] = index;
            matrix[index][index] = 0;
            index++;
        }
        for (var key$1 in this$1.vertices) {
            var vertex = this$1.vertices[key$1];
            var edges = vertex.getEdges().toArray();
            for (var i = 0, list = edges; i < list.length; i += 1) {
                var edgeNode = list[i];

                    var edge = edgeNode.Value;
                matrix[keyIndexs[key$1]][keyIndexs[edge.EndVertex.Key]] = edge.Weight;
            }
        }
        return {
            matrix: matrix,
            keyIndexs: keyIndexs,
        };
    };
    Graph.prototype.clone = function clone () {
        var vertices = this.getVertexs();
        var edges = this.getEdges();
        var graph = new Graph(this.directed);
        vertices.forEach(function (item) { return graph.addVertex(new GraphVertex(item.Node, item.Property)); });
        edges.forEach(function (item) {
            var startVertex = graph.findVertex(item.StartVertex.Key);
            var endVertex = graph.findVertex(item.EndVertex.Key);
            graph.addEdge(startVertex, endVertex, item.Weight);
        });
        return graph;
    };

    Object.defineProperties( Graph.prototype, prototypeAccessors$k );

    function bellmanFord(graph, startVertex) {
        if (!startVertex) {
            startVertex = graph.getVertexs()[0];
        }
        if (!startVertex || !graph.findVertex(startVertex.Key)) {
            return {};
        }
        var vertices = graph.getVertexs();
        var hashMap = new HashMap(vertices.length);
        var prevMap = new HashMap(vertices.length);
        for (var i = 0, list = vertices; i < list.length; i += 1) {
            var vertex = list[i];

            if (vertex === startVertex) {
                hashMap.put(vertex.Key, 0);
            }
            else {
                hashMap.put(vertex.Key, Infinity);
            }
        }
        var edges = graph.getEdges();
        for (var i$2 = 0, list$2 = vertices; i$2 < list$2.length; i$2 += 1) {
            var ref = list$2[i$2];
            for (var i$1 = 0, list$1 = edges; i$1 < list$1.length; i$1 += 1) {
                var edge = list$1[i$1];

                var prevWeight = hashMap.get(edge.StartVertex.Key);
                var desc = edge.EndVertex;
                if (hashMap.get(desc.Key) > prevWeight + edge.Weight) {
                    prevMap.put(desc.Key, edge.StartVertex);
                    hashMap.put(desc.Key, prevWeight + edge.Weight);
                }
            }
        }
        for (var i$3 = 0, list$3 = edges; i$3 < list$3.length; i$3 += 1) {
            var edge$1 = list$3[i$3];

            var prevWeight$1 = hashMap.get(edge$1.StartVertex.Key);
            var endWeight = hashMap.get(edge$1.EndVertex.Key);
            if (endWeight > prevWeight$1 + edge$1.Weight) {
                throw new Error("Graph contains negative weight cycle");
            }
        }
        var prevKeys = prevMap.keys();
        var prev = prevKeys.reduce(function (ori, item) {
            ori[item] = prevMap.get(item).Key;
            return ori;
        }, {});
        var keys = hashMap.keys();
        var distance = keys.reduce(function (ori, item) {
            ori[item] = hashMap.get(item);
            return ori;
        }, {});
        return {
            distance: distance,
            prev: prev,
        };
    }

    function breadthFirstSearch(graph, startVertex) {
        if (!startVertex) {
            startVertex = graph.getVertexs()[0];
        }
        if (!startVertex || !graph.findVertex(startVertex.Key)) {
            return [];
        }
        var queue = new Queue();
        queue.enqueue(startVertex);
        var existHashMap = new HashMap(graph.getKeys().length);
        var arr = [];
        while (!queue.isEmpty()) {
            var vertex = queue.dequeue();
            existHashMap.put(vertex.Key, true);
            arr.push(vertex.Node);
            var nextNodes = vertex.getNeighbors();
            for (var i = 0, list = nextNodes; i < list.length; i += 1) {
                var element = list[i];

                if (!existHashMap.get(element.Key)) {
                    queue.enqueue(element);
                }
            }
        }
        return arr;
    }

    function depthFirstSearch(graph, startVertex) {
        if (!startVertex) {
            startVertex = graph.getVertexs()[0];
        }
        if (!startVertex || !graph.findVertex(startVertex.Key)) {
            return [];
        }
        var stack = [];
        stack.push(startVertex);
        var existHashMap = new HashMap(graph.getKeys().length);
        var arr = [];
        while (stack.length) {
            var vertex = stack.pop();
            if (!existHashMap.get(vertex.Key)) {
                arr.push(vertex.Node);
                existHashMap.put(vertex.Key, true);
            }
            var nextNodes = vertex.getNeighbors().reverse();
            for (var i = 0, list = nextNodes; i < list.length; i += 1) {
                var element = list[i];

                if (!existHashMap.get(element.Key)) {
                    stack.push(element);
                }
            }
        }
        return arr;
    }

    function dijkstra(graph, startVertex) {
        if (!startVertex) {
            startVertex = graph.getVertexs()[0];
        }
        if (!startVertex || !graph.findVertex(startVertex.Key)) {
            return {};
        }
        var vertices = graph.getVertexs();
        var weightMap = new HashMap(vertices.length);
        var visitedMap = new HashMap(vertices.length);
        var prevMap = new HashMap(vertices.length);
        prevMap.put(startVertex.Key, startVertex);
        for (var i = 0, list = vertices; i < list.length; i += 1) {
            var vertex = list[i];

            if (vertex.Key === startVertex.Key) {
                weightMap.put(vertex.Key, 0);
            }
            else {
                weightMap.put(vertex.Key, Infinity);
            }
        }
        var queue = new PriorityQueue();
        queue.enqueue(startVertex, 0);
        var loop = function () {
            var currentVertex = queue.dequeue().Value;
            var currentDistance = weightMap.get(currentVertex.Key);
            currentVertex.getNeighbors().forEach(function (neighbor) {
                if (visitedMap.get(neighbor.Key)) {
                    return;
                }
                var prevDistance = weightMap.get(neighbor.Key);
                var weight = currentVertex.getEdge(neighbor.Key).Weight;
                if (prevDistance > currentDistance + weight) {
                    weightMap.put(neighbor.Key, currentDistance + weight);
                    if (queue.has(neighbor)) {
                        queue.changePriority(neighbor, currentDistance + weight);
                        prevMap.put(neighbor.Key, currentVertex);
                    }
                }
                if (!queue.has(neighbor)) {
                    queue.enqueue(neighbor, -weightMap.get(neighbor.Key));
                    prevMap.put(neighbor.Key, currentVertex);
                }
            });
            visitedMap.put(currentVertex.Key, true);
        };

        while (!queue.isEmpty()) loop();
        var keys = weightMap.keys();
        var distance = keys.reduce(function (ori, item) {
            ori[item] = weightMap.get(item);
            return ori;
        }, {});
        var prevKeys = prevMap.keys();
        var prev = prevKeys.reduce(function (ori, item) {
            ori[item] = prevMap.get(item).Key;
            return ori;
        }, {});
        return {
            distance: distance,
            prev: prev,
        };
    }

    function floydWarshall(graph, startVertex) {
        if (!startVertex) {
            startVertex = graph.getVertexs()[0];
        }
        if (!startVertex || !graph.findVertex(startVertex.Key)) {
            return {};
        }
        var matrixResult = graph.toAdjacencyMatrix();
        var matrix = matrixResult.matrix;
        for (var k = 0; k < matrix.length; k++) {
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix.length; j++) {
                    if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
                        matrix[i][j] = matrix[i][k] + matrix[k][j];
                    }
                }
                if (matrix[i][i] < 0) {
                    throw new Error("Graph contains negative weight cycle");
                }
            }
        }
        var keyIndexs = matrixResult.keyIndexs;
        var startIndex = keyIndexs[startVertex.Key];
        var distance = {};
        for (var key in keyIndexs) {
            distance[key] = matrix[startIndex][keyIndexs[key]];
        }
        return {
            distance: distance,
        };
    }

    function getEulerCircuit(graph, startVertex) {
        if (!graph) {
            return [];
        }
        if (!startVertex) {
            startVertex = graph.getVertexs()[0];
        }
        if (!startVertex || !graph.findVertex(startVertex.Key)) {
            return [];
        }
        var existHashMap = new HashSet();
        var edgeSet = new HashSet();
        var edges = [];
        getCircuit(startVertex);
        return edges.reverse();
        function getCircuit(vertex, prevKey) {
            var nextNodes = vertex.getNeighbors();
            existHashMap.add(vertex.Key);
            nextNodes.forEach(function (item) {
                if (item.Key === prevKey) {
                    return;
                }
                var edgeKey = JSON.stringify([vertex.Key, item.Key].sort(function (a, b) { return a > b ? 1 : -1; }));
                if (!edgeSet.has(edgeKey)) {
                    if (existHashMap.has(item.Key)) {
                        edges.push(vertex.getEdge(item.Key));
                    }
                    else {
                        existHashMap.add(item.Key);
                        getCircuit(item, vertex.Key);
                        edges.push(vertex.getEdge(item.Key));
                    }
                    edgeSet.add(edgeKey);
                }
            });
        }
    }

    var NotFindInSetException = (function (Error) {
    	function NotFindInSetException () {
    		Error.apply(this, arguments);
    	}if ( Error ) NotFindInSetException.__proto__ = Error;
    	NotFindInSetException.prototype = Object.create( Error && Error.prototype );
    	NotFindInSetException.prototype.constructor = NotFindInSetException;

    	

    	return NotFindInSetException;
    }(Error));

    var DisjointSetItem = function DisjointSetItem(value) {
        this.value = value;
        this.parent = null;
        this.children = {};
    };

    var prototypeAccessors$l = { Value: { configurable: true } };
    prototypeAccessors$l.Value.get = function () {
        return this.value;
    };
    DisjointSetItem.prototype.getKey = function getKey (key) {
        if (key) {
            return this.value[key] + "";
        }
        return this.value + "";
    };
    DisjointSetItem.prototype.getRoot = function getRoot () {
        return this.isRoot() ? this : this.parent.getRoot();
    };
    DisjointSetItem.prototype.isRoot = function isRoot () {
        return this.parent === null;
    };
    DisjointSetItem.prototype.getRank = function getRank () {
            var this$1 = this;

        if (Object.keys(this.children).length === 0) {
            return 0;
        }
        var rank = 0;
        for (var key in this$1.children) {
            rank++;
            rank += this$1.children[key].getRank();
        }
        return rank;
    };
    DisjointSetItem.prototype.getChildren = function getChildren () {
            var this$1 = this;

        var arr = [];
        for (var key in this$1.children) {
            arr.push(this$1.children[key]);
        }
        return arr;
    };
    DisjointSetItem.prototype.setParent = function setParent (parent, forceSettingParentChild) {
            if ( forceSettingParentChild === void 0 ) forceSettingParentChild = true;

        this.parent = parent;
        if (forceSettingParentChild) {
            this.parent.addChild(this);
        }
        return this;
    };
    DisjointSetItem.prototype.addChild = function addChild (child) {
        this.children[child.getKey()] = child;
        child.setParent(this, false);
        return this;
    };

    Object.defineProperties( DisjointSetItem.prototype, prototypeAccessors$l );

    var DisjointSet = function DisjointSet(key) {
        this.key = key;
        this.items = {};
        this.rootItems = {};
    };

    var prototypeAccessors$m = { RootItems: { configurable: true } };
    prototypeAccessors$m.RootItems.get = function () {
        return this.rootItems;
    };
    DisjointSet.prototype.makeSet = function makeSet (value) {
        var disjointSetItem = new DisjointSetItem(value);
        if (!this.items[disjointSetItem.getKey(this.key)]) {
            this.items[disjointSetItem.getKey(this.key)] = disjointSetItem;
            this.rootItems[disjointSetItem.getKey(this.key)] = disjointSetItem;
        }
        return this;
    };
    DisjointSet.prototype.find = function find (value) {
        var disjointSetItem = new DisjointSetItem(value);
        var foundDisjointSetItem = this.items[disjointSetItem.getKey(this.key)];
        if (!foundDisjointSetItem) {
            return null;
        }
        return foundDisjointSetItem.getRoot().getKey(this.key);
    };
    DisjointSet.prototype.union = function union (value1, value2) {
        var rootKeyA = this.find(value1);
        var rootKeyB = this.find(value2);
        if (rootKeyA === null || rootKeyB === null) {
            throw new NotFindInSetException();
        }
        if (rootKeyA === rootKeyB) {
            return this;
        }
        var rootA = this.items[rootKeyA];
        var rootB = this.items[rootKeyB];
        if (rootA.getRank() < rootB.getRank()) {
            rootB.addChild(rootA);
            delete this.rootItems[rootKeyA];
            return this;
        }
        rootA.addChild(rootB);
        delete this.rootItems[rootKeyB];
        return this;
    };
    DisjointSet.prototype.inSameSet = function inSameSet (value1, value2) {
        var rootKeyA = this.find(value1);
        var rootKeyB = this.find(value2);
        if (rootKeyA === null || rootKeyB === null) {
            throw new NotFindInSetException();
        }
        return rootKeyA === rootKeyB;
    };

    Object.defineProperties( DisjointSet.prototype, prototypeAccessors$m );

    function isconnected(graph) {
        var vertexs = graph.getVertexs();
        var disjoinSet = new DisjointSet();
        vertexs.forEach(function (vertex) {
            var neighbors = vertex.getNeighbors();
            if (neighbors && neighbors.length) {
                neighbors.forEach(function (neighbor) {
                    var startVertex = vertex;
                    var endVertex = neighbor;
                    if (!disjoinSet.find(startVertex.Key)) {
                        disjoinSet.makeSet(startVertex.Key);
                    }
                    if (!disjoinSet.find(endVertex.Key)) {
                        disjoinSet.makeSet(endVertex.Key);
                    }
                    disjoinSet.union(startVertex.Key, endVertex.Key);
                });
            }
            else {
                disjoinSet.makeSet(vertex.Key);
            }
        });
        var rootItems = disjoinSet.RootItems;
        if (Object.keys(rootItems).length > 1) {
            return false;
        }
        return true;
    }

    function isUndirectedEulerGraph(graph) {
        if (!graph) {
            return false;
        }
        if (graph.Directed) {
            return false;
        }
        if (!isconnected(graph)) {
            return false;
        }
        var vertices = graph.getVertexs();
        return vertices.every(function (item) { return !(item.getDegree() & 1); });
    }
    function isDirectedEulerGraph(graph) {
        if (!graph) {
            return false;
        }
        if (!graph.Directed) {
            return false;
        }
        var vertices = graph.getVertexs();
        var traversalVertices = breadthFirstSearch(graph);
        if (traversalVertices.length === vertices.length) {
            return vertices.every(function (item) { return item.getInDegree() === item.getOutDegree(); });
        }
        return false;
    }

    function kruskal(graph) {
        var edges = graph.getEdges().sort(function (a, b) { return a.Weight > b.Weight ? 1 : -1; });
        var verticeLength = graph.getVertexs().length;
        var visitedVertices = [];
        var visitedEdges = [];
        var disjointSet = new DisjointSet();
        for (var i = 0, list = edges; i < list.length; i += 1) {
            var edge = list[i];

            if (!disjointSet.find(edge.StartVertex.Key)) {
                disjointSet.makeSet(edge.StartVertex.Key);
                visitedVertices.push(edge.StartVertex);
            }
            if (!disjointSet.find(edge.EndVertex.Key)) {
                disjointSet.makeSet(edge.EndVertex.Key);
                visitedVertices.push(edge.EndVertex);
            }
            if (!disjointSet.inSameSet(edge.StartVertex.Key, edge.EndVertex.Key)) {
                disjointSet.union(edge.StartVertex.Key, edge.EndVertex.Key);
                visitedEdges.push(edge);
            }
            if (visitedEdges.length === verticeLength - 1) {
                break;
            }
        }
        return {
            visitedVertices: visitedVertices,
            visitedEdges: visitedEdges,
        };
    }

    function prim(graph) {
        var edges = graph.getEdges();
        var startVertex = edges.reduce(function (ori, item) {
            if (ori === null) {
                return item;
            }
            if (item.Weight < ori.Weight) {
                return item;
            }
            return ori;
        }, null).StartVertex;
        var visitedSet = new HashSet();
        var visitedVertices = [startVertex];
        var visitedEdges = new Array();
        visitedSet.add(startVertex.Key);
        traversal();
        visitedSet.clear();
        return {
            visitedVertices: visitedVertices,
            visitedEdges: visitedEdges,
        };
        function traversal() {
            var tempWeight = Infinity;
            var nextVertex;
            var nextEdge;
            for (var i = 0, list = visitedVertices; i < list.length; i += 1) {
                var vertex = list[i];

                var head = vertex.getEdges().getHeadNode();
                while (head) {
                    var edge = head.Value;
                    if (!visitedSet.has(edge.EndVertex.Key) && head.Value.Weight < tempWeight) {
                        tempWeight = head.Value.Weight;
                        nextVertex = head.Value.EndVertex;
                        nextEdge = edge;
                    }
                    head = head.Next;
                }
            }
            if (nextVertex) {
                visitedSet.add(nextVertex.Key);
                visitedVertices.push(nextVertex);
                visitedEdges.push(nextEdge);
                traversal();
            }
        }
    }

    function tarjan(graph) {
        var vertices = graph.getVertexs();
        var stack = [];
        var components = [];
        var visitedMap = new HashMap();
        vertices.forEach(function (item) { return stronglyConnect(item, stack); });
        return components;
        function stronglyConnect(vertex, visitedStack, dfn, low, index) {
            if ( dfn === void 0 ) dfn = new HashMap();
            if ( low === void 0 ) low = new HashMap();
            if ( index === void 0 ) index = 1;

            if (visitedMap.get(vertex.Key)) {
                return;
            }
            index++;
            visitedStack.push(vertex);
            dfn.put(vertex.Key, index);
            low.put(vertex.Key, index);
            var neighbors = vertex.getNeighbors();
            neighbors.forEach(function (item) {
                if (!dfn.get(item.Key)) {
                    stronglyConnect(item, visitedStack, dfn, low, index);
                }
                if (!visitedMap.get(item.Key)) {
                    var lowIndex = low.get(item.Key);
                    var currentLowIndex = low.get(vertex.Key);
                    low.put(vertex.Key, Math.min(currentLowIndex, lowIndex));
                }
            });
            var lowIndex = low.get(vertex.Key);
            var dfnIndex = dfn.get(vertex.Key);
            if (lowIndex === dfnIndex) {
                var target;
                var smallComponents = [];
                do {
                    target = visitedStack.pop().Key;
                    visitedMap.put(target, true);
                    smallComponents.push(target);
                } while (target !== vertex.Key);
                components.push(smallComponents);
            }
        }
    }

    function tspBranchAndBound(graph) {
        if (!graph) {
            return null;
        }
        var queue = new PriorityQueue();
        var vertices = graph.getVertexs();
        if (vertices.length <= 1) {
            return { cost: 0, path: [] };
        }
        var min = getDown(vertices);
        queue.enqueue({ vertex: vertices[0], visitedKeys: [] }, -min);
        var globalMin = getUp(vertices[0], vertices.length);
        var globalMinPath;
        var loop = function () {
            var ref = queue.dequeue();
            var node = ref.Value;
            var cost = ref.Priority;
            var currentVertex = node.vertex;
            var visitedKeys = [].concat( node.visitedKeys );
            visitedKeys.push(currentVertex.Key);
            var visitedVertexSet = HashSet.fromArray(visitedKeys);
            var isHasNoVisitedNeighbors = true;
            currentVertex.getNeighbors().forEach(function (neighbor) {
                if (visitedVertexSet.has(neighbor.Key)) {
                    return;
                }
                isHasNoVisitedNeighbors = false;
                var currentCost = getLb(graph, visitedKeys, neighbor, vertices);
                if (currentCost <= globalMin) {
                    queue.enqueue({ vertex: neighbor, visitedKeys: visitedKeys }, -currentCost);
                }
            });
            if (isHasNoVisitedNeighbors && globalMin <= Math.abs(cost)) {
                globalMin = Math.abs(cost);
                globalMinPath = visitedKeys;
            }
        };

        while (!queue.isEmpty()) loop();
        return { cost: globalMin, path: globalMinPath };
    }
    function getLb(graph, visitedKeys, currentVertex, vertices) {
        var sumCost = 0;
        for (var index = 0; index < visitedKeys.length - 1; index++) {
            var currentVertex$1 = graph.findVertex(visitedKeys[index]);
            sumCost += currentVertex$1.getEdge(visitedKeys[index + 1]).Weight;
        }
        var firstVertex = graph.findVertex(visitedKeys[0]);
        var lastVertex = graph.findVertex(visitedKeys[visitedKeys.length - 1]);
        sumCost += lastVertex.getEdge(currentVertex.Key).Weight;
        sumCost *= 2;
        var tempSet = HashSet.fromArray(visitedKeys);
        tempSet.add(currentVertex.Key);
        var firstOutMin = getMin(firstVertex, tempSet);
        var lastOutMin = getMin(currentVertex, tempSet);
        if (!lastOutMin) {
            firstOutMin = lastOutMin = currentVertex.getEdge(visitedKeys[0]);
        }
        if (!firstOutMin) {
            return Infinity;
        }
        sumCost += (firstOutMin.Weight + lastOutMin.Weight);
        vertices.forEach(function (vertex) {
            if (!tempSet.has(vertex.Key)) {
                var minVertices = getTwoMin(linkListToArray(vertex.getEdges()));
                sumCost += (minVertices.firstMin.Weight + minVertices.secondMin.Weight);
            }
        });
        return sumCost / 2;
    }
    function linkListToArray(linkList) {
        var head = linkList.getHeadNode();
        var arr = [];
        while (head) {
            arr.push(head.Value);
            head = head.Next;
        }
        return arr;
    }
    function getDown(vertices) {
        return vertices.reduce(function (ori, vertex) {
            var minVertices = getTwoMin(linkListToArray(vertex.getEdges()));
            return ori + (minVertices.firstMin.Weight + minVertices.secondMin.Weight);
        }, 0) / 2;
    }
    function getUp(vertex, length) {
        var currentVertex = vertex;
        var lastEdge;
        var visitedSet = new HashSet(length);
        visitedSet.add(currentVertex.Key);
        var count = 1;
        var sumWeight = 0;
        while (count < length) {
            lastEdge = getMin(currentVertex, visitedSet);
            if (!lastEdge) {
                throw new Error("the graph is not connected");
            }
            currentVertex = lastEdge.EndVertex;
            visitedSet.add(currentVertex.Key);
            sumWeight += lastEdge.Weight;
            count++;
        }
        var circleEdge = currentVertex.getEdge(vertex.Key);
        if (!circleEdge) {
            throw new Error("the graph is not connected");
        }
        sumWeight += circleEdge.Weight;
        visitedSet.clear();
        return sumWeight;
    }
    function getMin(vertex, visitedSet) {
        var head = vertex.getEdges().getHeadNode();
        var min;
        while (head) {
            var vertex$1 = head.Value;
            head = head.Next;
            if (visitedSet.has(vertex$1.EndVertex.Key)) {
                continue;
            }
            if (!min || min.Weight > vertex$1.Weight) {
                min = vertex$1;
            }
        }
        return min;
    }
    function getTwoMin(edges) {
        if (!edges.length) {
            throw new Error("the vertex hasn't edges");
        }
        var length = edges.length;
        var firstMin, secondMin;
        var beginIndex = 0;
        if (length & 1) {
            beginIndex = 1;
            firstMin = secondMin = edges[0];
        }
        else {
            beginIndex = 2;
            firstMin = edges[1].Weight > edges[0].Weight ? edges[1] : edges[0];
            secondMin = firstMin === edges[0] ? edges[1] : edges[0];
        }
        var lt, gt;
        for (var index = beginIndex; index < edges.length; index += 2) {
            var first = edges[beginIndex];
            var second = edges[beginIndex + 1];
            if (first.Weight > second.Weight) {
                lt = second;
                gt = first;
            }
            else {
                lt = first;
                gt = second;
            }
            if (lt.Weight > secondMin.Weight) {
                continue;
            }
            if (gt.Weight <= firstMin.Weight) {
                firstMin = lt;
                secondMin = gt;
            }
            else {
                secondMin = lt;
            }
        }
        return {
            firstMin: firstMin,
            secondMin: secondMin,
        };
    }

    function bubbleSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                var condition = key ? arr[j][key] > arr[j + 1][key] : arr[j] > arr[j + 1];
                if (condition) {
                    swap(arr, j, j + 1);
                }
            }
        }
        return arr;
    }

    function insertSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        var len = arr.length;
        for (var i = 1; i < len; i++) {
            var j = i;
            while (j > 0) {
                var current = arr[j], prev = arr[j - 1];
                var condition = key ? current[key] < prev[key] : current < prev;
                if (condition)
                    { swap(arr, j, j - 1); }
                j--;
            }
        }
        return arr;
    }

    function mergeSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        var len = arr.length;
        if (len < 2) {
            return arr;
        }
        function merge(left, right, key) {
            var result = [];
            while (left.length > 0 && right.length > 0) {
                var leftLassThanEqualRight = key ? left[0][key] <= right[0][key] : left[0] <= right[0];
                if (leftLassThanEqualRight) {
                    result.push(left.shift());
                }
                else {
                    result.push(right.shift());
                }
            }
            while (left.length) {
                result.push(left.shift());
            }
            while (right.length) {
                result.push(right.shift());
            }
            return result;
        }
        var middle = Math.floor(len / 2), left = arr.slice(0, middle), right = arr.slice(middle);
        return merge(this.mergeSort(left, key), this.mergeSort(right, key), key);
    }

    function quickSort(arr, key) {
        sort(arr, 0, arr.length - 1);
        return arr;
        function sort(array, first, last) {
            if (first >= last) {
                return;
            }
            var low = first;
            var high = last;
            var middleValue = array[first];
            while (first < last) {
                while (first < last && defaultCompare(array[last], middleValue, key)) {
                    --last;
                }
                array[first] = array[last];
                while (first < last && !defaultCompare(array[first], middleValue, key)) {
                    ++first;
                }
                array[last] = array[first];
            }
            array[first] = middleValue;
            sort(array, low, first - 1);
            sort(array, first + 1, high);
        }
    }

    function selectionSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        var len = arr.length;
        var minIndex;
        for (var i = 0; i < len; i++) {
            minIndex = i;
            for (var j = i; j < len; j++) {
                var start = arr[minIndex], current = arr[j];
                var condition = key ? start[key] > current[key] : start > current;
                if (condition) {
                    minIndex = j;
                }
            }
            swap(arr, i, minIndex);
        }
        return arr;
    }

    function shellSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        var len = arr.length;
        var i = 1;
        while (Math.floor(len / (2 * i))) {
            var quotient = Math.floor(len / (2 * i));
            for (var j = 0; j < 2 * i; j++) {
                var currentIndex = j;
                while (currentIndex + quotient < len) {
                    var current = arr[currentIndex], quotientNext = arr[currentIndex + quotient];
                    var condition = key ? quotientNext[key] < current[key] : quotientNext < current;
                    if (condition)
                        { swap(arr, currentIndex, currentIndex + quotient); }
                    currentIndex += quotient;
                }
            }
            i++;
        }
    }

    function combination(arr, shouldLength) {
        if (shouldLength === 1) {
            return arr.map(function (item) { return [item]; });
        }
        var result = [];
        arr.forEach(function (item, index) {
            var smallComs = combination(arr.slice(index + 1), shouldLength - 1);
            smallComs.forEach(function (current) {
                result.push([item].concat(current));
            });
        });
        return result;
    }

    function combinationRepeat(arr, shouldLength) {
        if (shouldLength === 1) {
            return arr.map(function (item) { return [item]; });
        }
        var result = [];
        arr.forEach(function (item, index) {
            var smallComs = combination(arr.slice(index), shouldLength - 1);
            smallComs.forEach(function (current) {
                result.push([item].concat(current));
            });
        });
        return result;
    }

    function gcd(num1, num2) {
        if (num2 === 0) {
            return num1;
        }
        return gcd(num2, num1 % num2);
    }

    function lcm(num1, num2) {
        var gcdResult = gcd(num1, num2);
        return gcdResult * (num1 / gcdResult) * (num2 / gcdResult);
    }

    function permutation(arr, shouldLength) {
        if (shouldLength === 1) {
            return arr.map(function (item) { return [item]; });
        }
        var result = [];
        arr.forEach(function (item, index) {
            var tempArr = [].concat(arr);
            tempArr.splice(index, 1);
            var smallComs = permutation(tempArr, shouldLength - 1);
            smallComs.forEach(function (current) {
                result.push([item].concat(current));
            });
        });
        return result;
    }

    function powerSet(arr, allPowerSets, currentPowerSets, position) {
        if ( allPowerSets === void 0 ) allPowerSets = [];
        if ( currentPowerSets === void 0 ) currentPowerSets = [];
        if ( position === void 0 ) position = 0;

        if (position === 0) {
            allPowerSets.push([]);
        }
        for (var i = position; i < arr.length; i++) {
            currentPowerSets.push(arr[i]);
            allPowerSets.push([].concat( currentPowerSets ));
            powerSet(arr, allPowerSets, currentPowerSets, i + 1);
            currentPowerSets.pop();
        }
        return allPowerSets;
    }

    var sort = {
        bubbleSort: bubbleSort,
        insertSort: insertSort,
        mergeSort: mergeSort,
        quickSort: quickSort,
        selectionSort: selectionSort,
        shellSort: shellSort,
    };
    var math = {
        combination: combination,
        combinationRepeat: combinationRepeat,
        permutation: permutation,
        powerSet: powerSet,
        gcd: gcd,
        lcm: lcm,
    };
    var index = {
        LinkList: LinkList,
        DoubleLinkList: DoubleLinkList,
        CycleLinkList: CycleLinkList,
        DoubleCycleLinkList: DoubleLinkListCycle,
        Stack: Stack,
        Queue: Queue,
        SkipList: SkipList,
        Heap: Heap,
        MaxHeap: MaxHeap,
        MinHeap: MinHeap,
        BinomialHeap: BinomialHeap,
        LeftistTree: LeftistTree,
        PriorityQueue: PriorityQueue,
        ArraySet: ArraySet,
        HashTable: HashTable,
        HashMap: HashMap,
        HashSet: HashSet,
        TreeMap: TreeMap,
        TreeSet: TreeSet,
        BasicBinaryTree: BasicBinaryTree,
        BasicBinaryTreeNode: BasicBinaryTreeNode,
        BinarySearchTree: BinarySearchTree,
        AvlTree: AvlTree,
        RedBlackTree: RedBlackTree,
        FenwickTree: FenwickTree,
        HuffmanTree: HuffmanTree,
        HuffmanTreeBuilder: HuffmanTreeBuilder,
        binarySearch: binarySearch,
        kmp: kmp,
        lcs: lcs,
        lcstr: lcstr,
        lcstropt: lcstropt,
        levenshteinDistance: levenshteinDistance,
        dpMaxSubArray: dpMaxSubArray,
        maxSubArray: maxSubArray,
        minAndMax: minAndMax,
        Graph: Graph,
        GraphVertex: GraphVertex,
        GraphEdge: GraphEdge,
        breadthFirstSearch: breadthFirstSearch,
        depthFirstSearch: depthFirstSearch,
        dijkstra: dijkstra,
        bellmanFord: bellmanFord,
        floydWarshall: floydWarshall,
        isconnected: isconnected,
        tarjan: tarjan,
        prim: prim,
        kruskal: kruskal,
        tspBranchAndBound: tspBranchAndBound,
        getEulerCircuit: getEulerCircuit,
        isDirectedEulerGraph: isDirectedEulerGraph,
        isUndirectedEulerGraph: isUndirectedEulerGraph,
        sort: sort,
        math: math,
    };

    exports.default = index;
    exports.LinkList = LinkList;
    exports.DoubleLinkList = DoubleLinkList;
    exports.CycleLinkList = CycleLinkList;
    exports.DoubleCycleLinkList = DoubleLinkListCycle;
    exports.Stack = Stack;
    exports.Queue = Queue;
    exports.SkipList = SkipList;
    exports.Heap = Heap;
    exports.MaxHeap = MaxHeap;
    exports.MinHeap = MinHeap;
    exports.BinomialHeap = BinomialHeap;
    exports.LeftistTree = LeftistTree;
    exports.PriorityQueue = PriorityQueue;
    exports.ArraySet = ArraySet;
    exports.HashTable = HashTable;
    exports.HashMap = HashMap;
    exports.HashSet = HashSet;
    exports.TreeMap = TreeMap;
    exports.TreeSet = TreeSet;
    exports.BasicBinaryTree = BasicBinaryTree;
    exports.BasicBinaryTreeNode = BasicBinaryTreeNode;
    exports.BinarySearchTree = BinarySearchTree;
    exports.AvlTree = AvlTree;
    exports.RedBlackTree = RedBlackTree;
    exports.FenwickTree = FenwickTree;
    exports.HuffmanTree = HuffmanTree;
    exports.HuffmanTreeBuilder = HuffmanTreeBuilder;
    exports.binarySearch = binarySearch;
    exports.kmp = kmp;
    exports.lcs = lcs;
    exports.lcstr = lcstr;
    exports.lcstropt = lcstropt;
    exports.levenshteinDistance = levenshteinDistance;
    exports.dpMaxSubArray = dpMaxSubArray;
    exports.maxSubArray = maxSubArray;
    exports.minAndMax = minAndMax;
    exports.Graph = Graph;
    exports.GraphVertex = GraphVertex;
    exports.GraphEdge = GraphEdge;
    exports.breadthFirstSearch = breadthFirstSearch;
    exports.depthFirstSearch = depthFirstSearch;
    exports.dijkstra = dijkstra;
    exports.bellmanFord = bellmanFord;
    exports.floydWarshall = floydWarshall;
    exports.isconnected = isconnected;
    exports.tarjan = tarjan;
    exports.prim = prim;
    exports.kruskal = kruskal;
    exports.tspBranchAndBound = tspBranchAndBound;
    exports.getEulerCircuit = getEulerCircuit;
    exports.isDirectedEulerGraph = isDirectedEulerGraph;
    exports.isUndirectedEulerGraph = isUndirectedEulerGraph;
    exports.sort = sort;
    exports.math = math;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
