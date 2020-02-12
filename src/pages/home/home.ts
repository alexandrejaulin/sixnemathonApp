import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pieces:number;

  constructor(public navCtrl: NavController, public events: Events) {

  }

}
