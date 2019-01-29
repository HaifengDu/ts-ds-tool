import { Collection } from "../Collection";
import CycleLinkList from "../cyclelinklist/CycleLinkList";
import DoubleLinkList from "../doublelinklist/DoubleLinkList";
import { LinkNode } from "./LinkNode";

export class LinkList<T> extends Collection<LinkNode<T>> {
    private headNode: LinkNode<T> = null;
    private tailNode: LinkNode<T> = null;
    private size = 0;
    constructor() {
        super();
    }

    public get Size(){
        return this.size;
    }

    /**
     * 向链表中追加一个节点
     * @param value value为节点的值
     * @returns LinkNode
     */
    public append(value: T): LinkNode<T>{
        this.size++;
        // 空链表时，设置头结点及尾节点
        if (!this.headNode){
            this.headNode = this.tailNode = new LinkNode(value);
            return this.headNode;
        }
        // 只有一个节点时
        if (this.headNode === this.tailNode){
            this.tailNode = new LinkNode(value);
            this.headNode.setNext(this.tailNode);
            return this.headNode;
        }
        const tailNode = new LinkNode(value);
        this.tailNode.setNext(tailNode);
        this.tailNode = tailNode;
        return this.headNode;
    }

    /**
     * 向头部插入一个节点
     * @param value value为节点的值
     * @returns LinkNode
     */
    public prepend(value: T): LinkNode<T>{
        // 空链表时
        if (!this.headNode){
            this.headNode = this.tailNode = new LinkNode(value);
        }else{
            this.headNode = new LinkNode(value, this.headNode);
        }
        this.size++;
        return this.headNode;
    }

    private emptyList(){
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
     * @param arg 如果arg是function，则调用arg，将当前节点value传入，否则将arg与当前节点value对比
     * @returns boolean
     */
    public deleteNode(arg: any): boolean{
        let temp: LinkNode<T> = this.headNode;
        let result = false;
        let prevNode: LinkNode<T>;
        while (temp){
            const match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
            if (match){
                this.size--;
                result = true;
                // 删除第一个节点时
                if (temp === this.headNode){
                    this.headNode = temp.Next;
                }else if (temp === this.tailNode){
                    // 删除最后一个节点时
                    prevNode.setNext(null);
                    this.tailNode = prevNode;
                }else{
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
     * @param 如果arg是function，则调用arg，将当前节点value传入，否则将arg与当前节点value对比
     * @returns LinkNode
     */
    public findNode(arg: any): LinkNode<T>{
        let temp: LinkNode<T> = this.headNode;
        let result: LinkNode<T>;
        while (temp){
            const match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
            if (match){
                result = temp;
                break;
            }
            temp = temp.Next;
        }
        return result;
    }

    /**
     * 在某个节点后面插入一个节点
     * @param value 要插入的节点值
     * @param oriNode 在该节点后插入新节点
     * @returns boolean
     */
    public insertAfter(value: T, oriNode: LinkNode<T>): boolean{
        const newNode = new LinkNode(value);
        if (oriNode){
            const nextNode = oriNode.Next;
            // 在尾节点后插入新节点
            if (!nextNode || nextNode === this.headNode){
                this.tailNode = newNode;
            }
            newNode.setNext(nextNode);
            oriNode.setNext(newNode);
            this.size++;
            return true;
        }
        return false;
    }

    /**
     * 获取头结点
     * @returns LinkNode
     */
    public getHeadNode(): LinkNode<T>{
        return this.headNode;
    }

    /**
     * 获取尾节点
     * @returns LinkNode
     */
    public getTailNode(): LinkNode<T>{
        return this.tailNode;
    }

    /**
     * 推出头节点
     * @returns null | LinkNode
     */
    public shift(): LinkNode<T>{
        if (this.size === 0){
            return null;
        }else if (this.size === 1){
            this.tailNode = null;
        }
        const temp: LinkNode<T> = this.headNode;
        this.headNode = temp.Next;
        this.size--;
        return temp;
    }

    /**
     * 推出尾节点
     * @returns null | LinkNode
     */
    public pop(): LinkNode<T>{
        let temp: LinkNode<T> = this.headNode;
        let result: LinkNode<T>;
        let prevNode: LinkNode<T>;
        if (this.size === 0){
            return null;
        }
        // 链表只有一个节点时
        if (this.size === 1){
            result = this.headNode;
            this.emptyList();
            return result;
        }
        // 推出尾节点
        while (temp){
            const nextNode = temp.Next;
            if (!nextNode || nextNode === this.headNode){
                result = temp;
                this.tailNode = prevNode;
                prevNode.setNext(nextNode);
                break;
            }
            prevNode = temp;
            temp = nextNode;
        }
        this.size--;
        return result;
    }

    protected __iterate(fn: (item: LinkNode<T>, index: number) => void): void {
        let temp = this.headNode,
            index = 0;
        while (temp){
            fn(temp, index);
            index++;
            const nextNode = temp.Next;
            if (!nextNode || nextNode === this.headNode){
                break;
            }
            temp = nextNode;
        }
    }

    /**
     * @returns string
     */
    public toString(){
        return this.toArray().map(node => node.toString()).toString();
    }

    /**
     * @param arr 数组转单向链表
     * @returns LinkList
     */
    public static fromArray<K>(arr: Array<K>): LinkList<K> {
        if (!arr){
            return new LinkList<K>();
        }
        const linkList = new LinkList<K>();
        arr.forEach(item => {
            linkList.append(item);
        });
        return linkList;
    }

    /**
     * @returns DoubleLinkList
     */
    public toDoubleLinkList(): DoubleLinkList<T>{
        if (!this.headNode){
            return new DoubleLinkList<T>();
        }
        const arr = this.toArray();
        const doubleListList = new DoubleLinkList<T>();
        arr.forEach(item => {
            doubleListList.append(item.Value);
        });
        return doubleListList;
    }

    /**
     * 单向链表转单向循环链表
     * @returns CycleLinkList
     */
    public toCycleLinkList(): CycleLinkList<T>{
        const cyclelinklist: CycleLinkList<T> = new CycleLinkList<T>();
        this.toArray().forEach((node: LinkNode<T>) => {
            cyclelinklist.append(node.Value);
        });
        return cyclelinklist;
    }
}

export default LinkList;
