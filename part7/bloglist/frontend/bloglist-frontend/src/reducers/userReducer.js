/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setUser(state, action) {
           return action.payload;
        },
        clearUser(state, action) {
            return []
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUsers = () => {
    return async (dispatch) => {
      const users = await userService.getAll(); // Obtén todos los usuarios desde la API
      console.log('Users received:', users);
      dispatch(setUser(users));
    };
  };
  

export default userSlice.reducer;