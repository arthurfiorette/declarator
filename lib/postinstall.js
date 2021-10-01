/* eslint-disable @typescript-eslint/no-var-requires */

let run;
try {
  const index = require('../dist/index.js');
  run = index.run;
} catch (e) {
  // only in CI and etc. Production code WILL have the built code available.
  console.log('Code was not built');
}

if (run) {
  run().catch(console.error);
}
