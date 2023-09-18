export interface User {
  id: number;
  name: string;
  level: number;
  profile: string;
}

export interface Room {
  id: number;
  name: string;
  waiting: boolean;
}
