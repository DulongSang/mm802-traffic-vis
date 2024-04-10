import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';


export function MapComponent(props: MapProps) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const edmontonCoords = [-113.4938, 53.5461];
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(edmontonCoords),
        zoom: 11,
      }),
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div ref={mapElement} style={{ height: '100%', width: '100%' }}></div>
  );
};

export type MapProps = {

};
