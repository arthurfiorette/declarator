#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { run } = require('../dist/index.js');
run(1).catch(console.error);
