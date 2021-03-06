import { Component } from '@angular/core';
import { NavController ,ToastController, AlertController, Events} from 'ionic-angular';
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

  veriteList:string[];
  actionList:string[];
  participants:string[];

  combinaison:string[];
  tousLesSymboles:string[];
  pieces: number;
  oldPieces: number;
  gain:number;

  nbRoulettesStop:number;

  constructor(public navCtrl: NavController, 
              public toastController: ToastController,
              public alertCtrl: AlertController,
              public events: Events) {
    this.combinaison=new Array<string>();
    this.pieces=100;
    this.oldPieces=100;
    this.gain=null;

    this.events.publish('pieces:created', this.pieces);
    
    this.initRoulettes();
    this.initActionOuVerite();
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
    this.events.publish('pieces:created', this.pieces);
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
      this.combinaison = new Array<string>();
      document.getElementById("boutonLancer").removeAttribute("disabled");
    }
    this.animationCompteur();
   }

   async animationCompteur(){
     let timeToWait=800/(Math.abs(this.pieces-this.oldPieces));
     if(this.pieces>this.oldPieces){
        while(this.oldPieces!=this.pieces){
          this.oldPieces++;
          await this.timer(timeToWait);
        }
      }
      if(this.pieces<this.oldPieces){
        while(this.oldPieces!=this.pieces){
          this.oldPieces--;
          await this.timer(timeToWait);
        }
      }
   }

   analyseResultat(resultat:string[], tousLesSymboles:string[]):number{
    let piecesGagnees = 0;
    let nbSymboleCovered = 0;
    let symboleBouffe = 0;

    tousLesSymboles.forEach((symbole) => {

      if(nbSymboleCovered<3) {
        if (this.nbOccurencesList(symbole, resultat) == 1) {
            nbSymboleCovered += 1;
            switch (symbole) {
                case "star":piecesGagnees+=10;break;
                case "weed":piecesGagnees+=4;break;
                case "caca":piecesGagnees-=5;break;
                case "1664":piecesGagnees+=5;break;
                case "croques":symboleBouffe++;break;
                case "philadelphia":symboleBouffe++;break;
                case "pain":symboleBouffe++;break;
                case "pitch":symboleBouffe++;break;
                case "pls":piecesGagnees-=15;break;
            }
        }
        if (this.nbOccurencesList(symbole, resultat) == 2) {
            nbSymboleCovered += 2;
            switch (symbole) {
                case "star":piecesGagnees+=100;this.play("bigwin");break;
                case "weed":piecesGagnees+=42;this.play("weedwin");break;
                case "caca":piecesGagnees-=20;this.play("caca2");break;
                case "1664":piecesGagnees+=50;this.play("biere");break;
                case "action":this.actionOuVerite();this.play("verite");break;
                case "croques":symboleBouffe+=2;break;
                case "philadelphia":symboleBouffe+=2;break;
                case "pain":symboleBouffe+=2;break;
                case "pitch":symboleBouffe+=2;break;
                case "pls":piecesGagnees-=150;this.play("pls2");break;
            }
        }
        if (this.nbOccurencesList(symbole, resultat) == 3) {
            nbSymboleCovered += 3;
            switch (symbole) {
                case "star":piecesGagnees+=10000;this.play("bigwin");break;
                case "weed":piecesGagnees+=420;this.play("weedbigwin");this.play("bigwin");break;
                case "caca":piecesGagnees-=100;this.play("caca3");break;
                case "1664":piecesGagnees+=1664;this.play("biere");this.play("bigwin");break;
                case "action":piecesGagnees+=100;this.actionOuVerite();this.play("bigwin");this.play("verite");break;
                case "croques":piecesGagnees+=5000;this.play("bigwin");break;
                case "philadelphia":piecesGagnees+=5000;this.play("bigwin");break;
                case "pain":piecesGagnees+=5000;this.play("bigwin");break;
                case "pitch":piecesGagnees+=5000;this.play("bigwin");break;
                case "pls":piecesGagnees-=15000;this.play("pls3");break;
            }
        }
        if(symboleBouffe==3){
          this.play("bigwin");
          piecesGagnees+=220
        }
        if(symboleBouffe==2){
          piecesGagnees+=20
        }
    }

    })
        
    if(piecesGagnees>0){this.play("coin")}
    else {this.play("lose1")}
    this.toast(piecesGagnees);
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

  rouleUnPet(){
    let alert = this.alertCtrl.create({
      title: '420',
      subTitle: "ROULE UN PET'",
      buttons: ['OK']
    });
    alert.present();
  }

  actionOuVerite(){
    let alert = this.alertCtrl.create({
      title: 'Action ou vérité ?',
      buttons: [
        {
          text: 'Action',
          handler: () => {
            this.action();
          }
        },
        {
          text: 'Vérité',
          handler: () => {
            this.verite();
          }
        }
      ]
    });
    alert.present();
  }

  verite(){
    let numberRand = Math.floor(Math.random() * 5) ;
    let alert = this.alertCtrl.create({
      title: 'Vérité',
      subTitle: this.veriteList[numberRand],
      buttons: ['OK']
    });
    alert.present();

  }

  action(){
    let numberRand1 = Math.floor(Math.random() * 2) ;
    let numberRand2 = Math.floor(Math.random() * 6) ;
    this.actionList = new Array<string>();
    this.actionList.push("Change de place avec"+this.participants[numberRand2]);
    this.actionList.push("Bois un shot");
    this.actionList.push("Passe un coup de fil à un beauf");

    let alert = this.alertCtrl.create({
      title: 'Action',
      subTitle: this.actionList[numberRand1],
      buttons: ['OK']
    });
    alert.present();

  }

play(name: String){
    let audio = new Audio();
    audio.src = "assets/audio/"+name+".wav";
    audio.load();
    audio.play();
}

async toast(gain:number){ 
  let signe;
  let css;

  if(gain>0){
    signe="+";
    css="gain";
  } else {
    signe="-";
    css="perd";
  }
  gain=Math.abs(gain)

  const toast = await this.toastController.create({
    message: signe+gain,
    position: 'middle',
    duration: 0.7,
    cssClass: css
  });
  toast.present();

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
    rouletteMilieu.push("caca");
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

  initActionOuVerite(){
    this.veriteList = new Array<string>();
    this.veriteList.push("Qui trouves tu le moins drôle ici ?");
    this.veriteList.push("Qui roule les pires pet' ?");
    this.veriteList.push("Selon toi, qui baise le plus mal ?");
    this.veriteList.push("Qui a le moins marqué les esprits avec ses films durant les 6némath' ?");
    this.veriteList.push("Qui est le plus drôle ?");
    this.veriteList.push("Si tu n'avais pas le choix, qui sucerais-tu ?");
    this.veriteList.push("Actuellement, à qui décernes-tu la crotte ?");
    this.veriteList.push("Actuellement, à qui décernes-tu l'étoile ?");

    this.participants = new Array<string>();
    this.participants.push(" Gweg");
    this.participants.push(" Tintax");
    this.participants.push(" Titi");
    this.participants.push(" Louitos");
    this.participants.push(" Polo");
    this.participants.push(" Caca");
    this.participants.push(" Jojo");
  }



}
