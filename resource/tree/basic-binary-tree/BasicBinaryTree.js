export class BasicBinaryTree {
    static preTraversal(tree) {
        const arr = [];
        this._preTraversal(tree, item => {
            arr.push(item);
        });
        return arr;
    }
    static _preTraversal(tree, fn) {
        if (!tree) {
            return;
        }
        fn(tree.Value);
        this._preTraversal(tree.Left, fn);
        this._preTraversal(tree.Right, fn);
    }
    static inTraversal(tree) {
        const arr = [];
        this._inTraversal(tree, item => {
            arr.push(item);
        });
        return arr;
    }
    static _inTraversal(tree, fn) {
        if (!tree) {
            return;
        }
        this._inTraversal(tree.Left, fn);
        fn(tree.Value);
        this._inTraversal(tree.Right, fn);
    }
    static postOrderTraversal(tree) {
        const arr = [];
        this._postOrderTraversal(tree, item => {
            arr.push(item);
        });
        return arr;
    }
    static _postOrderTraversal(tree, fn) {
        if (!tree) {
            return;
        }
        this._postOrderTraversal(tree.Left, fn);
        this._postOrderTraversal(tree.Right, fn);
        fn(tree.Value);
    }
    static getHeight(tree) {
        if (!tree) {
            return 0;
        }
        let length = 1;
        length += Math.max(this.getHeight(tree.Left), this.getHeight(tree.Right));
        return length;
    }
}
