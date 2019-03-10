import React, {Component} from "react"

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



class MyDoublyLinkedList extends Component {

    constructor(props) {
        super(props);
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
    size = function () {
        return this.size;
    };
    /**
     * return whether the list is empty or not
     * @return
     * @return {boolean}
     */
    isEmpty = function () {
        return this.size === 0;
    };
    /**
     * adds element at the starting of the linked list
     * @param {*} element
     */
    addFirst = function (element) {
        var tmp = new MyDoublyLinkedList.Node(this, element, this.head, null);
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
    addLast = function (element) {
        var tmp = new MyDoublyLinkedList.Node(this, element, null, this.tail);
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
     * Removes a given element from anywhere within the list
     * @param given element that user is searching for, in order to delete
     */
    remove = function(given) {
        var temporary = this.head;
        while(temporary != null) {
            if(temporary.element === given) {
                if(temporary === this.head && temporary === this.tail) {
                    this.head = null;
                    this.tail = null;
                } else if(temporary === this.head) {
                    this.head = this.head.next;
                    this.head.prev = null;
                } else if(temporary === this.tail) {
                    this.tail = this.tail.prev;
                    this.tail.next = null;
                } else {
                    temporary.prev.next = temporary.next;
                    temporary.next.prev = temporary.prev;
                }
                this.size--;
            }
            temporary = temporary.next;
        }
    };

    /**
     * this method removes element from the start of the linked list
     * @return
     * @return {*}
     */
    removeFirst = function () {
        var temporary = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        this.size--;
        console.info("deleted: " + temporary.element);
        return temporary.element;
    };
    /**
     * this method removes element from the end of the linked list
     * @return
     * @return {*}
     */
    removeLast = function () {
        var tmp = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        this.size--;
        console.info("deleted: " + tmp.element);
        return tmp.element;
    };
    return;
};


MyDoublyLinkedList["class"] = "MyDoublyLinkedList";
(function (MyDoublyLinkedList) {
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
    MyDoublyLinkedList.Node = Node;
    Node["class"] = "MyDoublyLinkedList.Node";
})(MyDoublyLinkedList || (MyDoublyLinkedList = {}));




    var testMe = new MyDoublyLinkedList();
        testMe.addFirst(10);
        testMe.addFirst(34);
        testMe.addLast(56);
        testMe.addLast(364);
        testMe.removeFirst();
        testMe.removeLast();

        console.log('LOL69');
        console.log(testMe.size);

        testMe.addFirst(100);
        console.log(testMe.size);
        console.log("hey");


        console.log(testMe.size);

        testMe.addLast(9999);
        console.log(testMe.size);


        console.log(testMe.head);
        console.log("after delete");
        testMe.remove(100);
        console.log(testMe.size);
        console.log(testMe.head);

export default MyDoublyLinkedList;
