import { createSlice } from "@reduxjs/toolkit";

// Function to check if a token is present in cookies
const isTokenPresentInCookies = () => {
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
  return !!token;
};

// Function to load the user from localStorage
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return { user: JSON.parse(serializedState) } // No user in localStorage, return null
    }
    return { user: JSON.parse(serializedState) } 
    
  } catch (error) {
    return { user: null };  // In case of any error, return null
  }
};

// Initial state loaded from localStorage
const initialState = loadUserFromLocalStorage();

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user in the state and localStorage
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(state.user));  // Corrected syntax
    },
    // Logout user and remove from localStorage
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  }
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
