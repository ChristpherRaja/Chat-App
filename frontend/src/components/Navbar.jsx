import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle" style={{ width: "36px", height: "36px" }}>
            <MessageSquare className="text-primary" style={{ width: "20px", height: "20px" }} />
          </div>
          <h1 className="ms-2 mb-0 h5 fw-bold">Chat App</h1>
        </Link>

        <div className="d-flex align-items-center">

          {authUser && (
              <button className="btn btn-sm btn-outline-danger d-flex align-items-center" onClick={handleLogout}>
                <LogOut style={{ width: "20px", height: "20px" }} />
                <span className="d-none d-sm-inline ms-1">Logout</span>
              </button>

          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
