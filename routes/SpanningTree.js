var express = require('express');
var router = express.Router();
var app = express();
const MyDoublyLinkedList = require('./MyDoublyLinkedList');
const Stack = require('./Stack');

class SpanningTree
{
	constructor(linkedlist)
	{
		this.root = new SpanningTree.Node("","","",linkedlist.cloneMe());
		//this.ll = linkedlist.cloneMe();
		this.stack = new Stack();
	}

	size()
	{
		return this.ll.size;
	};

	isEmpty()
	{
		return this.ll.size === 0;
	};

	push(element)
	{
		this.ll.addFirst(element);
	};

	pop()
	{
		return this.ll.removeFirst();
	};

	top()
	{
		return this.ll.head;
	};

};

SpanningTree["class"] = "SpanningTree";
(function (SpanningTree)
{
	var Node = (function () {
		function Node(course, year, season, branches) {
			this.course = course;
			this.year = year;
			this.season = season;
			this.branches = branches.cloneMe();
			this.valid = "TRUE";

			// Recursive Part

		}
		return Node;
	}());
	SpanningTree.Node = Node;
	Node["class"] = "SpanningTree.Node";
})(SpanningTree || (SpanningTree = {}));

var ll = new MyDoublyLinkedList();
ll.addLast("SOEN341");
ll.addLast("SOEN342");
ll.addLast("SOEN343");
var sp = new SpanningTree(ll);
console.log(sp);

module.exports = SpanningTree;
