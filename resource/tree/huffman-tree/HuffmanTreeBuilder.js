import { HuffmanTree } from "./HuffmanTree";
export class HuffmanTreeBuilder {
    static buildTree(table) {
        return new HuffmanTree(table);
    }
    static encode(tree, text) {
        const pieces = text.split("");
        const encodeArr = [];
        pieces.forEach(item => {
            encodeArr.push(tree.getPath(item));
        });
        return this.bitStringToString(encodeArr.join(""));
    }
    static decode(tree, text) {
        const pieces = text.split("");
        const codes = [];
        const end = parseInt(pieces.pop(), 10);
        for (const element of pieces) {
            const bitStr = this.lpad8(element.charCodeAt(0).toString(2));
            codes.push(bitStr);
        }
        const nodeStr = codes.join("");
        return tree.getText(nodeStr.substr(0, nodeStr.length - end));
    }
    static lpad8(str) {
        const length = 8;
        while (str.length < length) {
            str = "0" + str;
        }
        return str;
    }
    static bitStringToString(bitString) {
        const end = 8 - bitString.length % 8;
        const endArr = [];
        for (let index = 0; index < end; index++) {
            endArr.push("0");
        }
        bitString += endArr.join("");
        const encodeArr = [];
        for (let index = 0; index < bitString.length; index += 8) {
            encodeArr.push(String.fromCharCode(parseInt(bitString.substr(index, 8), 2)));
        }
        return encodeArr.join("") + end;
    }
}
