var bodyEl = document.querySelector("body");
var poengEl = document.querySelector("#poeng");
var canvas = document.querySelector("#slangeCanvas");
var ctx = canvas.getContext("2d");

var x;          // x-koordinaten til slangen sitt hovud
var y;          // y-koordinaten til slangen sitt hovud
var size = 20;  // Størrelse slange og frukt i piksler
var maksLengde; // Største lengden slangen kan ha
var vekst;      // Kor fort slangen skal vekse
var slange;     // Array med alle slangeledda
var frukt;      // Array med frukt
var poeng;      // Ta vare på poenga
var retning;    // Ta vare på retningen slangen bevegar seg i
var hastighet;  // Kor fort slangen skal bevege seg i ms
var timer;      // Lyttar på tida

function tegnOpp() {
    ctx.clearRect(0, 0, 400, 400); // blanker ut canvaset
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = "yellow";

    // teiknar alle slangeledda
    for(var i = 0; i < slange.length; i++) {
        ctx.fillRect(slange[i].xPos, slange[i].yPos, size, size);
    }

    // teiknar opp all frukta
    for(var i = 0; i < frukt.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(frukt[i].xPos, frukt[i].yPos, size, size);
    }
}

function byttRetning(e) {
    if(e.keyCode > 36 && e.keyCode < 41) {
        clearInterval(timer);
        timer = setInterval(flytt, hastighet);
        retning = e.keyCode;
        flytt();
    }
}

function flytt () {
    // oppretter et slangeledd der hodet var
    var slangeLedd = { xPos: x, yPos: y};
    // legg til slangeLedd først i arrayen
    slange.unshift(slangeLedd) ;
    
    // hvis slangen er lengre enn maks lengde
    if(slange.length > maksLengde) {
    // fjern det siste slangeleddet i arrayen
        slange.pop() ;
    }

    if (retning == 37) { // retningen er venstre
        // Dersom det er plass til å gå til venstre
        if (x - size >= 0) {
            x -= size; // reduser x-koordinaten med 20 px
            tegnOpp();
        }
    } 
    else if (retning == 39) { // retningen er høyre
        // Dersom det er plass til å gå til høgre
        if (x + size < 400) {
            x += size; // auk x-koordinaten med 20 px
            tegnOpp();
        }
    } 
    else if (retning == 38) { // retningen er oppover
        // Dersom det er plass til å gå oppover
        if (y - size >= 0) {
            y -= size; // reduser y-koordinaten med 20 px
            tegnOpp() ;
        } 
    } 
    else if (retning == 40) { // retningen er nedover
        // Dersom det er plass til å gå nedover
        if (y + size < 400) {
            y += size; // øk y-koordinaten med 20 px
            tegnOpp();
        }
    }

    if (slangeHit(x, y)) {
        gameOver(); // Hovudet traff kroppen, avslutt spelet
    }

    // sjekk om hodet til slangen treffer frukten .
    // Hodet er alltid på punktet (x, y)
    for (var i = 0; i < frukt . length; i ++) {
        if (x == frukt[i].xPos && y == frukt[i].yPos) {
            poeng++; // auk poenga
            // oppdater poengvisninga
            poengEl.innerHTML = " Poeng: " + poeng;
            // auk lengda til slangen
            maksLengde += vekst;
            frukt.splice(i, 1); // fjern frukten
            leggTilFrukt(); // legg ut ei ny frukt
        }
    }
}

function gameOver() {
    bodyEl.removeEventListener("keydown", byttRetning);
    clearInterval(timer);
    console.log("Game over!");

    // TO DO: Lag ein gameover-beskjed til brukaren
    // TO DO: Start spelet på nytt
}

function slangeHit(xPos, yPos) {
    // går gjennom alle slangeleddene
    for (var i = 0; i < slange . length; i ++) {
        // sjekk om hodet (xPos , yPos ) treffer en del av slangen
        if (xPos == slange[i].xPos && yPos == slange[i].yPos) {
            return true; // koordinatene kolliderer med slangen
        }
    }
    return false;
}

function leggTilFrukt() {
    var ikkePlassert = true;

    while(ikkePlassert) {
        var fruktX = Math.floor(Math.random() * 20);
        var fruktY = Math.floor(Math.random() * 20);

        fruktX = fruktX * size;
        fruktY = fruktY * size;

        if ( fruktX == x && fruktY == y || slangeHit(fruktX, fruktY))
        {
            // løkka må køyre igjen
        } 
        else {
        // opprett en ny frukt
            var f = { xPos: fruktX , yPos: fruktY };
            frukt . push ( f ) ; // legg frukten til arrayen
            ikkePlassert = false;
        }
    }
}

function startSpill () {
    x = 0; // Startkoordinater til slangen
    y = 0;
    maksLengde = 12; // Startlengden til slangen
    vekst = 2; // Hvor mange ledd slangen skal vokse med
    slange = new Array(); // En array for slangeleddene
    frukt = new Array(); // En array for frukten
    poeng = 0;
    retning = 40; // Retning nedover ( keyCode = 40)
    hastighet = 300; // Slangens hastighet (i ms).
    // Hastigheten styrer spillets vanskelighetsgrad.
    poengEl.innerHTML = "Poeng: " + poeng;
    // Legger til en keydown-hendelse på body-elementet
    bodyEl.addEventListener("keydown", byttRetning);
    
    timer = setInterval(flytt, hastighet);

    leggTilFrukt();
    leggTilFrukt();
    
    tegnOpp ();
}

startSpill();