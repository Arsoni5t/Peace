Welcome to the Peace wiki!

## Background and Overview
Peace is a visually appealing and thought provoking interactive game where the user navigates a dolphin through an ocean scene and cleans up the plastic pollution. 

## Functionality
User will navigate a dolphin sprite around a moving ocean scene scape and while the sprite comes in contact with a piece of plastic, will remove the item with a mouse click.

## MVPs 
     In Peace, users will be able to: 
     * Maneuver Peace, our hero dolphin, around the Canvas ocean scene

     * On mouse click, while Peace's snout is hovering over the plastic pieces, remove the item from the ocean
         
     * Observe the total remaining pieces of plastic decrease as they are removed from the Canvas

     * Mute the environmental ocean sounds

## Game Screen
### Gameplay sample:
![](https://webfilms-films.s3.amazonaws.com/ezgif.com-gif-maker.gif)

### Key:
![](https://webfilms-films.s3.amazonaws.com/key+copy.png)

## Architecture and Technology
     * Use Canvas, Paper.js and PaperScript to create animations of fish-like objects swimming in the water
     * Custom CSS cursor to move and animate the dolphin swimming around the Canvas window
     * Implement PaperScript's mouse handler's to remove objects on click

## Implementation Timeline
    DAY 1:
     Setup paper.js files, webpack and ensure everything is working harmoniously. 
        * Read docs about using PaperScript in sync with paper.js 
        * Render AI 'fish' in foreground and background. 
            * Begin by using basic circles or rectangles to test movement and animation
            * Once speed, and random movements work, redesign to make look more 'fish-like' 

    DAY 2: 
     Dedicate the day to animating movement and design of fish using paper.js paths
     Color background and fish to create realistic environment using scss
          
    DAY 3:
     Map mouse handler so user clicks will remove plastic from the screen
         * paper.js docs provide instructions for mapping and events
         * countdown remaining items as they are removed
     
    DAY 4: 
     Continue mapping, if necessary
     Use html5 audio tag to bring ambient sound to the game
         * user should be able to mute sound effects 
     Clean up and style as necessary
         
## Bonus features
     * Ripples on the water surface
     * Peace health bar that decreases if he touches tentacles/barbs of the other fish
     * Draw Turtles
     
