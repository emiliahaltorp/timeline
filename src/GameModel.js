import { questionSource } from "./apiHandling";
export class GameModel {
	constructor(startYear = 1500, endYear = 2020, counterStart = 4, myData = {}) {
		this.startYear = startYear;
		this.endYear = endYear;
		this.counter = counterStart;
		//this.myData = this.getApiData("person");
		this.myData = this.getApiData(this.startYear, this.endYear);
	}

	updateCounter(x) {
		if (x !== "undefined") {
			return (this.counter = x);
		} else {
			return (this.counter += 1);
		}
	}
	setCounter(x) {
		if ((x = null)) {
			this.counter = 4;
		} else {
			this.counter = x;
		}
	}
	getRandomNumber(startYear, endYear) {
		if (startYear == null && endYear == null) {
			let x = Math.floor(
				Math.random() * (Math.floor(this.endYear) - Math.ceil(this.startYear)) +
					Math.ceil(this.startYear)
			);
			return x;
		}
		let x = Math.floor(
			Math.random() * (Math.floor(endYear) - Math.ceil(startYear)) +
				Math.ceil(startYear)
		);
		return x;
	}
	// deleteCards(allCardsData, row) {
	// 	allCardsData.rows[row].eventIds.map((y) => {
	// 		if (allCardsData.events[y].acquired === false) {
	// 			delete allCardsData.events[y];
	// 			this.counter -= 1;
	// 		}
	// 	});
	// }
	checkOrder(cardsData, row) {
		let allCardsData = { ...cardsData };
		// define the array
		let theTimeline = [];
		allCardsData.rows[row].eventIds.map((y) => {
			theTimeline.push(allCardsData.events[y].year);
			return 0;
		});
		console.log("theArray", theTimeline);
		var isDescending = true;
		var isAscending = true;

		for (var i = 0, l = theTimeline.length - 1; i < l; i++) {
			// true if this is greater than the next and all other so far have been true
			isDescending = isDescending && theTimeline[i] > theTimeline[i + 1];

			// true if this is less than the next and all others so far have been true
			isAscending = isAscending && theTimeline[i] < theTimeline[i + 1];
		}

		if (isAscending || allCardsData.rows[row].eventIds.length === 1) {
			//if the row of cards is correct we wanna map it
			allCardsData.rows[row].eventIds.map((y) => {
				//set all of them to true to make sure they are kept for next turn
				allCardsData.events[y].acquired = true;
				//clears so that multiple years isn't added
				allCardsData.events[y].content = allCardsData.events[y].content.replace(
					allCardsData.events[y].year,
					""
				);
				//adds cards year if player got it right
				allCardsData.events[y].content =
					String(allCardsData.events[y].year) + allCardsData.events[y].content;
				return 0;
			});
			return allCardsData;
		}
		if (isDescending) {
			//player got it wrong
			allCardsData.rows[row].eventIds.map((y) => {
				//for all the cards added this turn
				if (allCardsData.events[y].acquired === false) {
					//remove them from eventIds aka board
					allCardsData.rows[row].eventIds = allCardsData.rows[
						row
					].eventIds.filter((arr) => {
						return arr !== allCardsData.events[y].id;
					});
					//Delete the cards from events
					delete allCardsData.events[y];
				}
				return 0;
			});
			return allCardsData;
		} else {
			allCardsData.rows[row].eventIds.map((y) => {
				if (allCardsData.events[y].acquired === false) {
					allCardsData.rows[row].eventIds = allCardsData.rows[
						row
					].eventIds.filter((arr) => {
						return arr !== allCardsData.events[y].id;
					});

					delete allCardsData.events[y];
				}
				return 0;
			});
			return allCardsData;
		}
	}
	getApiData(startYear, endYear) {
		//Creates the initial data for the board layout

		// let y = {
		// 	events: {},
		// 	rows: {},
		// 	rowOrder: ["row1", "row2", "row3"],
		// };

		let localMyData = {
			events: {
				event1: {
					id: "event1",
					content: "",
					year: 0,
					acquired: true,
				},
				event2: {
					id: "event2",
					content: "",
					year: 0,
					acquired: false,
				},
				event3: {
					id: "event3",
					content: "",
					year: 0,
					acquired: true,
				},
			},
			rows: {
				row1: {
					id: "row1",
					title: "Player 1 Timeline",
					eventIds: ["event1"],
				},
				row2: {
					id: "row2",
					title: "Card",
					eventIds: ["event2"],
				},
				row3: {
					id: "row3",
					title: "Player 2 timeline",
					eventIds: ["event3"],
				},
			},
			rowOrder: ["row1", "row2", "row3"],
		};
		// //fetches the events from db
		// if (user == "person") {
		// 	let x = getBoard("person");

		// 	x.then((data) => {
		// 		y.rows = data.rows;
		// 		y.events = data.events;
		// 	});
		// }

		//Fetches data from the API with a random year
		questionSource
			.searchYear(this.getRandomNumber(startYear, endYear))
			.then((data) => {
				localMyData.events.event1.content = data.text;
				localMyData.events.event1.year = data.number;
			}); //lägga in then i data
		questionSource
			.searchYear(this.getRandomNumber(startYear, endYear))
			.then((data) => {
				localMyData.events.event2.content = data.text.replace(data.number, "");
				localMyData.events.event2.year = data.number;
			});
		questionSource
			.searchYear(this.getRandomNumber(startYear, endYear))
			.then((data) => {
				localMyData.events.event3.content = data.text;
				localMyData.events.event3.year = data.number;
			});
		//console.log("y", y);
		console.log("localMyDat", localMyData);
		this.myData = localMyData;
		return localMyData;
	}
}
