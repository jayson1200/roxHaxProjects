//Body element refers to the body element in the html qe select it twith the document method
let bodyElement = document.querySelector("body");
//The scoreTxt refers to the scoreTxt defined in the html. Notice how we select just like we would in css
let scoreTxt = document.querySelector("#score-txt");
//The livesTxt refers to the scoreTxt defined in the html. Notice how we select just like we would in css
let livesTxt = document.querySelector("#lives-txt");

//These are global variables that keep track of our score and the amount of lives on has
let score = 0;
let lives = 10;

//Global variable that defines when the player has lost 
let endGame = false;

//Stores a collection of all the current Asteroid
let asteroidArray = [];

// (In milleseconds) defines the rate in which the method CreateNewAsteroids is run
let asteroidSpawnRate = 1000;

//This class encapsulates one of BrownMeteor's funcitonality
class BrownMeteor {

	//This is run when we create a new BrownMeteor
	constructor() {
		//This creates an element then creates a class variable that stores it
		this.brownMeteor = document.createElement("img");
		//This creates a class variable that refers to the brownMeteors displacement from the top of the screen
		this.displTop = 0;
		//defines whether a particular asteroid should move
		this.shouldMove = true;
		//this defines the src image of the brownMeteor
		this.brownMeteor.src = "images/meteor-brown.png";
		//this allows us to move the asteroid anywhere on the screen
		this.brownMeteor.style.position = "absolute";
		//These two lines define the size the asteroid
		this.brownMeteor.style.width = "75px";
		this.brownMeteor.style.height = "75px";
		//This defines where the asteroid start
		this.brownMeteor.style.top = "-10%";
		//This set to the position of the asteroid to something within the bounds of the screen
		this.brownMeteor.style.left = GetRandomPosition() + "px";
		/*This sets the brownMeteor onClick event to an anonymous function that removes the asteroid from the DOM and Updates the scores with the UpdateScore function*/
		this.brownMeteor.onclick = () => {
			this.removeObject();
			UpdateScore()
		}

		//This appends the brownMeteor to the DOM
		bodyElement.appendChild(this.brownMeteor);
	}

	//brownMeteor method that updates the positon of the image in the DOM
	updatePosition() {
		if (this.shouldMove) {
			this.displTop += 3;
			//Notice how we set the property of the image in the DOM
			this.brownMeteor.style.top = this.displTop + "px";
		}
	}

	//Here we remove the object and set shouldMove to false
	removeObject() {
		this.shouldMove = false;
		this.brownMeteor.remove();
	}

	//returns a float that represents current position of the brownMeteor 
	getYPos() {
		return parseFloat(this.brownMeteor.style.top.slice(0, -2));
	}

	//getter method that returns the shouldMove variable
	getShouldMove() {
		return this.shouldMove;
	}
}

//This class encapsulates one of BrownMeteor's funcitonality
class FireMeteor {

	//This is run when we create a new BrownMeteor
	constructor() {
		//This creates an element then creates a class variable that stores it
		this.brownMeteor = document.createElement("img");
		//This creates a class variable that refers to the brownMeteors displacement from the top of the screen
		this.displTop = 0;
		//defines whether a particular asteroid should move
		this.shouldMove = true;
		//this defines the src image of the brownMeteor
		this.brownMeteor.src = "images/meteor-fire.png";
		//this allows us to move the asteroid anywhere on the screen
		this.brownMeteor.style.position = "absolute";
		//These two lines define the size the asteroid
		this.brownMeteor.style.width = "100px";
		this.brownMeteor.style.height = "100px";
		//This defines where the asteroid start
		this.brownMeteor.style.top = "-10%";
		//This set to the position of the asteroid to something within the bounds of the screen
		this.brownMeteor.style.left = GetRandomPosition() + "px";
		/*This sets the brownMeteor onClick event to an anonymous function that removes the asteroid from the DOM and Updates the scores with the UpdateScore function*/
		this.brownMeteor.onclick = () => {
			this.removeObject();
			UpdateScore()
		}

		//This appends the brownMeteor to the DOM
		bodyElement.appendChild(this.brownMeteor);
	}

