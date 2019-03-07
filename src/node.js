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
		if (this.left === node){
			this.left.parent = null;
			this.left = null;
		}
		else if (this.right === node){
			this.right.parent = null;
			this.right = null;
		}
		else {
			throw new Error("Parent is childless");
		}
		
	}

	remove() {
		if (!this.parent) {
			return;
		}
		else {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return;
		}
		else {
			if ((this.parent.parent)
			&&(this.parent.parent.left === this.parent)) {
				this.parent.parent.left = this;
			}
			else if ((this.parent.parent)
			&&(this.parent.parent.right === this.parent)) {
				this.parent.parent.right = this;
			}
			
			if(this.left) {
				this.left.parent = this.parent;
			}
			if(this.right) {
				this.right.parent = this.parent;
			}
			let tpmleft;
			let tmpRight;
			if (this.parent.left === this ) {
				if (this.parent.right) {
					this.parent.right.parent = this;
				}
				
				tpmleft = this.left;
				this.left = this.parent;
				this.parent.left = tpmleft;

				tmpRight = this.right;
				this.right = this.parent.right;
				this.parent.right = tmpRight;
			}
			else if (this.parent.right === this ) {
				if (this.parent.left) {
					this.parent.left.parent = this;
				}
				tpmleft = this.left;
				this.left = this.parent.left;
				this.parent.left = tpmleft;

				tmpRight = this.right;
				this.right = this.parent;
				this.parent.right = tmpRight;
			}

			const grandpaNode = this.parent.parent;
			this.parent.parent = this;
			this.parent = grandpaNode;
		}
	}
}

module.exports = Node;