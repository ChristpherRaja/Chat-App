import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../slices/authSlice";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const isSigningUp = useSelector((state) => state.auth.isSigningUp);

    const schema = yup.object().shape({
        fullName: yup.string().required("Full name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(signup(data));
    };

    return (
        <div className="min-vh-100 d-flex align-items-center">
            <div className="row w-100">
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-4">
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <div className="text-center mb-4">
                            <div className="d-flex flex-column align-items-center gap-2">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10"
                                    style={{ width: "48px", height: "48px" }}
                                >
                                    <MessageSquare className="text-primary" size={24} />
                                </div>
                                <h1 className="h4 fw-bold mt-2">Create Account</h1>
                                <p className="text-muted">Get started with your free account</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                            <div className="mb-3">
                                <label className="form-label fw-medium">Full Name</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <User className="text-muted" size={20} />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="John Doe"
                                        {...register("fullName")}
                                    />
                                    <p className="text-danger col-12">{errors.fullName?.message}</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Email</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <Mail className="text-muted" size={20} />
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="you@example.com"
                                        {...register("email")}
                                    />
                                    <p className="text-danger col-12">{errors.email?.message}</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <Lock className="text-muted" size={20} />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="••••••••"
                                        {...register("password")}
                                    />
                                    <p className="text-danger col-12">{errors.password?.message}</p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="text-muted" size={20} />
                                        ) : (
                                            <Eye className="text-muted" size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={isSigningUp}>
                                {isSigningUp ? (
                                    <>
                                        <Loader2 className="me-2" size={20} />
                                        Loading...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-muted">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary text-decoration-none">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="vh-100 d-none d-lg-flex col-lg-6 bg-light justify-content-center align-items-center">
                    <div className="text-center">
                        <h2>Welcome!</h2>
                        <p>Join Chat App and enjoy your conversation!</p>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};
export default SignUpPage;
