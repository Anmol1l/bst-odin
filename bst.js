const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

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
    const buildtree = (array, start, end) => {
        if (start > end) return null;
        let mid = Math.trunc((start + end) / 2);
        let root = new Node(array[mid]);

        root.setLeft(buildtree(array, start, mid - 1));
        root.setRight(buildtree(array, mid + 1, end));

        return root;
    };

    const sortArray = (array) => {
        array = [...new Set(array)];
        array.sort((a, b) => a - b);
        return array;
    };

    let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    array = sortArray(array);
    let root = buildtree(sortArray(array), 0, array.length - 1);

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
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;
        let queue = [];
        queue.push(currNode);
        while (queue.length !== 0) {
            currNode = queue[0];
            callback(currNode.value);
            if (currNode.left !== null) queue.push(currNode.left);
            if (currNode.right != null) queue.push(currNode.right);
            queue.shift();
        }
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
        if (node.left === null && node.right === null) return true;
        else return false;
    };

    const findLeftHeight = (currNode) => {
        let left = 0;
        let leftPtr = currNode;
        while (!isLeaf(leftPtr)) {
            leftPtr = leftPtr.left;
            left++;
            if (leftPtr.left === null && !isLeaf(leftPtr)) {
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
            if (rightPtr.right === null && !isLeaf(rightPtr)) {
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

    return {
        includes,
        root,
        find,
        insert,
        deleteItem,
        levelOrderForEach,
        preOrderForEach,
        inOrderForEach,
        postOrderForEach,
        height,
    };
})();

prettyPrint(Tree.root);
console.log(Tree.height(Tree.root, 1));

function printTree(value) {
    console.log(value);
}
