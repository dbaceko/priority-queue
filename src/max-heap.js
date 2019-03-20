const Node = require('./node');

class MaxHeap {
	constructor() {
		this.parentNodes = [];
      	this.root = null;
	}

	push(data, priority) {
		const newPushNode = new Node(data, priority);
		this.shiftNodeUp(newPushNode);
		this.insertNode(newPushNode);
	}

	pop() {
		if (this.root === null) {
			return;
		}
		else {
			const tmpRoot = this.root;
			this.restoreRootFromLastInsertedNode(this.detachRoot());
			if (this.root) {
				this.shiftNodeDown(this.root);
			}
			return tmpRoot;
		}
	}

	detachRoot() {
		if (this.parentNodes.indexOf(this.root) != -1) {
			this.parentNodes.splice(this.parentNodes.indexOf(this.root), 1);
		}
		const detRoot = this.root;
		this.root = null;
		return detRoot;
	}




	restoreRootFromLastInsertedNode(detached) {
		const lastNode = this.parentNodes.pop();
		if (lastNode && detached) {
			if (lastNode.parent) {
				if (lastNode.parent.right === lastNode 
					&& lastNode.parent !== detached) {
						this.parentNodes.unshift(lastNode.parent);
				}
				lastNode.parent.removeChild(lastNode);
			}
			lastNode.left = detached.left;
			lastNode.right = detached.right;
			if (lastNode.left) {
				lastNode.left.parent = lastNode;
			}
			if (lastNode.right) {
				lastNode.right.parent = lastNode;
			}
			if (!detached.left) {
				this.parentNodes.unshift(lastNode);
			}
			this.root = lastNode;
		}
	}


	size() {
		let sizeOf = 0;
		sizeIt (this.root);
		function sizeIt (thisNode){
			if ((sizeOf === 0)&&(thisNode)) {
				sizeOf++;
			}
			else if (sizeOf === 0) return sizeOf;
			if (thisNode.left) {
				sizeOf++;
				sizeIt(thisNode.left);
			}
			if (thisNode.right) {
				sizeOf++;
				sizeIt(thisNode.right);
			}
			return sizeOf;
		}
		return sizeOf;
	}

	isEmpty() {
		return ((this.root === null)&&(this.parentNodes.length === 0))
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		this.root = addIntoRoot(this.root, node);
		function addIntoRoot(thisNode, newNode) {
			if (!thisNode) {
				return newNode;
			}
			if (!thisNode.left) {
				thisNode.appendChild(newNode);

			}
			else if (!thisNode.right) {
				thisNode.appendChild(newNode);

			}
			else if (!thisNode.left.right){
				thisNode.left = addIntoRoot(thisNode.left, newNode);
			}
			else if (!thisNode.right.right){
				thisNode.right = addIntoRoot(thisNode.right, newNode);
			}
			return thisNode;
		}
		if (this.size() === 0) {
			this.parentNodes.push(node);
		}
		else if ((this.size() % 2) === 0) {
			this.parentNodes.push(node);
		}
		else if ((this.size() % 2) !== 0) {
			this.parentNodes.shift();
			this.parentNodes.push(node);
		}

	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			return;
		}
		else if (node.priority > node.parent.priority) {
			const indexofNodeParent = this.parentNodes.indexOf(node.parent);
			const indexofNode = this.parentNodes.indexOf(node);
			if (indexofNode !== -1) {
				if (indexofNodeParent !== -1){
					const tmpParent = this.parentNodes[indexofNode];
					this.parentNodes[indexofNode]
					= this.parentNodes[indexofNodeParent];
					this.parentNodes[indexofNodeParent] = tmpParent;
				}
				else {
					this.parentNodes[indexofNode] = node.parent;
				}
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
			this.root = node;
		}

	}

	shiftNodeDown(node) {
		let tmpChild;
		if (node.left && ((node.priority <= node.left.priority)
			|| (node.priority <= node.left.priority))){
			if (node.right && (node.left.priority > node.right.priority)){
				tmpChild = node.left;
			}
			else if (node.right && (node.left.priority <= node.right.priority)){
				tmpChild = node.right;
			}
			else if ((node.left.priority > node.priority)){
				tmpChild = node.left;
			}
		}
		else return;
		const indexofTmpChild = this.parentNodes.indexOf(tmpChild);
		const indexofNode = this.parentNodes.indexOf(node);
		if ((indexofTmpChild !== -1)&&(indexofNode !== -1)) {
			const tmpParent = this.parentNodes[indexofNode];
			this.parentNodes[indexofNode]
			= this.parentNodes[indexofTmpChild];
			this.parentNodes[indexofTmpChild] = tmpParent;
		}
		else if (indexofTmpChild !== -1) {
			this.parentNodes[indexofTmpChild] = node;
		}
		if (node === this.root) {
			this.root = tmpChild;
		}
		tmpChild.swapWithParent();
		this.shiftNodeDown(node);
	}
}


module.exports = MaxHeap;
