import { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

export type BarChartData = {
  series: {
    data: (number | null)[],
    label?: string,
  }[],
  xAxis: {
    data: number[] | string[],
    scaleType?: 'band',
  }[],
};

export type BarChartCardProps = {
  title: string,
  fetchData(): Promise<BarChartData>,
  chartBackgroundColor?: string,
  chartHeight?: number,
};

export function BarChartCard(props: BarChartCardProps) {
  const { title, fetchData, chartBackgroundColor, chartHeight } = props;

  const [data, setData] = useState<BarChartData>({ series: [], xAxis: [] });
  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]);

  return (
    <Paper square={false} style={{ borderRadius: '12px', padding: '12px' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <Paper style={{ width: '100%', backgroundColor: chartBackgroundColor }}>
        <BarChart
          series={data.series}
          xAxis={data.xAxis}
          height={chartHeight ?? 400}
          grid={{ horizontal: true }}
        />
      </Paper>
    </Paper>
  );
}
