import React from "react";
import './SequenceTable.css';

function SequenceTable1() {
  return (
    <table className="SequenceTable1" border="1px">
      <tr>
        <th colSpan="9">
          <h2 className="thYear">Year #</h2>
        </th>
      </tr>
      <tr>
        <th>Term</th>
        <th className="thCourse1">Course</th>
        <th className="thCredit1">Credit</th>
        <th>Term</th>
        <th className="thCourse2">Course</th>
        <th className="thCredit2">Credit</th>
        <th>Term</th>
        <th className="thCourse3">Course</th>
        <th className="thCredit3">Credit</th>
      </tr>
      <tr><td rowSpan="6" className="TermName">Fall</td><td className="fallSlot1"></td><td className="fallSlot1"></td><td rowSpan="6" className="TermName">Winter</td><td className="winterSlot1"></td><td className="winterSlot1"></td><td rowSpan="6" className="TermName">Summer</td><td className="summerSlot1"></td><td className="summerSlot1"></td></tr>
      <tr><td className="fallSlot2"></td><td className="fallSlot2"></td><td className="winterSlot2"></td><td className="winterSlot2"></td><td className="summerSlot2"></td><td className="summerSlot2"></td></tr>
      <tr><td className="fallSlot3"></td><td className="fallSlot3"></td><td className="winterSlot3"></td><td className="winterSlot3"></td><td className="summerSlot3"></td><td className="summerSlot3"></td></tr>
      <tr><td className="fallSlot4"></td><td className="fallSlot4"></td><td className="winterSlot4"></td><td className="winterSlot4"></td><td className="summerSlot4"></td><td className="summerSlot4"></td></tr>
      <tr><td className="fallSlot5"></td><td className="fallSlot5"></td><td className="winterSlot5"></td><td className="winterSlot5"></td><td className="summerSlot5"></td><td className="summerSlot5"></td></tr>
      <tr><td className="fallSlot6"></td><td className="fallSlot6"></td><td className="winterSlot6"></td><td className="winterSlot6"></td><td className="summerSlot6"></td><td className="summerSlot6"></td></tr>
    </table>
  );
}

export default SequenceTable1;
