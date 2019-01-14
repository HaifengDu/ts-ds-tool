import {DoubleLinkListNode} from "../doublelinklist/ZKDoubleLinkListNode";
import { IEnumerable } from "../interface/IEnumerable";
import { IEnumerator } from "../interface/IEnumerator";
export class DoubleLinkListCycle<T> implements IEnumerable<T>{

    private headNode: DoubleLinkListNode<T> = null;
    private tailNode: DoubleLinkListNode<T> = null;
    private size = 0;
    constructor() {
        // super();
    }

    public get Size(){
        return this.size;
    }

    /**
     * 向链表中追加一个节点
     * @param node
     */
    public append(node: T){
        const currentNode = new DoubleLinkListNode(node);
        if (!this.tailNode){
            this.headNode = this.tailNode = currentNode;
            this.headNode.setNext(this.tailNode);
            this.tailNode.setPre(this.headNode);
        }else{
            currentNode.setPre(this.tailNode);
            currentNode.setNext(this.headNode);
            this.tailNode.setNext(currentNode);
            this.headNode.setPre(currentNode);
            this.tailNode = currentNode;

        }
        this.size++;
        return this;
    }
    /**
     * 向头部插入一个节点
     * @param node
     */
    public prepend(node: T){
        const currentNode = new DoubleLinkListNode(node);
        if (!this.headNode){
            this.headNode = this.tailNode = currentNode;
            this.headNode.setNext(this.tailNode);
            this.tailNode.setPre(this.headNode);
        }else{
            this.headNode.setPre(currentNode);
            currentNode.setNext(this.headNode);
            currentNode.setPre(this.tailNode);
            this.tailNode.setNext(currentNode);
            this.headNode = currentNode;
        }
        this.size++;
        return this;
    }
    /**
     * 清空所有节点
     *
     */
    private emptyList(){
        this.headNode = this.tailNode = null;
        this.size = 0;
    }

    /**
     * 推出头节点
     */
    public shift(): DoubleLinkListNode<T>{
        const result = this.headNode;
        if (this.headNode === this.tailNode){
            this.emptyList();
        }else{
            this.headNode = this.headNode.next;
            this.headNode.setPre(this.tailNode);
            this.size--;
        }
        return result;
   }

    /**
     * 推出尾节点
     */
    public pop(): DoubleLinkListNode<T>{
        const result = this.tailNode;
        if (this.headNode === this.tailNode){
            this.emptyList();
        }else{
            this.tailNode = this.tailNode.Prev;
            this.tailNode.setNext(this.headNode);
            this.size--;
        }
        return result;
    }

    /**
     * 根据条件删除节点
     * @param arg
     */
    public deleteNode(arg: ((item: T) => boolean)|T){
        const deleteArr: Array<number> = [];
        if (this.isEmpty()){
            return deleteArr;
        }
        let cycleNode: DoubleLinkListNode<T> = this.headNode;
        let index = 0;
        while (cycleNode){
            const match = typeof arg === "function" ? arg(cycleNode.value) : (cycleNode.value === arg);
            let deleteNode: DoubleLinkListNode<T> = null;
            if (match){
                if (this.headNode === this.tailNode){
                    this.emptyList();
                    break;
                }else{
                    cycleNode.Prev.setNext(cycleNode.Next);
                    cycleNode.Next.setPre(cycleNode.Prev);
                }
                deleteNode = cycleNode;
                deleteArr.push(index);
            }

            cycleNode = cycleNode.Next;

            const shouldBreak = cycleNode === this.headNode;

            if (deleteNode){
                if (deleteNode === this.headNode){
                    this.headNode = deleteNode.Next;
                }
                if (deleteNode === this.tailNode){
                    this.tailNode = deleteNode.Prev;
                }

                deleteNode.setNext(null);
                deleteNode.setPre(null);
            }

            if (shouldBreak){
                break;
            }
            index++;
        }
    }

//     /**
//      * 根据条件查找节点
//      * @param cb
//      */
    public findNode(arg: ((item: T) => boolean)|T): DoubleLinkListNode<T>{
        let cycleNode: DoubleLinkListNode<T> = this.headNode;
        let result: DoubleLinkListNode<T> = null;
        while (cycleNode){
            const match = typeof arg === "function" ? arg(cycleNode.value) : (cycleNode.value === arg);
            if (match){
                result = cycleNode;
                break;
            }else if (cycleNode === this.tailNode){
                break;
            }
            cycleNode = cycleNode.Next;
        }
        return result;
    }

//    /**
//      * 获取头结点
//      */
    public getHeadNode(): DoubleLinkListNode<T>{
        return this.headNode;
    }

//     /**
//      * 获取尾节点
//      */
    public getTailNode(): DoubleLinkListNode<T>{
        return this.tailNode;
    }

    public isEmpty(): boolean{
        return !this.Size;
    }
    public toString(){
        let temp = this.headNode;
        const arr: Array<DoubleLinkListNode<T>> = [];
        while (temp){
            arr.push(temp);
            temp = temp.Next;
            if (temp === this.headNode){
                break;
            }
        }
        return arr.toString();
    }

    getEnumerator(): IEnumerator<T> {
        let temp = this.getHeadNode();
        const enumerator = {
            next: () => {
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
    }
}

export default DoubleLinkListCycle;
