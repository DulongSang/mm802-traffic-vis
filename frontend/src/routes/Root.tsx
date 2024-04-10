import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { FilterSidebar } from '../components/filters/FilterSidebar';
import { MapComponent } from '../components/MapComponent';

export function Root() {
  return (<LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'linear-gradient(#f2e3f8, #dcebfd, #def5ee)' }}>
      <h1 style={{ fontSize: '56px', textAlign: 'center' }}>🚗Edmonton Traffic Dashboard🚦</h1>
      <Grid container columns={5} spacing={1} style={{ flexGrow: 1, padding: '8px' }}>
        <Grid item xs={1}>
          <FilterSidebar />
        </Grid>
        <Grid item xs={4}>
          <MapComponent />
        </Grid>
      </Grid>
    </div>
    </LocalizationProvider>
  );
}
