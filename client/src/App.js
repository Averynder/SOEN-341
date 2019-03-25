import React from "react";
import Navbar from "./components/Navbar";
import Greetings from "./components/Greetings";
import ButtonContainer from "./components/ButtonContainer";
import LoginModal from "./components/LoginModal";
import Backdrop from "./components/Backdrop";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import "./App.css";
import LinkBox from "./LinkBox";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clock: []
    };

    this.state = {
      isOpenStudent: false,
      isOpenTeacher: false
    };

    this.toggleStudent = this.toggleStudent.bind(this);
    this.toggleTeacher = this.toggleTeacher.bind(this);
  }
  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users =>
        this.setState({ users }, () => console.log("We got the JSON " + users))
      )
      .then(() => {
        document.getElementById(
          "currentTime"
        ).innerHTML = this.state.users.substring(
          10,
          this.state.users.search(/"},/)
        );
      });
  }

  getTime = () => {
    fetch("/users")
      .then(res => res.json())
      .then(users =>
        this.setState({ users }, () => console.log("We got the JSON " + users))
      )
      .then(() => {
        document.getElementById(
          "currentTime"
        ).innerHTML = this.state.users.substring(
          10,
          this.state.users.search(/"},/)
        );
      });
  };

  toggleStudent() {
    this.setState({
      isOpenStudent: !this.state.isOpenStudent
    });
  }

  toggleTeacher() {
    this.setState({
      isOpenTeacher: !this.state.isOpenTeacher
    });
  }

  render() {
    return (
      <div className="bckgrnd container">
        <Navbar />
        <Greetings>
          <Button text="Refresh Time" onClick={this.getTime} />
        </Greetings>
        <ButtonContainer>
          <Button text="I am a Student" onClick={this.toggleStudent} />
          <Link to="/build-seq-or-sem">
            <Button text="No Login" />
          </Link>
        </ButtonContainer>

        <Backdrop show={this.state.isOpenStudent} onClose={this.toggleStudent}>
          <LoginModal
            show={this.state.isOpenStudent}
            onClose={this.toggleStudent}
            userType="Student"
            link="/previous-courses-taken"
          />
        </Backdrop>

        <Backdrop show={this.state.isOpenTeacher} onClose={this.toggleTeacher}>
          <LoginModal
            show={this.state.isOpenTeacher}
            onClose={this.toggleTeacher}
            userType="Teacher"
            link="/pull-previous-courses"
          />
        </Backdrop>
        <LinkBox />
      </div>
    );
  }
}

export default App;
