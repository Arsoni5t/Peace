
var fish = [];
        var velocity = 2; 

            function randomInt(min,max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }


            for(var i = 0; i <= 1000; i++) {
                var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomInt(0.5, 5)) // (point, radius)
                fish.push(circle) //push circle variable into fish array
            }

            for(var i = 0; i <= 1000; i++) {
                var colorSetter = Math.random();

                if(colorSetter >= .9) {
                    fish[i].fillColor = "black";
                } else if(colorSetter >= .8) {
                    fish[i].fillColor = "grey";
                } else (fish[i].fillColor = "white")
            }

            function assignRate() {
                for(var i = 0; i < fish.length; i++) {
                var assignedRate = Math.random() * velocity 
                fish[i].rate = assignedRate;
                }
            }

            assignRate()
            
            function onKeyDown(event) {
                if(event.key == 'f') {
                    velocity++;
                    assignRate();
                }

                 if(event.key == 's') {
                    velocity--;
                    assignRate();
                }
            }
    
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



       