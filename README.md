Welcome to the Peace wiki!

## Background and Overview
The objective of this project is to create a relaxing, interactive environment.

I went to school in Hawaii and fell in love with snorkeling.

The water is a place I find peace and serenity and I want to recreate that using JS and HTML5.

## Functionality
Random fish will be swimming around  in the background and foreground, upon button presses, the user will be able to add fish that swim through the scene.

## MVPs 
     In Peace, users will be able to: 
     * View a variety of tropical fish swimming around.

     * Create fish with the tap of a keyboard button. 
         * Different buttons will generate different kinds/colors of fish
         
     * Listen to calming, ambient sounds.

## Wireframe
![](https://webfilms-films.s3.amazonaws.com/ezgif.com-gif-maker.gif)

## Architecture and Technology
     * Use paper.js to create animations of fish swimming in the water
     * Howler.js will be implemented for audio

## Implementation Timeline
    DAY 1:
     Setup paper.js files, webpack and ensure everything is working harmoniously. 
        * Read docs about using Paperscript in sync with paper.js 
        * Render AI 'fish' in foreground and background. 
            * Begin by using basic circles or rectangles to test movement and animation
            * Once speed, and random movements work, redesign to make look more 'fish-like' 

    DAY 2: 
     Dedicate the day to animating movement and design of fish using paper.js paths
     Color background and fish to create realistic environment using scss
          
    DAY 3:
     Map keys so user key presses will generate fish movement across the screen
         * paper.js docs provide instructions for key mapping and events
         * fish should come out at different velocities and go in different directions based on the key press
     
    DAY 4: 
     Continue mapping, if necessary
     Use howler.js to add sound elements and controls to the user interface. 
         * user should be able to control volume 
         * various choices for ambient sound user can select
         
## Bonus features
     * collision detection? 
     * Turtles
     * Ripples on the water surface
