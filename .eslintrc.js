module.exports = {
  root: true,
  extends: [
    '@samtayl',
    '@samtayl/node',
  ],
  env: {
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: '2020',
  },
  plugins: ['node'],
};
