import { LinkList } from "../linklist/LinkList";
import { BasicBinaryTree } from "../tree/basic-binary-tree/BasicBinaryTree";
import { RedBlackTree } from "../tree/red-black-tree/RedBlackTree";
import { hash, toString } from "../util";
export class TreeMap {
    constructor() {
        this.size = 0;
        this.tree = new RedBlackTree("key");
    }
    get Count() {
        return this.size;
    }
    put(key, value) {
        let link = this.get(key);
        if (link) {
            const node = link.findNode(item => item.key === key);
            if (node) {
                node.Value.value = value;
                return this;
            }
            link.append({ key, value });
            this.size++;
            return this;
        }
        this.size++;
        const hashKey = this.getHashKey(key);
        const treeNode = this.tree.insert({
            key: hashKey,
        });
        link = new LinkList();
        link.append({ key, value });
        treeNode.Value.value = link;
        return this;
    }
    get(key) {
        const hashKey = this.getHashKey(key);
        const node = this.tree.find({ key: hashKey });
        if (node) {
            return node.Value.value;
        }
        return null;
    }
    getVal(key) {
        const hashKey = this.getHashKey(key);
        const node = this.tree.find({ key: hashKey });
        if (node) {
            const link = node.Value.value;
            const val = link.findNode(item => item.key === key);
            if (!val) {
                return null;
            }
            return val.Value.value;
        }
        return null;
    }
    clear() {
        this.size = 0;
        return this.tree.clear();
    }
    remove(key) {
        const hashKey = this.getHashKey(key);
        const node = this.get(key);
        if (node) {
            const success = node.deleteNode(item => item.key === key);
            if (success) {
                this.size--;
                if (node.Size === 0) {
                    return this.tree.remove({ key: hashKey });
                }
                return true;
            }
        }
        return false;
    }
    keys() {
        return BasicBinaryTree.inTraversal(this.tree.Root)
            .map(item => item.value).reduce((ori, item) => {
            return ori.concat(item.toArray().map(node => node.Value.key));
        }, []);
    }
    values() {
        return BasicBinaryTree.inTraversal(this.tree.Root)
            .map(item => item.value).reduce((ori, item) => {
            return ori.concat(item.toArray().map(node => node.Value.value));
        }, []);
    }
    contains(key) {
        return this.tree.contains({ key });
    }
    getHashKey(key) {
        if (typeof key === "number" || typeof key === "string") {
            return key;
        }
        const hashKey = hash(toString(key));
        return hashKey;
    }
}
