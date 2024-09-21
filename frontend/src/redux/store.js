import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // Ensure this path is correct
import commentApi from './features/comments/commentApi';
import authApi from './features/auth/authApi';
import { blogApi } from './features/blog/blogsApi';

// Create and configure the store
export const store = configureStore({
  reducer: {
    // Add RTK Query reducers for caching, invalidation, etc.
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    auth: authReducer,  // Add your auth reducer
  },
  // Adding the middleware for RTK Query APIs
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      authApi.middleware,
      commentApi.middleware
    ),
});

// Optional: Set up listeners for refetchOnFocus/refetchOnReconnect behaviors
// setupListeners(store.dispatch);
