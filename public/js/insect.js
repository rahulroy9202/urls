//a code challenge. no purpose here. just wanted to test it in console.
/*

PROBLEM STATEMENT

A spy agency has built a squad of robotic insects, that are small enough to infiltrate enemy buildings. The enemy headquarters has several rectangular rooms which must be navigated by the insects in order to reach and photograph secret documents.

An insect's location is represented by x and y coordinates. It's heading is represented by one of four cardinal compass points. The room is divided into a grid to simplify navigation. An example position could be <0, 0, N>, which means that the insect is at the bottom-left corner and facing north.

Being a robot with limited computing capacity, the insect is only capable of understanding very simple commands:
L -- makes the insect turn left 90 degrees
R -- makes the insect turn right 90 degrees
F -- make the insect move forward 1 square
Assume the square directly north of <x, y> is <x, y+1>.


INPUT

The first line of input represents the size of the room with the base index being <0, 0>.

The rest of the input is data pertaining to the insects that have been deployed. Each insect has two lines of input. The first line gives the insect's position, and the second line is the sequence of commands that tell the insect where to navigate.

Each insect will finish it's navigation sequentially, which means that the second insect wont start moving until the first one has finished moving.


OUTPUT

The output for each insect should be its final coordinates and heading.


SAMPLE INPUT AND OUTPUT

Input:
5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF

Expected output:
1 3 N
5 1 E


*/
function Insect(_board, x, y, h) {
	
	if( (x >= 0 && x <= _board.x) && (y >= 0 && y <= _board.y) && 'NSEW'.indexOf(h)>-1) {
		this.board = _board;
		this.x = x;
		this.y = y;
		this.h = h;		//heading char
	}
	else
		return null;
}

Insect.prototype = {
	
	constructor: Insect,
	
	processInput: function( _line ) {		// expecting string as argument
		
		var input = _line.split('');
		
		for(var i in input) {
			var x = 'LRF'.indexOf(input[i])
			switch(x) {
				case 0: this.turnLeft();
					break;
				case 1: this.turnRight();
					break;
				case 2: this.moveForward();
					break;
				default: return console.log("unknown instruction");
			}
			
			this.draw();					// to draw on board. <not implimented>
		}
		
		return this.output();						// console output as described in challenge.
	},
	
	moveForward: function() {
		var x = 'NSEW'.indexOf(this.h);
		
		switch(x) {
			case 0: 
				if(this.y < this.board.y)
					this.y++;			//move up
				break;
				
			case 1: 
				if(this.y > 0)
					this.y--;			//move down
				break;				
			
			case 2: 
				if(this.x > 0)
					this.x--;			//move left
				break;
				
			case 3: 
				if(this.x < this.board.x)
					this.x++;			//move right
				break;
				
			default: return console.log("unknown direction");
		}
	},
	
	turnLeft: function() {
		var x = 'NESW'.indexOf(this.h);
		this.h = 'NESW'[(x+1) % 4];		// ---> turn to next char
	},
	
	turnRight: function() {
		var x = 'NWSE'.indexOf(this.h);
		this.h = 'NWSE'[(x+1) % 4];
	},
	
	draw: function() {
		// TODO - Impliment Draw
	},
	
	output: function() {
		console.log("%s %s %s",this.x, this.y, this.h);
		return ({x:this.x, y:this.y, h:this.h});
	}
}