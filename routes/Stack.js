var express = require('express');
var router = express.Router();
var app = express();
const MyDoublyLinkedList = require('./MyDoublyLinkedList');

class Stack
{
	constructor()
	{
		this.ll = new MyDoublyLinkedList()
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

module.exports = Stack;
