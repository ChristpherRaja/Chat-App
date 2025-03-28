import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster } from "react-hot-toast";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const isLoggingIn = useSelector((state) => state.auth.isLoggingIn);

    const schema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema), 
    });

    const onSubmit = async (data) => {
        dispatch(login(data));
    };

    return (
        <div className="d-flex vh-100">
            <div className="d-flex flex-column justify-content-center align-items-center p-3 col-lg-6 col-12">
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <div className="text-center mb-4">
                        <div className="d-flex flex-column align-items-center gap-2">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                                style={{ width: "50px", height: "50px" }}
                            >
                                <MessageSquare className="text-primary" style={{ width: "24px", height: "24px" }} />
                            </div>
                            <h1 className="h4 fw-bold mt-2">Welcome Back</h1>
                            <p className="text-muted">Sign in to your account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                        <div className="mb-3">
                            <label className="form-label fw-medium">Email</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Mail className="text-muted" style={{ width: "20px", height: "20px" }} />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="you@example.com"
                                    {...register("email")}
/>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-medium">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock className="text-muted" style={{ width: "20px", height: "20px" }} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="••••••••"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-muted" style={{ width: "20px", height: "20px" }} />
                                    ) : (
                                        <Eye className="text-muted" style={{ width: "20px", height: "20px" }} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Sign in
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-muted">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="text-primary text-decoration-none">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Placeholder */}
            <div className="d-none d-lg-flex col-lg-6 bg-light justify-content-center align-items-center">
                <div className="text-center">
                    <h2>Welcome back!</h2>
                    <p>Sign in to continue your conversations and catch up with your messages.</p>
                </div>
            </div>
            <Toaster/>
        </div>
    );
};
export default LoginPage;
