// 타입

export interface User {
  user_id?: number;
  rank?: number;
  exp?: number;
  score?: number;
  level?: number;
  nickname?: string;
  email?: string;
  profile?: string;
  odds?: string;
}
export interface Friend {
  user_id?: string;
  nickname?: string;
  profile?: string;
  level?: number;
  activated?: boolean;
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
  roomId?: number;
  roomName?: string;
  roomStatus?: number;
  quizDate?: string;
  category?: string;
  quizCount?: number;
  members?: SoketUser[];
  roomSize?: number;
  roomCurrent?: number;
  roomReady?: number;
  password?: string;
}

export interface RoomInfo {
  title: string;
  count: number;
  countProblem: number;
  type: string;
  countTimer: number;
  password?: string;
  quizDate?: string;
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
  userId?: number;
  userName?: string;
  gameScore?: number;
  userScore?: number;
  userRanking?: number;
  ready?: boolean;
  leader?: boolean;
  level?: number;
  profile?: string;
  gameCorrect?: number;
}

export interface Answer {
  roomId: number;
  userId: number;
  userAnswer: string;
  answer: string;
}

export interface GamePlay {
  userId: number;
  userName: string;
  gameScore: number;
  userScore: number;
  userRanking: number;
  ready: boolean;
  leader: boolean;
}

export interface Article {
  articleTitle: string;
  articleAnswer: string;
  articleQuiz: string[];
}
export interface History {
  historyId?: number;
  roomName?: string;
  category?: string;
  solvedDate?: string;
  articlesDate?: string;
  articles?: Article[];
}
