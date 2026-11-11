module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['dist/', 'vendor/', 'coverage/'],
  overrides: [
    {files: ['jest.setup.js'], env: {jest: true}},
    {files: ['web/webpack.config.js', 'scripts/*.js'], env: {node: true}},
  ],
};
