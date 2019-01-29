import { SkipListNode } from "./SkipListNode";

/**
 * 跳跃表
 */
export class SkipList<T>{
    private level = 0;
    private count = 0;
    private head: SkipListNode<T>;
    constructor(private compareKey?: keyof T){
        this.head = new SkipListNode();
    }

    /**
     * 层级
     */
    public get Level(){
        return this.level;
    }

    /**
     * 节点数
     */
    public get Count(){
        return this.count;
    }

    /**
     * 头节点
     */
    public get Head(){
        return this.head;
    }

    /**
     * 是否为空
     */
    public isEmpty(){
        return this.count === 0;
    }

    /**
     * 随机生成节点层级
     * 以2的指数级随机
     * @private
     * @returns number
     */
    private randomLevel(){
        let k = 0;
        let random = parseInt((Math.random() * 10).toString(), 10);
        while (random % 2 === 0){
            k++;
            random = parseInt((Math.random() * 10).toString(), 10);
        }
        return k > this.level ? this.level : k;
    }

    /**
     * 查找节点
     * @param item 如果存在compareKey，item为compareKey的值，否则item为T类型值
     * @returns SkipListNode<T>
     */
    public findNode(item: any): SkipListNode<T>{
        let result: SkipListNode<T> = null;
        let temp = this.head;
        // 从顶层开始向下遍历
        for (let i = this.level - 1; i >= 0; i--){
            // 从第i层当前节点向后遍历
            while (temp.getNext(i) && this.compare(temp.getNext(i).getItem() ,
            this.compareKey ? {[this.compareKey]: item} as any : item)){
                temp = temp.getNext(i);
            }
        }
        if (!temp.getNext(0)){
            return result;
        }
        let isEqual = false;
        if (this.compareKey) {
            isEqual = temp.getNext(0).getItem()[this.compareKey] === item;
        }else{
            isEqual = temp.getNext(0).getItem() === item;
        }
        if (isEqual){
            result = temp.getNext(0);
        }
        return result;
    }

    /**
     * 插入节点 不允许插入相同权重节点
     * @param item item 如果存在compareKey，item为compareKey的值，否则item为T类型值
     * @returns this
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

    /**
     * 删除
     * @param item item 如果存在compareKey，item为compareKey的值，否则item为T类型值
     */
    public remove(item: any){
        const node = this.findNode(item);
        if (node){
            // 链接删除的前节点和后节点
            const height = node.getHeight();
            for (let i = 0; i < height; i++){
                const prev = node.getPrev(i);
                const next = node.getNext(i);
                prev.setNext(i, next);
                if (next){
                    next.setPrev(i, prev);
                }
            }
            // 删除顶层，降级
            while (this.level && !this.head.getNext(this.level - 1)){
                this.head.deleteLastLevel();
                this.level--;
            }
            this.count--;
        }
        return this;
    }

    /**
     * 获取跳表数据表  根据层级展示为二维数组
     * @returns [][]
     */
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

    /**
     * 根据插入的节点查找需要更新的节点
     * @param item 插入的节点
     * @returns SkipListNode<T>[]
     */
    private findUpdateNodes(item: T){
        const updateNodes: Array<SkipListNode<T>> = [];
        // 从顶层向下查找，直到找到大于item的节点
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

    /**
     * 在需要更新的节点尾部插入节点
     * @param node 被插入的节点
     * @param updateNodes 需要更新的节点数组
     * @param level 层级
     */
    private insertNode(node: SkipListNode<T>, updateNodes: Array<SkipListNode<T>>, level: number){
        // 从当前层级向下更新被插入的节点
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
