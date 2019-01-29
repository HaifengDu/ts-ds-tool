import { Collection } from "../Collection";
import LinkList from "../linklist/LinkList";
import { LinkNode } from "../linklist/LinkNode";

export class Queue<T> extends Collection<LinkNode<T>>{
    private linkList: LinkList<T>;
    constructor(){
        super();
        this.linkList = new LinkList();
    }

    /**
     * 是否为空队列
     * @returns boolean
     */
    public isEmpty(){
        return !this.linkList.getTailNode();
    }

    /**
     * 查看头部的值
     */
    public peek(){
        if (!this.linkList.getHeadNode()){
            return null;
        }
        return this.linkList.getHeadNode().Value;
    }

    /**
     * 向队列中添加一个节点
     * @param value
     * @returns LinkNode
     */
    public enqueue(value: T){
        this.linkList.append(value);
    }

    /**
     * 推出一个队列节点
     * @returns null | LinkNode
     */
    public dequeue(){
        const head = this.linkList.shift();
        return head ? head.Value : null;
    }

    /**
     * @returns string
     */
    public toString(){
        return this.linkList.toString();
    }

    protected __iterate(fn: (item: LinkNode<T>, index: number) => void): void {
        let temp = this.linkList.getHeadNode(),
            index = 0;
        while (temp){
            fn(temp, index);
            index++;
            temp = temp.Next;
        }
    }
}
