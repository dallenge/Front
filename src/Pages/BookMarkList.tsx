import { useCallback, useEffect } from 'react';
import AuthApi from '../Apis/authApi';

export default function BookMarkList() {
  const getMyBookmarkedChallenge = useCallback(async () => {
    try {
      const { data } = await AuthApi.getMyBookmarkedChallenge();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getMyBookmarkedChallenge();
  }, [getMyBookmarkedChallenge]);

  return (
    <div>
      <div>내가 북마크 한 챌린지</div>
    </div>
  );
}
