var speletErAktivt = true;

var hdnPoeng = document.getElementById("hdnPoeng");
var hdnRekord = document.getElementById("hdnRekord");
var minCanvas = document.getElementById("minCanvas");
var ctx = minCanvas.getContext("2d");

var info = document.getElementById("info");

var poeng = 0;

if(localStorage.rekord === undefined) { //Er det satt rekord fra før
    localStorage.rekord = 0; //Hvis ikke, setter vi rekorden til 0
}
hdnRekord.innerHTML = "Rekord: " + localStorage.rekord;

var bane = { //Objektet bane
    bredde : minCanvas.width, //Bredden lik canvas
    hoyde : minCanvas.height,
    gressfarge : "DarkGreen",
    linjefarge : "White",
    linjetykkelse : 4
};

function tegnBane() { //Funksjonen som tegner banen
    ctx.fillStyle = bane.gressfarge; //Farge på gresset
    ctx.fillRect(0, 0, bane.bredde, bane.hoyde); //Gresset
    ctx.fillStyle = bane.linjefarge; //Farge på midtlinjen
    ctx.fillRect(bane.bredde/2 - bane.linjetykkelse/2, 0,
    bane.linjetykkelse, bane.hoyde); //Tegner midtlinjen
}

var ball = { //Objektet ball
    radius : 7,
    xpos: 100, //x-posisjonen ved start
    ypos: 100, //y-posisjonen ved start
    farge: "yellow",
    xretning: -1, //Mot venstre
    yretning: 1, //Nedover
    xfart: 2,
    yfart: 2
};

function tegnBall() { //Tegner opp en sirkel
    ctx.beginPath(); //Start tegningen av buen
    ctx.arc(ball.xpos, ball.ypos, ball.radius, 0, Math.PI * 2); //Tegner en sirkel
    ctx.closePath(); //Lukker sirkelbuen
    ctx.fillStyle = ball.farge; //Setter fargen
    ctx.fill(); //Fyller sirkelen med fargen
    ball.xpos = ball.xpos + ball.xfart * ball.xretning; //Endrer x-posisjon 
    ball.ypos = ball.ypos + ball.yfart * ball.yretning; //Endrer y-posisjon
    //fartsokning += fartsokningVerdi;   
}

var racket = { // Objektet racket
    "bredde" : 10,
    "hoyde" : 50,
    "farge" : "White",
    "xpos" : bane.bredde - 15, //15 piksler fra høyre kant
    "ypos" : bane.hoyde / 2, //Omtrent på midten vertikalt
    "yretning" : 0, //Hvilken vei racketen beveger seg
    "yfart" : 5 //Piksler racketen flytter seg
};

function tegnRacket() {
    ctx.fillStyle = racket.farge; //Farge på racketen
    ctx.fillRect(racket.xpos, racket.ypos, racket.bredde, racket.hoyde); //Tegner opp racketen
    if (racket.ypos <= 0 && racket.yretning === -1) {
        return; //Avslutter funksjonen
    }
    if (racket.ypos + racket.hoyde >= bane.hoyde && racket.yretning === 1) {
        return; //Avslutter funksjonen
    }
    racket.ypos = racket.ypos + racket.yfart * racket.yretning;
}

function sjekkOmBallTrefferVegg() {
    if(ball.xpos <= ball.radius) { //Venstre vegg
        ball.xretning = 1; //Ballen går til høyre når den har truffet venstre vegg
    }
    if(ball.ypos + ball.radius >= bane.hoyde) { //Nedre vegg
        ball.yretning = -1; //Ballen går oppover når den har truffet nedre vegg
    }
    if(ball.ypos <= ball.radius) { //Øvre vegg
        ball.yretning = 1; //Ballen skal gå nedover etter at den har truffet øvre vegg
    }
}

function sjekkOmBallTrefferRacket() {
    var ballenErTilVenstre = ball.xpos + ball.radius < racket.xpos; // returnerer true eller false
    var ballenErtilHoyre = ball.xpos - ball.radius > racket.xpos + racket.bredde;
    var ballenErOver = ball.ypos + ball.radius < racket.ypos;
    var ballenErUnder = ball.ypos - ball.radius > racket.ypos + racket.hoyde;
    
    //console.log("tilVenstre:"+ballenErTilVenstre+"\ntilHogre:"+ballenErtilHoyre+"\nballenErOver:"+ballenErOver+"\nballenErUnder:"+ballenErUnder);
    
    if(!ballenErTilVenstre && !ballenErtilHoyre && !ballenErOver && !ballenErUnder) {
        ball.xretning = -1; //Ballen har truffet racketen – vi sender den til venstre

        poeng = poeng + 1;
        hdnPoeng.innerHTML = "Poeng: " + poeng;
        if(poeng > localStorage.rekord) {
            localStorage.rekord = poeng;
            hdnRekord.innerHTML = "Ny rekord: " + poeng;
            hdnRekord.style.color = "DarkGreen";
        }
    }
}

function sjekkOmBallErUtenforBanen() {
    if(ball.xpos > bane.bredde + ball.radius * 2) {
        speletErAktivt = false;
        console.log("Spelet er ferdig!");
    }
}

function gameLoop() {
    tegnBane();
    tegnBall();
    tegnRacket();
    sjekkOmBallTrefferRacket();
    sjekkOmBallTrefferVegg();
    sjekkOmBallErUtenforBanen();
    if(speletErAktivt) {
        requestAnimationFrame(gameLoop);
    }
    else{
        console.log("Spelet er ferdig! Du tapte, men du fekk " + poeng + " poeng.");
        info.innerHTML = "Spelet er ferdig! Du tapte, men du fekk " + poeng + " poeng.";
    }
}
gameLoop();

document.onkeydown = function(evt) {
    var tastekode = evt.keyCode;
    if(tastekode === 38) { //Pil opp
        racket.yretning = -1; //Racketen vil flytte seg oppover
    }
    if(tastekode === 40) { //Pil ned
        racket.yretning = 1; //Racketen flytter seg nedover
    }
}

document.onkeyup = function(evt) {
    var tastekode = evt.keyCode;
    if(tastekode === 38 && racket.yretning === -1) {
        racket.yretning = 0;}
    if(tastekode === 40 && racket.yretning === 1) {
    racket.yretning = 0;}
}