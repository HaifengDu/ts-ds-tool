import { SkipListNode } from "./SkipListNode";

export class SkipList<T>{
    private level = 0;
    private count = 0;
    private head: SkipListNode<T>;
    constructor(private compareKey?: keyof T){
        this.head = new SkipListNode();
    }

    public get Level(){
        return this.level;
    }

    public get Count(){
        return this.count;
    }

    public get Head(){
        return this.head;
    }

    public isEmpty(){
        return this.count === 0;
    }

    private randomLevel(){
        let k = 0;
        let random = parseInt((Math.random() * 10).toString(), 10);
        while (random % 2 === 0){
            k++;
            random = parseInt((Math.random() * 10).toString(), 10);
        }
        return k > this.level ? this.level : k;
    }

    public findNode(item: any): SkipListNode<T>{
        let result: SkipListNode<T> = null;
        let temp = this.head;
        for (let i = this.level - 1; i >= 0; i--){
            while (temp.getNext(i) && this.compare(temp.getNext(i).getItem() , item)){
                temp = temp.getNext(i);
            }
        }
        if (temp.getNext(0) && temp.getNext(0).getItem() === item){
            result = temp.getNext(0);
        }
        return result;
    }

    /**
     * 插入节点（注：不允许插入相同权重节点）
     * @param item
     */
    public insert(item: T){
        /**
         * 1、获取随机高度（NOTE:如果高度增加，整体跳跃表level增加1）
         * 2、循环最高层级，找到对应的当前节点大于的节点
         * 3、链接当前层节点，重复2->3步骤
         */

        const updateNodes = this.findUpdateNodes(item);
        if (updateNodes[0] && updateNodes[0].getNext(0) && updateNodes[0].getNext(0).getItem() === item){
            return this;
        }
        const level = this.randomLevel();
        if (level === this.level){
            updateNodes[level] = this.head;
            this.level++;
        }
        this.insertNode(new SkipListNode(item), updateNodes, level);
        this.count++;
        return this;
    }

    public remove(arg: T){
        const node = this.findNode(arg);
        if (node){
            const height = node.getHeight();
            for (let i = 0; i < height; i++){
                const prev = node.getPrev(i);
                const next = node.getNext(i);
                prev.setNext(i, next);
                if (next){
                    next.setPrev(i, prev);
                }
            }
            while (this.level && !this.head.getNext(this.level - 1)){
                this.head.deleteLastLevel();
                this.level--;
            }
            this.count--;
        }
        return this;
    }

    public getSkipTables(){
        const table = [];
        for (let index = 0; index < this.level; index++) {
            const levelTables: Array<SkipListNode<T>> = [];
            let temp = this.head;
            // tslint:disable-next-line:no-conditional-assignment
            while (temp = temp.getNext(index)){
                levelTables.push(temp);
            }
            table[index] = levelTables;
        }
        return table;
    }

    public toString(){
        const tables = this.getSkipTables();
        return tables.reverse().reduce((ori: Array<string>, item) => {
            ori.push(item.map(node => node.getItem().toString()).toString());
            return ori;
        }, []).join("\n");
    }

    private compare(a: T, b: T){
        if (this.compareKey){
            return a[this.compareKey] < b[this.compareKey];
        }
        return a < b;
    }

    private findUpdateNodes(item: T){
        const updateNodes: Array<SkipListNode<T>> = [];
        for (let i = this.level - 1; i >= 0; i--){
            let tempNode: SkipListNode<T> = this.head.getNext(i);
            let prevNode: SkipListNode<T> = null;
            while (tempNode && this.compare(tempNode.getItem() , item)){
                prevNode = tempNode;
                tempNode = tempNode.getNext(i);
            }
            // NOTE:未找到直接插入尾部
            if (tempNode){
                updateNodes[i] = tempNode.getPrev(i);
            }else{
                updateNodes[i] = prevNode;
            }
        }
        return updateNodes;
    }

    private insertNode(node: SkipListNode<T>, updateNodes: Array<SkipListNode<T>>, level: number){
        for (let i = level; i >= 0; i--){
            const nextTemp = updateNodes[i].getNext(i);
            if (nextTemp){
                nextTemp.setPrev(i, node);
                node.setNext(i, nextTemp);
            }
            updateNodes[i].setNext(i, node);
            node.setPrev(i, updateNodes[i]);
        }
    }
}
