export declare class HuffmanTreeNode {
    private left;
    private value;
    readonly Value: string;
    Left: HuffmanTreeNode;
    private right;
    Right: HuffmanTreeNode;
    private weight;
    readonly Weight: number;
    isLeaf(): boolean;
    constructor(value: string, weight: number);
}
