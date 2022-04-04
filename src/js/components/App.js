import React from "react";
import Home from "./Home.jsx";

import { useScroll } from "@use-gesture/react";

let testArr = [
	{
		label: {
			title: "Wash the dishes",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			date: "28/Jan/22 - 22s",
		},
		done: false,
	},
	{
		label: {
			title: "Finish the to-do list",
			content:
				"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			date: "14/Feb/22 - 39s",
		},
		done: false,
	},
	{
		label: {
			title: "Go grocery shopping",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			date: "07/Mar/22 - 57s",
		},
		done: false,
	},
	{
		label: {
			title: "Study chemistry",
			content:
				"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			date: "19/Mar/22 - 5s",
		},
		done: false,
	},
];

const App = () => {
	return <Home letPlaceholder={testArr} />;
};

export default App;
