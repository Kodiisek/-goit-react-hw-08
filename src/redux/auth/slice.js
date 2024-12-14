import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null, // Token będzie przechowywany w redux-persist
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Przypadek rejestracji
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        // Przechowuj token w redux-persist, nie musimy używać localStorage
        // Token będzie zapisany przez redux-persist
      })
      // Przypadek logowania
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        // Podobnie jak w przypadku rejestracji, przechowywanie tokena
      })
      // Przypadek wylogowania
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        // Nie musisz już usuwać tokena z localStorage, redux-persist zrobi to za Ciebie
      })
      // Obsługa odświeżania użytkownika
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.user = { name: null, email: null };
        state.token = null;
      });
  },
});

// Eksportujemy akcję do czyszczenia stanu
export const { clearAuthState } = authSlice.actions;
// Eksportujemy reduktor
export const authReducer = authSlice.reducer;
