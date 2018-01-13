// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '6.9.1',
        },
      },
    ],
    '@babel/preset-stage-2',
    '@babel/preset-flow',
  ],
  ignore: ['node_modules', 'build'],
};
