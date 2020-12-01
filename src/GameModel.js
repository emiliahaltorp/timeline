import { questionSource } from "./apiHandling";
export class GameModel {
	constructor(
		players = 2,
		startYear = 1000,
		endYear = 2020,
		gameName = "",
		counter = 4
	) {
		this.numberOfPlayers = players;
		this.startYear = startYear;
		this.endYear = endYear;
		this.gameName = gameName;
		this.myData = this.getApiData();
		this.counter = counter;
	}

	setNumberOfPlayers(x) {
		if (x < 2) throw "Number of players cannot less than two";
		this.numberOfPlayers = x;
	}
	getNumberOfPlayers() {
		return this.numberOfPlayers;
	}
	setStartYear(x) {
		this.startYear = x;
		console.log("start", this.startYear);
	}
	setEndYear(x) {
		this.endYear = x;
		console.log("end", this.endYear);
	}
	getStartYear() {
		return this.startYear;
	}
	getEndYear() {
		return this.endYear;
	}
	setGameName(name) {
		this.gameName = name;
		console.log(this.gameName);
	}
	getGameName() {
		return this.gameName;
	}
	updateCounter() {
		return (this.counter += 1);
	}
	getRandomNumber() {
		let x = Math.floor(
			Math.random() * (Math.floor(this.endYear) - Math.ceil(this.startYear)) +
				Math.ceil(this.startYear)
		);
		console.log(x);
		return x;
	}
	getApiData() {
		//Creates the initial data for the board layout
		let localMyData = {
			events: {
				event1: {
					id: "event1",
					content: "",
					year: 0,
				},
				event2: {
					id: "event2",
					content: "",
					year: 0,
				},
				event3: {
					id: "event3",
					content: "",
					year: 0,
				},
			},
			columns: {
				column1: {
					id: "column1",
					title: "Player 1 Timeline",
					eventIds: ["event1"],
				},
				column2: {
					id: "column2",
					title: "Card",
					eventIds: ["event2"],
				},
				column3: {
					id: "column3",
					title: "Player 2 timeline",
					eventIds: ["event3"],
				},
			},
			columnOrder: ["column1", "column2", "column3"],
		};
		//Fetches data from the API with a random year
		questionSource.searchYear(this.getRandomNumber()).then((data) => {
			localMyData.events.event1.content = data.text.replace(data.number, "");
			localMyData.events.event1.year = data.number;
		}); //lägga in then i data
		questionSource.searchYear(this.getRandomNumber()).then((data) => {
			localMyData.events.event2.content = data.text.replace(data.number, "");
			localMyData.events.event2.year = data.number;
		});
		questionSource.searchYear(this.getRandomNumber()).then((data) => {
			localMyData.events.event3.content = data.text.replace(data.number, "");
			localMyData.events.event3.year = data.number;
		});

		return localMyData;
	}
}
