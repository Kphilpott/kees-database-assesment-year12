
console.log("START");
console.log(firebase);

///A little setup for a test
const VELARRAY = [-1, 1];
const LENGTH = 680;
const HEIGHT = 15;
var ALIVE = true;
var score = 0;



function setup() {
	console.log("setup: Canvas and World");
	cnv = new Canvas(800, 800);
	world.gravity.y = 0;
	playerGroup = new Group();

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
	console.log("setup: walls done");

	//create alien group and run function to spawn them, then log it.
	alienGroup = new Group();
	aliens();
	console.log("Aliens Spawned")
	console.log("Current Version: 1.6.3");
	console.log("Thank you for playing!");
	
	
};

function func2Call(_alien, _playerGroup) {

	// Delete the aliens and player when they touch, requiring a page reload after.
	alienGroup.deleteAll();
	playerGroup.deleteAll();
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
	ALIVE = false;
	console.log("You Died! Final Score: " + score);
	fb_write();
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

if (ALIVE == true) {
	score = score + 0.01;
	ScoreNumber.textContent = ("Score: ") + score;
};

if (ALIVE == false) {
	ScoreNumber.textContent = ("You Died! Final Score: ") + score;
	
return;
};


};


/// WORK ALREADY

function writeForm(){
    // Get the form data
console.log("Hello World");



    firebase.database().ref('/users/' + GLOBAL_user.uid).set(
      {
        Email: GLOBAL_user.email,
        Pfp: GLOBAL_user.photoURL,
        DisplayName: GLOBAL_user.displayName,
		DodgetheBallsScore: score,
      }
    )
}



function fb_write() {
    console.log("Writing Online.");


   writeForm()
}


var GLOBAL_user;
var authenticationListener;


function fb_popuplogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; //save the user details as global value
    console.log("User has logged in.");
  });
}


function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_HandleLogin);
  document.getElementById("Logout").style.display = "block";
  document.getElementById("Login").style.display = "none";
}

function fb_HandleLogin(_user) {
  if (_user) {
    console.log("User is logged in.");
    GLOBAL_user = _user; //save the user details as global value
    setup();
    document.getElementById("submit").style.display = "block";

  } else {
    console.log("User is NOT logged in, starting the popup process.");
    fb_popuplogin();
  }
}

function fb_logout() {
  authenticationListener();
  firebase.auth().signOut();
  document.getElementById("Logout").style.display = "none";
  document.getElementById("Login").style.display = "block";
}

