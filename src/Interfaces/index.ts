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

export interface DetailChallengeINTERFACE {
  responseChallenge: {
    id: string;
    title: string;
    content: string;
    challengeCategory: string;
    challengeLocation: string;
    challengeDuration: string;
    created_at: string;
    challengeImgUrls: string[];
    challengeHashtags: string[];
    howManyUsersAreInThisChallenge: number;
    challengeOwnerUser: {
      userName: string;
      email: string;
      userId: number;
    };
  };
  responseUserChallenges: {
    challengeStatus: string;
    participatedUser: {
      userName: string;
      email: string;
      userId: number;
    };
  }[];
}

export interface ChallengeOwnerUser {
  userName: string;
  userId: number;
  email: string;
}

export interface CommentINTERFACE {
  id: string;
  content: string;
  likes: number;
  createdAt: string;
  commentImgUrls: string[];
  commentOwnerUser: {
    userName: string;
    email: string;
    userId: number;
  };
  commentLikeUsersInfo: CommentLikeUsersInfoINTERFACE[];
}

export interface CommentLikeUsersInfoINTERFACE {
  userName: string;
  email: string;
  userId: number;
}
