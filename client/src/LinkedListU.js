// import React, {Component} from "react"

// Functioning Linked List Class, however I do suggest simply installing the package and using it.

// class LinkedListU extends Component{

class LinkedListU {

    constructor(given) {
        this.head = null;
        this.length = 0;
        this.addToHead(given);
    }

    addToHead(given) {
        const newNode = { value: given };
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }

    removeFromHead() {
        if (this.length === 0) {
            return undefined;
        }

        const value = this.head.value;
        this.head = this.head.next;
        this.length--;

        return value;
    }

    find(val) {
        let thisNode = this.head;

        while(thisNode) {
            if(thisNode.value === val) {
                return thisNode;
            }

            thisNode = thisNode.next;
        }

        return thisNode;
    }

    remove(val) {
        if(this.length === 0) {
            return undefined;
        }

        if (this.head.value === val) {
            return this.removeFromHead();
        }

        let previousNode = this.head;
        let thisNode = previousNode.next;

        while(thisNode) {
            if(thisNode.value === val) {
                break;
            }

            previousNode = thisNode;
            thisNode = thisNode.next;
        }

        if (thisNode === null) {
            return undefined;
        }

        previousNode.next = thisNode.next;
        this.length--;
        return this;
    }
}


export default LinkedListU;

const list = new LinkedListU('first');
list.addToHead('second');

console.log(new LinkedListU('Hello!'));

console.log(list);