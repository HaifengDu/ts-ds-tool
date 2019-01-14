import { LeftistTree } from "../LeftistTree";

describe('LeftistTree test', () => {
    it("should make empty leftist tree" , () => {
        const tree = new LeftistTree();
        expect(tree.isEmpty()).toBe(true);
        expect(tree.Count).toBe(0);
        expect(tree.findExtremum()).toBeNull();
        expect(tree.deleteExtremum()).toBeNull();
        let tree2 = new LeftistTree((a,b) => a <= b);
        tree.merge(null);
        expect(tree.isEmpty()).toBe(true);
        expect(tree.Count).toBe(0);
        tree.merge(tree2);
        expect(tree.isEmpty()).toBe(true);
        expect(tree.Count).toBe(0);
        tree2 = new LeftistTree((a,b) => a <= b , 2);
        tree.merge(tree2);
        expect(tree.isEmpty()).toBe(false);
        expect(tree.Count).toBe(1);
    });

    it("should insert into leftist tree" , () => {
        const tree = new LeftistTree();
        const arr = [3,2,5,8,5,9,7,6];
        arr.forEach(item => tree.insert(item));
        expect(tree.findExtremum()).toBe(2);
        expect(tree.Count).toBe(arr.length);
        expect(tree.isEmpty()).toBe(false);

        const tree2 = new LeftistTree<{key:number,value:number}>((a,b) => a.key <= b.key);
        const arr2 = arr.map((item,index) => ({key:item,value:index}));
        arr2.forEach(item => tree2.insert(item));
        expect(tree2.Count).toBe(arr2.length);
        expect(tree2.isEmpty()).toBe(false);
        expect(tree2.findExtremum()).toBe(arr2[1]);
    });

    it("should delete into leftist tree" , () => {
        const tree = new LeftistTree<number>();
        const arr = [3,2,5,8,5,9,7,6];
        arr.forEach(item => tree.insert(item));
        const delArr:number[] = [];
        while(tree.Count){
            delArr.push(tree.deleteExtremum());
        }   
        expect(delArr).toEqual(arr.sort());     
        expect(tree.Count).toBe(0);
        expect(tree.isEmpty()).toBe(true);

        const tree2 = new LeftistTree<{key:number,value:number}>((a,b) => a.key <= b.key);
        const arr2 = arr.map((item,index) => ({key:item,value:index}));
        arr2.forEach(item => tree2.insert(item));        
        const delArr2:{key:number,value:number}[] = [];
        while(tree2.Count){
            delArr2.push(tree2.deleteExtremum());
        }
        expect(delArr2).toEqual(arr2.sort((a,b) => a.key <= b.key ? -1 : 1));
        expect(tree2.Count).toBe(0);
        expect(tree2.isEmpty()).toBe(true);
    });
});