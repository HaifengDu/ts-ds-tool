export class SkipListNode<T>{
    private next: Array<SkipListNode<T>>;
    private prev: Array<SkipListNode<T>>;
    constructor(private readonly item: T= null){
        this.next = [];
        this.prev = [];
    }

    public getItem(){
        return this.item;
    }

    public getNext(level: number){
        return this.next[level];
    }

    public setNext(level: number, node: SkipListNode<T>){
        this.next[level] = node;
    }

    public getPrev(level: number){
        return this.prev[level];
    }

    public setPrev(level: number, node: SkipListNode<T>){
        this.prev[level] = node;
    }

    public deleteLastLevel(){
        this.next.length--;
    }

    public getNextLevel(){
        return this.next.length;
    }

    public getPrevLevel(){
        return this.prev.length;
    }

    public getHeight(){
        return Math.max(this.getPrevLevel(), this.getNextLevel());
    }

    // public SetHeight(height:number)
    // {
    //     const newNext = new SkipListNode[height];
    //     const newPrev = new SkipListNode[height];
    //     const count = Math.min(this.next.length, height);
    //     for (let i = 0; i < count; i++)
    //     {
    //         newNext[i] = this.next[i];
    //         newPrev[i] = this.prev[i];
    //     }
    //     this.next = newNext;
    //     this.prev = newPrev;
    // }
}
