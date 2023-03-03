import { ProgressBar } from 'react-bootstrap';

interface ProgressStatus {
  now: number;
  total: number;
}

export default function Progressbar(props: ProgressStatus) {
  const percent = props.total ? Math.trunc((props.now / props.total) * 100) : 0;

  return <ProgressBar style={{ height: '40px', fontSize: '20px' }} now={percent} label={`${percent}%`} />;
}
