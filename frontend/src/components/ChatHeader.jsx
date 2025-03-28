import { X } from "lucide-react";
import {setSelectedUser} from "../slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.png"

const ChatHeader = () => {

    const onlineUsers = useSelector(state=>state.auth.onlineUsers);
    const selectedUser = useSelector(state=>state.chat.selectedUser);
    const dispatch = useDispatch()

    return (
        <div className="p-3 border-bottom ">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="rounded-circle overflow-hidden" style={{ width: "40px", height: "40px" }}>
                            <img
                                src={ selectedUser?.profilePic || avatar}
                                alt={ selectedUser?.fullName}
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="fw-medium mb-0">{ selectedUser?.fullName}</h3>
                        <p className="text-muted mb-0">
                            {onlineUsers.includes( selectedUser?._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button className="btn btn-link p-0" onClick={() => dispatch(setSelectedUser(null))}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;