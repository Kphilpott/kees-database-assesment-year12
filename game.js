/*******************************************************/
// setup()
/*******************************************************/
const VELARRAY = [-1, 1];

function preload() {

  imgBG = loadImage('../assets/images/space.png');

  imgFace = loadImage('../assets/images/face.png');

}


function setup() {
	preload();
	console.log("Images Preloaded");
	console.log("setup: wekonfgownfg");
    cnv = new Canvas(900, 900);   //why does it not work on the actual site now????
	world.gravity.y = 10;
	playerGroup = new Group();
	bob = new Sprite(180, 80, 40, 55, 'd');

    bob.color = 'red';

	bob.rotationSpeed = -22;
    bob.vel.x = 1;
	bob.bounciness = 0.7;
	bob.drag = 0.6;
	playerGroup.add(bob);
    console.log("setup: bob armed");

	bill = new Sprite(380, 99, 28, 43, 'd');
    bill.color = 'green';
	bill.rotationSpeed = -52;
	bill.vel.x = -7;
    bill.bounciness = 0.9;
	bill.drag = 1;
	playerGroup.add(bill);
	console.log("setup: bill armed");

	jeremy = new Sprite(500, 99, 33, 33, 'd');
    jeremy.color = 'black';
	jeremy.rotationSpeed = -1170;
	jeremy.vel.x = -15;
    jeremy.bounciness = 0.9;
	jeremy.rotationSpeed = -12;
	jeremy.vel.x = -6;
    jeremy.bounciness = 0.7;
	jeremy.drag = 1;
	playerGroup.add(jeremy);
	console.log("setup: jeremy armed");

	ben = new Sprite(200, 70, 35, 25, 'd');
    ben.color = 'yellow';
	ben.rotationSpeed = -600;
	ben.vel.x = -0.02;
	ben.vel.y = -0.32;
    ben.bounciness = 1.3;
    ben.drag = 1;
	playerGroup.add(ben);
	console.log("setup: ben armed");

	jeb = new Sprite(300, 300, 50);
	jeb.color = 'purple';
	jeb.rotationSpeed = 600;
	jeb.vel.x = 12;
	jeb.vel.y = 2;
	jeb.bounciness = 1;
	jeb.friction = 3;
	jeb.drag = 1;
	playerGroup.add(jeb);
	console.log("setup: tactical jeb armed");

	john = new Sprite(475, 250, 35);
	john.color = 'brown';
	john.rotationSpeed = 600;
	john.vel.x = -12;
	john.vel.y = -12;
	john.bounciness = 1.2;
	john.friction = 1.1;
	john.drag = 1;
	playerGroup.add(john);
	console.log("setup: john armed");

	britton = new Sprite(775, 250, 35, 65);
	britton.color = 'gray';
	britton.rotationSpeed = 600;
	britton.vel.x = -2;
	britton.vel.y = -22;
	britton.bounciness = 0.9;
	britton.friction = 0.8;
	britton.drag = 0.5;
	playerGroup.add(britton);
	console.log("setup: britton armed");


	ball_1 = new Sprite(250, 250, 50, 'd');
    ball_1.bounciness = 0.7;
    ball_1.friction   = 0.9;
    ball_1.image = (imgFace);
    playerGroup.add(ball_1);





	platform_1 = new Sprite(2, 450, 15, 900, 'k');
	platform_2 = new Sprite(450, 2, 900, 15, 'k');
	platform_3 = new Sprite(898, 450, 15, 900, 'k');
	platform_4 = new Sprite(450, 898, 900, 15, 'k');
	platform_5 = new Sprite(235, 600, 300, 9, 'k');
	platform_5.rotation = 45
	platform_under5 = new Sprite(235, 730, 300, 9, 'k');
	platform_under5.rotation = 45
	platform_6 = new Sprite(560, 400, 250, 9, 'k');
	platform_6.rotation = -19
	platform_7 = new Sprite(735, 600, 225, 9, 'k');
	platform_7.rotation = -30
	spinner_1 = new Sprite(450, 680, 500, 9, 'k');
	spinner_1.rotationSpeed = 1.9
	spinner_2 = new Sprite(-10, 895, 350, 3, 'k');
	spinner_2.rotationSpeed = -3.5
	spinner_3 = new Sprite(890, 895, 230, 9, 'k');
	spinner_3.rotationSpeed = -5
	console.log("setup: walls placed");
	console.log("Code, may you experience eternal pain");


   

// Create a group for the aliens and spawn them
    alienGroup = new Group();
    aliens();
	console.log("Aliens Spawned");

}

function aliens() {

	for (i = 0; i < 239; i++) {


		
  alien = new Sprite(random(425, 475), random(425, 475), 20);

  alien.vel.x = random(4, 7) * random(VELARRAY);

  alien.vel.y = random(4, 7) * random(VELARRAY);

  alien.bounciness = 0.7;

  alien.friction = 0.6;

  alienGroup.add(alien);


  console.log("Error");
	}

	alienGroup.collides(playerGroup, func2Call);
}


function func2Call(_alien, _playerGroup) {

// Delete the alien which was hit

_alien.remove();

}

	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background(imgBG);
	imgFace.resize(50, 50);
	 if (mouse.presses()) {

      ball_1.moveTowards(mouseX, mouseY, 0.05);

   }

   else if (kb.pressing('left')) {

    ball_1.vel.x = -10;

}

else if (kb.pressing ('right')) {

   	   ball_1.vel.x = 10;

}

else if (kb.pressing ('up')) {

   	   ball_1.vel.y = -10;

}

else if (kb.pressing ('down')) {

   	   ball_1.vel.y = 10;

}


}

/*******************************************************/
//  END OF APP
/*******************************************************/