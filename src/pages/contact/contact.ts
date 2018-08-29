import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

      geolocation.getCurrentPosition().then((resp) => {
          console.log('Coords:', resp.coords.latitude);
          console.log('Coords:', resp.coords.longitude);
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }

}
