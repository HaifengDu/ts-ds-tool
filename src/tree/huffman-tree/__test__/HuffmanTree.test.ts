import { HuffmanTree } from "../HuffmanTree";
import { HuffmanTreeBuilder } from "../HuffmanTreeBuilder";

describe("Huffman Tree", () => {
    test("create huffman tree", () => {
        const arr: Array<[string, number]> = [["a", 10], ["b", 9], ["c", 8], ["d", 7], ["e", 6], ["f", 5], ["g", 4]];
        const huffmanTree = new HuffmanTree(arr);
        expect(huffmanTree.Root.Weight).toBe(49);
        expect(huffmanTree.getWPL()).toBe(137);

        const arr2: Array<[string, number]> = [];
        let huffmanTree2 = new HuffmanTree(arr2);
        expect(huffmanTree2.getWPL()).toBe(0);
        huffmanTree2 = new HuffmanTree([["a", 1]]);
        expect(huffmanTree2.getWPL()).toBe(0);

        const obj = {
            a: 10,
            b: 9,
            c: 8,
            d: 7,
            e: 6,
            f: 5,
            g: 4,
        };
        const huffmanTree3 = new HuffmanTree(obj);
        expect(huffmanTree3.Root.Weight).toBe(49);
        expect(huffmanTree3.getWPL()).toBe(137);

        expect(() => huffmanTree3.getPath("h")).toThrow(new Error(`Not Found 'h' path`));
    });

    test("huffman encode and decode", () => {
        const arr: Array<[string, number]> = [["a", 10], ["b", 9], ["c", 8], ["d", 7], ["e", 6], ["f", 5], ["g", 4]];
        const tree = HuffmanTreeBuilder.buildTree(arr);
        const shouldEncodeStr = "aabbbcccc";
        const encodeText = HuffmanTreeBuilder.encode(tree, "aabbbcccc");
        const str = String.fromCharCode(parseInt("01011111", 2)) + String.fromCharCode(parseInt("11111110", 2))
        + String.fromCharCode(parseInt("11011011", 2)) + String.fromCharCode(parseInt("00000000", 2)) + 7;
        expect(encodeText).toBe(str);
        expect(HuffmanTreeBuilder.decode(tree, encodeText)).toBe(shouldEncodeStr);
        const str2 = "aabbccddeeffgg";
        const encodeText2 = HuffmanTreeBuilder.encode(tree, str2);
        expect(encodeText2.length).toBeLessThan(str2.length);
        expect(HuffmanTreeBuilder.decode(tree, encodeText2)).toBe(str2);
    });
});
