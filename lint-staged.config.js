module.exports = {
  '*.js': 'eslint -c eslint.config.js',
  '*.{json,md,yaml}': 'prettier --check',
  '*': 'cspell',
};
