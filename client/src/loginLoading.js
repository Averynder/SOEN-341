import React, {Componet} from "react"
import LoadingScreen from 'react-loading-screen'
import Button from "./components/Button"
import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import { renderToString } from 'react-dom/server'

class LoginLoading extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
    }
    toggleLoading(){
      this.setState({
        isLoading: !this.state.isLoading
      });
    }
  }

  render(){
    return(
      <div className="container">
        <div className="message">
          <h2> Logging in...</h2>
          <hr color="#7e1530"/>
          <LoadingScreen
            loading={this.state.isLoading}
            bgColor='#f1f1f1'
            spinnerColor='#b30000'
            textColor='#676767'
            logoSrc='https://user-images.githubusercontent.com/36492119/52869487-bdcd5180-3113-11e9-93d4-155882376646.png'
            text ='Logging in...'
          >
          </LoadingScreen>
        </div>
      </div>
    );
  }
}
