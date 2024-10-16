import { SignJWT, jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

type PayloadType = {
  userId: string;
};

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = async (payload: PayloadType) => {
  const secret = new TextEncoder().encode(JWT_ACCESS_SECRET);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("45m") // Access token expires in 15 minutes
    .sign(secret);

  return token;
};

export const generateRefreshToken = async (payload: PayloadType) => {
  const secret = new TextEncoder().encode(JWT_REFRESH_SECRET);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Refresh token expires in 7 days
    .sign(secret);

  return token;
};
export const getJwtSecretKey = () => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};
