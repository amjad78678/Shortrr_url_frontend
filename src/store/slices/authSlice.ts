import { createSlice } from '@reduxjs/toolkit';

const storedUserDetails = localStorage.getItem('userDetails');
const parsedUserDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;

const authSlice = createSlice({
  initialState: {
    uLoggedIn: localStorage.getItem('uLoggedIn') ? true : false,
    userDetails: parsedUserDetails,
  },
  name: 'auth',
  reducers: {
    setUserLogin: (state, action) => {
      state.uLoggedIn = true;
      localStorage.setItem('uLoggedIn', 'true');
      state.userDetails = action.payload;
      localStorage.setItem('userDetails', JSON.stringify(action.payload));
    },
    setUserLogout: (state) => {
      state.uLoggedIn = false;
      localStorage.removeItem('uLoggedIn');
      state.userDetails = null;
      localStorage.removeItem('userDetails');
    },
  },
});

export const { setUserLogin, setUserLogout } = authSlice.actions;
export default authSlice.reducer;
