import { Collection } from "../Collection";
import LinkList from "../linklist/LinkList";
import { LinkNode } from "../linklist/LinkNode";

export class Queue<T> extends Collection<LinkNode<T>>{
    private linkList: LinkList<T>;
    constructor(){
        super();
        this.linkList = new LinkList();
    }
    public isEmpty(){
        return !this.linkList.getTailNode();
    }

    public peek(){
        if (!this.linkList.getHeadNode()){
            return null;
        }
        return this.linkList.getHeadNode().Value;
    }

    public enqueue(value: T){
        this.linkList.append(value);
    }

    public dequeue(){
        const head = this.linkList.shift();
        return head ? head.Value : null;
    }

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
