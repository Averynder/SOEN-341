import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import App from "./App"
import SelectSemester from "./SelectSemester"
import CourseSelectionMenu from "./CourseSelectionMenu"
import AndreApp from "./AndreApp"

class Router extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/select-semester" component={SelectSemester} />
          <Route path="/course-selection-menu" component={CourseSelectionMenu} />
          <Route path="/AndreAppTest" component={AndreApp} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router
