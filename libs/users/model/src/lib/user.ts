import { Learning } from '@abc/shared/model';

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
