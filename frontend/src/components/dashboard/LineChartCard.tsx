import { useState, useEffect } from 'react';
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { Update as UpdateIcon } from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';

export type LineChartData = {
  series: {
    data: (number | null)[],
    label?: string,
  }[],
  xAxis: {
    data: number[] | string[],
  }[],
};

const PERIOD_OPTIONS = [
  "last 24 hour",
  "last week",
  "last month",
  "last year",
];

export function LineChartCard(props: LineChartCardProps) {
  const { title, fetchData, colors, chartBackgroundColor, chartHeight } = props;

  const [period, setPeriod] = useState<typeof PERIOD_OPTIONS[number]>("last 24 hour");
  const [data, setData] = useState<LineChartData>({
    series: [],
    xAxis: [],
  });

  useEffect(() => {
    fetchData(period).then((data) => {
      setData(data);
    });
  }, [period]);

  return (
    <Paper square={false} style={{ borderRadius: '12px', padding: '12px' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <Paper style={{ width: '100%', backgroundColor: chartBackgroundColor, marginBottom: '12px' }}>
        <LineChart
          series={data.series}
          xAxis={data.xAxis}
          height={chartHeight ?? 400}
          colors={colors}
          grid={{ horizontal: true }}
        />
      </Paper>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Period</InputLabel>
        <Select
          value={period}
          label="Period"
          onChange={(event) => {
            setPeriod(event.target.value);
          }}
        >
          {PERIOD_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
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
  title: string,
  fetchData(period: string): Promise<LineChartData>,
  colors?: string[],
  chartBackgroundColor?: string,
  chartHeight?: number,
};
