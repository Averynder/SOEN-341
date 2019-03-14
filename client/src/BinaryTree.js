import React, { Component } from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import Stack from "./Stack";
import MyDoublyLinkedList from "./MyDoublyLinkedList";
import Course from "./Course";

class BinaryTree extends Component
{
	constructor(props)
	{
		super(props);
		var cc1 = new Course("Operating Systems","COMP","346",4,"COMP352");
		var cc2 = new Course("Software Process'","SOEN","341",4,"COMP352","ENCS282");
		var linkedlist = new MyDoublyLinkedList();
		linkedlist.addLast(cc1);
		linkedlist.addLast(cc2);
		this.root = new BinaryTree.Node(undefined,undefined,linkedlist);
		this.possibilities = new Stack();
	}

	toString()
	{
		return ("root: " + this.root.toString2());
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="jumbotron j-greetings">
						<h1>Binary Tree</h1>
						<LoginForm/>
					</div>
				</div>
			</div>
		)
	}
}

BinaryTree["class"] = "BinaryTree";
(function (BinaryTree) {
	var Node = (function ()
	{
		function Node(parent, element, branches)
		{
			if (this.element === undefined)
				this.element = null;
			else
				this.element = element;
			if (this.parent === undefined)
				this.parent = null;
			else
				this.parent = parent;
			if (this.branches === undefined)
				this.branches = new MyDoublyLinkedList();
			else
				this.branches = branches.cloneMe();
		}
		return Node;
	}());
	BinaryTree.Node = Node;
	Node["class"] = "BinaryTree.Node";
})(BinaryTree || (BinaryTree = {}));

var test = new BinaryTree();
console.log(test.toString());

export default BinaryTree;
