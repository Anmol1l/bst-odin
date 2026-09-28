import { Tree, getRandomArray } from "./bst.js";

let tree = Tree();
console.log(tree.isBalanced());
let array = getRandomArray(5,100,200);
array.forEach((element) => {
    tree.insert(element);
})
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log("Level Order: ")
tree.levelOrderForEach((element) => {
    console.log(element);
})

console.log("Preorder: ")
tree.preOrderForEach((element) => {
    console.log(element);
})

console.log("Inorder: ")
tree.inOrderForEach((element) => {
    console.log(element);
})

console.log("Postorder: ")
tree.postOrderForEach((element) => {
    console.log(element);
})
