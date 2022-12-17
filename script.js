var mainView;

function bootup() {
    mainView = document.getElementById("mainView");
    addMouseOverListener();
    console.log("booted");
}

function addMouseOverListener() {
    mainView.addEventListener("mouseover", function(event) {
        console.log("mouseover");
        console.log(event);
    });
}
console.log("loaded");