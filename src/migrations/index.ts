import * as migration_20260124_180510_initial from './20260124_180510_initial';
import * as migration_20260124_194307_pageTypes from './20260124_194307_pageTypes';
import * as migration_20260124_200430_highlightedContent from './20260124_200430_highlightedContent';

export const migrations = [
  {
    up: migration_20260124_180510_initial.up,
    down: migration_20260124_180510_initial.down,
    name: '20260124_180510_initial',
  },
  {
    up: migration_20260124_194307_pageTypes.up,
    down: migration_20260124_194307_pageTypes.down,
    name: '20260124_194307_pageTypes',
  },
  {
    up: migration_20260124_200430_highlightedContent.up,
    down: migration_20260124_200430_highlightedContent.down,
    name: '20260124_200430_highlightedContent'
  },
];
