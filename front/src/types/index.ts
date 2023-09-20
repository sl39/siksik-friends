// 타입

export interface User {
  id?: number;
  email?: string;
  nickname?: string;
  profile?: string;
  level?: number;
}

export interface Room {
  id: number;
  name: string;
  waiting: boolean;
}
