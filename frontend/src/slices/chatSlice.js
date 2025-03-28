import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000")
// Async thunks for API calls

axios.defaults.withCredentials = true;
export const getUsers = createAsyncThunk("chat/getUsers", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get("/messages/users");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});

export const getMessages = createAsyncThunk("chat/getMessages", async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(`/messages/${userId}`);
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});

export const sendMessage = createAsyncThunk("chat/sendMessage", async (messageData, { getState, dispatch, rejectWithValue }) => {
    const { selectedUser } = getState().chat;
    try {
        const res = await axios.post(`/messages/send/${selectedUser._id}`, messageData);
        socket.emit("sendMessage",res.data);
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});

// Chat slice
const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        users: [],
        selectedUser: null,
        isUsersLoading: false,
        isMessagesLoading: false,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        subscribeToMessages: (state) => {
            const { selectedUser } = state;
            if (!selectedUser) return;

            socket.on("newMessage", (newMessage) => {
                console.log(newMessage)
                const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
                if (!isMessageSentFromSelectedUser) return;
                state.messages.push(newMessage);
            });
        },
        unsubscribeFromMessages: () => {
            socket.off("newMessage");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isUsersLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isUsersLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isUsersLoading = false;
            })
            .addCase(getMessages.pending, (state) => {
                state.isMessagesLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.isMessagesLoading = false;
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state) => {
                state.isMessagesLoading = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            });
    },
});

export const { setSelectedUser, subscribeToMessages, unsubscribeFromMessages } = chatSlice.actions;

export default chatSlice.reducer;