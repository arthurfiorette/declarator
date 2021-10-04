//@ts-check

/**
 * Replace ../dist to declarator when using it as a npm dependency.
 * @type {import('../dist').FileConfig}
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
        newLine: 2
      }
    }
  };
};

module.exports = config;
