import * as migration_20260124_180510_initial from './20260124_180510_initial';
import * as migration_20260124_194307_pageTypes from './20260124_194307_pageTypes';

export const migrations = [
  {
    up: migration_20260124_180510_initial.up,
    down: migration_20260124_180510_initial.down,
    name: '20260124_180510_initial',
  },
  {
    up: migration_20260124_194307_pageTypes.up,
    down: migration_20260124_194307_pageTypes.down,
    name: '20260124_194307_pageTypes'
  },
];
