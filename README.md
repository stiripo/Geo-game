# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### About

Geo-game is a single page React application created with React-create-app tool.
The app assets (svg files with country shapes) were manually created using the Inkscape app.

In the game the player needs to drag-and-drop country shapes appearing on the screen onto their correct places on the map. The screen is divided into three main areas: the map, the scoreboard and the next country, or puzzle piece, which needs to be drag-and-dropped. The player has three attempts to correctly place the country on the map. The player scores one point if the country is eventually placed correctly or, otherwise, is stripped of one point. At the end of the game the screen shows the final result which represents a percentage of all countries placed correctly.

The game app interacts with a node.js server which stores the best result ever scored by any player in this game. Node.js server is set up to accept and respond to GET and POST requests. For GET requests the server reads the current value from a file and sends it back with a response. The app sends a GET request at the start of the game to display the received best result value on the screen. At the end of the game a POST request is sent with the players final result. For a POST request the server compares the new received value with the one stored in its file and if the new value is greater, then the old value is overwritten. Thus, every time the game starts with fetching the latest best result.
The app state is implemented locally with the help of the useState hook. The state  lives inside the component and in some cases is lifted up which means that the state data is passed down through attributes from a parent component to a child component where it becomes accessible via props. This allows children components to update the parent component’s state.

The PuzzlePiece component’s state controls such UI features as the position and color of the country image. Its parent App component holds the state to control the rendering of the best result ever achieved in this game, next country to be placed on the map, current score and the final result. The PuzzlePiece component can update the state of its parent via props.

The PuzzlePiece component which renders a new country shape to be placed on the map is the most complex component in the app. The drag-and-drop functionality was implemented with the React-draggable library. The image element which represents a country’s shape is wrapped in the Draggable element which extends it with event handlers and styles.

The main logic is around tracking the position of the dragged element. At the end of the drag event the event handler captures the X and Y coordinates of the dragged element relative to the Map component. For access to the Map component the useRef hook was used. The captured coordinates are then compared with the element’s correct coordinates which are hard coded in the properties of a special object containing all the data about each country (stored as a constant). The difference represents the number of pixels from the top and left of the map. Depending on whether the difference is within the acceptable margin of error (also hard coded as a constant), the country is deemed to have been placed correctly or incorrectly.

Depending on correct or incorrect placement, the country’s shape will change its color from initial yellow to either green or red respectively. Correct placement triggers a state update which controls the styles of the image element.

When the current state shows that the country has been placed correctly or the player has used all available attempts, it will update the top and left coordinates of the element causing the country image element to snap into its designated place on the map with a transition effect. After that, next country’s shape will appear on the screen.


The PuzzlePiece component updates the  score state which is held by its parent App component. The PuzzlePiece component conditionally implements some logic in the following scenarios:
- the country is  placed correctly: the score state is updated (+1 score);
- the country is placed incorrectly but the player has used all three attempts: the score state is updated (-1 score);
- the country is placed incorrectly but the player has not used the allowed three attempts yet: nothing happens, the country's shape remains in its place and can be dragged once more.
The score state data from the parent App component is also passed down to the child ScoreBoard component as an attribute.

The App component’s state holds a value responsible for checking if there are more countries left in the array at the end of each turn. If so,  the next country shape will appear on the screen. At the beginning of the game, the app shows only the first country from the array. To ensure that the countries appear in a different order every time the game is played, the App component shuffles the array of countries at the start of the game before rendering the content. At the end of the turn, it checks if there are more countries left in the array. If so, the state updates to hold the index of the next country, and the PuzzlePiece component renders all the countries from the array up to that index. If there are no more countries left in the  array, the app will render the result box. The final result data is passed down as a callback function in an attribute from the parent App component to the child Resultbox component where it is accessible via props. To write the final result to the server, the ResultBox component sends a POST request to the server. UseEffect hook is used for the POST request.


