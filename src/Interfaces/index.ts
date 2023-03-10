export interface ChallengeList {
  challengeId: number;
  challengeTitle: string;
  challengeContent: string;
  challengeStatus: string;
}

export interface Challenge {
  id: number;
  title: string;
  challengeCategory: string;
  challengeLocation: string;
  challengeDuration: string;
  howManyUsersAreInThisChallenge: number;
  challengeOwnerUser: ChallengeOwnerUser;
  challengeImgUrls: string;
  created_at: string;
}

export interface ChallengeOwnerUser {
  userName: string;
  userId: number;
  email: string;
}
