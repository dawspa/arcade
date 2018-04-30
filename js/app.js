const Enemy = function (x, y) {
    this.sprite = enemySprite(); //enemy array  variable
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 180) + 120);
};

const ImageArray = ['images/car_black_1.png', 'images/car_blue_2.png', 'images/car_green_3.png', 'images/car_red_4.png', 'images/car_yellow_5.png'];

let enemySprite = function () {
    let pos = Math.floor(Math.random() * 5);
    return ImageArray[pos];
};

Enemy.prototype.update = function(dt) {
    if (this.x <= 505) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () {
    this.sprite = 'images/motorcycle_red.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function () {
    let hero = this;
    if (this.pressedKey === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }

    if (this.pressedKey === 'right' && this.x < 400) {
        this.x = this.x + 100;
    }

    if (this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    if (this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    this.pressedKey = null;

    if (this.y < 0) {
        this.reset();
    }

    allEnemies.forEach(function (enemy) {
        if (hero.x >= enemy.x - 45 && hero.x <= enemy.x + 45) {
            if (hero.y >= enemy.y - 25 && hero.y <= enemy.y + 25) {
                hero.reset();
            }
        }
    });
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (e) {
    this.pressedKey = e;
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

const allEnemies = [];

(function displayEnemies() {
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());

let player = new Player();

document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});