import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Domyślna pamięć lokalna
import { contactsReducer } from './contacts/slice';
import { authReducer } from './auth/slice';

// Konfiguracja persistencji dla auth
const authPersistConfig = {
  key: 'auth', // Klucz w pamięci
  storage, // Używamy storage z redux-persist
  whitelist: ['token'], // Przechowujemy tylko token
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer), // Zastosowanie persistReducer
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === 'development', // Włączenie devTools w trybie developerskim
});

export const persistor = persistStore(store); // Tworzymy persistor
