import { Learning } from '..';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserEmbedLeanings {
  id: number;
  name: string;
  email: string;
  learnings: Array<Learning>;
}
