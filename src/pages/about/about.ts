import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Roulette } from '../../app/roulette';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  img00:string="img/map00.jpg"; 
  img01:string="img/map01.jpg";
  img02:string="img/map02.jpg"; 
  img10:string="img/map10.jpg"; 
  img11:string="img/map11.jpg"; 
  img12:string="img/map12.jpg"; 
  img20:string="img/map20.jpg"; 
  img21:string="img/map21.jpg"; 
  img22:string="img/map22.jpg"; 

  rouletteGauche:Roulette;
  rouletteMilieu:Roulette;
  rouletteDroite:Roulette;

  combinaison:string[];
  tousLesSymboles:string[];
  pieces: number;

  nbRoulettesStop:number;

  constructor(public navCtrl: NavController) {
    this.combinaison=new Array<string>();
    this.pieces=100;
    this.initRoulettes();
  }

  lancerLaMachine(){
    let audio = new Audio();
    audio.src = "assets/audio/insertcoin.wav";
    audio.load();
    audio.play();

    document.getElementById("boutonLancer").setAttribute("disabled","");
    this.nbRoulettesStop=0;
    this.lancerLaRouletteGauche();
    this.lancerLaRouletteMilieu();
    this.lancerLaRouletteDroite();
  }

  async lancerLaRouletteGauche(){
    let audio = new Audio();
    audio.src = "assets/audio/beep.wav";

    let numberRand = Math.floor(Math.random() * 40) + 20  ;
    for(let i=1;i<numberRand;i++){
        audio.pause()
        audio.currentTime = 0;
        this.img00="assets/imgs/"+this.rouletteGauche.get(i+1)+".png";
        this.img10="assets/imgs/"+this.rouletteGauche.get(i)+".png";
        this.img20="assets/imgs/"+this.rouletteGauche.get(i-1)+".png";
        audio.load();
        audio.play();
        if(i<numberRand*0.4){await this.timer(50);}
        if(i<numberRand*0.6 && i>=numberRand*0.4){await this.timer(90);}
        if(i<numberRand*0.75 && i>=numberRand*0.6){await this.timer(140);}
        if(i<numberRand*0.85 && i>=numberRand*0.75){await this.timer(190);}
        if(i<numberRand*0.9 && i>=numberRand*0.85){await this.timer(240);}
        if(i<numberRand*0.95 && i>=numberRand*0.9){await this.timer(290);}
        if(i<numberRand*1 && i>=numberRand*0.95){await this.timer(390);}
    }
    this.combinaison.push(this.rouletteGauche.get(numberRand-1));
    this.nbRoulettesStop++;
    this.reactiverBoutonLancer();
  }

  async lancerLaRouletteMilieu(){
    let audio = new Audio();
    audio.src = "assets/audio/beep3.wav";

    let numberRand = Math.floor(Math.random() * 40) + 20  ;
    for(let i=1;i<numberRand;i++){
        audio.pause()
        audio.currentTime = 0;
        this.img01="assets/imgs/"+this.rouletteMilieu.get(i+1)+".png";
        this.img11="assets/imgs/"+this.rouletteMilieu.get(i)+".png";
        this.img21="assets/imgs/"+this.rouletteMilieu.get(i-1)+".png";
        audio.load();
        audio.play();
        if(i<numberRand*0.4){await this.timer(50);}
        if(i<numberRand*0.6 && i>=numberRand*0.4){await this.timer(120);}
        if(i<numberRand*0.75 && i>=numberRand*0.6){await this.timer(170);}
        if(i<numberRand*0.85 && i>=numberRand*0.75){await this.timer(220);}
        if(i<numberRand*0.9 && i>=numberRand*0.85){await this.timer(270);}
        if(i<numberRand*0.95 && i>=numberRand*0.9){await this.timer(320);}
        if(i<numberRand*1 && i>=numberRand*0.95){await this.timer(420);}
    }
    this.combinaison.push(this.rouletteMilieu.get(numberRand-1));
    this.nbRoulettesStop++;
    this.reactiverBoutonLancer();
  }

  async lancerLaRouletteDroite(){
    let audio = new Audio();
    audio.src = "assets/audio/beep2.wav";

    let numberRand = Math.floor(Math.random() * 40) + 20  ;
    for(let i=1;i<numberRand;i++){
        audio.pause()
        audio.currentTime = 0;  
        this.img02="assets/imgs/"+this.rouletteDroite.get(i+1)+".png";
        this.img12="assets/imgs/"+this.rouletteDroite.get(i)+".png";
        this.img22="assets/imgs/"+this.rouletteDroite.get(i-1)+".png";
        audio.load();
        audio.play();
        if(i<numberRand*0.4){await this.timer(50);}
        if(i<numberRand*0.6 && i>=numberRand*0.4){await this.timer(100);}
        if(i<numberRand*0.75 && i>=numberRand*0.6){await this.timer(150);}
        if(i<numberRand*0.85 && i>=numberRand*0.75){await this.timer(200);}
        if(i<numberRand*0.9 && i>=numberRand*0.85){await this.timer(250);}
        if(i<numberRand*0.95 && i>=numberRand*0.9){await this.timer(300);}
        if(i<numberRand*1 && i>=numberRand*0.95){await this.timer(400);}
    }
    this.combinaison.push(this.rouletteDroite.get(numberRand-1));
    this.nbRoulettesStop++;
    this.reactiverBoutonLancer();
  }
  

  timer(ms) {
    return new Promise(res => setTimeout(res, ms));
   }

   reactiverBoutonLancer(){
    if(this.nbRoulettesStop==3){
      this.pieces+=this.analyseResultat(this.combinaison, this.tousLesSymboles);
      document.getElementById("coin").style.webkitAnimationPlayState = "running";
      this.combinaison = new Array<string>();
      document.getElementById("boutonLancer").removeAttribute("disabled");
    }
   }

   analyseResultat(resultat:string[], tousLesSymboles:string[]):number{
    let piecesGagnees = 0;
    let nbSymboleCovered = 0;

    tousLesSymboles.forEach((symbole) => {

      if(nbSymboleCovered<3) {
        if (this.nbOccurencesList(symbole, resultat) == 1) {
            nbSymboleCovered += 1;
            switch (symbole) {
                case "star":piecesGagnees+=10;break;
                case "weed":piecesGagnees+=5;break;
                case "caca":piecesGagnees-=5;break;
                case "1664":piecesGagnees+=5;break;
                case "croques":;break;
                case "philadelphia":;break;
                case "pain":;break;
                case "pitch":;break;
                case "pls":piecesGagnees-=15;break;
            }
        }
        if (this.nbOccurencesList(symbole, resultat) == 2) {
            nbSymboleCovered += 2;
            switch (symbole) {
                case "star":piecesGagnees+=100;break;
                case "weed":piecesGagnees+=50;break;
                case "caca":piecesGagnees-=20;break;
                case "1664":piecesGagnees+=50;break;
                case "action":;break;
                case "croques":;break;
                case "philadelphia":;break;
                case "pain":;break;
                case "pitch":;break;
                case "pls":piecesGagnees-=150;break;
            }
        }
        if (this.nbOccurencesList(symbole, resultat) == 3) {
            nbSymboleCovered += 3;
            switch (symbole) {
                case "star":piecesGagnees+=10000;break;
                case "weed":piecesGagnees+=500;break;
                case "caca":piecesGagnees-=100;break;
                case "1664":piecesGagnees+=1664;break;
                case "action":;break;
                case "croques":piecesGagnees+=5000;break;
                case "philadelphia":piecesGagnees+=5000;break;
                case "pain":piecesGagnees+=5000;break;
                case "pitch":piecesGagnees+=5000;break;
                case "pls":piecesGagnees-=15000;break;
            }
        }
    } else {
        
    }

    })
        

    return piecesGagnees;

   }

   nbOccurencesList(regex:string, list:string[]) {
    let nbOccurences = 0;
    list.forEach((s) => {
      if(s === regex){
        nbOccurences++;
      }
    })
    return nbOccurences;
}

  initRoulettes(){
    let rouletteGauche = new Array<string>();
    rouletteGauche.push("action");
    rouletteGauche.push("pain");
    rouletteGauche.push("1664");
    rouletteGauche.push("pitch");
    rouletteGauche.push("caca");
    rouletteGauche.push("weed");
    rouletteGauche.push("caca");
    rouletteGauche.push("caca");
    rouletteGauche.push("1664");
    rouletteGauche.push("1664");
    rouletteGauche.push("star");
    rouletteGauche.push("pls");
    rouletteGauche.push("action");
    rouletteGauche.push("philadelphia");
    rouletteGauche.push("weed");
    rouletteGauche.push("weed");
    rouletteGauche.push("caca");
    rouletteGauche.push("action");
    rouletteGauche.push("croques");
    rouletteGauche.push("caca");
    this.rouletteGauche = new Roulette(rouletteGauche);

    let rouletteMilieu = new Array<string>();
    rouletteMilieu.push("action");
    rouletteMilieu.push("1664");
    rouletteMilieu.push("weed");
    rouletteMilieu.push("weed");
    rouletteMilieu.push("pls");
    rouletteMilieu.push("1664");
    rouletteMilieu.push("croques");
    rouletteMilieu.push("action");
    rouletteMilieu.push("weed");
    rouletteMilieu.push("philadelphia");
    rouletteMilieu.push("caca");
    rouletteMilieu.push("caca");
    rouletteMilieu.push("caca");
    rouletteMilieu.push("action");
    rouletteMilieu.push("pitch");
    rouletteMilieu.push("pain");
    rouletteMilieu.push("star");
    rouletteMilieu.push("1664");
    rouletteMilieu.push("caca");
    rouletteMilieu.push("caca");
    this.rouletteMilieu = new Roulette(rouletteMilieu);

    let rouletteDroite = new Array<string>();
    rouletteDroite.push("philadelphia");
    rouletteDroite.push("caca");
    rouletteDroite.push("caca");
    rouletteDroite.push("star");
    rouletteDroite.push("1664");
    rouletteDroite.push("caca");
    rouletteDroite.push("weed");
    rouletteDroite.push("caca");
    rouletteDroite.push("pls");
    rouletteDroite.push("action");
    rouletteDroite.push("caca");
    rouletteDroite.push("pitch");
    rouletteDroite.push("weed");
    rouletteDroite.push("pain");
    rouletteDroite.push("croques");
    rouletteDroite.push("1664");
    rouletteDroite.push("weed");
    rouletteDroite.push("action");
    rouletteDroite.push("action");
    rouletteDroite.push("1664");
    this.rouletteDroite = new Roulette(rouletteDroite);

    this.tousLesSymboles = new Array<string>();
    this.tousLesSymboles.push("philadelphia");
    this.tousLesSymboles.push("caca");
    this.tousLesSymboles.push("star");
    this.tousLesSymboles.push("1664");
    this.tousLesSymboles.push("weed");
    this.tousLesSymboles.push("pls");
    this.tousLesSymboles.push("pitch");
    this.tousLesSymboles.push("pain");
    this.tousLesSymboles.push("croques");
    this.tousLesSymboles.push("action");
  
    this.initMachine();
  }

  initMachine(){
    this.img00="assets/imgs/"+this.rouletteGauche.get(0)+".png";
    this.img10="assets/imgs/"+this.rouletteGauche.get(1)+".png";
    this.img20="assets/imgs/"+this.rouletteGauche.get(2)+".png";

    this.img01="assets/imgs/"+this.rouletteMilieu.get(0)+".png";
    this.img11="assets/imgs/"+this.rouletteMilieu.get(1)+".png";
    this.img21="assets/imgs/"+this.rouletteMilieu.get(2)+".png";

    this.img02="assets/imgs/"+this.rouletteDroite.get(0)+".png";
    this.img12="assets/imgs/"+this.rouletteDroite.get(1)+".png";
    this.img22="assets/imgs/"+this.rouletteDroite.get(2)+".png";
  }

}
