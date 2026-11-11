declare module '*.ttf' {
  const url: string;
  export default url;
}

// react-native-web ships no types; the app is typed against react-native.
declare module 'react-native-web';
