import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationsProvider } from '../../providers/locations/locations';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController, public locations: LocationsProvider) {
  }

  ionViewDidLoad() {

    this.locations.load();
    
  }

}
