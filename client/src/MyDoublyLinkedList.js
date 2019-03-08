// import React, {Component} from "react"

// Functioning Linked List Class

// class MyDoublyLinkedList extends Component{

// class MyDoublyLinkedList {

// }
//
// export default MyDoublyLinkedList;
//
// const list = new MyDoublyLinkedList('first');
// list.addToHead('second');
//
// console.log(new MyDoublyLinkedList('Hello!'));
//
// console.log(list);


var MyDoublyLinkedList = (function () {

    function DoublyLinkedListImpl() {
        if (this.head === undefined)
            this.head = null;
        if (this.tail === undefined)
            this.tail = null;
        if (this.size === undefined)
            this.size = 0;
        this.size = 0;
    }
    /**
     * returns the size of the linked list
     * @return
     * @return {number}
     */
    DoublyLinkedListImpl.prototype.size = function () {
        return this.size;
    };
    /**
     * return whether the list is empty or not
     * @return
     * @return {boolean}
     */
    DoublyLinkedListImpl.prototype.isEmpty = function () {
        return this.size === 0;
    };
    /**
     * adds element at the starting of the linked list
     * @param {*} element
     */
    DoublyLinkedListImpl.prototype.addFirst = function (element) {
        var tmp = new DoublyLinkedListImpl.Node(this, element, this.head, null);
        if (this.head != null) {
            this.head.prev = tmp;
        }
        this.head = tmp;
        if (this.tail == null) {
            this.tail = tmp;
        }
        this.size++;
        console.info("adding: " + element);
    };
    /**
     * adds element at the end of the linked list
     * @param {*} element
     */
    DoublyLinkedListImpl.prototype.addLast = function (element) {
        var tmp = new DoublyLinkedListImpl.Node(this, element, null, this.tail);
        if (this.tail != null) {
            this.tail.next = tmp;
        }
        this.tail = tmp;
        if (this.head == null) {
            this.head = tmp;
        }
        this.size++;
        console.info("adding: " + element);
    };

    /**
     * this method removes element from the start of the linked list
     * @return
     * @return {*}
     */
    DoublyLinkedListImpl.prototype.removeFirst = function () {
        var tmp = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        this.size--;
        console.info("deleted: " + tmp.element);
        return tmp.element;
    };
    /**
     * this method removes element from the end of the linked list
     * @return
     * @return {*}
     */
    DoublyLinkedListImpl.prototype.removeLast = function () {
        var tmp = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        this.size--;
        console.info("deleted: " + tmp.element);
        return tmp.element;
    };
    return DoublyLinkedListImpl;
}());


MyDoublyLinkedList["__class"] = "MyDoublyLinkedList";
(function (DoublyLinkedListImpl) {
    /**
     * this class keeps track of each element information
     * @author java2novice
     * @param {*} element
     * @param {MyDoublyLinkedList.Node} next
     * @param {MyDoublyLinkedList.Node} prev
     * @class
     */
    var Node = (function () {
        function Node(parent, element, next, prev) {
            this.parent = parent;
            if (this.element === undefined)
                this.element = null;
            if (this.next === undefined)
                this.next = null;
            if (this.prev === undefined)
                this.prev = null;
            this.element = element;
            this.next = next;
            this.prev = prev;
        }
        return Node;
    }());
    DoublyLinkedListImpl.Node = Node;
    Node["class"] = "MyDoublyLinkedList.Node";
})(MyDoublyLinkedList || (MyDoublyLinkedList = {}));



    var dll = new MyDoublyLinkedList();
        dll.addFirst(10);
        dll.addFirst(34);
        dll.addLast(56);
        dll.addLast(364);
        dll.removeFirst();
        dll.removeLast();

        console.log('LOL69');
        console.log(dll.size);

        dll.addFirst(100);
        console.log(dll.size);
        console.log("hey");