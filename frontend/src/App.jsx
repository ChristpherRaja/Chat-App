import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import './App.css';
import { Loader } from 'lucide-react';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './slices/authSlice';


const App = () => {

  const dispatch = useDispatch();
  const {authUser,isCheckingAuth} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App