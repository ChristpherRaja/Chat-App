import { useEffect, useRef } from "react";
import { formatMessageTime } from "../utils/helpers";
import ChatHeader from "./ChatHeader";
import avatar from '../assets/avatar.png'
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, subscribeToMessages, unsubscribeFromMessages } from "../slices/chatSlice";
import { Toaster } from "react-hot-toast";

const ChatContainer = () => {
    
    const {messages,selectedUser,isMessagesLoading} = useSelector(state=>state.chat);
console.log(messages)
    const dispatch = useDispatch();

    const  authUser  = useSelector(state=>state.auth.authUser);
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessages(selectedUser._id));
            dispatch(subscribeToMessages());

            return () => {
                dispatch(unsubscribeFromMessages());
            };
        }
    }, [selectedUser?._id, dispatch]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="d-flex flex-column flex-grow-1 overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <ChatHeader />

            <div className="flex-grow-1 overflow-auto p-3">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`d-flex ${message.senderId === authUser._id ? "justify-content-end" : "justify-content-start"}`}
                        ref={messageEndRef}
                    >
                        <div className="d-flex align-items-start">
                            <div className="rounded-circle border" style={{ width: "40px", height: "40px", overflow: "hidden" }}>
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.profilePic || avatar
                                            : selectedUser?.profilePic || avatar
                                    }
                                    alt="profile pic"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                        <div className="ms-2">
                            <div className="mb-1">
                                <small className="text-muted">
                                    {formatMessageTime(message.createdAt)}
                                </small>
                            </div>
                            <div className="p-2 rounded bg-light">
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="img-fluid rounded mb-2"
                                        style={{ maxWidth: "200px" }}
                                    />
                                )}
                                {message.text && <p className="mb-0">{message.text}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                <Toaster/>
            <MessageInput />
        </div>
    );
};
export default ChatContainer;