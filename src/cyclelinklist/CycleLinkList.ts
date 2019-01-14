import { IEnumerable } from "../interface/IEnumerable";
import IEnumerator from "../interface/IEnumerator";
import { LinkList } from "../linklist/LinkList";
import { LinkNode } from "../linklist/LinkNode";

export class CycleLinkList<T> implements IEnumerable<T>{
    private linklist: LinkList<T>;
    constructor(){
        this.linklist = new LinkList<T>();
    }

    private setCircle(){
        this.getTailNode().setNext(this.getHeadNode());
    }

    /**
     * 获取单向循环链表的长度
     */
    public get Size(){
        return this.linklist.Size;
    }

    /**
     * 向链表中追加一个节点
     * @param value
     */
    public append(value: T): LinkNode<T>{
        const result = this.linklist.append(value);
        this.setCircle();
        return result;
    }

    /**
     * 向头部插入一个节点
     * @param value
     */
    public prepend(value: T): LinkNode<T>{
        const result = this.linklist.prepend(value);
        this.setCircle();
        return result;
    }

    /**
     * 根据条件删除节点
     * @param cb
     */
    public deleteNode(arg: ((item: T) => boolean)|T): boolean{
        const isFirstOrLast =
            this.linklist.findNode(arg) === this.getHeadNode()
            || this.linklist.findNode(arg) === this.getTailNode(),
        result = this.linklist.deleteNode(arg);
        // 如果删除头节点或尾节点
        if (isFirstOrLast){
            this.setCircle();
        }
        return result;
    }

    /**
     * 根据条件查找节点
     * @param cb
     */
    public findNode(arg: ((item: T) => boolean)|T): LinkNode<T>{
        return this.linklist.findNode(arg);
    }

    /**
     * 获取头结点
     */
    public getHeadNode(): LinkNode<T>{
        return this.linklist.getHeadNode();
    }

    /**
     * 获取尾节点
     */
    public getTailNode(): LinkNode<T>{
        return this.linklist.getTailNode();
    }

    /**
     * 推出头节点
     */
    public shift(): LinkNode<T>{
        const result =  this.linklist.shift();
        // 节点数大于0时设置头尾循环
        if (this.Size){
            this.setCircle();
        }
        return result;
    }

    /**
     * 推出尾节点
     */
    public pop(): LinkNode<T>{
        const result = this.linklist.pop();
        // 节点数大于0时设置头尾循环
        if (this.Size){
            this.setCircle();
        }
        return result;
    }

    /**
     * 在某个节点后面插入一个节点
     * @param value
     * @param arg
     */

    public insertAfter(value: T, oriNode: LinkNode<T>): boolean{
        return this.linklist.insertAfter(value, oriNode);
    }

    /**
     * 清空链表
     */
    public clear(){
        this.linklist.clear();
    }

    public toString(){
        return this.linklist.toString();
    }

    /**
     *
     * @param arr 数组转单向循环链表
     */
    public static fromArray<K>(arr: Array<K>): CycleLinkList<K>{
        if (!arr){
            return new CycleLinkList<K>();
        }
        const linkList = new CycleLinkList<K>();
        arr.forEach(item => {
            linkList.append(item);
        });
        return linkList;
    }

    public toArray(){
        return this.linklist.toArray();
    }

    getEnumerator(): IEnumerator<T> {
        let temp = this.getHeadNode();
        const enumerator = {
            next: () => {
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
    }
}

export default CycleLinkList;
