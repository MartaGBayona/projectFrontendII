import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        credentials: {},
        isLoading: false,
        error: null,
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
        registerRequest: (state) => {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        },
        registerSuccess: (state, action) => {
            return {
                ...state,
                credentials: action.payload,
                isLoading: false,
            };
        },
        registerFailure: (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        },
    }
});

export const { login, logout, registerRequest, registerSuccess, registerFailure } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;