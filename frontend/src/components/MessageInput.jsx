import { useRef, useState } from "react";
import { sendMessage } from "../slices/chatSlice";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const MessageInput = () => {
    const [text, setText] = useState("");
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();


    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            dispatch(sendMessage({
                text: text.trim(),
            }));

            // Clear form
            setText("");
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-3 w-100">
            

            <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
                <div className="flex-grow-1 d-flex gap-2">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={!text.trim()}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};
export default MessageInput;