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
    // prettyPrint(root);

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
    }

    const getSuccessor = (curr) => {
        curr = curr.right;
        while (curr !== null && curr.left !== null) curr = curr.left;
        return curr;
    }

    const delNode = (root, x) => {
        if (root === null) return root;

        if (root.value > x) root.left = delNode(root.left, x);
        else if (root.value < x) root.right = delNode(root.right, x);
        else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            const succ = getSuccessor(root);
            root.value = succ.value;
            root.right = delNode(root.right, succ.value);
        }
        return root;
    }

    return { includes, root, insert, delNode };
})();

console.log(Tree.delNode(Tree.root, 3));

prettyPrint(Tree.root);
