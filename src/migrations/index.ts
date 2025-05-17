import * as migration_20250516_080323 from './20250516_080323';

export const migrations = [
  {
    up: migration_20250516_080323.up,
    down: migration_20250516_080323.down,
    name: '20250516_080323'
  },
];
