import { Learning } from "./learning";

export interface UserEmbedLeanings {
  id: number;
  name: string;
  email: string;
  learnings: Array<Learning>;
}
