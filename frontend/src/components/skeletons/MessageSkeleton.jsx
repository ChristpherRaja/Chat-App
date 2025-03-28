const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="d-flex flex-column flex-grow-1 overflow-auto p-3 gap-3">
            {skeletonMessages.map((_, idx) => (
                <div key={idx} className={`d-flex ${idx % 2 === 0 ? "justify-content-start" : "justify-content-end"}`}>
                    <div className="d-flex align-items-center me-2">
                        <div className="rounded-circle bg-secondary" style={{ width: "40px", height: "40px" }} />
                    </div>

                    <div>
                        <div className="mb-1">
                            <div className="bg-secondary" style={{ height: "16px", width: "64px", borderRadius: "4px" }} />
                        </div>

                        <div className="bg-secondary" style={{ height: "64px", width: "200px", borderRadius: "4px" }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;
