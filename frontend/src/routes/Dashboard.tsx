import { Grid } from '@mui/material';
import {
  Map as MapIcon,
  Dangerous as DangerousIcon,
  Dashboard as DashboardIcon,
  MinorCrash as MinorCrashIcon,
  Traffic as TrafficIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';
import { BarChartCard } from '../components/dashboard/BarChartCard';
import { LineChartCard } from '../components/dashboard/LineChartCard';
import { SingleValueCard } from '../components/dashboard/SingleValueCard';
import { 
  getTrafficIndex, getTotalDisruption, getTrafficJams,
  getTrafficIndexTrend, getDisruptionImpactDistribution, getTrafficJamsTrend,
} from '../api/TrafficApi';

export function Dashboard() {
  const sidebarItems: SidebarItem[] = [
    { title: 'Map View', icon: <MapIcon />, href: '/map-view' },
    { title: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { title: 'Traffic Disruptions', icon: <WarningIcon />, href: '/disruptions'},
  ];

  return (
    <div style={{ height: '100vh', background: 'linear-gradient(#f2e3f8, #dcebfd, #def5ee)' }}>
      <Grid container columns={7} spacing={2} style={{ height: '100%' }}>
        <Grid item xs={1}>
          <SidebarComponent items={sidebarItems} />
        </Grid>
        <Grid item xs={6}>
          <DashboardContent />
        </Grid>
      </Grid>
    </div>
  );
}

function DashboardContent() {
  return (
    <div>
      <Grid container columns={3} spacing={2} style={{ padding: '24px 12px 12px 0' }}>
        <Grid item xs={1}>
          <SingleValueCard
            title="Overall Traffic Index"
            icon={<TrafficIcon fontSize='large' />}
            iconBackgroundColor="#2ea043"
            iconColor="white"
            autoUpdateMs={60000}
            fetchValue={getTrafficIndex}
          />
        </Grid>
        <Grid item xs={1}>
          <SingleValueCard
            title="Total Disruption"
            icon={<DangerousIcon fontSize='large' />}
            iconBackgroundColor="#f37515"
            iconColor="white"
            autoUpdateMs={60000}
            fetchValue={getTotalDisruption}
          />
        </Grid>
        <Grid item xs={1}>
          <SingleValueCard
            title="Traffic Jams"
            icon={<MinorCrashIcon fontSize='large' />}
            iconBackgroundColor="#e41400"
            iconColor="white"
            autoUpdateMs={60000}
            fetchValue={getTrafficJams}
          />
        </Grid>

        <Grid item xs={1}>
          <LineChartCard
            title="Traffic Index Trend"
            colors={['#19bf38']}
            chartBackgroundColor="#d9ffe0"
            fetchData={getTrafficIndexTrend}
          />
        </Grid>
        <Grid item xs={1}>
          <BarChartCard
            title="Traffic Disruption"
            chartBackgroundColor="#ffdbbf"
            chartHeight={515}
            fetchData={getDisruptionImpactDistribution}
          />
        </Grid>
        <Grid item xs={1}>
          <LineChartCard
            title="Traffic Jams Trend"
            colors={['#e41400']}
            chartBackgroundColor="#ffccc7"
            fetchData={getTrafficJamsTrend}
          />
        </Grid>
      </Grid>
    </div>
  );
}
