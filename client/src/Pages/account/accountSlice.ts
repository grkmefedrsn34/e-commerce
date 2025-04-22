import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../Model/IUser";
import request from "../../api/Request";
import { router } from "../../Routes/Routes";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

// Giriş için gerekli inputlar
interface LoginCredentials {
  username: string;
  password: string;
}

// Login işlemi
export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: any }>(
  "account/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await request.Account.login(credentials);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error?.data || { message: "Giriş başarısız." });
    }
  }
);

// Redux slice
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout:(state) => {
      state.user=null;
      localStorage.removeItem("user");
      router.navigate("/catalog")
    },
    setUser:(stae,action)=>{
      stae.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  }
});

export const {logout,setUser} = accountSlice.actions;