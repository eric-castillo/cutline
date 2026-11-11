/**
 * Web shim for the bare `react-native` import (SPIKE FINDING, see docs/spike-web.md).
 *
 * react-native-svg lazily `require`s a native-only module on Android that does
 * `import {TurboModuleRegistry} from 'react-native'`. react-native-web has no
 * such export, and Vite's production bundler (Rolldown) fails the build on a
 * missing export even though the code never runs on web. This re-exports all of
 * react-native-web and adds a stub for that one name.
 */
export * from 'react-native-web';

export const TurboModuleRegistry = {
  get: () => null,
  getEnforcing: (name: string) => {
    throw new Error(`Native module "${name}" is not available on web.`);
  },
};
