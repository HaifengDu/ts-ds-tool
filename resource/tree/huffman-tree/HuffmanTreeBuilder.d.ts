import { HuffmanTree } from "./HuffmanTree";
export declare class HuffmanTreeBuilder {
    static buildTree(table: Array<[string, number]>): HuffmanTree;
    static encode(tree: HuffmanTree, text: string): string;
    static decode(tree: HuffmanTree, text: string): string;
    private static lpad8;
    private static bitStringToString;
}
