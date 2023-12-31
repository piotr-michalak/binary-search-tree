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

    height(root = this.root) {
        if (root === null || (root.left === null && root.right === null)) return 0;

        let leftHeight = this.height(root.left) + 1;
        let rightHeight = this.height(root.right) + 1;

        return leftHeight > rightHeight ? leftHeight : rightHeight;
    }

    depth(node, root = this.root, counter = 0) {
        if (node === root) return counter;

        if (root.data > node.data) {
            return this.depth(node, root.left, counter + 1);
        } else if (root.data < node.data) {
            return this.depth(node, root.right, counter + 1);
        }
    }

    isBalanced(root = this.root) {
        let queue = [];
        queue.push(root);
        let balanced = true;

        while (queue.length > 0) {
            let node = queue.shift();

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);

            balanced = Math.abs(this.height(node.left) - this.height(node.right)) <= 1 && balanced;
        }

        return balanced;
    }

    rebalance(root = this.root) {
        const newArray = this.inorder();
        const newRoot = this.buildTree(newArray);
        this.root = newRoot;
    }
}

export default Tree;