// 타입

export interface User {
  id?: number;
  email?: string;
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
  id?: number;
  name?: string;
  level?: number;
  rank?: number;
}
