import { BasicBinaryTree } from "../BasicBinaryTree";
import { BasicBinaryTreeNode } from "../BasicBinaryTreeNode";

describe("BasicBinaryTree test", () => {
    function createTree(){
        const root = new BasicBinaryTreeNode("A");
        const rootLeft = new BasicBinaryTreeNode("B");
        const rootRight = new BasicBinaryTreeNode("C");
        root.setLeft(rootLeft);
        root.setRight(rootRight);
        const rootLeftLeft = new BasicBinaryTreeNode("D");
        const rootLeftRight = new BasicBinaryTreeNode("E");
        rootLeft.setLeft(rootLeftLeft);
        rootLeft.setRight(rootLeftRight);
        const rootRightLeft = new BasicBinaryTreeNode("F");
        const rootRightRight = new BasicBinaryTreeNode("G");
        rootRight.setLeft(rootRightLeft);
        rootRight.setRight(rootRightRight);
        return root;
    }

    test("preorder traversal to binary tree", () => {
        const root = createTree();
        expect(BasicBinaryTree.preTraversal(root)).toEqual(["A", "B", "D", "E", "C", "F", "G"]);
    });

    test("inorder traversal to binary tree", () => {
        const root = createTree();
        expect(BasicBinaryTree.inTraversal(root)).toEqual(["D", "B", "E", "A", "F", "C", "G"]);
    });

    test("subsequent traversal to binary tree", () => {
        const root = createTree();
        expect(BasicBinaryTree.postOrderTraversal(root)).toEqual(["D", "E", "B", "F", "G", "C", "A"]);
    });

    test("getHeight to binary tree", () => {
        const root = createTree();
        root.Left.Left.setLeft(new BasicBinaryTreeNode("H"));
        expect(BasicBinaryTree.getHeight(root)).toBe(4);
    });

    test("getSibling to binary tree", () => {
        const root = createTree();
        expect(root.getSibling()).toBeUndefined();
        expect(root.Right.getSibling()).toBe(root.Left);
        expect(root.Left.getSibling()).toBe(root.Right);
    });

    test("delete node to tree", () => {
        const root = createTree();
        expect(root.removeChild(null)).toBe(false);
        expect(root.removeChild(undefined)).toBe(false);
        expect(root.removeChild(root.Left)).toBe(true);
        expect(root.Right.getUncle()).toBeUndefined();
        expect(root.removeChild(root.Right)).toBe(true);
        expect(root.getSibling()).toBeUndefined();
        expect(root.getUncle()).toBeUndefined();
    });
});
