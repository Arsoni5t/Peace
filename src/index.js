

window.onresize = function(){ location.reload(); }


////////////////////////////////////////////////////
///////////FISH CIRCLES
        var fish = [];
        var velocity = -5;  ////// velocity of background

////////////////function to randomly choose the size of the background images
            function randomNumber(min,max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

/////////////// creates the background images(circles)
            for(var i = 0; i <= 100; i++) {
                var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomNumber(0.5, 7)) // (center point, radius)
				fish.push(circle) //push circle variable into fish array
					circle.onKeyDown = function(event) { ////removes with click
						if (event.key == 'space') {
							this.remove();
						}
        					
    				}
            }

////////////////assigns random colors
            for(var i = 0; i <= 100; i++) { 
                var colorSetter = Math.random();
                if(colorSetter >= .9) {
					fish[i].fillColor = "black";
                } else if(colorSetter >= .8) {
                    fish[i].fillColor = "grey";
                } else (fish[i].fillColor = "white")
            }

/////////////// function that determines the velocity of the background images
             function assignRate() {
                for(var i = 0; i < fish.length; i++) {
                var assignedRate = Math.random() * velocity -1
                fish[i].rate = assignedRate;
                }
			}
/////////////////////////////// run the random velocity function
////////////////ON KEY VELOCITY

           //// key press to speed up background
            function onKeyDown(event) {

            //     // if(event.key == 'f') {
            //     //     velocity++;
            //     //     assignRate();
            //     // }

            //     ////key press to slow down background
                 if(event.key == 's') {
                    velocity--;
                    assignRate();
				}
				
			}
			

/////////////////////////////////////////////////////////
			 assignRate()

 
////////////////////////////////////////////////////////////////
///////////////////STINGRAYS
var Stingrays = Base.extend({
	initialize: function(position, topSpeed, topPower) {
		var strength = Math.random() * .25;
		this.amount = strength * 8 + 8;
		this.topPower = topPower + strength ;
		this.topSpeed = topSpeed + strength;
		this.acc = new Point();
		this.route = Point.random() * 2 - 1;
		this.position = position.clone();
		this.count = 1;
		this.radius = 150;
		this.createItems();
	},

	run: function() {
		this.borders();
		this.update();
		this.tail();
		this.moveHead();
	},

//////////////////////////tail movement
	tail: function() {

		var speed = this.route.length;
		var pieceLength = 4 + speed / 3;
		var point = this.position;
		var segments = this.path.segments;
		var	smallSegPath = this.shortPath.segments;
		
		segments[0].point = smallSegPath[0].point = point;
		//  goes other way than movement
		var prevRoute = -this.route;
		for (var i = 1; i < this.amount; i++) {
			var route = segments[i].point - point-1;
			this.count += speed * 5;
			var wave = Math.sin((this.count + i * 5) / 400);
			var sway = prevRoute.rotate(50).normalize(wave);
			point += prevRoute.normalize(pieceLength) + sway;
			segments[i].point = point;
			if (i < 3)
				smallSegPath[i].point = point;
			prevRoute = route;
        }
        
		this.path.smooth();
	},

    
	createItems: function() {
		
		
///////////////////////tail shape
        this.path = new Path({
			strokeColor: 'gray',
			strokeWidth: 2,
			strokeLength: 12,
			strokeCap: 'round'
		});

		for (var i = 0; i < this.amount; i++)
			this.path.add(new Point());

			this.shortPath = new Path({
				strokeColor: 'gray',
				strokeWidth: 5,
				strokeLength: 1,
				strokeCap: 'round'
			});


		for (var i = 0; i < Math.min(3, this.amount); i++)
		this.shortPath.add(new Point());
		var topLeft = view.center - [7, 7];
	    var bottomRight = view.center + [11, 11];
	   
//////////////////////string ray head shape 
			   this.head2 = 
				   new Path.Rectangle({
				   topLeft: topLeft,
				   bottomRight: bottomRight,
				   fillColor: {
					   gradient: {
						   stops: ['black', 'grey', 'white']
					   },
					   origin: topLeft,
					   destination: bottomRight
				   },
				   opacity: .9,
				   radius: 3
				   });

	},
	
	moveHead: function() {
		// this.head.position = this.position;
        // this.head2.rotation = this.route.angle;
        // this.head.rotation = 0
        this.head2.position = this.position; ///giant fish movement
        // this.head.rotation = this.route.angle;
        this.head2
	},


	update: function() {
		// velocity
		this.route += this.acc;
		// speed max
		this.route.length = Math.min(this.topSpeed, this.route.length);
		this.position += this.route;
		// Reset acc to 0 each cycle
		this.acc = new Point();
	},


	borders: function() {
		var route = new Point();
		var position = this.position  
		var radius = this.radius;
        var size = view.size;
        ///////// these lines generate new stingrays so they don't all disappear
		if (position.x < -radius) route.x = size.width + radius; 
		if (position.y < -radius) route.y = size.height + radius;
		if (position.x > size.width + radius) route.x = -size.width -radius;
		if (position.y > size.height + radius) route.y = -size.height -radius;
		if (!route.isZero()) {
			this.position += route;
			for (var i = 0; i < this.amount; i++) {
				this.path.segments[i].point += route;
			}
        }
	}
});


