// 타입

export interface User {
  id?: number;
  email?: string;
  nickname?: string;
  profile?: string;
  level?: number;
  score?: number;
}

export interface Room {
  id: number;
  name: string;
  waiting: boolean;
}

export interface Rank {
  id: number;
  name: string;
  level: number;
  rank: number;
}
