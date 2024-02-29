import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const hostname = `http://localhost:5001`;

interface UserState {
  loading: boolean;
  user: string | null;
  error: string | null;
}

interface UserCredential {
  name: string;
  email: string;
  password: string;
}

interface loginUser {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<string, loginUser>(
  "user/login",
  async (userCredential) => {
    const request = await axios.post<{ authToken: string }>(
      `${hostname}/api/user/login`,
      userCredential
    );
    const response = request.data.authToken;
    localStorage.setItem("token", response);
    return response;
  }
);

export const registerUser = createAsyncThunk<string, UserCredential>(
  "user/register",
  async (userCredential) => {
    try {
      await axios.post<{ authToken: string }>(
        `${hostname}/api/user/register`,
        userCredential
      );
      return true;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
);

const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message) {
          state.error = "access denied";
        } else {
          state.error = action.error.message || "Login failed";
        }
        state.error = null;
      })
      //   register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.user = action.payload ? "User registered successfully" : null;
          state.error = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message) {
          state.error = "registration failed";
        } else {
          state.error = action.error.message || "Registration failed";
        }
        state.error = null;
      });
  },
});

export default userSlice.reducer;
