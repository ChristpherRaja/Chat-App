import { Users } from "lucide-react";

const SidebarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside
            className="h-100 border-end d-flex flex-column transition-all"
            style={{ width: "5rem", maxWidth: "18rem" }}
        >
            {/* Header */}
            <div className="border-bottom w-100 p-3">
                <div className="d-flex align-items-center gap-2">
                    <Users className="me-2" style={{ width: "1.5rem", height: "1.5rem" }} />
                    <span className="fw-medium d-none d-lg-block">Contacts</span>
                </div>
            </div>

            {/* Skeleton Contacts */}
            <div className="overflow-auto w-100 py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-100 p-3 d-flex align-items-center gap-3">
                        {/* Avatar skeleton */}
                        <div className="position-relative mx-auto mx-lg-0">
                            <div
                                className="bg-secondary rounded-circle"
                                style={{ width: "3rem", height: "3rem" }}
                            />
                        </div>

                        {/* User info skeleton - only visible on larger screens */}
                        <div className="d-none d-lg-block text-start flex-grow-1">
                            <div
                                className="bg-secondary mb-2"
                                style={{ height: "1rem", width: "8rem" }}
                            />
                            <div
                                className="bg-secondary"
                                style={{ height: "0.75rem", width: "4rem" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;