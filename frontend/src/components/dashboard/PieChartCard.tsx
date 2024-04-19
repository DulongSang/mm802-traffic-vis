import { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

export type PieChartData = {
  value: number,
  label: string,
}[];

export type PieChartCardProps = {
  title: string,
  fetchData(): Promise<PieChartData>,
  chartBackgroundColor?: string,
  chartHeight?: number,
  cardHeight?: number,
};

export function PieChartCard(props: PieChartCardProps) {
  const { title, fetchData, chartBackgroundColor, chartHeight, cardHeight } = props;

  const [data, setData] = useState<PieChartData>([]);
  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]);

  return (
    <Paper square={false} style={{ borderRadius: '12px', padding: '12px', height: cardHeight }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <Paper style={{ width: '100%', backgroundColor: chartBackgroundColor, padding: '20px 0' }}>
        <PieChart
          series={[{
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { additionalRadius: -20 }
          }]}
          height={chartHeight ?? 360}
        />
      </Paper>
    </Paper>
  );
}
