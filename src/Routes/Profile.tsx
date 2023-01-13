import styled from 'styled-components';

const ProfileImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid var(--color-white);
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-blue);
  padding: 40px;
  border-radius: 20px;
  width: 1000px;
  height: 300px;
  background: var(--color-sky);
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 20px;
`;
function Profile() {
  return (
    <div style={{ padding: '50px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProfileBox>
          <ProfileImg style={{ background: 'url(/noprofile.png)', backgroundSize: 'contain' }}></ProfileImg>
          <ProfileInfo>
            <div style={{ fontSize: '25px', marginBottom: '10px' }}>김도은 님</div>
            <div>아직 자기소개가 없어요 🏃🏻‍️</div>
            <div
              style={{
                marginTop: '20px',
                fontSize: '10px',
                background: 'var(--color-blue)',
                color: 'var(--color-white)',
                width: '70px',
              }}
            >
              프로필 수정
            </div>
          </ProfileInfo>
        </ProfileBox>
      </div>
    </div>
  );
}

export default Profile;
