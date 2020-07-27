
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
import {get as getProjection} from 'ol/proj';


  class MainMap extends React.Component{
constructor(){
  super();
  this.state ={stateRevenue : {
    "DE-BB": 5627,
    "DE-BE": 5500,
    "DE-BW": 3231,
    "DE-BY": 1813,
    "DE-HB": 9792,
    "DE-HE": 4538,
    "DE-HH": 2883,
    "DE-MV": 9752,
    "DE-NI": 5550,
    "DE-NW": 282,
    "DE-RP": 1469,
    "DE-SH": 9673,
    "DE-SL": 7858,
    "DE-SN": 3835,
    "DE-ST": 3852,
    "DE-TH": 4264
    }}
}
     
componentDidMount(){

      const resultRev = data.features.map((f)=>{
      const stateOfThisFeature = f.properties['id'];
      const revenueForThisState = this.state.stateRevenue[stateOfThisFeature];
      f.properties['revenue'] = revenueForThisState;
      return revenueForThisState;
      });
      
    console.log(resultRev)
 
      const colorFunc = resultRev.map((result, i)=>{
              console.log(result)
              let color = null;
             if (result > 0 && result < 2000) {
              console.log(result)
              color = 'rgba(255,0,0,0.2)';
        
            } else if (result >= 2000 && result < 4000) {
              console.log(result)
              color = 'rgba(0,0,255,0.2)';
            } else if (result > 4000) {
              console.log(result)
              color = 'rgba(0,255,0,0.4)';
            }
             
             return  new Style({
                stroke: new Stroke({
                  color: 'green',
                  width: 2
                }),
                fill: new Fill({
                  color: color, 
                  
                })
              })
     

        })
     
        
 
       
      
  
var vectorSource = new VectorSource({
        features: new GeoJSON({
        dataProjection: "EPSG:4326",
        featureProjection:"EPSG:3857"
        }).readFeatures(data),
        });



      let vectorLayer = new VectorLayer({ style: colorFunc,source: vectorSource });
     
      var map = new Map({
            target: 'map',
            layers: [
              new TileLayer({
                source: new OSM()
              }),   
                vectorLayer
              ],
                view: new View({
                center: fromLonLat([0, 0]),
                zoom: 4
              })
            });
        
          }
          render(){
            return(<div id="map" className="main-map"></div>)
          }

  }


export default MainMap;