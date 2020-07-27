
import React from "react";
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle, Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, RegularShape } from 'ol/style';
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj';
import { fromLonLat, get } from "ol/proj"
import { transform } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import data from "./germany.json"
import Polygon from 'ol/geom/Polygon';

console.log(data)
class MainMap extends React.Component{

 componentDidMount(){

var vectorSource = new VectorSource({
	url: data,
	format: new GeoJSON()
});
let vectorLayer = new VectorLayer({ source: vectorSource });
     
var map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          }),   
         
          vectorLayer
        
       ],
         view: new View({
          center:fromLonLat([0, 0]),
          zoom: 4
        })
      });
  
    }
        
    render(){
      
    return(<div id="map" className="main-map"></div>)
    }

  }


export default MainMap;