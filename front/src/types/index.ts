// 타입

export interface User {
  user_id?: number;
  rank?: number;
  exp?: number;
  score?: number;
  level?: number;
  nickname: string;
  email?: string;
  profile?: string;
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

export interface RoomCreate {
  title: string;
  count: number;
  countProblem: number;
  type: string[]; // type을 문자열 배열로 명시
  password: string;
}
