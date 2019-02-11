import React from "react"
import Navbar from "./components/Navbar"
import Greetings from "./components/Greetings"
import ButtonContainer from "./components/ButtonContainer"
import Modal from "./components/Modal"
import Backdrop from "./components/Backdrop"
import './App.css';
import AndreApp from "./AndreApp"
import SequenceTable from "./SequenceTable"



class App extends React.Component{
    constructor() {
        super();

        this.state = {
            users: [],
            isOpenStudent: false,
            isOpenTeacher: false
        }

        this.toggleStudent = this.toggleStudent.bind(this);
        this.toggleTeacher = this.toggleTeacher.bind(this);
    }

    componentDidMount() {
        fetch('/users')
        .then(res => res.json())
        .then(users => this.setState({ users }));
    }

    toggleStudent(){
      this.setState({
        isOpenStudent: !this.state.isOpenStudent
      })
    }

    toggleTeacher(){
      this.setState({
        isOpenTeacher: !this.state.isOpenTeacher
      })
    }

    render(){
      return (
        <div className="bckgrnd">
          <Navbar />
          <Greetings />
        {this.state.users.map(user =>
            <div key={user.id}>{user.username}</div>
        )}
          <ButtonContainer
            studentOnClick={this.toggleStudent}
            teacherOnClick={this.toggleTeacher}
            noAccountOnClick=""
           />

          <Backdrop show={this.state.isOpenStudent} onClose={this.toggleStudent}>
            <Modal show={this.state.isOpenStudent} onClose={this.toggleStudent} userType="Student" />
          </Backdrop>

          <Backdrop show={this.state.isOpenTeacher} onClose={this.toggleTeacher}>
            <Modal show={this.state.isOpenTeacher} onClose={this.toggleTeacher} userType="Teacher" />
          </Backdrop>
          <AndreApp />
        </div>
      )
    }

}

export default App
