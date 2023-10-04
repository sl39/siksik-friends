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
  rank: number;
  score?: number;
  level?: number;
}

export interface Room {
  roomId: number;
  roomName: string;
  roomStatus: boolean;
  quizDate: string;
  category: string;
  quizCount: string;
  members: SoketUser[];
  roomSize: number;
  roomCurrent: number;
  roomReady: number;
  password: string;
}

export interface RoomInfo {
  title: string;
  count: number;
  countProblem: number;
  type: string;
  password: string;
  countTimer: number;
  quizDate: string;
}

export interface Quiz {
  quizType: string;
  question: string;
  hint: string;
  answer: string;
  articleTitle: string;
  articleContent: string;
}

export interface SoketUser {
  userId: number;
  userName: string;
  userScore?: number;
  userRanking?: number;
  ready?: boolean;
  leader?: boolean;
}
