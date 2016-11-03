import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController) {
 
  }
 
  ionViewDidEnter(){
    this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-6.226267, 106.825374);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.trigger(this.map, 'resize');
 
  }

}
