#!/usr/bin/env node

import { createBlackConfig } from '../config/create-blank';
import { log } from '../util/log';
import { CliOpts, createProgram } from './program';
import { run } from './run';

(async () => {
  const program = await createProgram();

  program.parse(process.argv);

  const { debug, init } = program.opts<CliOpts>();

  if (!debug) {
    log.debug = () => undefined;
  }

  if (init) {
    await createBlackConfig();
    return;
  }

  await run();
})().catch(log.error);
