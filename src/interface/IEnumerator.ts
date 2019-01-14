export interface IEnumerator<T>{
    next(): IEnumerator<T>;
    Current: {done: boolean, value: T};
}

export default IEnumerator;
