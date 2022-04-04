import React from "react";
import { Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import { red } from "@mui/material/colors";

const placeholderTask = {
	title: "Placeholder task",
	content: "Don't mind me. Delete me when you have the chance :)",
	date: "16/Oct/2027 - 59s",
};

const Card = ({
	title,
	content,
	date,
	done,
	id,
	onDelete,
	onCheck,
	tskList,
}) => {
	const handleClick = () => {
		onDelete(id);
	};

	const handleCheckbox = () => {
		onCheck(id);
	};

	return (
		<Stack
			className="card"
			key={id}
			flexDirection="column"
			justifyContent="space-between">
			<div>
				<Stack
					alignItems="center"
					flexDirection="row"
					justifyContent="space-between">
					{title === "" || title === undefined ? (
						<div className="title">{placeholderTask.title}</div>
					) : (
						<div className="title">{title}</div>
					)}

					<div
						title="Mark task as completed"
						onClick={handleCheckbox}
						className="checkbox">
						{done && (
							<DoneIcon
								sx={{ fontSize: 40, color: red[500] }}
								className="checked"></DoneIcon>
						)}
					</div>
				</Stack>
				{content === "" || content === undefined ? (
					<div className="content">{placeholderTask.content}</div>
				) : (
					<div className="content">{content}</div>
				)}
			</div>
			<Stack flexDirection="row" justifyContent="space-between">
				<div className="date">
					<AccessTimeIcon fontSize="small" />
					{date === "" || date === undefined ? (
						<span>{placeholderTask.date}</span>
					) : (
						<span>{date}</span>
					)}
				</div>
				{tskList.length === 1 ? (
					<button
						title="To delete this task, add another task first"
						className="unavailable-button">
						<DeleteIcon fontSize="small" />
					</button>
				) : (
					<button title="Delete task" onClick={handleClick}>
						<DeleteIcon fontSize="small" />
					</button>
				)}
			</Stack>
		</Stack>
	);
};

export default Card;
