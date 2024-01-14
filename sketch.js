/*

The Game Project

Mid-Term Assignment

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;

var collectable;
var canyon;

var trees_x;
var treePos_y;

var clouds = []; //array of clouds objects
var mountains = []; //array of mountains objects
var bushes = [] //array of bushes objects

var cameraPosX = 0;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    //initialise canyon
    canyon = {
        x_pos: width/2,
        y_pos: 526,
        width: 300,
        height: 50
    };
    
    //initialise collectable
    collectable = {
        x_pos: canyon.x_pos,
        y_pos: floorPos_y - 100, 
        size: 50,
        isFound: false
    };
    
    //initialise tree
    trees_x = [-10000, -9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
    treePos_y = height/2 - 5;
    
    //create cloud objects
    for (var i = 0; i < 25; i++)
    {
        clouds[i] = new Cloud(random(0, width*50), random(0, height/2), 80)
    }

    //create mountain objects
    for (var i = 0; i < 50; i++)
    {
        mountains[i] = new Mountain(random(700, width*50), floorPos_y);
    }

    //create bushes objects
    for (var i = 0; i < 15; i++)
    {
        bushes[i] = new Bush(random(850, width*50), floorPos_y);
    }
}

function draw()
{
    if(isLeft == true)
    {
        cameraPosX = gameChar_x - width/2;
    }
    else if(isRight == true){
        cameraPosX = gameChar_x - width/2;
    }
	///////////DRAWING CODE//////////
    
	background(100,155,255); //fill the sky blue

    push();
    translate(-cameraPosX,0);
    //draw some green ground
	noStroke();
	fill(0,155,0);
	rect(-width*100, floorPos_y, width* 100 + 512, height - floorPos_y);
    rect(width/2 + 300, floorPos_y, width * 100, height - floorPos_y)

    //draw the canyon
    fill(0,191,255);
    rect(canyon.x_pos, 
         canyon.y_pos, 
         canyon.width, 
         canyon.height);

    for (var i = 0 ; i < mountains.length ; i++)
    {
        mountains[i].display();
    } 

    //draw clouds
    for(var i = 0; i < clouds.length; i++)
    {
        clouds[i].display();
        clouds[i].move();
    }

    for(var i = 0; i < trees_x.length; i ++)
    {
        console.log("trees loop " + i);
           //draw the tree
            fill(120, 100, 40);
            rect(trees_x[i], 
                 treePos_y, 
                 60, 
                 150);

            //branches
            fill(0, 155, 0);
            ellipse(trees_x[i] + 30, 
                    treePos_y, 
                    100, 
                    100);
            ellipse(trees_x[i], 
                    treePos_y + 20, 
                    80, 
                    80);
            ellipse(trees_x[i] + 60, 
                    treePos_y + 20, 
                    80, 
                    80);
            ellipse(trees_x[i] + 30, 
                    treePos_y + 20, 
                    80, 
                    80);
            ellipse(trees_x[i], 
                    treePos_y + 3, 
                    80, 
                    80);
            ellipse(trees_x[i] + 60, 
                    treePos_y + 3, 
                    80, 
                    80);
    } 
    
    //draw bushes
    for (var i=0; i < bushes.length; i++)
    {
        bushes[i].display();
    } 

    //draw the collectable item
    if(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 20)
        {
            collectable.isFound = true;
        }
    if(collectable.isFound == false)
    {
    fill(192,192,192);
    circle(collectable.x_pos, 
           collectable.y_pos, 
           collectable.size + 10);
    
    fill(218,165,32);
    circle(collectable.x_pos, 
           collectable.y_pos, 
           collectable.size - 10);
    }

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y -57, 35);

        //body
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 42, 16, 30);

        //feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 15, 10, 10);
        rect(gameChar_x - 1, gameChar_y - 12, 10, 10);

        //arms
        fill(200, 150, 150);
        rect(gameChar_x - 15, gameChar_y - 35, 7, 5);
        rect(gameChar_x + 3, gameChar_y - 35, 12, 5);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y -57, 35);

        //body
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 42, 16, 30);

        //feet
        fill(0);
        rect(gameChar_x - 9, gameChar_y - 12, 10, 10);
        rect(gameChar_x + 5, gameChar_y - 15, 10, 10);

        //arms
        fill(200, 150, 150);
        rect(gameChar_x - 15, gameChar_y - 35, 12, 5);
        rect(gameChar_x +8, gameChar_y - 35, 7, 5);

	}
	else if(isLeft)
	{
		// add your walking left code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y -50, 35);

        //body
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 35, 16, 30);

        //feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 8, 10, 10);
        rect(gameChar_x - 1, gameChar_y - 5, 10, 10);

        //arms
        fill(200, 150, 150);
        rect(gameChar_x - 15, gameChar_y - 28, 7, 5);
        rect(gameChar_x + 3, gameChar_y - 28, 12, 5);

	}
	else if(isRight)
	{
		// add your walking right code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y -50, 35);

        //body
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 35, 16, 30);

        //feet
        fill(0);
        rect(gameChar_x - 9, gameChar_y - 5, 10, 10);
        rect(gameChar_x + 5, gameChar_y - 8, 10, 10);

        //arms
        fill(200, 150, 150);
        rect(gameChar_x - 15, gameChar_y - 28, 12, 5);
        rect(gameChar_x +8, gameChar_y - 28, 7, 5);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y -57, 35);

        //body
        fill(255, 0, 0);
        rect(gameChar_x - 13, gameChar_y - 42, 26, 30);

        //feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 12, 10, 10);
        rect(gameChar_x + 5, gameChar_y - 12, 10, 10);

        //arms
        fill(200, 150, 150);
        rect(gameChar_x - 25, gameChar_y - 35, 12, 5);
        rect(gameChar_x +13, gameChar_y - 35, 12, 5);
        

	}
	else
	{
		// add your standing front facing code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y -50, 35);

        //body
        fill(255, 0, 0);
        rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

        //feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
        rect(gameChar_x + 5, gameChar_y - 5, 10, 10);

	}
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isLeft == true)
    {
        gameChar_x -= 5;
    }
    
    if(isRight == true)
    {
        gameChar_x += 5;
    }
    
    if(gameChar_y < floorPos_y)
    {
        gameChar_y += 1.5;
        isFalling = true;
    }
    else 
    {
        isFalling = false;
    }
    
    if(gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width && gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
    }
    
    if(isPlummeting == true)
    {
        gameChar_y += 10;
    }
    pop();
}
//class for clouds
class Cloud{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    display()
    {
        fill(255);
        ellipse(this.x + 150, 
            this.y + 100, 
            this.size);
        ellipse(this.x + 110, 
            this.y + 100, 
            this.size - 20);
        ellipse(this.x + 190, 
            this.y + 100, 
            this.size -20);
    }
    move()
    {
        this.x = this.x - 0.5;
    }
}

//class for mountains
class Mountain {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display(){
        fill(128);
        triangle(this.x + 140 * 2, 
                this.y - 86 * 2, 
                this.x + 180 * 2, 
                this.y, 
                this.x + 100 * 2, 
                this.y);
        triangle(this.x + 200 * 2, 
                this.y - 166 * 2, 
                this.x + 140 * 2, 
                this.y, 
                this.x + 260 * 2, 
                this.y);
        triangle(this.x + 240 * 2, 
                this.y - 106 * 2, 
                this.x + 200 * 2, 
                this.y, 
                this.x + 280 * 2, 
                this.y);
    }
}
//class for bushes
class Bush {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    display(){
        fill(0, 155, 0);
            ellipse(this.x + 30, 
                    this.y, 
                    100, 
                    100);
            ellipse(this.x, 
                    this.y + 20, 
                    80, 
                    80);
            ellipse(this.x + 60, 
                    this.y + 20, 
                    80, 
                    80);
            ellipse(this.x + 30, 
                    this.y + 20, 
                    80, 
                    80);
            ellipse(this.x, 
                    this.y + 3, 
                    80, 
                    80);
            ellipse(this.x + 60, 
                    this.y + 3, 
                    80, 
                    80);
    }
}
function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    if(keyCode == 65)//"A" key moves left
    {
        isLeft = true;
    }
    else if(keyCode == 68)//"D" key moves right
    {
        isRight = true;
    }
    else if(keyCode == 87)//"W" key jumps 
    {
        gameChar_y -= 100;
    }
    if(keyCode == 87 && isFalling == true)
    {
        gameChar_y += 100;    
    }
    if((keyCode == 87 || keyCode == 68 || keyCode == 65) && isPlummeting == true)
    {
        isLeft = false;
        isRight = false;
        gameChar_y += 100;
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(keyCode == 65)
    {
        console.log("left arrow");
        isLeft = false;
        console.log(isLeft);
    }
    else if(keyCode == 68)
    {
        console.log("right arrow");
        isRight = false;
        console.log(isRight);
    }
}
