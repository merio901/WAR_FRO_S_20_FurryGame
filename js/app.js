var Furry = function() {
  this.axisX = 0;
  this.axisY = 0;
  this.direction = "right";
}

var Coin = function() {
  this.axisX = Math.floor(Math.random() * 10);
  this.axisY = Math.floor(Math.random() * 10);
}

var Game = function() {
  this.furry = new Furry();
  this.coin = new Coin();
  this.board = document.querySelectorAll('#board div');
  this.score = 0;
  this.index = function(x, y) {
    return x + (y * 10);
  };
  this.showFurry = function() {
    this.hideVisibleFurry();
    this.board[this.index(this.furry.axisX, this.furry.axisY)].classList.add('furry');
  };
  this.showCoin = function() {
    this.board[this.index(this.coin.axisX, this.coin.axisY)].classList.add('coin');
  };
  this.startGame = function(x) {
    var self = this;
    /* Generating new level */
    document.querySelector("#board").classList.remove('invisible');
    document.querySelector("#over").classList.add('invisible');
    var container = document.querySelector('.center-levels');
    var score = document.querySelector('#score');
    document.querySelector("body").insertBefore(score, document.querySelector("#board"));
    document.querySelector("body").insertBefore(container, document.querySelector("#score"));
    this.furry.axisX = 0;
    this.furry.axisY = 0;
    this.furry.direction = "right";
    this.score = 0;
    document.querySelector('#score div strong').innerText = this.score;
    newGame.showFurry();
    newGame.showCoin();
    this.idSetInterval = setInterval(function() {
      self.moveFurry();
    }, x);
  }
  this.moveFurry = function() {

    console.log(this.furry.direction);
    switch (this.furry.direction) {
      case "right": {
        this.furry.axisX +=1;
        break;
      }
      case "left": {
        this.furry.axisX -=1;
        break;
      }
      case "down": {
        this.furry.axisY +=1;
        break;
      }
      case "up": {
        this.furry.axisY -=1;
        break;
      }
    }
    console.log("Y: " + this.furry.axisY);
    console.log("X: " + this.furry.axisX);
    this.gameOver();
    this.showFurry();
    this.checkCoinCollision();
  }
  this.hideVisibleFurry = function() {
    var toHide = document.querySelectorAll('div[class=furry]');
    for (var i = 0; i < toHide.length; i++) {
      toHide[i].classList.remove('furry');
    }
  }
  this.turnFurry = function(event) {
    switch (event.which) {
      case 37: {
        this.furry.direction = "left";
        break;
      }
      case 38: {
        this.furry.direction = "up";
        break;
      }
      case 39: {
        this.furry.direction = "right";
        break;
      }
      case 40: {
        this.furry.direction = "down";
        break;
      }
    }
  }
  this.checkCoinCollision = function() {
    if(this.furry.axisY === this.coin.axisY && this.furry.axisX === this.coin.axisX) {
      document.querySelector('div[class~=coin]').classList.remove('coin');
      //this.levelUp();
      this.score += 1;
      document.querySelector('#score div strong').innerText = this.score;
      this.coin = new Coin();
      this.showCoin();
    }
  }
  this.gameOver = function () {
    if(this.furry.axisX < 0 || this.furry.axisX > 9 || this.furry.axisY < 0 || this.furry.axisY > 9){
      clearInterval(this.idSetInterval);
      document.querySelector("#board").classList.add('invisible');
      document.querySelector("#score-div").style.cssText = 'background-color: red; box-shadow: 5px 5px 10px springgreen';
      document.querySelector("#score-div").classList.remove('invisible');
      document.querySelector("#over").classList.remove('invisible');
      var container = document.querySelector('.center-levels');
      var score = document.querySelector('#score');
      document.querySelector("#over").appendChild(container);
      document.querySelector("#over").appendChild(score);
    }
  }
  /*
  this.levelUp = function() {
    var level = 50;
    switch (this.score) {
      case 0: {
        level = 700;
        break;
      }
      case 5: {
        level = 600;
        break;
      }
      case 10: {
        level = 500;
        break;
      }
      case 15: {
        level = 400;
        break;
      }
      case 20: {
        level = 200;
        break;
      }
    }
    console.log(level);
    return level;
  }
  */
}

var newGame = new Game();
var launchEasy = document.querySelector('#easy-game');
var launchMedium = document.querySelector('#medium-game');
var launchHard = document.querySelector('#hard-game');
var launchFurrious = document.querySelector('#furrious-game');

//Jak rozwiązać możliwość kliknięcia kilku gier w jednej sesji
//Ogólnie jak tworzyć kilka gier po kolei? (jakis reset button?) (DONE)
//Czemu buttony na GameOver screenie odpalają jakąs lipna gre (DONE)
//Tablice wyników
//Sound effects
//Jak zaimplementować zwiększanie się setIntervala co 10 pktów




launchEasy.addEventListener('click', function() {
  newGame.startGame(400);
})
launchMedium.addEventListener('click', function() {
  newGame.startGame(250);
})
launchHard.addEventListener('click', function() {
  newGame.startGame(100);
})
launchFurrious.addEventListener('click', function() {
  newGame.startGame(50);
})
document.addEventListener('keydown', function(event) {
  newGame.turnFurry(event);
})
