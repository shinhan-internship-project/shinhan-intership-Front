import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id : '',
  name : '',
  role : '',
  photo : '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      // console.log(action.payload);
      state.id = action.payload.id; 
      state.name = action.payload.name; 
      state.role = action.payload.role; 
      state.photo = action.payload.photo;
    },
    clearUser(state) {
      state.user = null;
      state.name = null;
      state.role = null; 
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
