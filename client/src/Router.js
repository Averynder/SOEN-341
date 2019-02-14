import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import App from "./App"
import SelectSemester from "./SelectSemester"
import CourseSelectionMenu from "./CourseSelectionMenu"
import BasedOnSeq from "./BasedOnSeq"
import BuildSeqOrSem from "./BuildSeqOrSem"
import AndreLink from "./AndreLink"
import RubiatSeqLink from "./RubiatSeqLink"
import PullPreviousCourses from "./PullPreviousCourses"
import PreviousCoursesTaken from "./PreviousCoursesTaken"
import ObtainUploadedSequence from "./ObtainUploadedSequence"

class Router extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/select-semester" component={SelectSemester} />
          <Route path="/course-selection-menu" component={CourseSelectionMenu} />
          <Route path="/build-seq-or-sem" component={BuildSeqOrSem} />
          <Route path="/seq-based-confirmation" component={BasedOnSeq} />
          <Route path="/andre's-App" component={AndreLink} />
          <Route path="/rubiat-seq-table" component={RubiatSeqLink} />
          <Route path="/pull-previous-courses" component={PullPreviousCourses} />
          <Route path="/previous-courses-taken" component={PreviousCoursesTaken} />
          <Route path="/obtain-uploaded-sequence" component={ObtainUploadedSequence} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router
