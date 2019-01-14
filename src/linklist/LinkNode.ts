export class LinkNode<T>{
    constructor(private value: T, private next: LinkNode<T> = null){

    }

    public get Value(){
        return this.value;
    }

    public get Next(){
        return this.next;
    }

    public setValue(value: T){
        this.value = value;
    }

    public setNext(node: LinkNode<T>){
        this.next = node;
    }

    public toString(){
        return `${this.value}`;
    }
}
