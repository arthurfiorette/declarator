import type { TsconfigJson } from '../util/types';

export type Configuration = {
  packages: (
    | string
    | [
        string,
        TsconfigJson & {
          /**
           * If this specific configuration should be merged with the defaults. Obviously, prevails over defaults.
           * @default false
           */
          merge?: boolean;
        }
      ]
  )[];
  defaults: TsconfigJson;
};

export type FileConfig = (() => Configuration) | Configuration;
