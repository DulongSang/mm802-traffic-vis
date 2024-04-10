import { Grid } from '@mui/material';
import { Map as MapIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { FilterSidebar } from '../components/filters/FilterSidebar';
import { MapComponent } from '../components/MapComponent';
import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';

export function MapView() {
  const sidebarItems: SidebarItem[] = [
    { title: 'Map View', icon: <MapIcon />, href: '/map-view' },
    { title: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ height: '100vh', background: 'linear-gradient(#f2e3f8, #dcebfd, #def5ee)' }}>
      <Grid container columns={15} spacing={2} style={{ height: '100%' }}>
        <Grid item xs={2}>
          <SidebarComponent items={sidebarItems} />
        </Grid>
        <Grid item xs={10}>
          <MapComponent cameraLocations={[{ coordinate: [-113.4938, 53.5461], name: 'a', id: 1 }]} />
        </Grid>
        <Grid item xs={3}>
          <FilterSidebar />
        </Grid>
      </Grid>
    </div>
    </LocalizationProvider>
  );
}
