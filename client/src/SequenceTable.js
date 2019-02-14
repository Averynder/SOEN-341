import React from "react";
import './SequenceTable.css';

function SequenceTable1(props) {
  let year;
  if(document.getElementById('semester-year') === null)
    year = (new Date()).getFullYear();
  else
    year = document.getElementById('semester-year').value;

  return (
    <table className="SequenceTable1" border="1px">
      <tr>
        <th colSpan="9">
          <h2>{year}</h2>
        </th>
      </tr>
      <tr>
        <th>Term</th>
        <th className="thCourse">Course</th>
        <th className="thCredit">Credit</th>
        <th>Term</th>
        <th className="thCourse">Course</th>
        <th className="thCredit">Credit</th>
        <th>Term</th>
        <th className="thCourse">Course</th>
        <th className="thCredit">Credit</th>
      </tr>
      <tr><td rowSpan="6" className="TermName">Fall</td><td></td><td></td><td rowSpan="6" className="TermName">Winter</td><td></td><td></td><td rowSpan="6" className="TermName">Summer</td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
  );
}

export default SequenceTable1;
