#!/usr/bin/env node

import { log } from '../util/log';
import { createProgram } from './program';
import { run } from './run';

(async () => {
  const program = await createProgram();

  program.parse(process.argv);

  const { debug } = program.opts();

  if (!debug) {
    log.debug = () => undefined;
  }

  run();
})().catch(log.error);
