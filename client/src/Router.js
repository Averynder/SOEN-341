import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import App from "./App"
import SelectSemester from "./flow-chart-pages/SelectSemester"
import BasedOnSeq from "./BasedOnSeq"
import BuildSeqOrSem from "./BuildSeqOrSem"

class Router extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/select-semester" component={SelectSemester} />
          <Route path="/build-seq-or-sem" component={BuildSeqOrSem} />
          <Route path="/seq-based-confirmation" component={BasedOnSeq} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router
