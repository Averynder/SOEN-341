import React, {Component} from "react"
import Course from "./Course";

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

    getLast() {
        return this.tail.element;
    }

    getFirst() {
        return this.head.element;
    }

    cloneMe() {

        var newLL = new MyDoublyLinkedList();
        var current = this.head;

        // for (var i = 0; i < current.size; i++) {
        //
        //     newLL.addLast(current.element);
        //     current = current.next;
        //     newLL.size++;
        //
        // }

        while (current != null) {
            newLL.addLast(current.element);
            current = current.next;
        }

        return newLL;

    }

    size = function () {
        return this.size;
    };

    isEmpty = function () {
        return this.size === 0;
    };

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
    };

    removeAll = function()
    {
        let array1 = [];
        for (let i = 0; i < this.size; i++)
        {
            array1.push(this.head.element);
            this.head = this.head.next;
        }
        this.size = 0;
        return array1;
        //console.log(this.head.element);
        //console.log(this.head.next.element);
        //console.log(this.head.next.next.element);
    };

    addLast = function (element) {

        if (this.size > 0) {

            // for (var i = 0; i < this.size; i++) {

            let current = this.head;
            while (current !== null) {

                if (JSON.stringify(current.element) === JSON.stringify(element)) {
                    console.log("Duplicate element found! Will not be added.");
                    return
                }
                current = current.next;
            }
            // }
        }

        var tmp = new MyDoublyLinkedList.Node(this, element, null, this.tail);
        if (this.tail != null) {
            this.tail.next = tmp;
        }
        this.tail = tmp;
        if (this.head == null) {
            this.head = tmp;
        }
        this.size++;

        // node current = head;
        // node prev = null;
        // while (current != null)
        // {
        //     int curval = current.val;
        //
        //     // If current value is seen before
        //     if (hs.contains(curval)) {
        //         prev.next = current.next;
        //     } else {
        //         hs.add(curval);
        //         prev = current;
        //     }
        //     current = current.next;
        // }


    };


    remove = function(given) {

        if (this.size === 0) {
            console.log("This list is empty!")
        }

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
                return temporary.element;
            }
            temporary = temporary.next;
        }
    };


    removeFirst()
    {
        let ele = this.head.element;
        this.head = this.head.next;
        this.size--;
        return ele;

        if (this.size === 1) {
            this.size--;

            var start = this.head;
            var prev = null;
            if(start == null){
                return;
            }
            if (start.next == null){
                this.tail = null;
                this.head = null;

                return;
            }
            while (start.next != null) {
                prev = start;
                start = start.next;
            }
            prev.next = null;

            return start.element;

        }

        else if (this.size > 1) {
            var tmp = this.head;
            this.head = this.head.next;
            this.head.prev = null;
            this.size--;
            return tmp.element;
        }

        else if (this.size === 0) {
            console.log("This list is empty!")
        }
    };

    removeLast() {

        if (this.size === 1) {
            this.size--;

            var start = this.head;
            var prev = null;
            if(start == null){
                return;
            }
            if (start.next == null){
                this.tail = null;
                this.head = null;

                return;
            }
            while (start.next != null) {
                prev = start;
                start = start.next;
            }
            prev.next = null;

            return start.element;

        }



        else if (this.size > 1) {

            var tmp = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
            return tmp.element;
        }

        else if (this.size === 0) {
            console.log("This list is empty!")
        }
    };
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



// Test code

//     var testMe = new MyDoublyLinkedList();
//
//
//
//
//         testMe.addLast(56);
//         testMe.addLast(364);
// console.log("current size of linked-list: " + testMe.size);
// testMe.addLast(56);
// testMe.addLast(133);
// console.log("current size of linked-list: " + testMe.size);




//         testMe.removeFirst();
//         testMe.removeLast();
//
//         console.log('LOL69');
//         console.log(testMe.size);
//
//         testMe.addFirst(100);
//         console.log(testMe.size);
//         console.log("hey");
//
//         console.log(testMe.size);
//
//         testMe.addLast(9999);
//         console.log(testMe.size);
//
//         console.log(testMe.head);
//         console.log("after delete");
//         testMe.remove(100);
//         console.log(testMe.size);
//         console.log(testMe.head);
//
//         testMe.removeFirst();
//         console.log(testMe.tail);
//
//         testMe.removeFirst();
//         console.log(testMe.tail);
//         console.log(testMe.size);
//         testMe.removeFirst();
//
//         console.log("milestone");
//         console.log(testMe.size);
//         console.log(testMe.tail);
//         console.log(testMe.head);
//
//         testMe.addFirst(1111);
//         testMe.addFirst(2222);
//
//         console.log("milestone2");
//         console.log(testMe.tail);
//         console.log(testMe.head);
//         console.log(testMe.size);
//
//         console.log("removing the last element in the list");
//         // testMe.remove(1111);
//         console.log(testMe.size);
//         console.log(testMe.tail);
//         console.log(testMe.head);
//         // testMe.remove(2222);
//         console.log(testMe.size);
//         console.log(testMe.tail);
//         console.log(testMe.head);
//
//
// console.log("same?");

// var Course11 = new Course("lol","lol","lol","lol","lol","lol");
// var Course22 = new Course("lol","lol","lol","lol","lol","lol");
// var Course33 = new Course("lol","lol","lol","lol","lol","no");
//
//
// var eq = JSON.stringify(Course11) === JSON.stringify(Course22);
// console.log(eq);






export default MyDoublyLinkedList;
