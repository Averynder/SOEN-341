import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import App from "./App"
import SelectSemester from "./SelectSemester"
import CourseSelectionMenu from "./CourseSelectionMenu"

class Router extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/select-semester" component={SelectSemester} />
          <Route path="/course-selection-menu" component={CourseSelectionMenu} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router
