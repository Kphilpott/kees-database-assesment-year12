
console.log("START");
console.log(firebase);
fb_silentLogin();
console.log(GLOBAL_user);

///A little setup for a test
const VELARRAY = [-1, 1];
const LENGTH = 680;
const HEIGHT = 15;
var ALIVE = true;
var score = 0;
var gamestarted = false;


function setup() {
	gamestarted == false;
	//create canvas
	console.log("setup: Canvas and World");
	cnv = new Canvas(800, 800);
	world.gravity.y = 0;
};

function startGame() {
	ALIVE = true;
	score = 0;
	gamestarted = true;
	playerGroup = new Group();
	document.getElementById("retryButton").hidden = true;
	document.getElementById("StartButton").hidden = true;

	///Create the player named "bob"
	bob = new Sprite(180, 120, 30, 35, 'd');
	bob.color = 'red';
	bob.vel.x = 1;
	bob.bounciness = 0.7;
	bob.drag = 0.9;
	playerGroup.add(bob);
	console.log("setup: player completed");

     ///Walls, numbered in order of left top right bottom
	 //first two numbers in each line of code are the coordinates it spawns at!
	platform_1 = new Sprite(70, 410, HEIGHT, LENGTH, 'k');
	platform_2 = new Sprite(410, 70, LENGTH, HEIGHT, 'k');
	platform_3 = new Sprite(750, 410, HEIGHT, LENGTH, 'k');
	platform_4 = new Sprite(410, 750, LENGTH, HEIGHT, 'k');
	platform_1.color = 'blue';
	platform_2.color = 'blue';
	platform_3.color = 'blue';
	platform_4.color = 'blue';
	wallGroup = new Group();
	wallGroup.add(platform_1);
	wallGroup.add(platform_2);
	wallGroup.add(platform_3);
	wallGroup.add(platform_4);
	console.log("setup: walls done");

	//create alien group and run function to spawn them, then log it.
	alienGroup = new Group();
	aliens();
	console.log("Aliens Spawned")
	console.log("Current Version: 1.6.6");
	console.log("Thank you for playing!");
	
	
}

function func2Call(_alien, _playerGroup) {

	// Delete the aliens and player when they touch, requiring a page reload after.
	alienGroup.deleteAll();
	playerGroup.deleteAll();
	wallGroup.deleteAll();
	death();

}


function aliens() {
    //spawn 13 "aliens"
	for (i = 0; i < 13; i++) {

		alien = new Sprite(random(425, 475), random(425, 475), 26);
		alien.vel.x = random(0.5, 0.7) * random(VELARRAY);
		alien.vel.y = random(0.5, 0.7) * random(VELARRAY);
		alien.bounciness = 1;
		alien.friction = -0.0000001;
		alien.drag = -0.09;
		alien.color = 'green';
		alienGroup.add(alien);
        
	}
	alienGroup.collides(playerGroup, func2Call);
}


function death() {
	//sets alive to false and starts a firebase write
	ALIVE = false;
	console.log("You Died! Final Score: " + score);
	fb_write();
	ScoreNumber.textContent = ("You Died! Final Score: ") + score;
	gamestarted == false;
	score = 0;
};



///Draw Loop
function draw() {
	background('white');


	//movement controls
	if (kb.pressing('left')) {
		bob.vel.x = -3.5;
	}

	else if (kb.pressing('right')) {
		bob.vel.x = 3.5;
	}

	else if (kb.pressing('up')) {
		bob.vel.y = -3.5;
	}

	else if (kb.pressing('down')) {
		bob.vel.y = 3.5;
	}

if (gamestarted == true) {
	score = score + 0.01;
	ScoreNumber.textContent = ("Score: ") + score;
};

if (ALIVE == false) {

 document.getElementById("retryButton").hidden = false;
};


};


/// WORK ALREADY

