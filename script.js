var mainView;
var xCo, yCo;
var mouseX, mouseY;

var hitBoxMainMenuNew = [6, 130, 211, 192];
var hitBoxBackArrowWelcome = [41, 31, 123, 87];
var hitBoxStartTutorial = [278, 431, 518, 521];
var currentPlace = "main_menu";

var stateTree = {
    "main_menu": {
        "hitboxes": [
            [hitBoxMainMenuNew, doHitBoxMainMenuNew]
        ],
    },
    "new_click_welcome": {
        "hitboxes": [
            [hitBoxBackArrowWelcome, doHitBoxBackArrowWelcome],
            [hitBoxStartTutorial, doHitBoxStartTutorial]
        ],
    },
}

function checkHitBox(hitBox) {
    var x = mouseX - mainView.offsetLeft;
    var y = mouseY - mainView.offsetTop;
    return (x >= hitBox[0] && x < hitBox[2] && y >= hitBox[1] && y < hitBox[3]);
}

function bootup() {
    mainView = document.getElementById("mainView");
    xCo = document.getElementById("xCo");
    yCo = document.getElementById("yCo");
    switchMainViewImage("main_menu.png");
    addMouseOverListener();
    console.log("booted");
}

function moveToState(state) {
    currentPlace = state;
    switchMainViewImage(state + ".png");
}

function switchMainViewImage(imageFilename) {
    mainView.src = "images/" + imageFilename;
}

function doHitBoxMainMenuNew() {
    moveToState("new_click_welcome");
}

function doHitBoxBackArrowWelcome() {
    moveToState("main_menu");
}

function doHitBoxStartTutorial() {
    moveToState("tutorial_01");
}

function processMouseDown() {
    var currentHitBoxes = stateTree[currentPlace]["hitboxes"];
    for (var i = 0; i < currentHitBoxes.length; i++) {
        if (checkHitBox(currentHitBoxes[i][0])) {
            currentHitBoxes[i][1]();
            return;
        }
    }
}

function addMouseOverListener() {
    document.addEventListener("mousemove", function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });
    document.addEventListener("keypress", function(event) {
        if (event.keyCode == 97) {
            xCo.innerHTML = mouseX - mainView.offsetLeft;
            yCo.innerHTML = mouseY - mainView.offsetTop;
        }
    });
    document.addEventListener("mousedown", processMouseDown);
}
console.log("loaded");