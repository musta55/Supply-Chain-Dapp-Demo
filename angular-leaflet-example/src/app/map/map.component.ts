import { Component, AfterViewInit } from '@angular/core';
import 'leaflet';
import 'leaflet-arc'; // import leaflet-arc here

declare let L: { map: (arg0: string, arg1: { center: number[]; zoom: number; }) => any; tileLayer: (arg0: string, arg1: { maxZoom?: number; minZoom?: number; attribution: string; }) => { (): any; new(): any; addTo: { (arg0: any): void; new(): any; }; }; icon: (arg0: { iconUrl: string; iconSize: number[]; iconAnchor: number[]; popupAnchor: number[]; }) => any; marker: (arg0: number[], arg1: { icon: any; }) => { (): any; new(): any; addTo: { (arg0: any): any; new(): any; }; }; polygon: (arg0: [number, number][], arg1: { color: string; }) => { (): any; new(): any; addTo: { (arg0: any): any; new(): any; }; }; Polyline: { Arc: (arg0: number[], arg1: number[], arg2: { color: string; vertices: number; }) => { (): any; new(): any; addTo: { (arg0: any): void; new(): any; }; }; }; };


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {


  private initMap(): void {

    const myAPIKey = "fb78e7f91cd847519128e3b58e348171";


    // const myAPIKey = process.env["key"];
    let map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 2
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    const markerIcon = L.icon({
      iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=%233e9cfe&icon=paw&apiKey=${myAPIKey}`,
      iconSize: [31, 46], // size of the icon
      iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
    });


    const markerIconProd = L.icon({
      iconUrl: ` https://api.geoapify.com/v1/icon/?type=material&color=%238b6607&icon=industry&iconType=awesome&scaleFactor=2&apiKey=${myAPIKey}`,
      iconSize: [31, 46], // size of the icon
      iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
    });

    var prodX = [];
    var prodY = [];
    for (let n = 0; n <= 5; n++) {

      var randomx = Math.floor(Math.random() * 10);
      var randomy = Math.floor(Math.random() * 10);

      prodX[n] = 24.096980 + randomx * 3;
      prodY[n] = 90.555466 - randomy * 3;
      const zooMarker = L.marker([24.096980 + randomx * 3, 90.555466 - randomy * 3], {
        icon: markerIcon
      }).addTo(map);

      const fromWaypoint = [24.096980 + randomx * 3, 90.555466 - randomy * 3]; // latutude, longitude
      const toWaypoint = [38.881152, -76.990693]; // latitude, longitude


      const url = `https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&details=instruction_details&apiKey=${myAPIKey}`;

      fetch(url).then(res => res.json()).then(result => {
        console.log(result);
      }, error => console.log("Error in routing"));



    }

    var locationX = [];
    var locationY = [];
    for (let n = 0; n <= 5; n++) {

      var randomx = Math.floor(Math.random() * 3);
      var randomy = Math.floor(Math.random() * 3);
      locationX[n] = 24.096980 + randomx * 3;
      locationY[n] = 90.555466 - randomy * 3;
      const zooMarker2 = L.marker([24.096980 + randomx * 3, 90.555466 - randomy * 3], {
        icon: markerIconProd
      }).addTo(map);
      // create a red polygon from an array of LatLng points
    }

    // var latlngs = [[(locationX[0] as Number), locationY[0] as Number], [(prodX[1] as Number), prodY[1] as Number]];
    // var latlngYellow = [[(locationX[1] as Number), locationY[1] as Number], [(prodX[2] as Number), prodY[2] as Number]];


    // var polygon = L.polygon(latlngs as [number, number][], { color: 'green' }).addTo(map);

    for (let i = 0; i < 4; i++) {

     
      if(i%2)
      {
        L.Polyline.Arc([locationX[i], locationY[i]], [prodX[i], prodY[i]], {
          color: 'red',
          vertices: 200
        }).addTo(map);
      }
  
      else
      {

        L.Polyline.Arc([locationX[i], locationY[i]], [prodX[i], prodY[i]], {
          color: 'blue',
          vertices: 200
        }).addTo(map);
  
      }
  

    }



    // var polygon2 = L.polygon(latlngYellow as [number, number][], { color: 'blue' }).addTo(map);
    // map.fitBounds(polygon.getBounds());



    tiles.addTo(map);




    // zoom the map to the polygon



    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }



  constructor() { }




  ngAfterViewInit(): void {
    this.initMap();


  }
}