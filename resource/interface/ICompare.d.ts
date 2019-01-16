declare type ICompare<T> = (a: T, b: T) => boolean;
declare type ICompareOne<T> = (a: T) => 0 | 1 | -1;
declare type IEqualCompare<T> = (a: T, b: T) => 0 | 1 | -1;
export { ICompare, IEqualCompare, ICompareOne };
export default ICompare;
