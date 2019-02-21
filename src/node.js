class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left){
			this.left = node;
			this.left.parent = this;
			this.left.parent.left = this.left;
		}
		else if (!this.right){
			this.right = node;
			this.right.parent = this;
			this.right.parent.right = this.right;
		}
	}

	removeChild(node) {
		if (this.left == node){
			this.left.parent = null;
			this.left = null;
		}
		else if (this.right == node){
			this.right.parent = null;
			this.right = null;
		}
		else {
			throw new Error("Parent is childless");
		}
		
	}

	remove() {
		if (!this.parent) {
			// DO NOTHING
		}
		else {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			// DO NOTHING
		}
		else {
			this.parent.parent = this;
			//FUNKTION IN DEVELOPMENT
		}
	}
}

module.exports = Node;
