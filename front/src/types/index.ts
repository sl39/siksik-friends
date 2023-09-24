// 타입

export interface User {
  email?: string;
  user_id?: number;
  nickname: string;
  profile?: string;
  odds?: string;
  rank?: number;
  exp?: number;
  score?: number;
  level?: number;
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

export interface Room {
  id: number;
  name: string;
  waiting: boolean;
}
