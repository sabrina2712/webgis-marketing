
import React from "react";
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, RegularShape } from 'ol/style';
import { fromLonLat, get } from "ol/proj"
import data from "./germany.json"
import Overlay from 'ol/Overlay';




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
          },
        colors: {red: "rgba(255,0,0,1)", green: "rgba(0,255,0,1)", blue:"rgba(0,0,255,1)", purple: "rgba(145, 61, 136, 1)" },
        info: ""
      }
        
}
    onClickHandler=(evt)=>{
     
      let pixel = evt.pixel;
           console.log("clicked")
           let stateRev =this.state.stateRevenue
           console.log(this)
          this.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
           
                  let coordinateClicked = evt.coordinate;
                  let eachId = feature.get("id")
                  console.log(stateRev)
                  let curRev = stateRev[eachId]
                  console.log(curRev)
                  this.setState(()=>{
                    let info =this.state.info;
                    return {info: curRev}
                  })
                

              });}
            getColor = (d)=>{
       
                return d > 6000 ? '#800026' :
                  d > 5000  ? '#BD0026' :
                  d > 4000  ? '#E31A1C' :
                  d > 3000  ? '#FC4E2A' :
                  d > 2000   ? '#FD8D3C' :
                  d > 1000   ? '#FEB24C' :
                  d > 500 ? '#FED976' :
                             '#FFEDA0';
                }
                    
                    
              getLegend=()=>{
                return <>
                <div style={{width:"20px", height:"20px", backgroundColor: this.getColor(1000)}}><span className="legend-span">{">"}1000</span></div>
                <div style={{width:"20px", height:"20px", backgroundColor: this.getColor(2000)}}><span className="legend-span">{">"}2000</span></div>
                <div style={{width:"20px", height:"20px", backgroundColor: this.getColor(3000)}}><span className="legend-span">{">"}3000</span></div>
                <div style={{width:"20px", height:"20px", backgroundColor: this.getColor(5000)}}><span className="legend-span">{">"}5000</span></div>
                <div style={{width:"20px", height:"20px", backgroundColor: this.getColor(6000)}}><span className="legend-span">{">"}6000</span></div>
                <div style={{width:"20px", height:"20px", backgroundColor: this.getColor(9000)}}><span className="legend-span">{">"}8000</span></div>
                
                </>
              }
          
          
          
    
    
 componentDidMount(){

      data.features.forEach((f)=>{
      const stateOfThisFeature = f.properties['id'];
      const revenueForThisState = this.state.stateRevenue[stateOfThisFeature];
      f.properties['revenue'] = revenueForThisState;
      
      });
     
      const getStyle=(f)=> {
        let id = f.get("id")
        let name = f.get("name")
        let rev = this.state.stateRevenue[id]
        
        console.log(rev)
          return  new Style({
          stroke: new Stroke({
          width: 2
          }),
          fill: new Fill({
          color: this.getColor( f.get("revenue"))
        })
     })}



var infoMy = document.getElementById('info');


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new Overlay({
	element: infoMy,
	autoPan: true,
	autoPanAnimation: {
		duration: 250
	}
});
            
    var vectorSource = new VectorSource({
        features: new GeoJSON({
            dataProjection: "EPSG:4326",
            featureProjection:"EPSG:3857"
        }).readFeatures(data),
        });

   let vectorLayer = new VectorLayer({ style:  getStyle, source: vectorSource });
        var map = new Map({
              target: 'map',
              layers: [
            new TileLayer({
              source: new OSM()
              }),   
            vectorLayer
            ],
            overlays: [overlay],
              view: new View({
              center: fromLonLat([ 13.404954, 52.520008]),
              zoom: 5
              })
            });
      let stateRev =this.state.stateRevenue
      let info = this.state.info
    
    
      map.on('click', function(evt) {
              
        let pixel = evt.pixel;
        console.log("clicked")
        
        console.log(pixel)
        console.log(this)
     map.forEachFeatureAtPixel(pixel, function (feature, layer) {
      
      let stateName = feature.get("name")
      console.log(stateName)
             let eachId = feature.get("id")
             console.log(stateRev)
             let curRev = stateRev[eachId]
            
             console.log(this)
             var coordinate = evt.coordinate;
             overlay.setPosition(coordinate);
            
     let info = document.getElementById("info")
     info.innerHTML= ` ${ stateName} Rv: ${curRev}`

     let legend = document.getElementById("legend")
    
     
          })
         
        })
      }
      
     

         
       
          render(){
            return(<div id="map" className="main-map" >
              <div id="info" ></div>
            <div id="legend"><h3 className="legend-header">Legend </h3> {this.getLegend()}</div>
           
            </div>)
          }
        }
export default MainMap;

