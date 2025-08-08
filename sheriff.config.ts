import { sameTag, SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  entryFile: 'apps/learning-webapp/src/main.ts',
  enableBarrelLess: true,
  modules: {
    'libs/<scope>/feature-<feature>/src': ['scope:<scope>', 'type:feature'],
    'libs/<scope>/utils-<util>/src': ['scope:<scope>', 'type:util'],
    'libs/<scope>/<type>/src': ['scope:<scope>', 'type:<type>'],
  },
  depRules: {
    'root': ['type:shell', 'type:model'],
    'scope:*': [sameTag, 'scope:shared'],
    'scope:shared': 'scope:shared',
    'type:feature': [
      'type:feature',
      'type:model',
      'type:data-access',
      'type:ui',
      'type:util',
    ],
    'type:data-access': ['type:util', 'type:model', 'type:data-access'],
    'type:ui': ['type:util', 'type:model', 'type:ui'],
    'type:model': 'type:model',
    'type:util': ['type:util', 'type:model'],
    'type:shell': ['type:shell', 'type:model', 'type:feature'],
  },
};
