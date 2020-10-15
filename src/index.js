

window.onresize = function(){ location.reload(); }

// 




// var dolphin = [];
// for(let i = 0; i < 18; i++) {
// 	dolphin[i] = new Image();
// 	dolphin[i].src = "https://webfilms-films.s3.amazonaws.com/dolphin/"+i+".gif"
// }
// var dolphin = [];
// var size = new Size(10, 5);
// var raster = new Raster({
//     source: 'https://webfilms-films.s3.amazonaws.com/dolphin.gif',
// 	position: [250,400],
// 	size: [125,70],
// });

// var raster = new paper.Raster({
//   source: crag_image, //notice here
//   position: paper.view.center
// });
///////////'fish circles'
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
					circle.onKeyDown = function(event) { ////removes with click
						if (event.key == 'space') {
							this.remove();
						}
        					
    				}
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
                var assignedRate = Math.random() * velocity -1
                fish[i].rate = assignedRate;
                }
            }

            // run the random velocity function
            assignRate()
            

    
////////////////////////////////////////////////////////////////
//spermy fish
var Swimmers = Base.extend({
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

	run: function(swimmers) {
		this.borders();
		this.update();
		this.tail();
		this.moveHead();
	},

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
		
		
		//////tail shape
        this.path =
        
        new Path({
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
	   
//////////////////////head shape 
			   this.head2 = 
			  // new Path({ ////giant fish
			   //          segments: [[40, 100], [40, 143], [60,125], [70, 125],
			   // 	   [90, 140], [105, 140],[115,135], [120, 130],
			   // 	   [120, 127], [124, 127], [124, 122], [120, 122],
			   // 	   [115, 118],[108, 110],[102, 108], [92, 108], 
			   // 	   [87, 110],[75, 115],[60,115], [40, 100]
					  
			   // 	  ],
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
        ///////// these lines generate new spermys so they dont all just disappear
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




           //// key press to speed up background
            function onKeyDown(event) {

                // if(event.key == 'f') {
                //     velocity++;
                //     assignRate();
                // }

                //key press to slow down background
                 if(event.key == 's') {
                    velocity--;
                    assignRate();
                }
			}
			




var swimmers = [];

// Add the swimmers:
for (var i = 0; i < 20; i++) { //number of spermys
	var position = Point.random() * view.size;
	swimmers.push(new Swimmers(position, 10, .05));
}




var text = new PointText({
    point: [50, 50],
    content: 'Programmed by: Brad Larson',
    fillColor: 'white',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
	fontSize: 25, 

});
//////////////////////////////////////////////////////////
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
	shadowColor: new Color(0, 0, 1),
    shadowBlur: 1,
    shadowOffset: new Point(1, 1)
});


// Add 5 segment points to the path spread out over the width of the view
for (var i = 0; i <= amount; i++) {
	path.add(new Point(i / amount, 1) * view.size);
}


var raster = new Raster({
    source: './../assets/images/dolphinright/0.gif',
	position: [250,400],
	smoothing: true
});

raster.onMouseDrag = function(event) {
	raster.position += event.delta;
}

var text = new PointText({
    point: [50, 50],
    content: 'Programmed by: Brad Larson',
    fillColor: 'white',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
	fontSize: 20, 
	opacity: .8,
	angle: 25,
	shadowColor: new Color(0,0,0),
    // Set the shadow blur radius to 12:
    shadowBlur: 5,
    // Offset the shadow by { x: 5, y: 5 }
    shadowOffset: new Point(2, 4)
});


function onFrame(event) {
	
	///////////////tamponys on frame
	for (var i = 0, l = swimmers.length; i < l; i++) {
		swimmers[i].run(swimmers);
	}
	////////////fish circles on frame
    for(var i = 0; i < fish.length; i++) {
		fishy = fish[i]
        fishy.translate(fishy.rate, 0)
            if(fishy.position.x > view.size.width) {
                fishy.position.x = 0;
            } else if(fishy.position.x < 0 ) {
                fishy.position.x = view.size.width;
			}
		//   if (event.count % 2 === 0) {
		// 		fishy.rotate(25);
  		// 	  } else if (event.count % 1 === 0) {
		// 		fishy.rotate(-25);
  		// 	}

		}
	// for(var i = 0; i < fish.length; i += 3) {
	// 	fish[i].scale(.999)
	// }
	///////////water surface on frame	
    for (var i = 0; i <= amount; i++) {
		var segment = path.segments[i];
		var wave = Math.sin(event.time * 3 + i);
		segment.point.y = wave * height + 35;
	}


    path.smooth();
}