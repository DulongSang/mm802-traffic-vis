import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style.js';

import { listCameras } from '../api/MapApi';
import { CameraInfo } from '../types/MapData';


export function MapComponent() {
  const [cameras, setCameras] = useState<CameraInfo[]>([]);
  useEffect(() => {
    listCameras().then((cameras) => {
      setCameras(cameras);
    });
  }, []);

  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const markerLayer = new VectorLayer({
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

    const select = new Select({
      layers: [markerLayer],
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
        markerLayer,
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
  }, [cameras]);

  return (
    <div ref={mapElement} style={{ height: '100%', width: '100%' }}></div>
  );
};
