export declare class DisjointSetItem<T> {
    private value;
    private parent;
    private children;
    constructor(value: T);
    readonly Value: T;
    getKey(key?: keyof T): string;
    getRoot(): DisjointSetItem<T>;
    isRoot(): boolean;
    getRank(): number;
    getChildren(): DisjointSetItem<T>[];
    setParent(parent: DisjointSetItem<T>, forceSettingParentChild?: boolean): this;
    addChild(child: DisjointSetItem<T>): this;
}
export default DisjointSetItem;
