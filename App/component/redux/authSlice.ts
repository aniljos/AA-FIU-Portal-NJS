import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'


export interface AuthState {
    isAuthenticated: boolean,
    accessToken: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: ""
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setauth: (state, action: PayloadAction<AuthState>) => {

            state.isAuthenticated = action.payload.isAuthenticated;
            state.accessToken = action.payload.accessToken;
        }
    }
})

export const { setauth } = authSlice.actions

export default authSlice.reducer