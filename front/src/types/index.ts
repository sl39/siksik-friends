// 타입

export interface User {
  user_id?: number;
  rank?: number;
  exp?: number;
  score?: number;
  level?: number;
  nickname: string;
  email?: string;
  profile: string;
  odds?: string;
}

export interface Rank {
  user_id: number;
  nickname: string;
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

export interface RoomInfo {
  title: string;
  count: number;
  countProblem: number;
  countTimer: number;
  type: string[];
  password?: string;
}

export interface Quiz {
  type: string;
  title: string;
  description: string;
  answer: string;
}
