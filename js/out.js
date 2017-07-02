/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
  this.showFury = function() {
    this.hideVisibleFurry();
    this.board[this.index(this.furry.axisX, this.furry.axisY)].classList.add('furry');
  };
  this.showCoin = function() {
    this.board[this.index(this.coin.axisX, this.coin.axisY)].classList.add('coin');
  };
  this.startGame = function() {
    var self = this;
    this.idSetInterval = setInterval(function() {
      self.moveFurry();
    }, 1000);
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
    this.showFury();
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
      document.querySelector('div[class=coin]').classList.remove('coin');
    }
  }

}

var newGame = new Game();
newGame.startGame();
newGame.showFury();
newGame.showCoin();
document.addEventListener('keydown', function(event) {
  newGame.turnFurry(event);
})


/***/ })
/******/ ]);