import User from "../models/User.js";
import AuthService from "./AuthService.js";
import bcrypt from 'bcrypt';

class UserService {
  authService = new AuthService();

  createTokens = (user) => {
    return {
      accessToken: this.authService.generateAccessToken(user),
      refreshToken: this.authService.generateRefreshToken(user),
    };
  };

  registerUserWithEmail = async ({email, password, firstName, lastName, ...rest}) => {
    const existingUser = User.findOne({ email });
    if(existingUser) throw new Error('Email Already exist');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      ...rest
    });
    
    const {accessToken, refreshToken} = new AuthService().generateNewToken(user);
    
    return { email: user.email, accessToken, refreshToken };
  }

}

export default UserService;
