import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase/firebase";
import { DecodedIdToken } from "firebase-admin/auth";

// Attach user info to Request
export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

/**
 * Get only the token
 * 
 * @param req The Express Request object
 * @returns The token string if exists or null
 */ 
const extractBearerToken = (req: Request): string | null => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    return header.split("Bearer ")[1];
  }
  return null;
};

/**
 * Middleware: Valid ID token is required
 * 
 * @param req The Express Request object + user data
 * @param res The Express Response object
 * @param next The Express NextFunction
 */
export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idToken = extractBearerToken(req);

  if (!idToken) {
    res.status(401).json({
      success: false,
      message: "User not logged in",
      data: {},
      meta: {},
    });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);

    const user = await auth.getUser(decodedToken.uid);

    if (!user.emailVerified && decodedToken.provider_id !== "anonymous") {
      res.status(401).json({
        success: false,
        message: "Email not verified",
        data: {},
        meta: {},
      });
      return;
    }

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
      data: {},
      meta: {},
    });
  }
};