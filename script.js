var mainView;
var xCo, yCo;
var mouseX, mouseY;

var hitBoxMainMenuNew = [6, 130, 211, 192];
var hitBoxMainMenuQuit = [4, 453, 214, 539];
var hitBoxBackArrowWelcome = [41, 31, 123, 87];
var hitBoxStartTutorial = [278, 431, 518, 521];
var hitBoxTutorialFullScreen = [1, 1, 693, 693];
var currentPlace = "main_menu";

var stateTree = {
    "main_menu": {
        "hitboxes": [
            [hitBoxMainMenuNew, doHitBoxMainMenuNew],
            [hitBoxMainMenuQuit, doHitBoxMainMenuQuit]
        ],
    },
    "new_click_welcome": {
        "hitboxes": [
            [hitBoxBackArrowWelcome, doHitBoxBackArrowWelcome],
            [hitBoxStartTutorial, doHitBoxStartTutorial]
        ],
    },
    "tutorial_01": {
        "hitboxes": [
            [hitBoxTutorialFullScreen, doHitBoxTutorial_01]
        ],
    },
    "tutorial_02": {
        "hitboxes": [
            [hitBoxTutorialFullScreen, doHitBoxTutorial_02]
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

function doHitBoxMainMenuQuit() {
    mainView.src = null;
    currentPlace = "quit";
}

function doHitBoxBackArrowWelcome() {
    moveToState("main_menu");
}

function doHitBoxStartTutorial() {
    moveToState("tutorial_01");
}

function doHitBoxTutorial_01() {
    moveToState("tutorial_02");
}

function doHitBoxTutorial_02() {
    moveToState("tutorial_03");
}

function processMouseDown() {
    var currentStateValue = stateTree[currentPlace] ?? {};
    var currentHitBoxes = currentStateValue["hitboxes"] ?? [];
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