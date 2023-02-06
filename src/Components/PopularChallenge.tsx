export default function PopularChallenge() {
  return (
    <div
      style={{
        height: '500px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '10px',
      }}
    >
      <div style={{ height: '250px', width: '280px', background: 'var(--color-sky)', borderRadius: '10px' }}></div>
      <div style={{ marginTop: '20px' }}>인기 챌린지 입니다.</div>
    </div>
  );
}
