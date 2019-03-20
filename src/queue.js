const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize) {
			this.maxSize = maxSize;
		}
		else this.maxSize = 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() < this.maxSize) {
			this.heap.push(data, priority);
		}
		else throw new Error("The heap is full");
	}

	shift() {
		if (this.isEmpty()) throw new Error("The heap is empty");
		else {
			
			return this.heap.pop().data;
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return !(this.size());
	}
}

module.exports = PriorityQueue;
