import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import transporter from "../config/nodemailer.js";
import { check, validationResult } from "express-validator";

export const signup = [
  check("fullName").notEmpty().withMessage("Full name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user) return res.status(400).json({ message: "Email already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

export const login = [
  // Validation rules
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").notEmpty().withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

export const logout = (req,res)=>{
    try {
        res.clearCookie('jwt',{httpOnly:true,secure:false})

        res.json({success:true,message:'Logged out'})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendVerifyOtp = async (req, res) => {
    try {
      const  userId  = req.user._id;

      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }

      const user = await User.findById(userId);

      if (user.isAccountVerified) {
        return res.json({ success: false, message: "Account Already verified" });
      }

      const otp = String(Math.floor(100000 + Math.random() * 900000));

      user.verifyOtp = otp;
      user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Account verification OTP",
        text: `Your OTP is ${otp}. Verify your account using this OTP`,
      };
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Verification OTP sent on Email" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

export const verifyEmail = async (req, res) => {
    try {
      const { otp } = req.body;
      const userId = req.user._id;

      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }

      if (!otp) {
        return res.status(400).json({ success: false, message: "OTP is required" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }

      if (user.verifyOtp === "" || user.verifyOtp !== otp) {
        return res.json({ success: false, message: "Invalid OTP" });
      }

      if (user.verifyOtpExpireAt < Date.now()) {
        return res.json({ success: false, message: "OTP Expired" });
      }

      user.isAccountVerified = true;
      user.verifyOtp = "";
      user.verifyOtpExpireAt = 0;

      await user.save();
      return res.json({ success: true, message: "Email verified Successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
