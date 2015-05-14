var GameConfig = require("./game-configs/classic");
// var GameConfig = require("./game-configs/spock-lizard");

var GameLogic = require("./game-logic")(GameConfig);

var DomHelper = require("./dom-helper");
var UI = require("./ui")(DomHelper, document);

var Game = require("./game")(GameLogic, UI);
Game.initGame();
