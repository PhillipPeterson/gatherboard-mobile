import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  event = this.navParams.get('event');

  constructor(public viewController: ViewController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.event)
  }

  closeModal()
  {
    this.viewController.dismiss();
  }

}