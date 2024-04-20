import { Grid } from '@mui/material';
import { Map as MapIcon, Dashboard as DashboardIcon, Warning as WarningIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { FilterSidebar } from '../components/filters/FilterSidebar';
import { MapComponent } from '../components/MapComponent';
import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';

export function MapView() {
  const sidebarItems: SidebarItem[] = [
    { title: 'Map View', icon: <MapIcon />, href: '/map-view' },
    { title: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { title: 'Traffic Disruptions', icon: <WarningIcon />, href: '/disruptions'},
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ height: '100vh', background: 'linear-gradient(#f2e3f8, #dcebfd, #def5ee)' }}>
      <Grid container columns={7} spacing={2} style={{ height: '100%' }}>
        <Grid item xs={1}>
          <SidebarComponent items={sidebarItems} />
        </Grid>
        <Grid item xs={6} style={{ height: '100%' }}>
          <Grid container columns={5} spacing={2} style={{ height: '100%' }}>
            <Grid item xs={4}>
              <MapComponent />
            </Grid>
            <Grid item xs={1}>
              <FilterSidebar />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </LocalizationProvider>
  );
}
