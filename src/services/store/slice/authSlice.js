import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "../../constants/constants";

const initialUserState = {
  id: null,
  login: null,
  role_id: ROLES.GHOST,
  session: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    setUser: (state, { payload }) => {
      return { ...state, ...payload };
    },
    logout: () => initialUserState,
  },
  extraReducers: () => {},
});

export const { reducer: userReducer } = authSlice;

export const { setUser, logout } = authSlice.actions;
