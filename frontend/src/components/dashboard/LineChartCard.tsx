import { useState } from 'react';
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { Update as UpdateIcon } from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';

export function LineChartCard(props: LineChartCardProps) {
  const { series, xAxis, title, colors, chartBackgroundColor, chartHeight } = props;

  const [period, setPeriod] = useState("last 24 hour");

  return (
    <Paper square={false} style={{ borderRadius: '12px', padding: '12px' }}>
      <Paper style={{ width: '100%', backgroundColor: chartBackgroundColor }}>
        <LineChart
          series={series}
          xAxis={xAxis}
          height={chartHeight ?? 400}
          colors={colors}
          grid={{ horizontal: true }}
        />
      </Paper>
      <h3>{title}</h3>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Period</InputLabel>
        <Select
          value={period}
          label="Period"
          onChange={(event) => {
            setPeriod(event.target.value);
          }}
        >
          <MenuItem value={"last 24 hour"}>last 24 hour</MenuItem>
          <MenuItem value={"last week"}>last week</MenuItem>
          <MenuItem value={"last month"}>last month</MenuItem>
          <MenuItem value={"last year"}>last year</MenuItem>
        </Select>
      </FormControl>
      <Divider style={{ margin: '10px 0'}} />
      <div style={{ color: '#9e9e9e' }}>
        <UpdateIcon style={{ verticalAlign: 'middle', marginRight: '10px' }} />
        Updated {Math.floor(Math.random() * 20)} minutes ago
      </div>
    </Paper>
  );
}

export type LineChartCardProps = {
  series: {
    data: (number | null)[],
    label?: string,
  }[],
  xAxis: {
    data: number[] | string[],
    scaleType?: 'point'
  }[],
  title: string,
  colors?: string[],
  chartBackgroundColor?: string,
  chartHeight?: number,
};
