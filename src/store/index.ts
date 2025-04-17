import { configureStore, combineReducers } from '@reduxjs/toolkit';
// You can still use session or localForage; here we use IndexedDB via localForage
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage adapter


/* @ts-ignore */
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slice reducers
import gameLevelSlice from './slices/gameLevelSlice';

const isServer = typeof window === "undefined";
// Determine whether encryption is enabled based on the environment variable
const encryptionEnabled = isServer ? process.env.NEXT_PUBLIC_REDUX_PERSIST_ENCRYPTION === 'true' :  false;

// Set a persist version based on the encryption flag. For example, 1 if enabled, 0 if disabled.
const persistVersion = encryptionEnabled ? 1 : 0;

// Configure persist settings, including versioning and a migration function
const persistConfig = {
  key: 'root',
  storage: storage, // Using IndexedDB via localForage
  whitelist: ['gameLevel'], // reducers to persist (others will not be persisted)
  version: persistVersion,
  // Migration function to clear state if the version changed
  migrate: (state: any, currentVersion: number) => {
    if (state && state._persist && state._persist.version !== currentVersion) {
      // Version mismatch – purge the persisted state
      return Promise.resolve(undefined);
    }
    return Promise.resolve(state);
  },
  transforms: [] as any[],
};

// Conditionally add the encryption transform if encryption is enabled
if (encryptionEnabled) {
  const encoder = encryptTransform({
    secretKey: process.env.NEXT_PUBLIC_REDUX_PERSIST_ENCRYPTION_SECRET_KEY || 'my-super-secret-key',
    onError: (error: Error) => {
      console.error('Encryption error:', error);
    },
  });
  persistConfig.transforms.push(encoder);
}

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  gameLevel: gameLevelSlice
});

// Wrap the root reducer with persistReducer using the above config
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization check for redux-persist
    }),
});


// Create the persistor from the store
export const persistor = persistStore(store);

// Define types and hooks for later use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

