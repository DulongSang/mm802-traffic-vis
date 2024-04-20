import { styled } from '@mui/material/styles';

const Center = styled('div')({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
});

const Element = styled('div')(({ theme }) => ({
  border: `1px solid black`,
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 26,
  borderRadius: 2,
}));

const Value = styled('div')({
  position: 'absolute',
  lineHeight: '24px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const Bar = styled('div')({
  height: '100%',
  '&.low': {
    backgroundColor: '#f44336',
  },
  '&.medium': {
    backgroundColor: '#efbb5aa3',
  },
  '&.high': {
    backgroundColor: '#088208a3',
  },
});

export type ProgressBarProps = {
  value: number;  // value in [0.0, 1.0]
};

export function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;
  let className = '';
  if (valueInPercent <= 30) {
    className = 'low';
  } else if (valueInPercent <= 70) {
    className = 'medium';
  } else {
    className = 'high';
  }

  return (
    <Center>
      <Element>
        <Value>{`${valueInPercent.toFixed(2)} %`}</Value>
        <Bar
          className={className}
          style={{ maxWidth: `${valueInPercent}%` }}
        />
      </Element>
    </Center>
  );
}
