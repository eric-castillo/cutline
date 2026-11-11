import {createAsyncStorage} from '@react-native-async-storage/async-storage';

/**
 * Local persistence for the whole app. AsyncStorage v3 uses native storage on
 * iOS/Android and IndexedDB on web. Everything stays on the device (L-02).
 */
export const storage = createAsyncStorage('cutline');
