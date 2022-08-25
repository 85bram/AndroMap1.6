import { Injectable } from '@angular/core';

import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import OlMap from "ol/Map";
import OlView from "ol/View";
import { Style, Icon, Fill, Text, Stroke } from 'ol/style'

@Injectable({
  providedIn: 'root'
})
export class MapService {


  private map = {};

  vectorSource: any;
  rp = [];
  features = [];

  constructor() { 
    this.rp = this.generateRandomPoints({ 'lat': 7.0785, 'lng': 51.4614 }, 9999999, 100);
    console.log(this.rp)
  }

  private createMap(id): OlMap {
    const map = new OlMap({
      target : id,
      view : new OlView({
        center : [0,0],
        zoom : 1,
        projection : 'EPSG:3857'
      })
    });
    return map;
  }

  getMap(id): OlMap {
    id = ((id && id.getId) ? id.getId() : id) || 'map';
    
    if (!this.map[id]) {
      this.map[id] = this.createMap(id);
    }
    return this.map[id];
  }

  getMaps() {
    return this.map;
  }

  getArrayMaps() {
    return Object.values(this.map);
  }

  markerStyle() {
    return new Style({
      image: new Icon({
        src: './assets/img/marker.png',
        scale: 0.30 * 100 / 900
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff', width: 2
        }),
        textAlign: 'center',
        textBaseline: 'top',
        text: ' hello every one ',
        offsetY: 5
      })
    })
  }

  public olPtsLayer() {
    let features = []
    this.rp.forEach(element => {
      var coords = fromLonLat([parseFloat(element.lat), parseFloat(element.lng)]);
      features.push(
        new Feature({
          geometry: new Point(coords),
        })
      );
    });
    return features
  }

  generateRandomPoints(center, radius, count) {
    const points = [];
    for (let i = 0; i < count; i++) {
      points.push(this.generateRandomPoint(center, radius, i));
    }
    return points;
  }

  generateRandomPoint(center, radius, i) {
    const x0 = center.lng;
    const y0 = center.lat;
    const rd = radius / 111300;

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    const xp = x / Math.cos(y0);
    return { 'lat': y + y0, 'lng': xp + x0, 'id': i };
  }
}
