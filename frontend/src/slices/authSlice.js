import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5000";


axios.defaults.withCredentials=true;
// Async thunks
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { dispatch, rejectWithValue }) => {
    try {
        const res = await axios.get("/auth/check");
        dispatch(connectSocket());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error in checkAuth");
    }
});

export const signup = createAsyncThunk("auth/signup", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axios.post("/auth/signup", data);
        toast.success("Account created successfully");
        connectSocket();
        return res.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
        return rejectWithValue(error.response?.data || "Error in signup");
    }
});

export const login = createAsyncThunk("auth/login", async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axios.post("/auth/login", data);
        toast.success("Logged in successfully");
        connectSocket();
        return res.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        return rejectWithValue(error.response?.data || "Error in login");
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, { dispatch, rejectWithValue }) => {
    try {
        await axios.post("/auth/logout");
        toast.success("Logged out successfully");
        dispatch(disconnectSocket())
        return null;
    } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
        return rejectWithValue(error.response?.data || "Error in logout");
    }
});

export const connectSocket = () => (dispatch, getState)=>{
    const {authUser, socket} = getState().auth;
    if (!authUser || socket?.connected) return;

    const newsocket = io(BASE_URL,{query:{userId:authUser._id}})
      newsocket.connect();

      newsocket.on("getOnlineUsers", (userIds) => {

        dispatch(setOnlineUsers(userIds))
        });
        
        newsocket.on("disconnect",()=>{
            console.log("disconnected")
        })
        
        dispatch(setSocket(newsocket));   
}


// Slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isCheckingAuth: true,
        onlineUsers: [],
        socket:null,
    },
    reducers: {
        setSocket:(state,action)=>{
            state.socket = action.payload;
        },
        disconnectSocket: (state) => {
            if (state.socket){
                 state.socket.disconnect();
                 state.socket = null;
            }
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isCheckingAuth = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authUser = null;
                state.isCheckingAuth = false;
            })
            .addCase(signup.pending, (state) => {
                state.isSigningUp = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isSigningUp = false;
            })
            .addCase(signup.rejected, (state) => {
                state.isSigningUp = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isLoggingIn = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggingIn = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.authUser = null;
            })

    },
});

export const { disconnectSocket, setSocket, setOnlineUsers } = authSlice.actions;

export default authSlice.reducer;