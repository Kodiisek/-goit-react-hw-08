import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global/docs/';

// Utility to add JWT
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post('https://connections-api.goit.global/users/signup', { 
        name, 
        email, 
        password 
      });

      if (response.status === 201) {
        return response.data;
      }

      return thunkAPI.rejectWithValue('Rejestracja nieudana');
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error('Rejestracja nieudana:', errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post('https://connections-api.goit.global/users/login', { 
        email, 
        password 
      });

      if (res.status === 200) {
        setAuthHeader(res.data.token);
        return res.data;
      }

      return thunkAPI.rejectWithValue('Błąd logowania');
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error('Logowanie nieudane:', errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('https://connections-api.goit.global/docs/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user: No token found');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await axios.get('https://connections-api.goit.global/docs/users/current');
      
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
