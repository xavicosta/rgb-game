class RgbGuessingGame {
    constructor(numberOfBoxes) {
        this.reset(numberOfBoxes);
    }
}

RgbGuessingGame.prototype.reset = function (numberOfBoxes) {
    this.rgbToGuess = getRandomRgb();
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
        var rgb = getRandomRgb();
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


class RgbGuessingGameBox {
    constructor(id, rgb) {
        this.id = id;
        this.rgb = rgb
    }
}


const NUM_BOXES_EASY_MODE = 3;
const NUM_BOXES_HARD_MODE = 6;
const DEFAULT_RGB = "steelblue";

var rgbGame = new RgbGuessingGame(NUM_BOXES_HARD_MODE);

var rgbSpan = document.getElementById("rgbSpan");
var newGameButton = document.getElementById("newGameButton");
var easyModeButton = document.getElementById("easyModeButton");
var hardModeButton = document.getElementById("hardModeButton");
var guessingBoxesContainer = document.getElementById("guessingBoxesContainer");
var headerDiv = document.getElementById("headerDiv");

newGameButton.addEventListener("click", function () {
    rgbGame.reset(rgbGame.guessingBoxes.length);
    initialise(rgbGame);
});

easyModeButton.addEventListener("click", function () {
    changeGameDifficulty(rgbGame, NUM_BOXES_EASY_MODE);
});

hardModeButton.addEventListener("click", function () {
    changeGameDifficulty(rgbGame, NUM_BOXES_HARD_MODE);
});

initialise(rgbGame);

function initialise(rgbGame) {
    removeChilds(guessingBoxesContainer);
    createGuessingBoxes(rgbGame);
    rgbSpan.textContent = rgbGame.rgbToGuess;
    headerDiv.style.backgroundColor = DEFAULT_RGB;
}

function createGuessingBoxes(rgbGame){
    rgbGame.guessingBoxes.forEach(guessingBox => {
        createGuessingButton(guessingBox);
    });
}

function changeGameDifficulty(rgbGame, newNumberOfBoxes) {
    if (rgbGame.numberOfBoxes === newNumberOfBoxes) {
        return;
    }
    rgbGame.reset(newNumberOfBoxes);
    initialise(rgbGame);
    toggleActiveMenu();
}

function toggleActiveMenu() {
    easyModeButton.parentElement.classList.toggle("active");
    hardModeButton.parentElement.classList.toggle("active");
}

function createGuessingButton(guessingBox) {
    var button = document.createElement("div");
    button.id = guessingBox.id;
    button.style.backgroundColor = guessingBox.rgb;
    button.setAttribute('class', 'guessingBox');
    button.addEventListener("click", gessingButtonEventHandler);
    guessingBoxesContainer.appendChild(button);
}

function gessingButtonEventHandler(){
    var clickedButton = this;

    if (rgbGame.isWinner(clickedButton.style.backgroundColor)) {
        headerDiv.style.backgroundColor = clickedButton.style.backgroundColor;
        var allButtons = document.getElementsByClassName("guessingBox");
        
        [...allButtons].forEach(function(button){
            if (button.id !== clickedButton.id){   
                button.style.background = "white"; 
            }
        });
    } else {
        clickedButton.style.background = "white";
    }
}

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function removeChilds(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}