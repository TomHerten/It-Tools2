import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Screenshot } from '@ionic-native/screenshot';
import 'rxjs/add/operator/map';
import { ConnectivityProvider } from '../../providers/connectivity/connectivity';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  screen: any;
  state: boolean = false;
  mapInitialised: boolean = false;
  apiKey: 'AIzaSyDfntxed5e4_Rj3EKUkn4BfVM3OCRw_SK0';
 
  constructor(public navCtrl: NavController, public authData: AuthProvider, public geolocation: Geolocation, 
    public http: Http, private screenshot: Screenshot, private connectivityService: ConnectivityProvider) {
 
  }

  logout(){

    this.authData.logoutUser();
    this.navCtrl.push(LoginPage);  

  }

  reset() {

    var self = this;
    setTimeout(function(){ 
      self.state = false;
    }, 1000);

  }

  screenShot() {

    this.screenshot.save('jpg', 100, 'cafeMaps.jpg').then(res => {
      this.screen = res.filePath;
      this.state = true;
      this.reset();
    });

  }

  listPage(){

    this.navCtrl.push(ListPage);  

  }
 
  ionViewDidLoad(){

    this.loadMap();

  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.getMarkers();

    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>This marker is placed by me :)!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }

  getMarkers() {

    this.http.get('assets/data/markers.json')
    .map((res) => res.json())
    .subscribe(data => {

      this.addMarkersToMap(data);

    });

  }

  addMarkersToMap(markers) {

    for(let marker of markers) {

      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var Marker = new google.maps.Marker({position: position, title: marker.name});
      Marker.setMap(this.map);
      let content = "<h4>" + marker.name + "</h4>";
      this.addInfoWindow(Marker, content);
      
    }

  }

  loadGoogleMaps(){
  
      this.addConnectivityListeners();
  
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
  
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();
  
      if(this.connectivityService.isOnline()){
        console.log("online, loading map");
  
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }
  
        let script = document.createElement("script");
        script.id = "googleMaps";
  
        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
        }
  
        document.body.appendChild(script); 
  
      }
    }
    else {
  
      if(this.connectivityService.isOnline()){
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }
  
    }
  
    }
  
    initMap(){
  
      this.mapInitialised = true;
  
      this.geolocation.getCurrentPosition().then((position) => {
  
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
      });
  
    }
  
    disableMap(){
      console.log("disable map");
    }
  
    enableMap(){
      console.log("enable map");
    }
  
    addConnectivityListeners(){
  
      let onOnline = () => {
  
        setTimeout(() => {
          if(typeof google == "undefined" || typeof google.maps == "undefined"){
  
            this.loadGoogleMaps();
  
          } else {
  
            if(!this.mapInitialised){
              this.initMap();
            }
  
            this.enableMap();
          }
        }, 2000);
  
      };
  
      let onOffline = () => {
        this.disableMap();
      };
  
      document.addEventListener('online', onOnline, false);
      document.addEventListener('offline', onOffline, false);
  
    }
  
}