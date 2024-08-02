import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
    token: string | null;
    userId: string | null 
}

const initialState: AuthSlice = {
    token: localStorage.getItem('token'),
    userId : null
}

const parseJwt = (token: string | null) => {
    try {
      if (!token) return null;
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      return tokenPayload.userId;
    } catch (error) {
      console.error("Error parsing JWT token:", error);
      return null;
    }
  };
  
  const userIdFromToken = parseJwt(initialState.token);


const authSlice = createSlice({
    name: 'auth',
    initialState: {...initialState, userId: userIdFromToken},
    reducers: {
        setToken(state: AuthSlice, action: PayloadAction<string>) {
            state.token = action.payload;
            localStorage.setItem('token',action.payload)
            state.userId = parseJwt(action.payload)
        },
        clearToken(state: AuthSlice) {
            state.token = null;
            localStorage.removeItem('token')
            state.userId = null
        }
    }
})

export const {setToken, clearToken} = authSlice.actions;
export default authSlice.reducer;

