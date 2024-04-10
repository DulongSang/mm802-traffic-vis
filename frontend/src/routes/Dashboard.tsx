import { Grid } from '@mui/material';
import {
  Map as MapIcon,
  Dangerous as DangerousIcon,
  Dashboard as DashboardIcon,
  MinorCrash as MinorCrashIcon,
  Traffic as TrafficIcon,
} from '@mui/icons-material';

import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';
import { LineChartCard } from '../components/dashboard/LineChartCard';
import { SingleValueCard } from '../components/dashboard/SingleValueCard';

export function Dashboard() {
  const sidebarItems: SidebarItem[] = [
    { title: 'Map View', icon: <MapIcon />, href: '/map-view' },
    { title: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
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
            value={3}
            icon={<TrafficIcon fontSize='large' />}
            iconBackgroundColor="#2ea043"
            iconColor="white"
            updatePercentage={23}
            updatePeriod="last month"
          />
        </Grid>
        <Grid item xs={1}>
          <SingleValueCard
            title="Total Disruption"
            value={16}
            icon={<DangerousIcon fontSize='large' />}
            iconBackgroundColor="#f37515"
            iconColor="white"
            updatePercentage={-5}
            updatePeriod="last month"
          />
        </Grid>
        <Grid item xs={1}>
          <SingleValueCard
            title="Traffic Jams"
            value={3}
            icon={<MinorCrashIcon fontSize='large' />}
            iconBackgroundColor="#e41400"
            iconColor="white"
            updatePercentage={12}
            updatePeriod="yesterday"
          />
        </Grid>

        <Grid item xs={1}>
          <LineChartCard
            series={[{ data: [5, 2, 4, 1, 6, 7, 9, 3, 8, 10] }]}
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            title="Traffic Index History"
            colors={['#19bf38']}
            chartBackgroundColor="#d9ffe0"
          />
        </Grid>
        <Grid item xs={1}>
          <LineChartCard
            series={[{ data: [5, 2, 4, 1, 6, 7, 9, 3, 8, 10] }]}
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            title="Disruption History"
            colors={['#f37515']}
            chartBackgroundColor="#ffdbbf"
          />
        </Grid>
        <Grid item xs={1}>
          <LineChartCard
            series={[{ data: [5, 2, 4, 1, 6, 7, 9, 3, 8, 10] }]}
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            title="Traffic Jams History"
            colors={['#e41400']}
            chartBackgroundColor="#ffccc7"
          />
        </Grid>
      </Grid>
    </div>
  );
}
