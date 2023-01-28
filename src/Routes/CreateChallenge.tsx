export default function CreateChallenge() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <div style={{ width: '600px', height: '600px', marginRight: '50px' }}>
        <img src="/main.jpg" alt="challenge" style={{ width: '600px', height: '400px', objectFit: 'cover' }}></img>
      </div>
      <div style={{ width: '500px', height: '500px', background: 'var(--color-sky)' }}>
        <div>
          <div>챌린지 명</div>
          <input></input>
        </div>
        <div>
          <div>내용</div>
          <textarea></textarea>
        </div>
        <div>
          <div>
            <input type="checkbox"></input>
            <div>공개 여부</div>
          </div>
          <div>등록</div>
        </div>
      </div>
    </div>
  );
}
