module.exports = {
  root: true,
  extends: [
    '@samtayl',
    '@samtayl/node',
  ],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['node'],
};
