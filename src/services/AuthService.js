import * as jwt from "jsonwebtoken";

const JWT_SECRET = "secret-jwt";

class AuthService {
  refreshAccessToken = async (refreshToken, expiresIn = "10h") => {
    const decodedToken = await jwt.verify(refreshToken, JWT_SECRET);
    if (decodedToken) {
      return jwt.sign({ userId: decodedToken.userId }, JWT_SECRET, {
        expiresIn,
      });
    }
    return null;
  };

  generateNewToken = async (user, expiresIn = "10h") => {
    const accessToken = await this.generateAccessToken(user, expiresIn);
    const refreshToken = await this.generateRefreshToken(user, expiresIn);
    return { accessToken, refreshToken };
  };

  generateAccessToken = (user, expiresIn = "10h") => {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn });
  };

  generateRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, JWT_SECRET);
  };
}

export default AuthService;
