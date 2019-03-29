import React, {Component} from "react"
import MyDoublyLinkedList from "./MyDoublyLinkedList";

class Stack extends React.Component
{
	constructor(props)
	{
		super(props);
		this.ll = new MyDoublyLinkedList()
	}

	size = function () {
		return this.ll.size;
	};

	isEmpty = function () {
		return this.ll.size === 0;
	};

	push = function (element)
	{
		this.ll.addFirst(element);
	};

	pop = function ()
	{
		return this.ll.removeFirst();
	};

	top = function ()
	{
		return this.ll.head;
	};

	return;
};

/*
var testMe = new Stack();
testMe.push(4);
testMe.push(7);
testMe.push(8);
testMe.push(44);
console.log(testMe.pop());
console.log(testMe.top());
testMe.pop();
testMe.pop();
console.log("Top");
console.log(testMe.top());
*/
export default Stack;
