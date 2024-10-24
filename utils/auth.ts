import { JWTPayload, SignJWT, jwtVerify } from "jose";

export interface UserJwtPayload extends JWTPayload {
  userId: string;
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
export const getJwtAccessSecretKey = () => {
  const secret = JWT_ACCESS_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return secret;
};
export const getJwtRefreshSecretKey = () => {
  const secret = JWT_REFRESH_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return secret;
};

export const verifyAuth = async (token: string, type: "access" | "refresh") => {
  try {
    const verified = await jwtVerify<UserJwtPayload>(
      token,
      new TextEncoder().encode( type === "access" ? getJwtAccessSecretKey() : getJwtRefreshSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};


export async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const  payload  = await verifyAuth(refreshToken, "refresh");
    const newAccessToken = await generateAccessToken({ userId: payload.userId });

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}