import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import userReducer from './reducers/userReducer';
import appReducer from './reducers/appReducer';
import persistStore from 'redux-persist/es/persistStore';

const commonConfig = {
   key: 'user',
   storage,
};

const userConfig = {
   ...commonConfig,
   whitelist: ['token', 'isLogged', 'currentCart'],
};

const appConfig = {
   key: 'app',
   storage,
};

export const store = configureStore({
   reducer: {
      user: persistReducer(userConfig, userReducer),
      app: persistReducer(appConfig, appReducer),
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);
