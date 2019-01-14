import { LinkList } from "../linklist/LinkList";
import { BasicBinaryTree } from "../tree/basic-binary-tree/BasicBinaryTree";
import { RedBlackTree } from "../tree/red-black-tree/RedBlackTree";
import { hash, toString } from "../util";

export class TreeMap<K= string, T= any>{
    private size = 0;
    private tree: RedBlackTree<{key: number|K, value?: LinkList<{key: K, value: T}>}>;

    constructor(){
        this.tree = new RedBlackTree("key");
    }

    get Count() {
        return this.size;
    }

    put(key: K, value: T) {
        let link = this.get(key);
        if (link){
            // 判断是否在链表中存在
            const node = link.findNode(item => item.key === key);
            if (node){
                node.Value.value = value;
                return this;
            }
            link.append({key, value});
            this.size ++;
            return this;
        }
        // 先++,需要hashmod
        this.size ++;
        const hashKey = this.getHashKey(key);
        const treeNode = this.tree.insert({
            key: hashKey,
        });
        link = new LinkList<{key: K, value: T}>();
        link.append({key, value});
        treeNode.Value.value = link;
        return this;
    }

    private get(key: K) {
        const hashKey = this.getHashKey(key);
        const node = this.tree.find({key: hashKey});
        if (node){
            return node.Value.value;
        }
        return null;
    }

    getVal(key: K){
        const hashKey = this.getHashKey(key);
        const node = this.tree.find({key: hashKey});
        if (node){
            const link = node.Value.value;
            const val = link.findNode(item => item.key === key);
            if (!val){
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

    remove(key: K) {
        const hashKey = this.getHashKey(key);
        const node = this.get(key);
        if (node){
            const success = node.deleteNode(item => item.key === key);
            if (success){
                this.size --;
                if (node.Size === 0){
                    return this.tree.remove({key: hashKey});
                }
                return true;
            }
        }
        return false;
    }

    keys() {
        return BasicBinaryTree.inTraversal(this.tree.Root)
        .map(item => item.value).reduce((ori: Array<K>, item: LinkList<{key: K, value: T}>) => {
            return ori.concat(item.toArray().map(node => node.Value.key));
        }, []);
    }

    values() {
        return BasicBinaryTree.inTraversal(this.tree.Root)
        .map(item => item.value).reduce((ori: Array<T>, item: LinkList<{key: K, value: T}>) => {
            return ori.concat(item.toArray().map(node => node.Value.value));
        }, []);
    }

    contains(key: K) {
        return this.tree.contains({key});
    }

    private getHashKey(key: K): number|K{
        // 数值和字符串直接比较大小
        if (typeof key === "number" || typeof key === "string"){
            return key;
        }
        const hashKey = hash(toString(key));
        return hashKey;
    }
}
