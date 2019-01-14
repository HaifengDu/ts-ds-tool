import { IndexOutOfBoundsException } from "../../exception/IndexOutOfBoundsException";

export class FenwickTree{
    private treeArray: Array<number>;

    get TreeArray(){
        return this.treeArray;
    }
    get Count(){
        return this.treeArray.length;
    }

    constructor(private tableSize: number){
        this.treeArray = Array(tableSize + 1).fill(0);
    }

    public increase(position: number, value: number){
        if (position < 1 || position > this.tableSize){
            throw new IndexOutOfBoundsException("Position is out of allowed range");
        }
        for (let i = position; i <= this.tableSize; i += (i & -i)){
            this.treeArray[i] += value;
        }
        return this;
    }

    public query(position: number){
        if (position < 1 || position > this.tableSize) {
            throw new IndexOutOfBoundsException("Position is out of allowed range");
        }
        let sum = 0;
        for (let i = position; i > 0; i -= (i & -i)){
            sum += this.treeArray[i];
        }
        return sum;
    }

    public queryRange(start: number, end: number){
        if (start > end) {
            throw new Error("Left index can not be greater then right one");
        }
        if (start === 1){
            return this.query(end);
        }
        return this.query(end) - this.query(start - 1);
    }
}
