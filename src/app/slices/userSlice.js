import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        credentials: {},

    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        registerRequest: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        registerSuccess: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        registerFailure: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
    }
});

export const { login, logout, registerRequest, registerSuccess, registerFailure } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;