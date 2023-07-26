import prettyPrint from './pretty-print.js';
import { handleArray } from './helpers.js';
import Node from './node.js';

class Tree {
    constructor(array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) {
        this.root = this.buildTree(handleArray(array));
    }

    root = null;

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(value, root = this.root) {
        if (root === null) {
            return new Node(value);
        }

        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    delete(value, root = this.root) {
        if (root === null) {
            return root;
        }

        if (root.data > value) {
            root.left = this.delete(value, root.left);
            return root;
        } else if (root.data < value) {
            root.right = this.delete(value, root.right);
            return root;
        }

        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        } else {
            let succParent = root;
            let succ = root.right;

            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            root.data = succ.data;

            return root;
        }
    }

    find(value, root = this.root) {
        if (root !== null) {
            if (root.data === value) return root;
            else {
                if (root.data > value) {
                    return this.find(value, root.left);
                } else if (root.data < value) {
                    return this.find(value, root.right);
                }
            }
        }

        return;
    }

    levelOrder(cb = (value) => value, root = this.root) {
        if (root === null) return;

        let queue = [];
        queue.push(root);
        let result = [];

        while (queue.length > 0) {
            let current = queue.shift();

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);

            result.push(current.data);
        }

        return result.map(cb);
    }

    inorder(root = this.root, result = [], cb = (value) => value) {
        if (root !== null) {
            this.inorder(root.left, result);
            result.push(root.data);
            this.inorder(root.right, result);
        }

        return result.map(cb);
    }

    preorder(root = this.root, result = [], cb = (value) => value) {
        if (root !== null) {
            result.push(root.data);
            this.preorder(root.left, result);
            this.preorder(root.right, result);
        }

        return result.map(cb);
    }

    postorder(root = this.root, result = [], cb = (value) => value) {
        if (root !== null) {
            this.preorder(root.left, result);
            this.preorder(root.right, result);
            result.push(root.data);
        }

        return result.map(cb);
    }
}

let root = new Tree();
root.insert(12);
prettyPrint(root.root);
console.log('====================');
root.delete(67);
prettyPrint(root.root);
console.log('====================');
console.log(root.find(4));
console.log('====================');
console.log(root.levelOrder());
console.log('====================');
console.log(root.inorder());