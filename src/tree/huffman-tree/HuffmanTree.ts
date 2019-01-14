import { Heap } from "../../heap/Heap";
import { MinHeap } from "../../heap/MinHeap";
import { HuffmanTreeNode } from "./HuffmanTreeNode";

export class HuffmanTree{
    private root: HuffmanTreeNode;
    private traversalFlag = 0;
    private pathCache: {[index: string]: string} = {};
    public get Root(){
        return this.root;
    }
    constructor(private array: Array<[string, number]>|{[index: string]: number}){
        this.buildTree();
    }

    private buildTree(){
        const heap: Heap<HuffmanTreeNode> = new MinHeap<HuffmanTreeNode>("Weight");
        const arr: Array<{value: string, weight: number}> = [];
        if (this.array instanceof Array){
            this.array.forEach(item => {
                arr.push({value: item[0], weight: item[1]});
            });
        }else{
            // tslint:disable-next-line:forin
            for (const key in this.array) {
                const element = this.array[key];
                arr.push({value: key, weight: element});
            }
        }
        arr.forEach(item => {
            heap.add(new HuffmanTreeNode(item.value, item.weight));
        });
        let parent = null;
        for (let i = 0; i < arr.length - 1; i++){
            const last = heap.poll();
            const lastSecond = heap.poll();
            parent = new HuffmanTreeNode(null, last.Weight + lastSecond.Weight);
            parent.Left = last;
            parent.Right = lastSecond;
            heap.add(parent);
        }
        heap.clear();
        this.root = parent;
        this.createPath();
    }

    public getPath(value: string){
        const path = this.pathCache[value];
        if (!path){
            throw new Error(`Not Found '${value}' path`);
        }
        return path;
    }

    public getText(codes: string){
        const strArr: Array<string> = [];
        let node = this.root;
        for (const element of codes) {
            if (element === "0") {
                // 左走
                node = node.Left;
            }else {
                // 右走
                node = node.Right;
            }
            if (node.isLeaf()) {
                strArr.push(node.Value);
                node = this.root;
            }
        }
        return strArr.join("");
    }

    private createPath(node = this.root , path = ""){
        if (!node){
            return;
        }
        if (node.isLeaf()){
            this.pathCache[node.Value] = path;
        }else{
            this.createPath(node.Left , path + "0");
            this.createPath(node.Right , path + "1");
        }
    }

    public getWPL(){
        if (!this.root){
            return 0;
        }

        this.traversalFlag = 0;
        let sum = 0;
        this.traversal(this.root, item => {
            if (!item.Left && !item.Right){
                sum += item.Weight * this.traversalFlag;
            }
        });
        return sum;
    }

    private traversal(tree: HuffmanTreeNode, fn: (value: HuffmanTreeNode) => void){
        if (!tree){
            return;
        }
        fn(tree);
        this.traversalFlag ++;
        this.traversal(tree.Left, fn);
        this.traversal(tree.Right, fn);
        this.traversalFlag --;
    }
}
