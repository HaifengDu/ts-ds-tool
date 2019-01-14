import { BasicBinaryTree } from "../../basic-binary-tree/BasicBinaryTree";
import { ENodeColor } from "../../binary-search-tree/BinarySearchTreeNode";
import { RedBlackTree } from "../RedBlackTree";

describe("RedBlackTree test", () => {
    test("insert in RedBlackTree", () => {
        const redBlackTree = new RedBlackTree();
        let addNull = redBlackTree.insert(null);
        expect(addNull).toBeUndefined();
        addNull = redBlackTree.insert(undefined);
        expect(addNull).toBeUndefined();
        const root = redBlackTree.insert(7);
        expect(root.Color).toBe(ENodeColor.Black);
        const leftLeaf = redBlackTree.insert(5);
        expect(leftLeaf.Color).toBe(ENodeColor.Red);
        redBlackTree.insert(10);
        redBlackTree.insert(4);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([4, 5, 7, 10]);
        redBlackTree.insert(2);
        // 右旋
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([2, 4, 5, 7, 10]);
        expect(redBlackTree.Root.getHeight()).toBe(2);

        const redBlackTreeTwo = new RedBlackTree();
        redBlackTreeTwo.insert(7);
        redBlackTreeTwo.insert(5);
        redBlackTreeTwo.insert(10);
        redBlackTreeTwo.insert(3);
        redBlackTreeTwo.insert(4);
        // 先左旋再右旋
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([3, 4, 5, 7, 10]);
        expect(redBlackTreeTwo.Root.getHeight()).toBe(2);

        const redBlackTreeThree = new RedBlackTree();
        redBlackTreeThree.insert(7);
        redBlackTreeThree.insert(5);
        redBlackTreeThree.insert(10);
        redBlackTreeThree.insert(15);
        redBlackTreeThree.insert(18);
        // 左旋
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([5, 7, 10, 15, 18]);
        expect(redBlackTreeThree.Root.getHeight()).toBe(2);

        const redBlackTreeFour = new RedBlackTree();
        redBlackTreeFour.insert(7);
        redBlackTreeFour.insert(5);
        redBlackTreeFour.insert(10);
        redBlackTreeFour.insert(15);
        redBlackTreeFour.insert(12);
        // 先右旋再左旋
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([5, 7, 10, 12, 15]);
        expect(redBlackTreeFour.Root.getHeight()).toBe(2);

        // 根节点变化
        const redBlackTreeFive = new RedBlackTree();
        redBlackTreeFive.insert(7);
        redBlackTreeFive.insert(15);
        redBlackTreeFive.insert(18);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFive.Root)).toEqual([7, 15, 18]);
        expect(redBlackTreeFive.Root.getHeight()).toBe(1);

        // 随机生成200个随机数
        const redBlackTreeRandom = new RedBlackTree();
        const randomArr = Array.from({length: 5000}, () => Math.floor(Math.random() * 100000));
        randomArr.forEach(item => {
            redBlackTreeRandom.insert(item);
        });
        const deRandomArr = randomArr; // Array.from(new Set(randomArr));  //去重
        deRandomArr.sort((a, b) => a - b);   // 排序
        expect(BasicBinaryTree.inTraversal(redBlackTreeRandom.Root)).toEqual(deRandomArr);
    });

    test("remove in RedBlackTree", () => {
        const redBlackTree = new RedBlackTree();
        let removeNull = redBlackTree.remove(null);
        expect(removeNull).toBe(false);
        removeNull = redBlackTree.remove(undefined);
        expect(removeNull).toBe(false);
        const removeNoExist = redBlackTree.remove(5);
        expect(removeNoExist).toBe(false);

        redBlackTree.insert(7);
        redBlackTree.insert(5);
        redBlackTree.insert(10);
        redBlackTree.insert(4);
        redBlackTree.insert(2);

        expect(redBlackTree.getSuccessor(redBlackTree.find(5))).toBe(redBlackTree.find(7));
        expect(redBlackTree.getSuccessor(null)).toBeNull();
        redBlackTree.remove(2);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([4, 5, 7, 10]);
        redBlackTree.remove(4);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([5, 7, 10]);
        expect(redBlackTree.Root.getHeight()).toBe(1);
        redBlackTree.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([5, 7]);
        redBlackTree.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([7]);
        expect(redBlackTree.Root.getHeight()).toBe(0);
        redBlackTree.remove(7);

        redBlackTree.insert(7);
        redBlackTree.insert(5);
        redBlackTree.insert(10);
        redBlackTree.insert(4);
        redBlackTree.insert(2);

        redBlackTree.remove(7);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([2, 4, 5, 10]);
        redBlackTree.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([2, 4, 10]);
        expect(redBlackTree.Root.getHeight()).toBe(1);
        redBlackTree.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([2, 4]);
        redBlackTree.remove(4);
        expect(BasicBinaryTree.inTraversal(redBlackTree.Root)).toEqual([2]);
        expect(redBlackTree.Root.getHeight()).toBe(0);
        redBlackTree.remove(2);

        const redBlackTreeTwo = new RedBlackTree();
        redBlackTreeTwo.insert(7);
        redBlackTreeTwo.insert(5);
        redBlackTreeTwo.insert(10);
        redBlackTreeTwo.insert(3);
        redBlackTreeTwo.insert(4);

        redBlackTreeTwo.remove(4);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([3, 5, 7, 10]);
        redBlackTreeTwo.remove(3);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([5, 7, 10]);
        expect(redBlackTreeTwo.Root.getHeight()).toBe(1);
        redBlackTreeTwo.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([5, 7]);
        redBlackTreeTwo.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([7]);
        expect(redBlackTreeTwo.Root.getHeight()).toBe(0);
        redBlackTreeTwo.remove(7);

        redBlackTreeTwo.insert(7);
        redBlackTreeTwo.insert(5);
        redBlackTreeTwo.insert(10);
        redBlackTreeTwo.insert(3);
        redBlackTreeTwo.insert(4);

        redBlackTreeTwo.remove(7);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([3, 4, 5, 10]);
        redBlackTreeTwo.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([3, 4, 10]);
        expect(redBlackTreeTwo.Root.getHeight()).toBe(1);
        redBlackTreeTwo.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([3, 4]);
        redBlackTreeTwo.remove(3);
        expect(BasicBinaryTree.inTraversal(redBlackTreeTwo.Root)).toEqual([4]);
        expect(redBlackTreeTwo.Root.getHeight()).toBe(0);
        redBlackTreeTwo.remove(4);

        const redBlackTreeThree = new RedBlackTree();
        redBlackTreeThree.insert(7);
        redBlackTreeThree.insert(5);
        redBlackTreeThree.insert(10);
        redBlackTreeThree.insert(15);
        redBlackTreeThree.insert(18);

        redBlackTreeThree.remove(18);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([5, 7, 10, 15]);
        redBlackTreeThree.remove(15);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([5, 7, 10]);
        expect(redBlackTreeThree.Root.getHeight()).toBe(1);
        redBlackTreeThree.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([5, 7]);
        redBlackTreeThree.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([7]);
        expect(redBlackTreeThree.Root.getHeight()).toBe(0);
        redBlackTreeThree.remove(7);

        redBlackTreeThree.insert(7);
        redBlackTreeThree.insert(5);
        redBlackTreeThree.insert(10);
        redBlackTreeThree.insert(15);
        redBlackTreeThree.insert(18);

        redBlackTreeThree.remove(7);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([5, 10, 15, 18]);
        redBlackTreeThree.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([10, 15, 18]);
        expect(redBlackTreeThree.Root.getHeight()).toBe(1);
        redBlackTreeThree.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([15, 18]);
        redBlackTreeThree.remove(15);
        expect(BasicBinaryTree.inTraversal(redBlackTreeThree.Root)).toEqual([18]);
        expect(redBlackTreeThree.Root.getHeight()).toBe(0);
        redBlackTreeThree.remove(18);

        const redBlackTreeFour = new RedBlackTree();
        redBlackTreeFour.insert(7);
        redBlackTreeFour.insert(5);
        redBlackTreeFour.insert(10);
        redBlackTreeFour.insert(15);
        redBlackTreeFour.insert(12);

        redBlackTreeFour.remove(12);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([5, 7, 10, 15]);
        redBlackTreeFour.remove(15);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([5, 7, 10]);
        expect(redBlackTreeFour.Root.getHeight()).toBe(1);
        redBlackTreeFour.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([5, 7]);
        redBlackTreeFour.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([7]);
        expect(redBlackTreeFour.Root.getHeight()).toBe(0);
        redBlackTreeFour.remove(7);

        redBlackTreeFour.insert(7);
        redBlackTreeFour.insert(5);
        redBlackTreeFour.insert(10);
        redBlackTreeFour.insert(15);
        redBlackTreeFour.insert(12);

        redBlackTreeFour.remove(7);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([5, 10, 12, 15]);
        redBlackTreeFour.remove(5);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([10, 12, 15]);
        expect(redBlackTreeFour.Root.getHeight()).toBe(1);
        redBlackTreeFour.remove(10);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([12, 15]);
        redBlackTreeFour.remove(15);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFour.Root)).toEqual([12]);
        expect(redBlackTreeFour.Root.getHeight()).toBe(0);
        redBlackTreeFour.remove(12);

        const redBlackTreeFive = new RedBlackTree();
        redBlackTreeFive.insert(7);
        redBlackTreeFive.insert(15);
        redBlackTreeFive.insert(18);

        redBlackTreeFive.remove(18);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFive.Root)).toEqual([7, 15]);
        redBlackTreeFive.remove(15);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFive.Root)).toEqual([7]);
        expect(redBlackTreeFive.Root.getHeight()).toBe(0);
        redBlackTreeFive.remove(7);

        redBlackTreeFive.insert(7);
        redBlackTreeFive.insert(15);
        redBlackTreeFive.insert(18);

        redBlackTreeFive.remove(7);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFive.Root)).toEqual([15, 18]);
        redBlackTreeFive.remove(15);
        expect(BasicBinaryTree.inTraversal(redBlackTreeFive.Root)).toEqual([18]);
        expect(redBlackTreeFive.Root.getHeight()).toBe(0);
        redBlackTreeFive.remove(18);

        // 随机生成数组然后删除
        let redBlackTreeRandom = new RedBlackTree();
        let randomArr = Array.from({length: 10000}, () => Math.floor(Math.random() * 500000));
        let deRandomArr = randomArr; // Array.from(new Set(randomArr));
        deRandomArr.sort((a, b) => a - b);
        // 顺序删除
        randomArr.forEach(item => {
            redBlackTreeRandom.insert(item);
        });
        randomArr.forEach(item => {
            redBlackTreeRandom.remove(item);
        });
        expect(redBlackTreeRandom.Root).toBeNull();
        // 倒序删除
        deRandomArr.forEach(item => {
            redBlackTreeRandom.insert(item);
        });
        randomArr.sort((a, b) => b - a);
        randomArr.forEach(item => {
            redBlackTreeRandom.remove(item);
        });

        expect(redBlackTreeRandom.Root).toBeNull();

        redBlackTreeRandom = new RedBlackTree();
        randomArr = Array.from({length: 5000}, () => Math.floor(Math.random() * 200000));
        deRandomArr = randomArr; // Array.from(new Set(randomArr));
        // deRandomArr.sort((a,b)=>{return a-b;});
        // 顺序删除
        randomArr.forEach(item => {
            redBlackTreeRandom.insert(item);
        });
        randomArr.forEach(item => {
            redBlackTreeRandom.remove(item);
        });
        expect(redBlackTreeRandom.Root).toBeNull();
        // 倒序删除
        deRandomArr.forEach(item => {
            redBlackTreeRandom.insert(item);
        });
        randomArr.sort((a, b) => b - a);
        randomArr.forEach(item => {
            redBlackTreeRandom.remove(item);
        });

        expect(redBlackTreeRandom.Root).toBeNull();
    });
    test("clear in RedBlackTree", () => {
        const redBlackTree = new RedBlackTree();
        redBlackTree.insert(7);
        redBlackTree.clear();
        expect(redBlackTree.Root).toBeNull();
    });
});
