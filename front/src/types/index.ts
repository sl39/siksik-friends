// 타입

export interface User {
  email?: string;
  id?: number;
  nickname?: string;
  profile?: string;
  odds?: string;
  rank?: number;
  exp?: number;
  score?: number;
  level?: number;
}

export interface Room {
  id: number;
  name: string;
  waiting: boolean;
}

export interface Rank {
  user_id: number;
  nickname?: string;
  profile?: string;
  odds?: string;
  rank?: number;
  score?: number;
  level?: number;
}
// {
//   “user_id” : Long 아이디,
//   "nickname": String 닉네임,
//   "profile": String 프로필 사진 경로,
//   "level": Integer 레벨,
//   "rank": Long 순위,
//   "score": Integer 점수,
//   "odds": String 승률
// },
