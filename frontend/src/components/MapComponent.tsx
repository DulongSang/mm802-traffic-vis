import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Icon, Style } from 'ol/style.js';

import { listCameras } from '../api/MapApi';
import { listTrafficDisruptions } from '../api/TrafficApi';
import { CameraInfo } from '../types/MapData';
import { TrafficDisruption } from '../types/TrafficDisruption';


export function MapComponent() {
  const [cameras, setCameras] = useState<CameraInfo[]>([]);
  const [disruptions, setDisruptions] = useState<TrafficDisruption[]>([]);
  useEffect(() => {
    listCameras().then((cameras) => {
      setCameras(cameras);
    });
  }, []);
  useEffect(() => {
    listTrafficDisruptions().then((disruptions) => {
      setDisruptions(disruptions);
    });
  }, []);

  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const cameraLayer = new VectorLayer({
      source: new VectorSource({
        features: cameras.map((cameraInfo) => new Feature({
          geometry: new Point(fromLonLat(cameraInfo.coordinate)),
          id: cameraInfo.id,
          name: cameraInfo.name,
        })),
      }),
      style: new Style({
        image: new Icon({
          src: 'https://cdn.icon-icons.com/icons2/1369/PNG/32/-videocam_90062.png',
        })
      }),
    });

    const disruptionLayer = new VectorLayer({
      source: new VectorSource({
        features: disruptions.map((disruption) => new Feature({
          geometry: new Point(fromLonLat(disruption.coordinate)),
          id: disruption.disruption_id,
          name: disruption.description,
        })),
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: '#f0c34c',
          }),
        })
      }),
    });

    const select = new Select({
      layers: [cameraLayer],
    });
    select.on('select', (event) => {
      const feature = event.selected[0];
      window.location.href = `/intersection/camera/${feature.get('id')}`
    });

    const edmontonCoords = fromLonLat([-113.4938, 53.5461]);
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        disruptionLayer,
        cameraLayer,
      ],
      view: new View({
        center: edmontonCoords,
        zoom: 11,
      }),
    });
    map.on('pointermove', (event) => {
      map.getTargetElement().style.cursor = map.hasFeatureAtPixel(map.getEventPixel(event.originalEvent)) ? 'pointer' : '';
    });
    map.addInteraction(select);

    return () => map.setTarget(undefined);
  }, [cameras, disruptions]);

  return (
    <div ref={mapElement} style={{ height: '100%', width: '100%' }}></div>
  );
};
