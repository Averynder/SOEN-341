import * as React from "react";
import './hambergurCSS.css';

class hamburger extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<button className="hamburger hamburger--squeeze" type="button">
					<span className="hamburger-box">
						<span className="hamburger-inner">
						</span>
					</span>
				</button>
				<p>Hey</p>
			</div>
		)
	}
}

export default hamburger;