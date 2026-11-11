module.exports = {
  preset: '@react-native/jest-preset',
  // React Navigation ships ES modules; transform them like React Native.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation)/)',
  ],
};
