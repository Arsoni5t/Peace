
    
    //'fish circles'
        var fish = [];
        var velocity = 2; 

            //function to randomly choose the size of the background images
            function randomNumber(min,max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            // creates the background images(circles)
            for(var i = 0; i <= 100; i++) {
                var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomNumber(0.5, 7)) // (center point, radius)
                fish.push(circle) //push circle variable into fish array
            }

            //assigns random colors
            for(var i = 0; i <= 100; i++) { 
                var colorSetter = Math.random();

                if(colorSetter >= .9) {
                    fish[i].fillColor = "black";
                } else if(colorSetter >= .8) {
                    fish[i].fillColor = "grey";
                } else (fish[i].fillColor = "white")
            }

            // function that determines the velocity of the background images
             function assignRate() {
                for(var i = 0; i < fish.length; i++) {
                var assignedRate = Math.random() * velocity 
                fish[i].rate = assignedRate;
                }
            }

            // run the random velocity function
            assignRate()
            

            // key press to speed up background
            function onKeyDown(event) {
                if(event.key == 'f') {
                    velocity++;
                    assignRate();
                }

                //key press to slow down background
                 if(event.key == 's') {
                    velocity--;
                    assignRate();
                }
            }
    
            // regenerates background images once they float off screen
            function onFrame(event) {
                for(var i = 0; i < fish.length; i++) {
                    fish[i].translate(fish[i].rate, 0)
                        if(fish[i].position.x > view.size.width) {
                            fish[i].position.x = 0;
                        } else if(fish[i].position.x < 0 ) {
                            fish[i].position.x = view.size.width;
                        }
                }
            }
//////////////////////////////////////
//spermy fish
var Swimmers = Base.extend({
	initialize: function(position, maxSpeed, maxForce) {
		var strength = Math.random() * .25;
		this.acceleration = new Point();
		this.vector = Point.random() * 2 - 1;
		this.position = position.clone();
		this.radius = 50;
		this.maxSpeed = maxSpeed + strength;
		this.maxForce = maxForce + strength;
		this.amount = strength * 8 + 8;
		this.count = 0;
		this.createItems();
	},

	run: function(swimmers) {
		this.lastLoc = this.position.clone();
		this.borders();
		this.update();
		this.calculateTail();
		this.moveHead();
	},

	calculateTail: function() {
		var segments = this.path.segments,
			shortSegments = this.shortPath.segments;
		var speed = this.vector.length;
		var pieceLength = 2 + speed / 3;
		var point = this.position;
		segments[0].point = shortSegments[0].point = point;
		// Chain goes the other way than the movement
		var lastVector = -this.vector;
		for (var i = 1; i < this.amount; i++) {
			var vector = segments[i].point - point-1;
			this.count += speed * 5;
			var wave = Math.sin((this.count + i * 5) / 900);
			var sway = lastVector.rotate(50).normalize(wave);
			point += lastVector.normalize(pieceLength) + sway;
			segments[i].point = point;
			if (i < 3)
				shortSegments[i].point = point;
			lastVector = vector;
		}
		this.path.smooth();
	},

    
	createItems: function() {
        function randomNumber(min,max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
		this.head = 
            new Path.RegularPolygon({
            center: [10, 10],
            sides: 5,
            radius: 8,
            fillColor: 'black'
            });

            new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomNumber(0.5, 7))

		this.path = new Path({
			strokeColor: 'pink',
			strokeWidth: 1,
			strokeCap: 'round'
		});
		for (var i = 0; i < this.amount; i++)
			this.path.add(new Point());

		this.shortPath = new Path({
			strokeColor: 'pink',
			strokeWidth: 1,
			strokeCap: 'round'
		});
		for (var i = 0; i < Math.min(3, this.amount); i++)
			this.shortPath.add(new Point());
	},

	moveHead: function() {
		this.head.position = this.position;
        // this.head.rotation = this.vector.angle;
        this.head.rotation = 0
	},

	// We accumulate a new acceleration each time based on three rules
	flock: function(swimmers) {
		var separation = this.separate(swimmers) * 3;
		var alignment = this.align(swimmers);
		var cohesion = this.cohesion(swimmers);
		this.acceleration += separation + alignment + cohesion;
	},

	update: function() {
		// Update velocity
		this.vector += this.acceleration;
		// Limit speed (vector#limit?)
		this.vector.length = Math.min(this.maxSpeed, this.vector.length);
		this.position += this.vector;
		// Reset acceleration to 0 each cycle
		this.acceleration = new Point();
	},


	borders: function() {
		var vector = new Point();
		var position = this.position - 120.2; ///where the spermys
		var radius = this.radius;
		var size = view.size;
		if (position.x < -radius) vector.x = size.width + radius;
		if (position.y < -radius) vector.y = size.height + radius;
		if (position.x > size.width + radius) vector.x = -size.width -radius;
		if (position.y > size.height + radius) vector.y = -size.height -radius;
		if (!vector.isZero()) {
			this.position += vector;
			var segments = this.path.segments;
			for (var i = 0; i < this.amount; i++) {
				segments[i].point += vector;
			}
		}
	}


});


var swimmers = [];



            // creates the background images(circles)
            for(var i = 0; i <= 100; i++) {
                var square = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomNumber(0.5, 7)) // (center point, radius)
                fish.push(circle) //push circle variable into fish array
            }

// Add the swimmers:
for (var i = 0; i < 20; i++) { //number of spermys
	var position = Point.random() * view.size;
	swimmers.push(new Swimmers(position, 10, .05));
}


function onFrame(event) {
	for (var i = 0, l = swimmers.length; i < l; i++) {
		swimmers[i].run(swimmers);
    }
    for(var i = 0; i < fish.length; i++) {
        fish[i].translate(fish[i].rate, 0)
            if(fish[i].position.x > view.size.width) {
                fish[i].position.x = 0;
            } else if(fish[i].position.x < 0 ) {
                fish[i].position.x = view.size.width;
            }
        }

        //surface animation
    for (var i = 0; i <= amount; i++) {
		var segment = path.segments[i];
		// A cylic value between -1 and 1
		var sinus = Math.sin(event.time * 3 + i);
		// changes the y position of the segment point
		segment.point.y = sinus * height + 35;
	}
	// to smooth the path
    path.smooth();

}

///////////////////////////////
    // surface 
// amount of segment points
var amount = 4;

// max height of wave
var height = 20;

// the wave line
var path = new Path({
    strokeColor: "#3D76E0",
    // opacity: .9,
	strokeWidth: 120,
    strokeCap: 'circle',
});


// Add 5 segment points to the path spread out over the width of the view
for (var i = 0; i <= amount; i++) {
	path.add(new Point(i / amount, 1) * view.size);
}
