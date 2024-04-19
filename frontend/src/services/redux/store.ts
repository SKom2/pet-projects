import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/services/redux/slices/auth/auth';

export const store = configureStore({
  reducer: authReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;