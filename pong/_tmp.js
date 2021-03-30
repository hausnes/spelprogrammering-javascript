var hdnPoeng = document.getElementById("hdnPoeng");
            var hdnRekord = document.getElementById("hdnRekord");
            var btnVanskeleg = document.getElementById("btnVanskeleg");
            var btnLett = document.getElementById("btnLett");
            
            // For å styre vanskelegheitsgrada
            function f_vanskeleg() { fartsokningVerdi = 0.0005; }
            function f_lett() { fartsokningVerdi = 0; }
            btnVanskeleg.onclick = f_vanskeleg;
            btnLett.onclick = f_lett;

            var poeng = 0;
            var fartsokning=1; var fartsokningVerdi=0;
            
            if(localStorage.rekord === undefined) { //Er det satt rekord fra før
                localStorage.rekord = 0; //Hvis ikke, setter vi rekorden til 0
            }
            hdnRekord.innerHTML = "Rekord: " + localStorage.rekord;
            
            var minCanvas = document.getElementById("minCanvas");
            var ctx = minCanvas.getContext("2d");
            var theGameIsOn = true; //Global variabel

            // Lar brukaren gjere endringar på farten
            var inpFart = document.getElementById("inpFart");
            inpFart.oninput = function() { 
                //Hendelsesstyrt funksjon 
                ball.xfart = Number(inpFart.value);
                ball.yfart = Number(inpFart.value);
            }
            
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
                xfart: 4,
                yfart: 4
            };
            
            function tegnBall() { //Tegner opp en sirkel
                ctx.beginPath(); //Start tegningen av buen
                ctx.arc(ball.xpos, ball.ypos, ball.radius, 0, Math.PI * 2); //Tegner en sirkel
                ctx.closePath(); //Lukker sirkelbuen
                ctx.fillStyle = ball.farge; //Setter fargen
                ctx.fill(); //Fyller sirkelen med fargen
                ball.xpos = ball.xpos + Math.pow(ball.xfart,fartsokning) * ball.xretning; //Endrer x-posisjon -- tidlegare utan math.pow, berre ball.xfart
                ball.ypos = ball.ypos + Math.pow(ball.yfart,fartsokning) * ball.yretning; //Endrer y-posisjon -- tidlegare utan math.pow, berre ball.yfart
                fartsokning += fartsokningVerdi;   
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
                    //ball.xfart += 1; ball.yfart += 1; // Aukar farten for kvar gong ein treff veggen
                }
                if(ball.ypos + ball.radius >= bane.hoyde) { //Nedre vegg
                    ball.yretning = -1; //Ballen går oppover når den har truffet nedre vegg
                }
                if(ball.ypos <= ball.radius) { //Øvre vegg
                    ball.yretning = 1; //Ballen skal gå nedover etter at den har truffet øvre vegg
                }
            }
            function sjekkOmBallTrefferRacket() {
                var ballenErTilVenstre = ball.xpos + ball.radius < racket.xpos;
                var ballenErtilHoyre = ball.xpos - ball.radius > racket.xpos + racket.bredde;
                var ballenErOver = ball.ypos + ball.radius < racket.ypos;
                var ballenErUnder = ball.ypos - ball.radius > racket.ypos + racket.hoyde;
                if(!ballenErTilVenstre && ! ballenErtilHoyre && ! ballenErOver && ! ballenErUnder) {
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
                if(ball.x > bane.bredde + ball.radius * 2) {
                    theGameIsOn = false;
                }
            }
            function gameLoop() { //Funksjonen kaller opp alle de andre funksjonene
                tegnBane();
                tegnBall();
                tegnRacket();
                sjekkOmBallTrefferVegg();
                sjekkOmBallTrefferRacket();
                sjekkOmBallErUtenforBanen();
                if (theGameIsOn) {
                    requestAnimationFrame(gameLoop);
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