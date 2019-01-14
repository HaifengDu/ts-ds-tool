import { HuffmanTreeNode } from "./HuffmanTreeNode";
export declare class HuffmanTree {
    private array;
    private root;
    private traversalFlag;
    private pathCache;
    readonly Root: HuffmanTreeNode;
    constructor(array: Array<[string, number]> | {
        [index: string]: number;
    });
    private buildTree;
    getPath(value: string): string;
    getText(codes: string): string;
    private createPath;
    getWPL(): number;
    private traversal;
}
