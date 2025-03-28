import { useEffect, useState } from "react";
import { setSelectedUser, getUsers } from "../slices/chatSlice";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import avatar from '../assets/avatar.png'
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
    const { users, selectedUser, isUsersLoading } = useSelector(state => state.chat);
    const dispatch = useDispatch();
    const onlineUsers = useSelector(state => state.auth.onlineUsers);
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
console.log(onlineUsers)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

        if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="pt-3 h-100 border-end border-secondary d-flex flex-column transition-all">
            <div className="border-bottom border-secondary w-100 p-3">
                <div className="d-flex align-items-center gap-2">
                    <Users className="size-6" />
                    <span className="fw-medium d-none d-lg-block">Contacts</span>
                </div>
                <div className="mt-3 d-none d-lg-flex align-items-center gap-2">
                    <label className="cursor-pointer d-flex align-items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="form-check-input"
                        />
                        <span className="small">Show online only</span>
                    </label>
                    <span className="text-xs text-muted">({onlineUsers.length - 1} online)</span>
                </div>
            </div>

            <div className="overflow-auto w-100 py-3">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => dispatch(setSelectedUser(user))}
                        className={`
                            btn w-100 p-3 d-flex align-items-center gap-3
                            ${selectedUser?._id === user._id ? "bg-secondary text-white" : "bg-light"}
                        `}
                    >
                        <div className="position-relative mx-auto mx-lg-0">
                            <img
                                src={user.profilePic || avatar}
                                alt={user.name}
                                className="rounded-circle"
                                style={{ width: "48px", height: "48px", objectFit: "cover" }}
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="position-absolute bottom-0 end-0 rounded-circle bg-success"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        border: "2px solid #343a40",
                                    }}
                                />
                            )}
                        </div>

                        <div className="d-none d-lg-block text-start text-truncate">
                            <div className="fw-medium text-truncate">{user.fullName}</div>
                            <div className="small text-muted">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center text-muted py-4">No online users</div>
                )}
            </div>
        </aside>
    );
};
export default Sidebar;