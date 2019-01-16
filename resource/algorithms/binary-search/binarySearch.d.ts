import { ICompareOne } from "../../interface/ICompare";
declare function binarySearch<T>(arr: Array<T>, target: T | ICompareOne<T>): number;
export { binarySearch };
