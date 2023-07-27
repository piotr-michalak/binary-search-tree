import Tree from "./tree.js";
import { createRandomizedArray } from "./helpers.js";
import prettyPrint from './pretty-print.js';

function driver() {
    const array = createRandomizedArray();
    let tree = new Tree(array);

    prettyPrint(tree.root);
    console.log('====================');
    console.log(`Balanced: ${tree.isBalanced()}`);
    console.log('====================');
    console.log(tree.levelOrder());
    console.log('====================');
    console.log(tree.preorder());
    console.log('====================');
    console.log(tree.postorder());
    console.log('====================');
    console.log(tree.inorder());
    console.log('====================');
    tree.insert(120);
    tree.insert(130);
    tree.insert(140);
    console.log('====================');
    prettyPrint(tree.root);
    console.log('====================');
    console.log(`Balanced: ${tree.isBalanced()}`);
    console.log('====================');
    tree.rebalance();
    console.log('====================');
    prettyPrint(tree.root);
    console.log('====================');
    console.log(`Balanced: ${tree.isBalanced()}`);
    console.log('====================');
    console.log(tree.levelOrder());
    console.log('====================');
    console.log(tree.preorder());
    console.log('====================');
    console.log(tree.postorder());
    console.log('====================');
    console.log(tree.inorder());
    console.log('====================');
}

driver();