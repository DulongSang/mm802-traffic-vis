import { useState, useEffect } from 'react';
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import AnimatedNumber from "react-animated-numbers";

const PERIOD_TO_MS = {
  "last hour": 60 * 60 * 1000,
  "yesterday": 24 * 60 * 60 * 1000,
  "last week": 7 * 24 * 60 * 60 * 1000,
  "last month": 30 * 24 * 60 * 60 * 1000,
  "last year": 365 * 24 * 60 * 60 * 1000,
};

export function SingleValueCard(props: SingleValueCardProps) {
  const { title, icon, iconColor, iconBackgroundColor, autoUpdateMs, fetchValue, noUpdate } = props;

  const [curValue, setCurValue] = useState<number>(0);
  const [prevValue, setPrevValue] = useState<number>(0);
  const [deltaPercentage, setDeltaPercentage] = useState<number>(0);
  const [period, setPeriod] = useState<keyof typeof PERIOD_TO_MS>("last hour");

  // Auto update
  useEffect(() => {
    if (!autoUpdateMs) {
      return;
    }
    
    const interval = setInterval(() => {
      fetchValue(new Date()).then((value) => {
        setCurValue(value);
        setDeltaPercentage(((value - prevValue) / prevValue) * 100);
      });
    }, autoUpdateMs);
    return () => clearInterval(interval);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchValue(new Date()).then((value) => {
      setCurValue(value);
      setDeltaPercentage(((value - prevValue) / prevValue) * 100);
    });

    fetchValue(new Date(Date.now() - PERIOD_TO_MS[period])).then((value) => {
      setPrevValue(value);
      setDeltaPercentage(((curValue - value) / value) * 100);
    });
  }, [period]);
  
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
              fontStyle={{ fontSize: '40px', fontWeight: 'bold' }}
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
      {noUpdate ? <div style={{ height: '50px' }}></div> : (
        <>
        <Divider style={{ marginTop: '12px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: deltaPercentage > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
              {deltaPercentage > 0 ? `+${deltaPercentage}` : deltaPercentage}%
            </span>
            <span style={{ margin: '0 8px' }}>than</span>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Period</InputLabel>
              <Select
                value={period}
                label="Period"
                onChange={(event) => setPeriod(event.target.value as keyof typeof PERIOD_TO_MS)}
              >
                {Object.keys(PERIOD_TO_MS).map((period) => (
                  <MenuItem key={period} value={period}>{period}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        </>
      )}
    </Paper>
  );
}

export type SingleValueCardProps = {
  title: string,
  icon: JSX.Element,
  iconColor: string,
  iconBackgroundColor: string,
  fetchValue: (datetime: Date) => Promise<number>,
  autoUpdateMs?: number,
  noUpdate?: boolean,
}
