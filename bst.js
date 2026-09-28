const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

function sortArray(array) {
    array = [...new Set(array)];
    array.sort((a, b) => a - b);
    return array;
}

function getRandomArray(length, min, max) {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

class Node {
    constructor(root) {
        this.value = root;
        this.left = null;
        this.right = null;
    }
    setLeft(left) {
        this.left = left;
    }
    setRight(right) {
        this.right = right;
    }
}

const Tree = (() => {
    const buildtreeWorking = (array, start, end) => {
        if (start > end) return null;
        let mid = Math.trunc((start + end) / 2);
        let root = new Node(array[mid]);

        root.setLeft(buildtreeWorking(array, start, mid - 1));
        root.setRight(buildtreeWorking(array, mid + 1, end));

        return root;
    };

    const buildtree = (array) => {
        array = sortArray(array);
        let root = buildtreeWorking(array, 0, array.length - 1);
        return root;
    };

    let root = buildtree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

    const includes = (root, value) => {
        if (root === null) return false;
        if (root.value === value) return true;
        if (root.value > value) {
            root = root.left;
            if (includes(root, value)) return true;
        } else if (root.value < value) {
            root = root.right;
            if (includes(root, value)) return true;
        }
        return false;
    };

    const insert = (root, key) => {
        if (root === null) return new Node(key);
        if (key === root.value) return root;

        if (key < root.value) root.left = insert(root.left, key);
        else root.right = insert(root.right, key);

        return root;
    };

    const getSuccessor = (curr) => {
        curr = curr.right;
        while (curr !== null && curr.left !== null) curr = curr.left;
        return curr;
    };

    const deleteItem = (root, x) => {
        if (root === null) return root;

        if (root.value > x) root.left = deleteItem(root.left, x);
        else if (root.value < x) root.right = deleteItem(root.right, x);
        else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            const succ = getSuccessor(root);
            root.value = succ.value;
            root.right = deleteItem(root.right, succ.value);
        }
        return root;
    };

    const levelOrderForEach = (currNode, callback) => {
        let values = []
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;
        let queue = [];
        queue.push(currNode);
        while (queue.length !== 0) {
            currNode = queue[0];
            values.push(callback(currNode.value));
            if (currNode.left !== null) queue.push(currNode.left);
            if (currNode.right != null) queue.push(currNode.right);
            queue.shift();
        }
        return values;
    };

    const preOrderForEach = (currNode, callback) => {
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;

        callback(currNode.value);
        preOrderForEach(currNode.left, callback);
        preOrderForEach(currNode.right, callback);
    };

    const inOrderForEach = (currNode, callback) => {
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;

        inOrderForEach(currNode.left, callback);
        callback(currNode.value);
        inOrderForEach(currNode.right, callback);
    };

    const postOrderForEach = (currNode, callback) => {
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;

        postOrderForEach(currNode.left, callback);
        postOrderForEach(currNode.right, callback);
        callback(currNode.value);
    };

    const find = (root, value) => {
        if (root === null) return undefined;
        if (root.value === value) return root;
        if (root.value > value) {
            root = root.left;
            return find(root, value);
        } else if (root.value < value) {
            root = root.right;
            return find(root, value);
        }
    };

    const isLeaf = (node) => {
        if (node === null) return true;
        if (node.left === null && node.right === null) return true;
        else return false;
    };

    const findLeftHeight = (currNode) => {
        let left = 0;
        let leftPtr = currNode;
        while (!isLeaf(leftPtr)) {
            leftPtr = leftPtr.left;
            left++;
            if (leftPtr !== null && !isLeaf(leftPtr) && leftPtr.left === null) {
                leftPtr = leftPtr.right;
                left++;
            }
        }
        return left;
    };

    const findRightHeight = (currNode) => {
        let right = 0;
        let rightPtr = currNode;
        while (!isLeaf(rightPtr)) {
            rightPtr = rightPtr.right;
            right++;
            if (
                rightPtr !== null &&
                !isLeaf(rightPtr) &&
                right.right === null
            ) {
                rightPtr = rightPtr.left;
                right++;
            }
        }
        return right;
    };

    const height = (root, value) => {
        let currNode = find(root, value);
        if (currNode) {
            if (isLeaf(currNode)) return 0;
            else {
                let left = 0;
                if (currNode.left !== null) {
                    left = findLeftHeight(currNode);
                }

                let right = 0;
                if (currNode.right !== null) {
                    right = findRightHeight(currNode);
                }
                return Math.max(left, right);
            }
        } else return undefined;
    };

    const depth = (currNode, value) => {
        if (currNode.value === value) return 0;
        let depth = 0;
        while (currNode.value !== value) {
            if (currNode.value > value) {
                currNode = currNode.left;
                depth++;
                if (currNode === null) {
                    return undefined;
                }
                continue;
            }
            if (currNode.value < value) {
                currNode = currNode.right;
                depth++;
                if (currNode === null) {
                    return undefined;
                }
                continue;
            }
        }
        return depth;
    };

    const checkBalance = (node) => {
        let left = findLeftHeight(node);
        let right = findRightHeight(node);
        let diff = Math.abs(left - right);
        if (diff <= 1) return true;
        else return false;
    };

    const levelOrderForEachNode = (currNode, callback) => {
        let callbackReturn = [];
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;
        let queue = [];
        queue.push(currNode);
        while (queue.length !== 0) {
            currNode = queue[0];
            callbackReturn.push(callback(currNode));
            if (currNode.left !== null) queue.push(currNode.left);
            if (currNode.right != null) queue.push(currNode.right);
            queue.shift();
        }
        return callbackReturn;
    };

    const isBalanced = () => {
        let array = levelOrderForEachNode(root, checkBalance);
        if (array.includes(false)) return false;
        else return true;
    };

    const rebalance = () => {
        let values = [];
        values.push(levelOrderForEach(root,getValue))
        return values;
    }

    return {
        includes,
        root,
        insert,
        deleteItem,
        levelOrderForEach,
        preOrderForEach,
        inOrderForEach,
        postOrderForEach,
        height,
        depth,
        checkBalance,
        isBalanced,
        rebalance,
    };
})();

// prettyPrint(Tree.root);
// console.log(Tree.depth(Tree.root, 6345));
// Tree.insert(Tree.root,2)
// Tree.insert(Tree.root,10000)
// Tree.insert(Tree.root,20000000)
// console.log(Tree.height(Tree.root, 8));
prettyPrint(Tree.root);
console.log(Tree.isBalanced());
// console.log(Tree.levelOrderForEach(Tree.root,getValue));
console.log(Tree.rebalance());

function printTree(value) {
    console.log(value);
}

function getValue (value) {
    return value;
}