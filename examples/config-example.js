//@ts-check

/**
 *  You can export default a function or a object
 *
 * @type {import('declarator').FileConfig}
 */
const config = () => {
  return {
    packages: [
      // Package that will receive all the defaults
      'random-name',
      [
        'random2',
        {
          // Merge defaults here
          merge: true,
          // Specific config for the random2 package.
          include: ['./custom-path-for-this-library']
        }
      ]
    ],
    defaults: {
      // Default config for all packages.
      compilerOptions: {
        // Use LF for compilation
        newLine: 1
      }
    }
  };
};

module.exports = config;
