// export class Stack {
//     private top:any;
//     private size: number;
//     constructor(){
//         this.top = null;
//         this.size = 0;
//     }
//     private push(data:any){
//         let node: any = {
//             data : data,
//             next: null
//         };
//         node.next = this.top;
//         this.top = node;
//         this.size++;
//     }
//     private peek(){
//         return this.top === null ? null : this.top.data;
//     }
//     private pop(){
//         if(this.top === null) return null;
//         let out = this.top;
//         this.top = this.top.next;
//         if(this.size>0)this.size--;
//         return out.data;
//     }
//     private clear(){
//         this.top = null;
//         this.size = 0;
//     }
//     private isEmpty(){
//         return this.top === null && this.size==0  ? true : false;
//     }
//     private getElem(i:number){
//         if(typeof i != "number")return null;
//         let p = this.top,
//             j = this.size-1;
//         while(p && j>i){
//             p = p.next;
//             j--;
//         };
//         return (!p || j<i) ? null : p.data;
//     }
//     private remove(cb:any):any{
//         let p = this.top,
//             j = this.size - 1,
//             match = false,
//             pre = null;
//         while(p && !match){
//             match = typeof cb == "function" ? cb(p) : (function(item){
//                 return item.data == cb;
//             })(p);
//             if(!match) pre = p;
//             p = p.next;
//             j--;
//         }
//         if(!match) return null;
//         if(j== this.size-2){
//             this.pop();
//         }else if(pre && pre.next){
//             pre.next = pre.next.next;
//             this.size--;
//         };
//     }
// }
import { Collection } from "../Collection";
import LinkList from "../linklist/LinkList";
import { LinkNode } from "../linklist/LinkNode";
export class Stack<T> extends Collection<LinkNode<T>> {
    private linkList: LinkList<T>;
    constructor(){
        super();
        this.linkList = new LinkList();
    }
    /**
     * 压栈
     * @param node
     */
    public push(node: T){
        return this.linkList.append(node);
    }

    /**
     * 出栈
     *
     */
    public pop(){
        return this.linkList.pop();
    }

    /**
     * 看一看
     */
    public peek(){
        if (!this.linkList.getTailNode()){
            return null;
        }
        return this.linkList.getTailNode().Value;
    }

    /**
     * 空栈
     */
    public isEmpty(){
        return !this.linkList.getTailNode();
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

    public toArray(){
        return super.toArray().reverse();
    }
}

export default Stack;
