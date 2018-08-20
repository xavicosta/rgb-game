import RgbGuessingGameBox from './rgbGuessingGameBox.js';
import Helper from './rgbHelper.js';

class RgbGuessingGame {
    constructor(numberOfBoxes) {
        this.reset(numberOfBoxes);
    }
}

RgbGuessingGame.prototype.reset = function (numberOfBoxes) {
    this.rgbToGuess = Helper.getRandomRgb();
    this.numberOfBoxes = numberOfBoxes;
    this.guessingBoxes = this.generateGuessingBoxes();
    this.setWinner();
}

RgbGuessingGame.prototype.generateGuessingBoxes = function () {
    var guessingBoxesArray = new Array();

    for (var i = 0; i < this.numberOfBoxes; i++) {
        var rgb = this.getRandomRgbForBox(guessingBoxesArray);
        guessingBoxesArray[i] = new RgbGuessingGameBox("guessingBox-" + (i + 1), rgb);
    }

    return guessingBoxesArray;
}

RgbGuessingGame.prototype.getRandomRgbForBox = function (guessingBoxesArray) {
    do {
        var rgb = Helper.getRandomRgb();
        var foundElement = guessingBoxesArray.find(function (guessingBox) {
            return guessingBox.rgb === rgb;
        });
    } while (foundElement)

    return rgb;
}

RgbGuessingGame.prototype.setWinner = function () {
    var randomBox = Math.floor(Math.random() * this.guessingBoxes.length);
    this.guessingBoxes[randomBox].rgb = this.rgbToGuess;
}

RgbGuessingGame.prototype.isWinner = function (rgb) {
    return this.rgbToGuess === rgb;
}

export default RgbGuessingGame;