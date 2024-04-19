import { useParams } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import {
  ArrowBackIosNew as BackIcon,
  Dashboard as DashboardIcon,
  DirectionsCar as CarIcon,
  Speed as SpeedIcon,
  Traffic as TrafficIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material';

import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';
import { LineChartCard } from '../components/dashboard/LineChartCard';
import { PieChartCard } from '../components/dashboard/PieChartCard';
import { SingleValueCard } from '../components/dashboard/SingleValueCard';
import { 
  getVehicleCount, getTrafficIndex, getAverageSpeed, getPredictedVolume,
  getVehicleDistribution, getTrafficIndexTrend, getAverageSpeedTrend,
} from '../api/IntersectionApi';

export function IntersectionDashboard() {
  const { id } = useParams<{ id: string }>();

  const sidebarItems: SidebarItem[] = [
    { title: 'Camera', icon: <VideocamIcon />, href: `/intersection/camera/${id}` },
    { title: 'Dashboard', icon: <DashboardIcon />, href: `intersection/dashboard/${id}` },
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
          <DashboardContent />
        </Grid>
      </Grid>
    </div>
  );
}

function DashboardContent() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Grid container columns={3} spacing={2} style={{ padding: '24px 12px 12px 0' }}>
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
          <PieChartCard
            title="Vehicle Count Distribution"
            fetchData={() => getVehicleDistribution(id!)}
            chartBackgroundColor='#fcd6ff'
            cardHeight={555}
          />
        </Grid>
        <Grid item xs={1}>
          <LineChartCard
            title="Traffic Index Trend"
            colors={['#37a3f0']}
            chartBackgroundColor="#b8e1ff"
            fetchData={(period) => getTrafficIndexTrend(id!, period)}
          />
        </Grid>
        <Grid item xs={1}>
          <LineChartCard
            title="Average Speed Trend"
            colors={['#0dbc79']}
            chartBackgroundColor="#d4ffee"
            fetchData={period => getAverageSpeedTrend(id!, period)}
          />
        </Grid>

        <Grid item xs={1}>
          <SingleValueCard
            title="Predicted Volume Today" icon={<CarIcon fontSize='large' />} iconColor='white' iconBackgroundColor='#1976d2'
            fetchValue={(datetime: Date) => getPredictedVolume(id!)} noUpdate
          />
        </Grid>
      </Grid>
    </div>
  );
}
