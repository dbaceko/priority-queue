const Node = require('./node');

class MaxHeap {
	constructor() {
		this.parentNodes = [];
      	this.root = null;
	}

	push(data, priority) {
		
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
		
	}

	isEmpty() {
		
	}

	clear() {
		throw new Error("Not ready yet");
	}

	insertNode(node) {
		
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
