module.exports = {
  '*.js': 'yarn lint:code:fix',
  '*.{json,md,yaml}': 'yarn lint:other:fix',
  '*': 'yarn lint:spelling',
};
