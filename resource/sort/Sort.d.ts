export declare class Sort {
    static selectionSort<T>(arr: Array<T>, key?: keyof T): T[];
    static insertSort<T>(arr: Array<T>, key?: keyof T): T[];
    static bubbleSort<T>(arr: Array<T>, key?: keyof T): T[];
    static shellSort<T>(arr: Array<T>, key?: keyof T): T[];
    static mergeSort<T>(arr: Array<T>, key?: keyof T): T[];
    private static merge;
    static quickSort<T>(arr: Array<T>, key?: keyof T): T[];
    private static compare;
    private static swap;
}
