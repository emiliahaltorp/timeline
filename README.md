# Timeline

<h4>Website: <a href='http://timelinesebem.herokuapp.com/'>http://timelinesebem.herokuapp.com/</a></h4>

<h4>Git Repository: <a href='https://gits-15.sys.kth.se/sgran/timeline'>https://gits-15.sys.kth.se/sgran/timeline/</a></h4>
Timeline is a game that with inspiration from the game "När då då?" which brings the board game to a digital version. The games goal is to arrange diffrent events in a chronological order. By getting to 7 events in correct order you win!

## Current features

- Fetches events from the API <a href='http://numbersapi.com/'>NumbersAPI</a> and serves them as questions for the game.
- You can play directly with a freind on the same computer
- Saves your game if you don't have time to finish it but want to pick it up later

## Planned features

- Play against each other on seperate computers

## Structure

The app is built with react and redux. The store is provided with react-redux. The app also uses react-router-dom for routing,rc-slide,react-beautiful-dnd,react-bootstrap . It is written using TypeScript. Data is stored using firebase's firestore.

The app files are split into five folders described below.

### Assets

For any assets used on the page such as images

### Views

Groups all the views used in this project

### Presenters

Groups all the presenters for the views

### Model

- **model**
  Moel contains the core model for the gam
- **Redux**
  Contains all the files used for using Redux
- **API**
  Contains files for fetchin from the API
- **Firebase**
  Contains for adding and fetching data fromn the realtime database in Firebase

### Theme

Contains all the styling files

---
