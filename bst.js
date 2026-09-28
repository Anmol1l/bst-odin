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

export const Tree = () => {
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
        prettyPrint(root);
        return root;
    };

        let array = getRandomArray(10,1,100);

    // let root = buildtree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    let root = buildtree(array);

    const includesWorking = (root, value) => {
        if (root === null) return false;
        if (root.value === value) return true;
        if (root.value > value) {
            root = root.left;
            if (includesWorking(root, value)) return true;
        } else if (root.value < value) {
            root = root.right;
            if (includesWorking(root, value)) return true;
        }
        return false;
    };

    const includes = (value) => {
        return includesWorking(root, value);
    };

    const insertWorking = (root, key) => {
        if (root === null) return new Node(key);
        if (key === root.value) return root;

        if (key < root.value) root.left = insertWorking(root.left, key);
        else root.right = insertWorking(root.right, key);

        return root;
    };

    const insert = (value) => {
        return insertWorking(root, value);
    };

    const getSuccessor = (curr) => {
        curr = curr.right;
        while (curr !== null && curr.left !== null) curr = curr.left;
        return curr;
    };

    const deleteItemWorking = (root, x) => {
        if (root === null) return root;

        if (root.value > x) root.left = deleteItemWorking(root.left, x);
        else if (root.value < x) root.right = deleteItemWorking(root.right, x);
        else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            const succ = getSuccessor(root);
            root.value = succ.value;
            root.right = deleteItemWorking(root.right, succ.value);
        }
        return root;
    };

    const deleteItem = (value) => {
        return deleteItemWorking(root, value);
    };

    const levelOrderForEachWorking = (currNode, callback) => {
        let values = [];
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

    const levelOrderForEach = (callback) => {
        return levelOrderForEachWorking(root, callback);
    };

    const preOrderForEachWorking = (currNode, callback) => {
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;

        callback(currNode.value);
        preOrderForEachWorking(currNode.left, callback);
        preOrderForEachWorking(currNode.right, callback);
    };

    const preOrderForEach = (value) => {
        return preOrderForEachWorking(root, value);
    };

    const inOrderForEachWorking = (currNode, callback) => {
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;

        inOrderForEachWorking(currNode.left, callback);
        callback(currNode.value);
        inOrderForEachWorking(currNode.right, callback);
    };

    const inOrderForEach = (callback => {
        return inOrderForEachWorking(root, callback);
    })

    const postOrderForEachWorking = (currNode, callback) => {
        if (!callback) throw new Error("No callback provided");
        if (currNode == null) return;

        postOrderForEachWorking(currNode.left, callback);
        postOrderForEachWorking(currNode.right, callback);
        callback(currNode.value);
    };

    const postOrderForEach = (callback) => {
        return postOrderForEachWorking(root,callback);
    }

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

    const heightWorking = (root, value) => {
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

    const height = (value) => {
        return heightWorking(root,value);
    }

    const depthWorking = (currNode, value) => {
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

    const depth = (value) => {
        return depthWorking(root,value)
    }

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
        let values = levelOrderForEach(getValue);
        root = buildtree(values);
    };

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
};

function printTree(value) {
    console.log(value);
}

function getValue(value) {
    return value;
}

function prettyPrint(node, prefix = "", isLeft = true){
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

export function getRandomArray(length, min, max) {
    return Array.from(
        { length },
        () => Math.floor(Math.random() * (max - min + 1)) + min,
    );
}

window.Tree = Tree;
