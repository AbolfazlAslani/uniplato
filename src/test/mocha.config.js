module.exports = {
  require: 'ts-node/register',
  spec: '../test/**/*.test.ts',

  timeout: 2000,
  'full-trace': true,
  colors: true,
};
