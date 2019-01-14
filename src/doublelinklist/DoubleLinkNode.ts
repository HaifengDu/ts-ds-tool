export class DoubleLinkNode<T>{
    constructor(private value: T, private next: DoubleLinkNode<T> = null, private prev: DoubleLinkNode<T> = null){

    }

    public get Value(){
        return this.value;
    }

    public get Next(){
        return this.next;
    }

    public get Prev(){
        return this.prev;
    }

    public setValue(value: T){
        this.value = value;
    }

    public setNext(node: DoubleLinkNode<T>){
        this.next = node;
        if (node){
            node.prev = this;
        }
    }

    public toString(){
        return `${this.value}`;
    }
}
