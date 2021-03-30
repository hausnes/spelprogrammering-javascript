var spel = document.getElementById("spel");
var fugl = document.getElementById("fugl");

var bgpos = 0; // Bakgrunnsposisjonen til biletet
var bgfart = -1;

var krasjHoyde = 360;
var fuglpos = 100;
var fuglenFlyr = true;
var gravitasjon = 0.1;
var fallfart = 1;

function gameLoop(){
    bevegBakgrunn();
    fly();
    if(fuglenFlyr){
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

function bevegBakgrunn(){
    //bgpos += bgfart;
    bgpos = bgpos + bgfart;
    spel.style.backgroundPosition = bgpos + "px 0px";
}

function fly(){
    fallfart += gravitasjon;
    fuglpos += fallfart;
    fugl.style.top = fuglpos + "px";
    if(fuglpos>krasjHoyde){
        fuglenFlyr = false;
        fugl.style.background = "url('bileter/fugl-dau.png')";
    }
}

function flaks(){
    fallfart += -4;
}

spel.onclick = flaks;

document.addEventListener('keydown', function(event){
    console.log("Tastaturkoden du trykte er (event.code) = " + event.code);
    if(event.code === 'Space'){
        flaks();
    }
});