// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.onload();
};

// Initialize the enemy's position and speed
Enemy.prototype.onload = function() {
    this.col = 1;
    this.x = 1 * this.col;
    // Random integer value for row(1~3) and speed(1~7)
    this.row = Math.floor(Math.random() * (4 - 1)) + 1;
    this.speed = (Math.floor(Math.random() * (7 - 1 + 1)) + 1) * 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.y = 83 * this.row;
    this.x += this.speed * dt;

    // If the enemy locate out of canvas, reset potion
    if (this.x > ctx.canvas.width) {
        this.onload();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.onload();
};

// Inheritance from Enemy to use render method
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

// Initialize the player's position
Player.prototype.onload = function() {
    this.col = 2;
    this.row = 5;
    this.x = 101 * this.col;
    this.y = 83 * this.row;
};

// Update the player's position,
Player.prototype.update = function() {
    // Check the player's position and make position in canvas.
    if (this.x > ctx.canvas.width - 101) {
        this.col = 4;
    } else if (this.x < 0) {
        this.col = 0;
    } else if (this.row > 5) {
        this.row = 5;
    }

    this.x = 101 * this.col;
    this.y = 83 * this.row;

    if (this.y < 0) {
        this.onload();
        this.score += 1;
        console.log(this.score);
        this.checkScore();
    }
};

// Check and display score in top of canvas
Player.prototype.checkScore = function() {
    ctx.fillStyle = "black";
    ctx.clearRect(ctx.canvas.width / 2 - 50.5, 0, 101, 40);
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.lineWidth = 3;
    ctx.fillText(this.score, ctx.canvas.width / 2, 40);
};

// Detect collision and count score
Player.prototype.checkLocation = function(ex, ey) {
    // Compare the player's position and the all enemies postions.
    if (Math.round(Math.round(ex) / 101) == Math.round(this.x / 101) && ey == this.y) {
        this.onload();
        this.score -= 1;
        if (this.score < 0) {
            this.score = 0;
        }
        this.checkScore();
    }
};

// Map keyboard input to console position
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.row = this.row - 1;
            break;
        case 'down':
            this.row = this.row + 1;
            break;
        case 'right':
            this.col = this.col + 1;
            break;
        case 'left':
            this.col = this.col - 1;
            break;
        default:
            console.log(key);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

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
