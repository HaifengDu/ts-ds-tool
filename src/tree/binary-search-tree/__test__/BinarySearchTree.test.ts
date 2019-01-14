import { BinarySearchTree } from "../BinarySearchTree";

describe("BinarySearchTree test", () => {
    test("should create tree", () => {
        const tree1 = new BinarySearchTree();
        expect(tree1).toBeDefined();
        expect(tree1.Root).not.toBeDefined();

        const tree2 = new BinarySearchTree();
        tree2.insert(2);
        expect(tree2.Root.insert(null)).toBeUndefined();
        expect(tree2.Root.insert(undefined)).toBeUndefined();

        expect(tree2).toBeDefined();
        expect(tree2.Root.Value).toBe(2);
    });

    test("should insert value", () => {
        const tree = new BinarySearchTree();
        const arr = [3, 5, 1, 4, 7, 2];
        arr.forEach(item => {
            tree.insert(item);
        });
        expect(tree.getAscSeq()).toEqual([1, 2, 3, 4, 5, 7]);
    });

    test("should remove value", () => {
        const bstRootNode = new BinarySearchTree();

        expect(bstRootNode.toString()).toBe("");
        bstRootNode.insert(10);
        bstRootNode.insert(20);
        bstRootNode.insert(5);
        bstRootNode.insert(30);
        bstRootNode.insert(15);
        bstRootNode.insert(25);

        expect(bstRootNode.toString()).toBe("5,10,15,20,25,30");
        expect(bstRootNode.find(20).Left.Value).toBe(15);
        expect(bstRootNode.find(20).Right.Value).toBe(30);

        bstRootNode.remove(20);
        expect(bstRootNode.toString()).toBe("5,10,15,25,30");

        bstRootNode.remove(15);
        expect(bstRootNode.toString()).toBe("5,10,25,30");

        bstRootNode.remove(10);
        expect(bstRootNode.toString()).toBe("5,25,30");
        expect(bstRootNode.Root.Value).toBe(25);

        bstRootNode.remove(25);
        expect(bstRootNode.toString()).toBe("5,30");

        bstRootNode.remove(5);
        expect(bstRootNode.toString()).toBe("30");
        expect(bstRootNode.remove(31)).toBe(false);
        bstRootNode.remove(30);
        expect(bstRootNode.Root).toBeFalsy();
    });

    test("should check if value exists", () => {
        const bst = new BinarySearchTree();

        bst.insert(10);
        bst.insert(20);
        bst.insert(5);

        expect(bst.contains(20)).toBe(true);
        expect(bst.contains(40)).toBe(false);
    });

    test("should insert object to tree", () => {
        const bst = new BinarySearchTree<{key?: string, value: number}>("value");
        bst.insert({key: "1", value: 10});
        expect(bst.Root.findMin().Value.value).toBe(10);
        expect(bst.Root.findMax().Value.value).toBe(10);
        bst.insert({key: "2", value: 5});
        bst.insert({key: "3", value: 7});
        bst.insert({key: "4", value: 15});
        bst.insert({key: "5", value: 18});
        bst.insert({key: "6", value: 2});
        bst.insert(null);

        expect(bst.getAscSeq()).toEqual([
            {key: "6", value: 2},
            {key: "2", value: 5},
            {key: "3", value: 7},
            {key: "1", value: 10},
            {key: "4", value: 15},
            {key: "5", value: 18},
        ]);

        expect(bst.find({value: 5}).Value).toEqual({key: "2", value: 5});
        expect(bst.remove({value: 15})).toBe(true);
        expect(bst.find({value: 18}).Left).toBeFalsy();
        expect(bst.find({value: 18}).Right).toBeFalsy();
        expect(bst.Root.findMin().Value.value).toBe(2);
        expect(bst.Root.findMax().Value.value).toBe(18);
        expect(bst.remove({value: 7})).toBe(true);
        expect(bst.remove({value: 5})).toBe(true);
        expect(bst.remove({value: 2})).toBe(true);
        expect(bst.remove({value: 10})).toBe(true);
        expect(bst.getAscSeq()).toEqual([{key: "5", value: 18}]);
    });
});
