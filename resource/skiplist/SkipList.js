import { SkipListNode } from "./SkipListNode";
export class SkipList {
    constructor(compareKey) {
        this.compareKey = compareKey;
        this.level = 0;
        this.count = 0;
        this.head = new SkipListNode();
    }
    get Level() {
        return this.level;
    }
    get Count() {
        return this.count;
    }
    get Head() {
        return this.head;
    }
    isEmpty() {
        return this.count === 0;
    }
    randomLevel() {
        let k = 0;
        let random = parseInt((Math.random() * 10).toString(), 10);
        while (random % 2 === 0) {
            k++;
            random = parseInt((Math.random() * 10).toString(), 10);
        }
        return k > this.level ? this.level : k;
    }
    findNode(item) {
        let result = null;
        let temp = this.head;
        for (let i = this.level - 1; i >= 0; i--) {
            while (temp.getNext(i) && this.compare(temp.getNext(i).getItem(), item)) {
                temp = temp.getNext(i);
            }
        }
        if (temp.getNext(0) && temp.getNext(0).getItem() === item) {
            result = temp.getNext(0);
        }
        return result;
    }
    insert(item) {
        const updateNodes = this.findUpdateNodes(item);
        if (updateNodes[0] && updateNodes[0].getNext(0) && updateNodes[0].getNext(0).getItem() === item) {
            return this;
        }
        const level = this.randomLevel();
        if (level === this.level) {
            updateNodes[level] = this.head;
            this.level++;
        }
        this.insertNode(new SkipListNode(item), updateNodes, level);
        this.count++;
        return this;
    }
    remove(arg) {
        const node = this.findNode(arg);
        if (node) {
            const height = node.getHeight();
            for (let i = 0; i < height; i++) {
                const prev = node.getPrev(i);
                const next = node.getNext(i);
                prev.setNext(i, next);
                if (next) {
                    next.setPrev(i, prev);
                }
            }
            while (this.level && !this.head.getNext(this.level - 1)) {
                this.head.deleteLastLevel();
                this.level--;
            }
            this.count--;
        }
        return this;
    }
    getSkipTables() {
        const table = [];
        for (let index = 0; index < this.level; index++) {
            const levelTables = [];
            let temp = this.head;
            while (temp = temp.getNext(index)) {
                levelTables.push(temp);
            }
            table[index] = levelTables;
        }
        return table;
    }
    toString() {
        const tables = this.getSkipTables();
        return tables.reverse().reduce((ori, item) => {
            ori.push(item.map(node => node.getItem().toString()).toString());
            return ori;
        }, []).join("\n");
    }
    compare(a, b) {
        if (this.compareKey) {
            return a[this.compareKey] < b[this.compareKey];
        }
        return a < b;
    }
    findUpdateNodes(item) {
        const updateNodes = [];
        for (let i = this.level - 1; i >= 0; i--) {
            let tempNode = this.head.getNext(i);
            let prevNode = null;
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
    }
    insertNode(node, updateNodes, level) {
        for (let i = level; i >= 0; i--) {
            const nextTemp = updateNodes[i].getNext(i);
            if (nextTemp) {
                nextTemp.setPrev(i, node);
                node.setNext(i, nextTemp);
            }
            updateNodes[i].setNext(i, node);
            node.setPrev(i, updateNodes[i]);
        }
    }
}
