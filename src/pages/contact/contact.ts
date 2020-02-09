import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  audioMono
  modeMono: boolean

  constructor(public navCtrl: NavController) {
    this.audioMono = new Audio();
    this.modeMono = false;
  }
 
  play(name: String){
    if(this.modeMono){
      this.audioMono.src = "assets/audio/"+name+".wav";
      this.audioMono.load();
      this.audioMono.play();
    } else {
      let audio = new Audio();
      audio.src = "assets/audio/"+name+".wav";
      audio.load();
      audio.play();
    }
  }

  changeMonoPoly(){
    this.modeMono = !this.modeMono;
  }

}
