import { UserEmbedLeanings } from "@abc/shared/model";

export const users: Array<UserEmbedLeanings> = [
  {
    id: 1,
    name: 'Guðrún Sharabi',
    email: 'sombat_bibi@ntlworld.com',
    learnings: [
      {
        id: 92,
        name: 'How to become a Dynamic Factors Officer',
        status: 'active',
        userId: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'François Martin',
    email: 'lalita.okafor139@laposte.io',
    learnings: [
      {
        id: 1,
        name: 'How to become an Officer',
        status: 'active',
        userId: 2,
      },
    ],
  },
];


