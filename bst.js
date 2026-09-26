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

        console.log(root);
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
    prettyPrint(root);

    let currRoot = root;
    const includes = (value) => {
        if (currRoot === null) return false;
        if (currRoot.value === value) return true;
        if (currRoot.value > value) {
            currRoot = currRoot.left;
            if (includes(value)) return true;
        } else if (currRoot.value < value) {
            currRoot = currRoot.right;
            if (includes(value)) return true;
        }
        return false;
    };
    return { includes, root };
})();

console.log(Tree.includes(6345));
