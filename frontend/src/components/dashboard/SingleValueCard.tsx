import { useState, useEffect } from 'react';
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import AnimatedNumber from "react-animated-numbers";


export function SingleValueCard(props: SingleValueCardProps) {
  const { title, value, icon, iconColor, iconBackgroundColor, updatePercentage, updatePeriod, valueTextColor } = props;

  const [curValue, setCurValue] = useState(value);
  const [period, setPeriod] = useState(updatePeriod);
  const [percentage, setPercentage] = useState(updatePercentage);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 10) - 5;
      setCurValue(curValue + change);
      setPercentage(percentage + change);
    }, Math.floor(Math.random() * 5000) + 10000);
    return () => clearInterval(interval);
  }, [curValue, percentage]);

  return (
    <Paper square={false} style={{ position: 'relative', padding: '12px', marginTop: '16px', borderRadius: '12px' }}>
      <Paper
        square={false}
        style={{ position: 'absolute', top: '-16px', left: '16px', padding: '16px', backgroundColor: iconBackgroundColor, borderRadius: '16px' }}>
        <span style={{ color: iconColor }}>{icon}</span>
      </Paper>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '24px', color: 'gray' }}>{title}</div>
          <div style={{ float: 'right' }}>
            <AnimatedNumber
              fontStyle={{ fontSize: '40px', color: valueTextColor, fontWeight: 'bold' }}
              includeComma
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.5,
              })}
              animateToNumber={curValue}
            />
          </div>
        </div>
      </div>
      <Divider style={{ marginTop: '12px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: percentage > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
            {percentage > 0 ? `+${percentage}` : percentage}%
          </span>
          <span style={{ margin: '0 8px' }}>than</span>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>Period</InputLabel>
            <Select
              value={period}
              label="Period"
              onChange={(event) => {
                setPeriod(event.target.value);
                setCurValue(Math.floor(Math.random() * 100));
                setPercentage(Math.floor(Math.random() * 40) - 20);
              }}
            >
              <MenuItem value={"last hour"}>last hour</MenuItem>
              <MenuItem value={"yesterday"}>yesterday</MenuItem>
              <MenuItem value={"last week"}>last week</MenuItem>
              <MenuItem value={"last month"}>last month</MenuItem>
              <MenuItem value={"last year"}>last year</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </Paper>
  );
}

export type SingleValueCardProps = {
  title: string,
  value: number,
  icon: JSX.Element,
  iconColor: string,
  iconBackgroundColor: string,
  updatePercentage: number,
  updatePeriod: string,
  valueTextColor?: string,
};
