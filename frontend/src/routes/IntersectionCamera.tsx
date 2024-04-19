import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControlLabel, Grid, Switch } from '@mui/material';
import {
  ArrowBackIosNew as BackIcon,
  Dashboard as DashboardIcon,
  DirectionsCar as CarIcon,
  Speed as SpeedIcon,
  Traffic as TrafficIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material';

import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style.js';

import mockTopDownView from '../assets/intersection-topdown-view.png'

import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';
import { SingleValueCard } from '../components/dashboard/SingleValueCard';
import { LineChartCard } from '../components/dashboard/LineChartCard';
import { 
  getVehicleCount, getTrafficIndex, getAverageSpeed,
  getVehicleCountTrend, getTrafficIndexTrend, getAverageSpeedTrend,
} from '../api/IntersectionApi';
import { getCameraInfo } from '../api/MapApi';

export function IntersectionCamera() {
  const { id } = useParams<{ id: string }>();

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Live Camera',
      icon: <VideocamIcon />,
      href: `/intersection/camera/${id}`,
    },
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      href: `/intersection/dashboard/${id}`,
    },
  ];

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(#f2e3f8, #dcebfd, #def5ee)' }}>
      <Grid container columns={7} spacing={2} style={{ height: '100%' }}>
        <Grid item xs={1}>
          <SidebarComponent items={sidebarItems} />
        </Grid>
        <Grid item xs={6}>
          <div style={{ margin: '20px 0' }}>
            <Button
              variant="contained" startIcon={<BackIcon />}
              onClick={() => window.location.href='/map-view'}
            >
              Back
            </Button>
          </div>
          <IntersectionCameraContent />
        </Grid>
      </Grid>
    </div>
  );
}

function IntersectionCameraContent() {
  const [isVehicleTracking, setIsVehicleTracking] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);

  const handleVehicleTrackingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVehicleTracking(event.target.checked);
    if (!videoRef.current || !sourceRef.current) return;

    videoRef.current.pause();
    const currentTime = videoRef.current.currentTime;
    sourceRef.current.setAttribute('src', event.target.checked ? "/videos/rsult_v5_compressed.mp4" : "/videos/test_5min_compressed.mp4");
    videoRef.current.load();
    videoRef.current.currentTime = currentTime;
    videoRef.current.play();
  };

  return (
    <div>
      <Grid container columns={7} spacing={2}>
        <Grid item xs={2}>
          <IntersectionMiniMap />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel control={
            <Switch checked={isVehicleTracking} onChange={handleVehicleTrackingChange}/>
          } label="Vehicle Tracking" />
          <video autoPlay muted loop width={'100%'} ref={videoRef}>
            <source src="/videos/test_5min_compressed.mp4" type="video/mp4" ref={sourceRef} />
          </video>
        </Grid>
        <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
          <IntersectionTopDownView />
        </Grid>
      </Grid>
      <MiniDashboard />
    </div>
  );
}

function MiniDashboard() {
  const { id } = useParams<{ id: string }>();

  return (
    <Grid container columns={3} spacing={2} style={{ marginTop: '12px', paddingRight: '12px' }}>
      <Grid item xs={1}>
        <SingleValueCard
          title="Vehicle Count" icon={<CarIcon fontSize='large' />} iconColor='white' iconBackgroundColor='#1976d2'
          fetchValue={(datetime: Date) => getVehicleCount(id!, datetime)} autoUpdateMs={60000}
        />
      </Grid>
      <Grid item xs={1}>
        <SingleValueCard
          title="Traffic Index" icon={<TrafficIcon fontSize='large' />} iconColor='white' iconBackgroundColor='#4bd400'
          fetchValue={(datetime: Date) => getTrafficIndex(id!, datetime)} autoUpdateMs={60000}
        />
      </Grid>
      <Grid item xs={1}>
        <SingleValueCard
          title="Average Speed" icon={<SpeedIcon fontSize='large' />} iconColor='white' iconBackgroundColor='#00e394'
          fetchValue={(datetime: Date) => getAverageSpeed(id!, datetime)} autoUpdateMs={60000}
        />
      </Grid>
      
      <Grid item xs={1}>
        <LineChartCard 
          title="Vehicle Count Trend" chartHeight={170} colors={['#1976d2']} chartBackgroundColor='#cce6ff'
          fetchData={(period) => getVehicleCountTrend(id!, period)}
        />
      </Grid>
      <Grid item xs={1}>
        <LineChartCard
          title="Traffic Index Trend" chartHeight={170} colors={['#4bd400']} chartBackgroundColor='#d9ffe0'
          fetchData={(period) => getTrafficIndexTrend(id!, period)}
        />
      </Grid>
      <Grid item xs={1}>
        <LineChartCard
          title="Average Speed Trend" chartHeight={170} colors={['#00e394']} chartBackgroundColor='#bdffe8'
          fetchData={(period) => getAverageSpeedTrend(id!, period)}
        />
      </Grid>
    </Grid>
  );
}

function IntersectionTopDownView() {
  return (
    <div>
      <img src={mockTopDownView} alt="mock-top-down-view" />
    </div>
  );
}


function IntersectionMiniMap() {
  const { id } = useParams<{ id: string }>();
  const mapElement = useRef<HTMLDivElement>(null);

  const [coordinate, setCoordinate] = useState<[number, number] | null>(null);
  useEffect(() => {
    getCameraInfo(id!).then((cameraInfo) => {
      setCoordinate(cameraInfo.coordinate);
    });
  }, [id]);

  useEffect(() => {
    if (!mapElement.current || !coordinate) return;

    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(fromLonLat(coordinate)),
          })
        ],
      }),
      style: new Style({
        image: new Icon({
          src: 'https://cdn.icon-icons.com/icons2/1369/PNG/32/-videocam_90062.png',
        })
      }),
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markerLayer,
      ],
      view: new View({
        center: fromLonLat(coordinate),
        zoom: 18,
      }),
    });

    return () => map.setTarget(undefined);
  }, [coordinate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', fontSize: '24px', marginBottom: '12px' }}>Location: <span style={{ fontWeight: 'bold' }}>{coordinate?.toString()}</span></div>
      <div ref={mapElement} style={{ height: '500px', width: '500px' }}></div>
    </div>
  );
}
