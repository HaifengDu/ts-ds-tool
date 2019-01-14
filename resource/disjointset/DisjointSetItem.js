export class DisjointSetItem {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.children = {};
    }
    get Value() {
        return this.value;
    }
    getKey(key) {
        if (key) {
            return this.value[key] + "";
        }
        return this.value + "";
    }
    getRoot() {
        return this.isRoot() ? this : this.parent.getRoot();
    }
    isRoot() {
        return this.parent === null;
    }
    getRank() {
        if (Object.keys(this.children).length === 0) {
            return 0;
        }
        let rank = 0;
        for (const key in this.children) {
            rank++;
            rank += this.children[key].getRank();
        }
        return rank;
    }
    getChildren() {
        const arr = [];
        for (const key in this.children) {
            arr.push(this.children[key]);
        }
        return arr;
    }
    setParent(parent, forceSettingParentChild = true) {
        this.parent = parent;
        if (forceSettingParentChild) {
            this.parent.addChild(this);
        }
        return this;
    }
    addChild(child) {
        this.children[child.getKey()] = child;
        child.setParent(this, false);
        return this;
    }
}
export default DisjointSetItem;
