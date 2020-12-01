import React from "react";

import { GameBoardView } from "../Views/gameBoardView";
import { questionSource } from "../apiHandling";
import { GetPromise } from "../getPromise";
import { dataDeliv } from "../dataDelivered";

export function GameBoard({ model }) {
	//Create state for what is in which row
	const [newData, updateData] = React.useState(model.myData);

	//---------------Styling start---------------//
	const grid = 10;

	const getItemStyle = (isDragging, draggableStyle) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: "none",

		margin: `0 ${grid}px 0 0`,
		fontSize: "11px",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

		// change background colour if dragging
		background: isDragging ? "lightgreen" : "white",

		// styles we need to apply on draggables
		...draggableStyle,
	});

	const getListStyle = (isDraggingOver) => ({
		background: isDraggingOver ? "lightblue" : "white",
		display: "flex",
		padding: grid,
		overflow: "auto",
	});
	//---------------Styling end---------------//

	const [promise, setPromise] = React.useState(null);
	//Fetches promise for the cards
	React.useEffect(() => {
		setPromise(questionSource.searchYear(model.getRandomNumber()));
	}, [model.counter]); //depends on when the counter updates aka when a new card is generated

	//Pulls out the data from the promise
	const [data, error] = GetPromise(promise);

	if (dataDeliv(data)) {
		//Creates an new event with data from the promise
		//Doesn't add it to the row in view
		newData.events["event" + String(model.counter)] = {
			id: "event" + String(model.counter),
			content: data.text.replace(data.number, ""),
			year: data.number,
		};
	}
	//const isDragDisabled = myData.events.id === "event1";
	//makes event draggable
	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		//Makes sure the item returns to its original place if it's placed wrongly
		if (!destination) {
			return;
		}

		// if (
		// 	destination.droppableId === source.droppableId &&
		// 	destination.index === source.index
		// ) {
		// 	return;
		// }
		//Labels the cards start and finish location
		const start = newData.columns[source.droppableId];
		const finish = newData.columns[destination.droppableId];
		//Moving in the same list
		if (start === finish) {
			//Copies the start arrays IDS
			const newEventIds = Array.from(start.eventIds);
			//Removes the picked card from it's start
			newEventIds.splice(source.index, 1);
			//Adds the card in new indexed place
			newEventIds.splice(destination.index, 0, draggableId);

			//Updates the eventIDs array
			const newColumn = {
				...start,
				eventIds: newEventIds,
			};

			const newState = {
				...newData,
				columns: {
					...newData.columns,
					[newColumn.id]: newColumn,
				},
			};
			updateData(newState);

			return;
		}

		// Moving from one list to another
		//You can only move cards from "Cards" to a player and not between players or
		// to another player
		if (start.id === "column1" || start.id === "column3") {
			return;
		}
		//Copies the start arrays IDS
		const startEventIds = Array.from(start.eventIds);
		//Removes the picked card from it's start
		startEventIds.splice(source.index, 1);
		//Updates the start array
		const newStart = {
			...start,
			eventIds: startEventIds,
		};
		//Copies the finish array
		const finishEventIds = Array.from(finish.eventIds);
		//Adds the picked card to the finish array
		finishEventIds.splice(destination.index, 0, draggableId);
		//Updates the finish array
		const newFinish = {
			...finish,
			eventIds: finishEventIds,
		};
		// Updates the new board layout
		const newState = {
			...newData,
			columns: {
				...newData.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		updateData(newState);
		//If the card stack is empty
		if (newState.columns.column2.eventIds.length == 0) {
			model.updateCounter();
			//Adds a card to the "Card" array
			const newStart = {
				...start,
				eventIds: ["event" + String(model.counter)],
			};
			//Updates the boards layout
			const newState = {
				...newData,
				columns: {
					...newData.columns,
					[newStart.id]: newStart,
					[newFinish.id]: newFinish,
				},
			};

			updateData(newState);
		}
	};
	return (
		<GameBoardView
			onDragEnd={onDragEnd}
			newData={newData}
			getItemStyle={getItemStyle}
			getListStyle={getListStyle}
		/>
	);
}
