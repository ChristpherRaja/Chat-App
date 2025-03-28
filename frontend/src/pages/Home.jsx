import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useSelector } from "react-redux";

const Home = () => {
    const selectedUser = useSelector((state) => state.chat.selectedUser);

    return (
        <div className="vh-100 bg-light">
            <div className="d-flex align-items-center justify-content-center pt-5 px-3">
                <div className="bg-white rounded shadow w-100" style={{ maxWidth: "960px", height: "calc(100vh - 5rem)" }}>
                    <div className="d-flex h-100 rounded overflow-hidden">
                        <Sidebar />
                        { !selectedUser ? <NoChatSelected /> : <ChatContainer/>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;