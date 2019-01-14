export class HuffmanTreeNode{
    private left: HuffmanTreeNode;
    private value: string;
    public get Value(): string {
        return this.value;
    }
    public get Left(): HuffmanTreeNode {
        return this.left;
    }
    public set Left(value: HuffmanTreeNode) {
        this.left = value;
    }
    private right: HuffmanTreeNode;
    public get Right(): HuffmanTreeNode {
        return this.right;
    }
    public set Right(value: HuffmanTreeNode) {
        this.right = value;
    }
    private weight: number;
    public get Weight(): number {
        return this.weight;
    }

    public isLeaf(){
        return !this.Left && !this.Right;
    }

    constructor(value: string, weight: number){
        this.value = value;
        this.weight = weight;
    }
}
