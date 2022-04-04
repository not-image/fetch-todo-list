import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import { Stack, Fab } from "@mui/material";

const InputArea = ({ initialValue, onSubmit }) => {
	const [task, setTask] = useState(initialValue);
	const [error, setError] = useState(false);

	// get current time
	let today = new Date();
	const month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let submitTime = "";
	useEffect(() => {
		submitTime = `${today.getDate()}/${month[today.getMonth()]}/${today
			.getFullYear()
			.toString()
			.substr(-2)} - ${today.getSeconds()}s`;
	}, [task]);

	// controlled input
	const handleChange = (e) => {
		const { name, value } = e.target;
		setTask((prevTask) => {
			return {
				...prevTask,
				label: {
					...prevTask.label,
					[name]: value,
					date: submitTime,
				},
			};
		});
	};

	// handle add button
	const submitTask = (e) => {
		if (
			task.label.title.trim() === "" ||
			task.label.content.trim() === ""
		) {
			setError(true);
			e.preventDefault();
		} else {
			onSubmit(task);
			setTask({
				label: {
					title: "",
					content: "",
					date: "",
				},
				done: false,
			});
			setError(false);
			e.preventDefault();
		}
	};

	return (
		<Stack>
			<form className="input-area">
				<input
					onChange={handleChange}
					value={task.label.title}
					type="text"
					name="title"
					placeholder="Title"
					maxLength="15"
				/>
				<textarea
					onChange={handleChange}
					value={task.label.content}
					name="content"
					rows="3"
					placeholder="Write a task..."
					maxLength="110"
				/>
				<Fab title="Add new task" onClick={submitTask} type="submit">
					<AddIcon fontSize="medium" />
				</Fab>
			</form>
			{error && (
				<div className="error">Error: Field cannot be empty.</div>
			)}
		</Stack>
	);
};

export default InputArea;
