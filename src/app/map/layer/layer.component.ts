import { Component, Input, OnInit, Host } from '@angular/core';

import { MapService } from '../map.service';
import { MapidService } from '../mapid.service';
import OlMap from 'ol/Map';
import OSM from 'ol/source/osm';
import Stamen from 'ol/source/Stamen';
import OlTileLayer from 'ol/layer/Tile';

import * as l from 'ol/layer';
import * as s from 'ol/source';


@Component({
  selector: 'app-layer',
  template: ''
})
export class LayerComponent implements OnInit {

  @Input() layer;

  @Input() name;

  @Input() opacity = 1;

  @Input() visibility = true;

  markerVSource = new s.Vector({ features : [], attributions : 'National UFO Reporting Center',});

  constructor(
    private mapService : MapService,
    @Host()
    private mapidService : MapidService
  ) { }

  ngOnInit() {
    const map : OlMap = this.mapService.getMap(this.mapidService);

    let layer;
    switch (this.layer) {
      case 'marker': {
        layer = new l.Vector({ 
          source: this.markerVSource 
        });
         break;
      }
      case 'watercolor': {
        layer = new OlTileLayer({
          source: new Stamen({ layer: 'watercolor' })
        });
        break;
      }
      case 'labels': {
        layer = new OlTileLayer({
          source: new Stamen({ layer: 'toner-labels' })
        });
        break;
      }
      case 'OSM':
      default: {
        layer = new OlTileLayer({
          source: new OSM()
        });
      }
    }

    if (this.layer == 'marker') {
      const features = this.mapService.olPtsLayer() 
      const mStyle = this.mapService.markerStyle(); 
      this.markerVSource.addFeatures(features) 
      layer.setStyle(mStyle); 
      layer.setVisible(this.visibility); 
      layer.setOpacity(this.opacity); console.log(this.markerVSource.getFeatures())
       }

       layer.set('name', this.name || this.layer);
       layer.setOpacity(this.opacity);
       layer.setVisible(this.visibility);
       map.addLayer(layer);
  }

}