//////////////// Add the stingrays:
var stingrays = [];
for (var i = 0; i < 20; i++) { //number of stingrays
	var position = Point.random() * view.size;
	stingrays.push(new Stingrays(position, 10, .05));
}
//////////////////////////////////////
/////////////JELLYFISH

var Jellyfish = Base.extend({
	initialize: function(position, topSpeed, topPower) {
		var strength = Math.random() * .25;
		this.amount = strength * 8 + 8;
		this.topPower = topPower + strength ;
		this.topSpeed = topSpeed + strength;
		this.acc = new Point();
		this.route = Point.random() * 2 - 1;
		this.position = position.clone();
		this.count = 1;
		this.radius = 150;
		this.createItems();
	},

	run: function(jellyfish) {
		this.borders();
		this.update();
		this.tail();
		this.moveHead();
	},

//////////////////////////tail movement
	tail: function() {

		var speed = this.route.length/4;
		var pieceLength = 4 + speed / 3;
		var point = this.position;
		var segments = this.path.segments;
		var	smallSegPath = this.shortPath.segments;
		
		segments[0].point = smallSegPath[0].point = point;
		//  goes other way than movement
		var prevRoute = -this.route;
		for (var i = 1; i < this.amount; i++) {
			var route = segments[i].point - point-1;
			this.count += speed * 5;
			var wave = Math.sin((this.count + i * 5) / 400);
			var sway = prevRoute.rotate(50).normalize(wave);
			point += prevRoute.normalize(pieceLength) + sway;
			segments[i].point = point;
			if (i < 3)
				smallSegPath[i].point = point;
			prevRoute = route;
        }
        
		this.path.smooth();
	},

///////////////////////////////////////
////////////CREATE ITEMS JELLYFISH    
	createItems: function() {
		
		
///////////////////////tail shape
        this.path =
        
        new Path({
			strokeColor: 'gray',
			strokeWidth: 0,
			strokeLength: 0,
			strokeCap: 'round',
			opacity: 0
		});
		for (var i = 0; i < this.amount; i++)
		this.path.add(new Point());
		
		this.shortPath = new Path({
			strokeColor: 'gray',
			strokeWidth: 0,
			strokeLength: 0,
			strokeCap: 'round',
			opacity: 0
		});


		for (var i = 0; i < Math.min(3, this.amount); i++)
        this.shortPath.add(new Point());
   
//////////////////////JELLYFISH HEAD 

//////////////////////string ray head shape 
			   this.jelly = new Path.Circle(new Point(470, 470), 10);
            this.jelly.strokeColor = 'yellow';
            this.jelly.fillColor = '#fb9062';
            this.jelly.opacity = .7;
            this.jelly.selected = false;
            this.jelly.removeSegment(3);;

	},
	
//////////////////////////END CREATE ITEMS JELLYFISH


	moveHead: function() {
		// this.jelly.rotation = this.route.angle;
		this.jelly.rotation = 0;
        this.jelly.position = this.position; 
        // this.jelly
	},


	update: function() {
		// velocity
		this.route += this.acc;
		// speed max
		this.route.length = Math.min(this.topSpeed, this.route.length);
		this.position += this.route / 2;
		// Reset acc to 0 each cycle
		this.acc = new Point();
	},


	borders: function() {
		var route = new Point();
		var position = this.position  
		var radius = this.radius;
        var size = view.size;
        ///////// these lines generate new jellyfish once they leave screen
		if (position.x < -radius) route.x = size.width + radius; 
		if (position.y < -radius) route.y = size.height + radius;
		if (position.x > size.width + radius) route.x = -size.width -radius;
		if (position.y > size.height + radius) route.y = -size.height -radius;
		if (!route.isZero()) {
			this.position += route;
			for (var i = 0; i < this.amount; i++) {
				this.path.segments[i].point += route;
			}
        }
	}
});


