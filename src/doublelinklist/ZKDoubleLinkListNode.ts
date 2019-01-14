export class DoubleLinkListNode<T>{
    public next?: DoubleLinkListNode<T>;
    public pre?: DoubleLinkListNode<T>;
    constructor(public value: T){

    }

    public setNext(node: DoubleLinkListNode<T>){
        this.next = node;
    }

    public setPre(node: DoubleLinkListNode<T>){
        this.pre = node;
    }

    public get Next(){
        return this.next;
    }

    public get Prev(){
        return this.pre;
    }

    public toString(){
        return `${this.value}`;
    }
}
