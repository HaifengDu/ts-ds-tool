import { Collection } from "../Collection";
import { DoubleLinkNode } from "./DoubleLinkNode";
export class DoubleLinkList<T> extends Collection<DoubleLinkNode<T>> {
    private headNode: DoubleLinkNode<T> = null;
    private tailNode: DoubleLinkNode<T> = null;
    private size = 0;
    constructor() {
        super();
    }
    public get Size() {
        return this.size;
    }
    /**
     * 向链表中追加一个节点
     * @param value
     */
    public append(value: T): DoubleLinkNode<T> {
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
        const tailNode = new DoubleLinkNode(value);
        this.tailNode.setNext(tailNode);
        this.tailNode = tailNode;
        return this.headNode;
    }
    /**
     * 向头部插入一个节点
     * @param value
     */
    public prepend(value: T): DoubleLinkNode<T> {
        if (!this.headNode) {
            this.headNode = this.tailNode = new DoubleLinkNode(value);
        }else{
            const headNode = this.headNode;
            this.headNode = new DoubleLinkNode(value);
            this.headNode.setNext(headNode);
        }
        this.size++;
        return this.headNode;
    }
    private emptyList() {
        this.headNode = this.tailNode = null;
        this.size = 0;
    }

    /**
     * 清空链表
     */
    public clear(){
        this.emptyList();
    }

    /**
     * 根据条件删除节点
     * @param cb
     */
    public deleteNode(arg: any): boolean {
        let temp: DoubleLinkNode<T> = this.headNode;
        let result = false;
        let prevNode: DoubleLinkNode<T>;
        while (temp) {
            const match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
            if (match) {
                this.size--;
                result = true;
                if (temp === this.headNode) {
                    // 删除第一个节点时
                    this.headNode = temp.Next;
                }else if (temp === this.tailNode) {
                    // 删除最后一个节点时
                    prevNode.setNext(null);
                    this.tailNode = prevNode;
                }else {
                    prevNode.setNext(temp.Next);
                }
            }
            // 如果删单向循环链表最后一个节点,跳出循环
            // tslint:disable-next-line:curly
            if (temp.Next && temp.Next === this.headNode)break;
            // 如果删除节点后是空链表
            if (this.size === 0){
                this.emptyList();
                break;
            }
            prevNode = temp;
            temp = temp.Next;
        }
        return result;
    }
    /**
     * 根据条件查找节点
     * @param listNode
     */
    public findNode(arg: any): DoubleLinkNode<T> {
        let temp: DoubleLinkNode<T> = this.headNode;
        let result: DoubleLinkNode<T>;
        while (temp) {
            const match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
            if (match) {
                result = temp;
                break;
            }
            temp = temp.Next;
        }
        return result;
    }

    /**
     * 在某个节点后面插入一个节点
     * @param value
     * @param arg
     */
    public insertAfter(value: T, oriNode: DoubleLinkNode<T>){
        const newNode = new DoubleLinkNode(value);
        if (oriNode){
            const nextNode = oriNode.Next;
            if (!nextNode){
                // 如果nextNode为null，将新插入的节点设为尾节点
                this.tailNode = newNode;
            }
            newNode.setNext(nextNode);
            oriNode.setNext(newNode);
            return true;
        }
        return false;
    }

    /**
     * 获取头结点
     */
    public getHeadNode(): DoubleLinkNode<T> {
        return this.headNode;
    }
    /**
     * 获取尾节点
     */
    public getTailNode(): DoubleLinkNode<T> {
        return this.tailNode;
    }
    /**
     * 推出头节点
     */
    public shift(): DoubleLinkNode<T> {
        if (this.size === 0) {
            return null;
        }else if (this.size === 1) {
            this.tailNode = null;
        }
        const temp: DoubleLinkNode<T> = this.headNode;
        this.headNode = temp.Next;
        this.size--;
        return temp;
    }
    /**
     * 推出尾节点
     */
    public pop(): DoubleLinkNode<T> {
        let temp: DoubleLinkNode<T> = this.headNode;
        let result: DoubleLinkNode<T>;
        let prevNode: DoubleLinkNode<T>;
        if (this.size === 0) {
            return null;
        }else if (this.size === 1) {
            result = this.headNode;
            this.emptyList();
        }else {
            while (temp) {
                if (!temp.Next) {
                    result = temp;
                    this.tailNode = prevNode;
                    prevNode.setNext(null);
                    break;
                }
                prevNode = temp;
                temp = temp.Next;
            }
            this.size--;
        }
        return result;
    }

    protected __iterate(fn: (item: DoubleLinkNode<T>, index: number) => void): void {
        let temp = this.headNode, index = 0;
        while (temp) {
            fn(temp, index);
            index++;
            const nextNode = temp.Next;
            // tslint:disable-next-line:curly
            if (!nextNode || nextNode === this.headNode)break;
            temp = nextNode;
        }
    }

    public toString() {
        return this.toArray().map(node => node.toString()).toString();
    }

    public static fromArray<K>(arr: Array<K>): DoubleLinkList<K> {
        if (!arr) {
            return new DoubleLinkList<K>();
        }
        const linkList = new DoubleLinkList<K>();
        arr.forEach(item => {
            linkList.append(item);
        });
        return linkList;
    }
}

export default DoubleLinkList;
