import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { ApiResponse, UserData } from "../utils/types";

dotenv.config();

export const registerUser = async (
  userData: UserData
): Promise<ApiResponse> => {
  try {
    const { name, email, password, age } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 400, message: "User already exists", data: null };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({name, email, password: hashedPassword, age });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return {
      status: 201,
      message: "User registered successfully",
      data: { token, user: { email, age } },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Failed to register user",
      data: null,
    };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { status: 401, message: "Invalid credentials", data: null };
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return {
      status: 200,
      message: "User logged in successfully",
      data: { token, user: {name:user.name, email: user.email, age: user.age } },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Failed to login user",
      data: null,
    };
  }
};
