import { ProgressBar } from 'react-bootstrap';

interface ProgressStatus {
  now: number;
  total: number;
}

export default function Progressbar(props: ProgressStatus) {
  const percent = Math.trunc((props.now / props.total) * 100);
  return <ProgressBar style={{ height: '40px', fontSize: '20px' }} now={percent} label={`${percent}%`} />;
}
