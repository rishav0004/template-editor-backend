import { LOGIN_TYPE } from "../../constant.js";
import User from "../models/User.js";
import * as bcrypt from "bcrypt";
import AuthService from "../services/AuthService.js";
import UserService from "../services/UserService.js";

class UserController {
  userService = new UserService();

  registerUser = async (req, res) => {
    const { singupType } = req.body;
    try {
      if (singupType === LOGIN_TYPE.EMAIL) {
        const { email, password, firstName, lastName, ...rest } = req.body;
        const user = await this.userService.registerUserWithEmail({
          email,
          password,
          firstName,
          lastName,
          ...rest,
        });
        res.status(200).json({ ...user });
      }
    } catch (err) {
      console.error("register user error", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  loginUser = async (req, res) => {
    const { singupType } = req.body;
    try {
      if (singupType === LOGIN_TYPE.EMAIL) {
        const { email, password } = req.body;
        const existingUser = User.findOne({ email });
        if (!existingUser) throw "Email does not exist";
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!isPasswordValid) throw "Invalid Password";

        let { accessToken, refreshToken } = new AuthService().generateNewToken(
          existingUser._id
        );
        return res
          .status(200)
          .send({ accessToken, refreshToken, email: existingUser.email });
      }
    } catch (err) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
  };
}

export default UserController;