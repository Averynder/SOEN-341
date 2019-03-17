import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import SelectSemester from "./SelectSemester";
import CourseSelectionMenu from "./CourseSelectionMenu";
import BasedOnSeq from "./BasedOnSeq";
import BuildSeqOrSem from "./BuildSeqOrSem";
import AndreLink from "./AndreLink";
import RubiatSeqLink from "./RubiatSeqLink";
import PullPreviousCourses from "./PullPreviousCourses";
import PreviousCoursesTaken from "./PreviousCoursesTaken";
import ObtainUploadedSequence from "./ObtainUploadedSequence";
import FinalizeExportSem from "./FinalizeExportSem";
import FinalizeExportSeq from "./FinalizeExportSeq";
import DraftSequenceMenu from "./DraftSequenceMenu";
import Formalize from "./Formalize";
import pdfSequenceGenerator from "./pdfSequenceGenerator";
import BinaryTree from "./BinaryTree";
import MyDoublyLinkedList from "./MyDoublyLinkedList";
import Stack from "./Stack";
import Course from "./Course";
import ConcordiaSimilar from "./ConcordiaSimilar";
import LoadingCourses from "./LoadingCourses";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/select-semester" component={SelectSemester} />
          <Route path="/course-selection-menu" component={CourseSelectionMenu}/>
          <Route path="/build-seq-or-sem" component={BuildSeqOrSem} />
          <Route path="/seq-based-confirmation" component={BasedOnSeq} />
          <Route path="/andre's-App" component={AndreLink} />
          <Route path="/rubiat-seq-table" component={RubiatSeqLink} />
          <Route path="/BinaryTree" component={BinaryTree} />
          <Route path="/pull-previous-courses" component={PullPreviousCourses}/>
          <Route path="/previous-courses-taken" component={PreviousCoursesTaken}/>
          <Route path="/obtain-uploaded-sequence" component={ObtainUploadedSequence}/>
          <Route path="/finalize-export-sem" component={FinalizeExportSem} />
          <Route path="/finalize-export-seq" component={FinalizeExportSeq} />
          <Route path="/draft-sequence-menu" component={DraftSequenceMenu} />
          <Route path="/formalize" component={Formalize} />
          <Route path="/pdfSequenceGenerator" component={pdfSequenceGenerator}/>
          <Route path="/MyDoublyLinkedList" component={MyDoublyLinkedList} />
          <Route path="/Stack" component={Stack} />
          <Route path="/Course" component={Course} />
          <Route path="/LoadingCourses" component={LoadingCourses} />
          <Route path="/concordia-similar" component={ConcordiaSimilar} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
