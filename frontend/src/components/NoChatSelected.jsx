import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4 bg-light w-100">
            <div className="text-center">

                <div className="d-flex justify-content-center mb-4">
                    <div className="position-relative">
                        <div
                            className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10"
                            style={{
                                width: "4rem",
                                height: "4rem",
                                animation: "bounce 2s infinite",
                            }}
                        >
                            <MessageSquare className="text-primary" style={{ width: "2rem", height: "2rem" }} />
                        </div>
                    </div>
                </div>

                <h2 className="h4 fw-bold">Welcome to Chat APP!</h2>
                <p className="text-muted">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;