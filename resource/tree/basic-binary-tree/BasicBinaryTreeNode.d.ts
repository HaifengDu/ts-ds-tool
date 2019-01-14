export declare class BasicBinaryTreeNode<T> {
    private value;
    private left;
    private right;
    parent: BasicBinaryTreeNode<T>;
    constructor(value?: T);
    readonly Value: T;
    readonly Left: BasicBinaryTreeNode<T>;
    readonly Right: BasicBinaryTreeNode<T>;
    setValue(value: T): void;
    setLeft(node: BasicBinaryTreeNode<T>): this;
    setRight(node: BasicBinaryTreeNode<T>): this;
    removeChild(node: BasicBinaryTreeNode<T>): boolean;
    getHeight(): number;
    getRightHeight(): number;
    getLeftHeight(): number;
    galanceFactor(): number;
    getSibling(): BasicBinaryTreeNode<T>;
    getUncle(): BasicBinaryTreeNode<T>;
    toString(): string;
}
