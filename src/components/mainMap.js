
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
import { get as getProjection } from 'ol/proj';


class MainMap extends React.Component {
  constructor() {
    super();
    this.state = {
      stateRevenue: {
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
      colors: { red: "rgba(255,0,0,1)", green: "rgba(0,255,0,1)", blue: "rgba(0,0,255,1)", purple: "rgba(145, 61, 136, 1)" }
    }
  }

  componentDidMount() {

    const getColor = (d) => {
      console.log(d)
      return d > 6000 ? '#800026' :
        d > 5000 ? '#BD0026' :
          d > 4000 ? '#E31A1C' :
            d > 3000 ? '#FC4E2A' :
              d > 2000 ? '#FD8D3C' :
                d > 1000 ? '#FEB24C' :
                  d > 500 ? '#FED976' :
                    '#FFEDA0';
    }
    const getStyle = (f) => {
      console.log("-->", f);
      const id = f.get("id");
      const revenue = this.state.stateRevenue[id]
      return new Style({
        stroke: new Stroke({
          width: 2
        }),
        fill: new Fill({
          color: getColor(revenue)
        })
      })


    }


    var vectorSource = new VectorSource({
      features: new GeoJSON({
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857"
      }).readFeatures(data),
    });



    let vectorLayer = new VectorLayer({ style: getStyle, source: vectorSource });

    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([10, 50]),
        zoom: 5
      })
    });

  }
  render() {
    return (<div id="map" className="main-map"></div>)
  }

}


export default MainMap;