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

  const mockCameraLocations: CameraLocation[] = [
    { coordinate: [-113.508574, 53.546243], name: 'a', id: 1 },
    { coordinate: [-113.525888, 53.516568], name: 'b', id: 2 },
    { coordinate: [-113.512051, 53.522870], name: 'c', id: 3 },
    { coordinate: [-113.512052, 53.518140], name: 'd', id: 4 },
    { coordinate: [-113.508486, 53.541011], name: 'e', id: 5 },
    { coordinate: [-113.493885, 53.554756], name: 'f', id: 6 },
    { coordinate: [-113.508569, 53.558899], name: 'g', id: 7 },
    { coordinate: [-113.551325, 53.558957], name: 'h', id: 8 },
    { coordinate: [-113.449107, 53.518064], name: 'i', id: 9 },
    { coordinate: [-113.467299, 53.499606], name: 'j', id: 10 },
    { coordinate: [-113.590209, 53.543305], name: 'k', id: 11 },
    { coordinate: [-113.516341, 53.453954], name: 'l', id: 12 },
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
