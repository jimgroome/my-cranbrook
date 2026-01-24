import * as migration_20260124_180510_initial from './20260124_180510_initial';

export const migrations = [
  {
    up: migration_20260124_180510_initial.up,
    down: migration_20260124_180510_initial.down,
    name: '20260124_180510_initial'
  },
];
