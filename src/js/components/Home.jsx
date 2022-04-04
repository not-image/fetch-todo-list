import React, { useState, useEffect } from "react";
import { Container, Stack, Fab } from "@mui/material";

import Card from "./Card.jsx";
import InputArea from "./InputArea.jsx";

import ClearIcon from "@mui/icons-material/Clear";
import ReplayIcon from "@mui/icons-material/Replay";

const initValue = {
	label: {
		title: "",
		content: "",
		date: "",
	},
	done: false,
};

const Home = ({ letPlaceholder }) => {
	const BASE_URL = "http://assets.breatheco.de/apis/fake/todos/user";

	const [taskList, setTaskList] = useState([]);
	const [remainingTasks, setRemainingTasks] = useState([]);

	// GET tasks from API
	const getTaskList = async () => {
		try {
			let response = await fetch(`${BASE_URL}/not-image`);
			let results = await response.json();
			if (response.ok) {
				setTaskList(results);
			} else {
				createUser();
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	// PUT tasks
	const sendNewTask = async (tsk) => {
		try {
			let response = await fetch(`${BASE_URL}/not-image`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([...taskList, tsk]),
			});
			if (response.ok) {
				getTaskList();
			} else {
				throw Error("Failed to add initial tasks.");
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	// POST new user
	const createUser = async () => {
		try {
			let response = await fetch(`${BASE_URL}/not-image`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			if (response.ok) {
				getTaskList();
			} else {
				throw Error("Could not create new user.");
			}
		} catch (err) {
			console.log(err.stack);
		}
	};

	// PUT task default
	const putFunction = async (arg) => {
		try {
			let response = await fetch(`${BASE_URL}/not-image`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(arg),
			});
			if (response.ok) {
				getTaskList();
			} else {
				throw Error("Error.");
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	// task completed toggle check
	const toggleCheck = (id) => {
		const newTaskList = taskList.map((each, i) => {
			if (i === id) {
				return {
					...each,
					done: !each.done,
				};
			} else {
				return {
					...each,
				};
			}
		});
		putFunction(newTaskList);
		getTaskList();
	};

	// DELETE all tasks
	const deleteAllTasks = () => {
		const deleteAll = async () => {
			try {
				let response = await fetch(`${BASE_URL}/not-image`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (response.ok) {
					createUser();
				}
			} catch (err) {
				console.log(err.stack);
			}
		};
		(async () => await deleteAll())();
	};

	// delete individual
	const deleteTask = (id) => {
		const newTaskList = taskList.filter((each, i) => {
			return id != i;
		});
		putFunction(newTaskList);
		getTaskList();

		//setTaskList((prevTaskList) => {
		//	return prevTaskList.filter((each, i) => {
		//		return id != i;
		//	});
		//});
	};

	//const addTaskToList = (tsk) => {
	//	setTaskList((prevTaskList) => {
	//		return [...prevTaskList, tsk];
	//	});
	//};

	useEffect(() => {
		getTaskList();
	}, []);

	// remaining tasks count
	useEffect(() => {
		const newArr = taskList.filter((each, i) => {
			return each.done === false;
		});
		setRemainingTasks(newArr.length);
	}, [taskList]);

	return (
		<Container sx={{ marginLeft: 0 }} maxWidth="sm">
			<InputArea initialValue={initValue} onSubmit={sendNewTask} />
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				className="content-area">
				{taskList.map((each, i) => {
					return (
						<Card
							tskList={taskList}
							onCheck={toggleCheck}
							onDelete={deleteTask}
							key={i}
							id={i}
							title={each.label.title}
							content={each.label.content}
							date={each.label.date}
							done={each.done}
						/>
					);
				})}
			</Stack>
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				className="footer">
				{remainingTasks === 0 && (
					<div className="remaining-tasks">{`No pending tasks!`}</div>
				)}
				{remainingTasks === 1 && (
					<div className="remaining-tasks">{`Only ${remainingTasks} task left!`}</div>
				)}
				{remainingTasks > 1 && (
					<div className="remaining-tasks">{`You have ${remainingTasks} tasks left!`}</div>
				)}
				<Stack
					flexDirection="row"
					justifyContent="space-between"
					className="footer-buttons">
					<button
						title="Reset to initial data"
						className="first-button"
						onClick={() => {
							putFunction(letPlaceholder);
						}}>
						<ReplayIcon />
					</button>
					<button
						title="Delete user and data"
						className="second-button"
						onClick={deleteAllTasks}>
						<ClearIcon />
					</button>
				</Stack>
			</Stack>
		</Container>
	);
};

export default Home;