//////////////// Add the jellyfish:
var jellyfish = [];
for (var i = 0; i < 10; i++) { //number of jellyfish
	var position = Point.random() * view.size;
	jellyfish.push(new Jellyfish(position, 10, .05));
}

////////////////////////////////////////////////////
///////////////////////////DOLPHIN
	// for(var i = 0; i < 18; i++){
		var raster = new Raster({
    	source: './../assets/images/dolphinright/'+0+'.gif',
		position: [550,400],
		smoothing: true,
		});
		// if(i==17) {
		// 	i=0; continue;
		// }
	// }
////////////DOLPHIN MOVEMENT
raster.onMouseDrag = function(event) {
	raster.position += event.delta;
}



////////////////////////////////////////////////////
////////////////////// SURFACE
// amount of segment points
var amount = 4;

//////////// max height of wave
var height = 20;

///////////////// the wave line
var path = new Path({
    strokeColor: "#3D76E0",
	strokeWidth: 120,
	strokeCap: 'circle',
	shadowColor: new Color(0, 0, 1),
    shadowBlur: 1,
    shadowOffset: new Point(1, 1)
});

for (var i = 0; i <= amount; i++) {
	path.add(new Point(i / amount, 1) * view.size);
}

///////////TEXT

var text = new PointText({
    point: [50, 50],
    content: 'Programmed by: Brad Larson',
    fillColor: 'white',
    fontFamily: 'FreeMono',
    fontWeight: 'italic',
	fontSize: 20, 
	opacity: .8,
	angle: 25,
	shadowColor: new Color(0,0,0),
    shadowBlur: 5,
    shadowOffset: new Point(2, 4)
});

///////////////////////////////////////////////
////////////////////////////////////////////
/////////////ANIMATION

function onFrame(event) {
	
///////////////////stingrays on frame
	for (var i = 0; i < stingrays.length; i++) {
		stingrays[i].run(stingrays);
	}
////////////////fish circles on frame
    for(var i = 0; i < fish.length; i++) {
		fishy = fish[i]
        fishy.translate(fishy.rate, 0)
            if(fishy.position.x > view.size.width) {
                fishy.position.x = 0;
            } else if(fishy.position.x < 0 ) {
                fishy.position.x = view.size.width;
			}
		}
//////////////////////jellyfish on frame	
	for(var i = 0; i < jellyfish.length; i++) {
		jellyfish[i].run(jellyfish);
	}
////////////////////water surface on frame	
    for (var i = 0; i <= amount; i++) {
		var segment = path.segments[i];
		var wave = Math.sin(event.time * 3 + i);
		segment.point.y = wave * height + 35;
	}


    path.smooth();
}
