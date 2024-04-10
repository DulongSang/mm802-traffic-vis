import { Grid } from '@mui/material';
import { Map as MapIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { FilterSidebar } from '../components/filters/FilterSidebar';
import { MapComponent } from '../components/MapComponent';
import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';

import { CameraLocation } from '../types/MapData';

export function MapView() {
  const sidebarItems: SidebarItem[] = [
    { title: 'Map View', icon: <MapIcon />, href: '/map-view' },
    { title: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
  ];

  const mockCameraLocations: CameraLocation[] = [{ coordinate: [-113.4938, 53.5461], name: 'a', id: 1 }];

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
              <MapComponent cameraLocations={mockCameraLocations} />
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
