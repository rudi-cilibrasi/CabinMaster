var mainView;
var xCo, yCo;
var mouseX, mouseY;

var hitBoxMainMenuNew = [6, 130, 211, 192];
var hitBoxBackArrowWelcome = [41, 31, 123, 87];

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

function switchMainViewImage(imageFilename) {
    mainView.src = "images/" + imageFilename;
}

function processMouseDown() {
    if (checkHitBox(hitBoxMainMenuNew)) {
        switchMainViewImage("new_click_welcome.png");
    }
    if (checkHitBox(hitBoxBackArrowWelcome)) {
        switchMainViewImage("main_menu.png");
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