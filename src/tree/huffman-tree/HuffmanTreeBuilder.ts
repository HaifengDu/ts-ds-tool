import { HuffmanTree } from "./HuffmanTree";

export class HuffmanTreeBuilder{
    static buildTree(table: Array<[string, number]>){
        return new HuffmanTree(table);
    }

    static encode(tree: HuffmanTree, text: string){
        // string --> bit
        // bit --> string
        const pieces = text.split("");
        const encodeArr: Array<string> = [];
        pieces.forEach(item => {
            encodeArr.push(tree.getPath(item));
        });
        return this.bitStringToString(encodeArr.join(""));
    }

    static decode(tree: HuffmanTree, text: string){
        // string - bit
        // bit --> string
        const pieces = text.split("");
        const codes: Array<string> = [];
        const end = parseInt(pieces.pop(), 10);
        for (const element of pieces) {
            const bitStr = this.lpad8(element.charCodeAt(0).toString(2));
            codes.push(bitStr);
        }
        const nodeStr = codes.join("");
        return tree.getText(nodeStr.substr(0, nodeStr.length - end));
    }

    private static lpad8(str: string){
        const length = 8;
        while (str.length < length){
            str = "0" + str;
        }
        return str;
    }

    private static bitStringToString(bitString: string){
        const end = 8 - bitString.length % 8;
        const endArr = [];
        for (let index = 0; index < end; index++) {
            endArr.push("0");
        }
        bitString += endArr.join("");
        const encodeArr: Array<string> = [];
        for (let index = 0; index < bitString.length; index += 8) {
            encodeArr.push(String.fromCharCode(parseInt(bitString.substr(index, 8), 2)));
        }
        return encodeArr.join("") + end;
    }
}
