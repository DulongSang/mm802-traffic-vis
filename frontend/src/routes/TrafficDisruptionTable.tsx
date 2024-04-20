import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Map as MapIcon, Dashboard as DashboardIcon, Warning as WarningIcon } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';
import { ProgressBar } from '../components/dashboard/ProgressBar';
import { listTrafficDisruptions } from '../api/TrafficApi';
import { TrafficDisruption } from '../types/TrafficDisruption';

export function TrafficDisruptionTable() {
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
          <DataTable />
        </Grid>
      </Grid>
    </div>
  );
}

function DataTable() {
  const [rows, setRows] = useState<TrafficDisruption[]>([]);
  useEffect(() => {
    listTrafficDisruptions().then((data) => {
      setRows(data);
    });
  }, []);

  const columns: GridColDef<TrafficDisruption>[] = [
    { field: 'disruption_id', headerName: 'ID', width: 60 },
    { field: 'status', headerName: 'Status', width: 90 },
    { field: 'closure', headerName: 'Closure', width: 200 },
    { field: 'on_street', headerName: 'On Street', width: 200 },
    { field: 'impact', headerName: 'Impact', width: 180 },
    { field: 'start_date', headerName: 'Start Date', width: 120 },
    { field: 'finish_date', headerName: 'Finish Date', width: 120 },
    { field: 'progress', headerName: 'Progress', width: 120, renderCell: (params) => <ProgressBar value={params.value} /> },
    { field: 'details', headerName: 'Details', width: 250 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'activity_type', headerName: 'Activity Type', width: 120 },
    { field: 'traffic_district', headerName: 'Traffic District', width: 120 },
    { field: 'infrastructure', headerName: 'Infrastructure', width: 200 },
  ];

  return (
    <Box style={{ height: '90vh', width: '100%', marginTop: '20px' }}>
      <h2>Traffic Disruptions</h2>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  )
}
