import React, { Component } from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import Stack from "./Stack";
import MyDoublyLinkedList from "./MyDoublyLinkedList";

class BinaryTree extends Component
{
	constructor(props)
	{
		super(props);
		this.root = null;
		this.possibilities = new Stack();
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
				this.branches = branches;
		}
		return Node;
	}());
	BinaryTree.Node = Node;
	Node["class"] = "BinaryTree.Node";
})(BinaryTree || (BinaryTree = {}));

export default BinaryTree;
