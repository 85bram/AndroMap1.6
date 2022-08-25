import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Style from 'ol/style/Style';
import { Fill, RegularShape, Stroke } from 'ol/style';

import Target from 'ol-ext/control/Target';
import Bar from 'ol-ext/control/Bar';
import Button from 'ol-ext/control/Button';
import { Control, defaults as defaultControls } from 'ol/control';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map : Map;

  constructor() {}
  
  ngOnInit(): void {

    this.map = new Map({
      //controls : defaultControls().extend([target]),
      view :new View({
        center : [0, 0],
        zoom : 1
      }),
      layers : [
        new TileLayer ({
          source : new OSM(),
        }),
      ],
      target : 'map'
    });
    setTimeout(() => {
      this.map.updateSize();
    }, 500);

    var targetStroke = new Stroke ({
      color : '#000000',
      width : 2
    });

    var mainBar = new Bar();
    this.map.addControl(mainBar);

    //var target = new Target({ style : targetStyle});
    //this.map.addControl(target);

    
    //this.map.addControl(target);

  }
}
