import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const signupUser = async (req, res) => {
  try {
    const { userName,  email, password } = req.body;
    console.log("Signup request body:", req.body);
    const normalizedUserName = (userName).trim();

    if (!normalizedUserName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
     email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this username or email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName: normalizedUserName,
      email: normalizedEmail,
      password: hashedPassword,
      cardData: {},
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while signing up.",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in.",
      error: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;  

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (email === process.env.AdminEmail && password === process.env.AdminPassword) {
      const token = jwt.sign(
       email+password,
        process.env.JWT_SECRET,
      );

      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully.",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
  }
    catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in as admin.",
      error: error.message,
    });
  }
};
