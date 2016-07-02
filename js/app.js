// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //TODO: delete this test.png reference
    // this.sprite = 'images/test.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        this.x = this.x + this.speed * dt;
        // If Enemy moves off screen reset speed and row
        if(this.x > ctx.canvas.width + 101){
            this.x = -101;
            this.speed = this.randomSpeed();
            this.y = this.randomRow();
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 0, 70, 101, 83, this.x, this.y, 101, 83);
};

Enemy.prototype.randomSpeed = function(){
    // Random Integer example from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    // Math.floor(Math.random() * (max - min)) + min;
    var moveMultiplier = 50;
    return (Math.floor(Math.random() * (6 - 3)) + 3) * moveMultiplier;
};

Enemy.prototype.randomRow = function(){
    // Simplified version of Random integer see Enemy.prototype.randomSpeed
    // 83 is height of playing field block and 50 is transparent height of first block
    return (Math.floor(Math.random() * 3) + 1) * 83 + 50;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //TODO: this is default char - add option to change to new char.
    this.sprite = 'images/char-pink-girl.png';
    //TODO: Delete test.png before final project - full dark image for testing purposes of grid
    // this.sprite = 'images/test.png';
    // Set player start position to middle of grass.
    // Set max and min positions for player movement.
    // Sprites are 101w x 171 h but drawn in overlay. Actual board squares for playing are 101w x 83h.
    this.x = 101 * 2;
    this.y = 50 + (83 * 4); // 50 is th space from the top of the canvas to non-transparent part of the first row.
    this.maxX = 404;
    this.minX = 0;
    this.maxY = 83 * 6;
    this.minY = 0;

};
// Updte the player's position
Player.prototype.update = function(dt){
  //  console.log('dt: ' + dt);

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    //Draw only selection of sprite to fit grid of 101 * 83
    ctx.drawImage(Resources.get(this.sprite), 0, 60, 101, 83, this.x, this.y, 101, 83);

    //TODO: Delete the grid before final project
    //see grid for development
    //draw row lines
    for(var y = 50; y < 606; y=y+83){
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(505, y);
        ctx.stroke();
    };
    //draw column lines
        for(var x = 0; x < 606; x=x+101){
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 606);
        ctx.stroke();
    };
    //End draw grid.
};

Player.prototype.handleInput = function(keycode) {
    switch(keycode){
        case 'left':
            if(this.x - 101 >= this.minX ){this.x = this.x - 101};
            break;
        case 'right':
            if(this.x + 101 <= this.maxX ){this.x = this.x + 101};
            break;
        case 'up':
            if(this.y - 83 >= this.minY ){this.y = this.y - 83};
            break;
        case 'down':
            if(this.y + 83 <= this.maxY ){this.y = this.y + 83};
            break;

    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var countOfEnemies = 3;
var allEnemies = [];
for(var i = 0; i < countOfEnemies; i++){
    allEnemies.push(new Enemy);
    allEnemies[i].x = -101; //Object starting position is offscreen
    allEnemies[i].y = allEnemies[i].randomRow() ;
    allEnemies[i].speed = allEnemies[i].randomSpeed();
};

var player = new Player;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
