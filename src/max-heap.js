const Node = require('./node');

class MaxHeap {
	constructor() {
		this.parentNodes = [];
      	this.root = null;
	}

	push(data, priority) {
		this.shiftNodeUp(new Node(data, priority));
		this.insertNode(new Node(data, priority));
	}

	pop() {
		if (this.root == null) {
			//DO NOTHING
		}
	}

	detachRoot() {
		throw new Error("Not ready yet");
	}

	restoreRootFromLastInsertedNode(detached) {
		
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
				//addParentsNodesOfLeft(newNode); 
			} 
			else if (!thisNode.right) {
				thisNode.appendChild(newNode);
				//addParentsNodesOfRight(newNode);
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
			if (!(this.size() % 2)) {
				if ((node.parent.right)) {
					this.parentNodes.pop();
					this.parentNodes.unshift(node.parent);
				}
				else {
					this.parentNodes.pop();
					this.parentNodes.unshift(node.parent.parent.right);
				}
			}
			else if ((this.size() % 2)) {
				console.log('LEFT IN DEVELOP');
				if ((node.parent.right)) {
					this.parentNodes.pop();
					this.parentNodes.unshift(node.parent);
				}
				else {
					this.parentNodes.pop();
					this.parentNodes.unshift(node.parent.parent.right);
				}
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
			this.root = node;
		}
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