	//brownMeteor method that updates the positon of the image in the DOM
	updatePosition() {
		if (this.shouldMove) {
			this.displTop += 5;
			//Notice how we set the property of the image in the DOM
			this.brownMeteor.style.top = this.displTop + "px";
		}
	}

	//Here we remove the object and set shouldMove to false
	removeObject() {
		this.shouldMove = false;
		this.brownMeteor.remove();
	}

	//returns a float that represents current position of the brownMeteor 
	getYPos() {
		return parseFloat(this.brownMeteor.style.top.slice(0, -2));
	}

	//getter method that returns the shouldMove variable
	getShouldMove() {
		return this.shouldMove;
	}
}

//Returns a random pixel position within the bounds of the players creen
function GetRandomPosition() {
	return Math.floor(Math.random() * (window.screen.width - 50));
}

//Based on whetehr endGame is true or not this mfunction creates a new brownMeteor and pushes it to the asteroidArray
let CreateNewAsteroids = () => {
	if (!endGame) {
		let shouldPickBrownMeteor = (PickAsteroid() > 7) ? false  : true;
		console.log(shouldPickBrownMeteor);
		if(shouldPickBrownMeteor){
			asteroidArray.push(new BrownMeteor());
		}
		else{
			asteroidArray.push(new FireMeteor());
		}
	}
}

//Updates the game
let UpdateGame = () => {
	for (i = 0; i < asteroidArray.length; i++) {
		if (asteroidArray[i] instanceof BrownMeteor) {
			if (!asteroidArray[i].getShouldMove()) {
				asteroidArray.splice(i, 1);
			}
		}
		else if (asteroidArray[i] instanceof FireMeteor) {
			if (!asteroidArray[i].getShouldMove()) {
				asteroidArray.splice(i, 1);
			}
		}
	}
	if (!endGame) {
		for (j = 0; j < asteroidArray.length; j++) {
			if (asteroidArray[j] instanceof BrownMeteor) {
				asteroidArray[j].updatePosition();

				if (asteroidArray[j].getYPos() > window.screen.height) {
					asteroidArray[j].removeObject();
					asteroidArray.splice(j, 1);
					UpdateLives();
				}
			}
			else if (asteroidArray[j] instanceof FireMeteor) {
				asteroidArray[j].updatePosition();

				if (asteroidArray[j].getYPos() > window.screen.height) {
					asteroidArray[j].removeObject();
					asteroidArray.splice(j, 1);
					UpdateLives();
				}
			}
		}
	}
}

//function to update the score
let UpdateScore = () => {
	score++;
	scoreTxt.innerHTML = "Score: " + score;
}

//updates the lives and check whether lives is less than 0
//If so it wil run the end game function which will end the game
let UpdateLives = () => {
	lives--;
	livesTxt.innerHTML = "Lives: " + lives;

	if (lives < 1) {
		endGame = true;
		EndGame();
	}
}

//Increase the difficult of the game by increasing the asteroidSpawnRate
let IncreaseDifficulty = () => {
	asteroidSpawnRate *= 0.9;
	clearInterval(asteroidSpawner);
	asteroidSpawner = window.setInterval(CreateNewAsteroids, asteroidSpawnRate);
}

//Ends the game by calling the removeObject method on all asteroid in the array
let EndGame = () => {
	for (j = 0; j < asteroidArray.length; j++) {
		asteroidArray[j].removeObject();
	}
}

let PickAsteroid  = () => {
	return Math.random() * 10;
}


//Defines interval in which important methods run
let asteroidSpawner = window.setInterval(CreateNewAsteroids, asteroidSpawnRate);
window.setInterval(UpdateGame, 20);

window.setInterval(IncreaseDifficulty, 5000);

