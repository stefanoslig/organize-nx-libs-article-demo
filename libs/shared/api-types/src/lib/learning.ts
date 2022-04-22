import { Status } from './status';

export interface Learning {
  id: number;
  name: string;
  status: Status;
  userId: number;
}
