import { randEmail, randJobTitle, randFullName } from '@ngneat/falso';
import { Learning, User } from './libs/shared/api-types/src';

const USERS_ROWS_NUMBER = 100;
const LEARNINGS_ROWS_NUMBER = 500;

const database: { users: Array<User>; learnings: Array<Learning> } = {
  users: [],
  learnings: [],
};

const hasAssignedUser = (): boolean => {
  // 10% chance not to have an assigned user
  return Math.floor(Math.random() * 11) <= 9;
};

for (let i = 1; i <= USERS_ROWS_NUMBER; i++) {
  database.users.push({
    id: i,
    name: randFullName(),
    email: randEmail(),
  });
}

for (let i = 1; i <= LEARNINGS_ROWS_NUMBER; i++) {
  database.learnings.push({
    id: i,
    name: 'How to become a ' + randJobTitle(),
    status: 'active',
    userId: hasAssignedUser() ? Math.floor(Math.random() * USERS_ROWS_NUMBER) + 1 : -1,
  });
}

console.log(JSON.stringify(database));
