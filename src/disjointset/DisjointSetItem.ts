export class DisjointSetItem<T>{
    private parent: DisjointSetItem<T>;
    private children: {[index: string]: DisjointSetItem<T>};

    constructor(private value: T){
        this.parent = null;
        this.children = {};
    }

    public get Value(){
        return this.value;
    }

    getKey(key?: keyof T){
        if (key){
            return this.value[key] + "";
        }
        return this.value + "";
    }

    getRoot(): DisjointSetItem<T>{
        return this.isRoot() ? this : this.parent.getRoot();
    }

    isRoot(){
        return this.parent === null;
    }

    getRank(){
        if (Object.keys(this.children).length === 0){
            return 0;
        }
        let rank = 0;
        // tslint:disable-next-line:forin
        for (const key in this.children){
            rank++;
            rank += this.children[key].getRank();
        }
        return rank;
    }

    getChildren(){
        const arr: Array<DisjointSetItem<T>> = [];
        // tslint:disable-next-line:forin
        for (const key in this.children){
            arr.push(this.children[key]);
        }
        return arr;
    }

    setParent(parent: DisjointSetItem<T>, forceSettingParentChild = true){
        this.parent = parent;
        if (forceSettingParentChild){
            this.parent.addChild(this);
        }
        return this;
    }

    addChild(child: DisjointSetItem<T>){
        this.children[child.getKey()] = child;
        child.setParent(this, false);
        return this;
    }
}
export default DisjointSetItem;
