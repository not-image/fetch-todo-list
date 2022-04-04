//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

import "../styles/index.css";
import App from "../js/components/App.js";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.querySelector("#app")
);
