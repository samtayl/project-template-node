module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {ecmaVersion: 'latest'},
  plugins: ['node'],
  extends: ['@samtayl', '@samtayl/node'],
};
