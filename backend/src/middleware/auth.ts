import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase/firebase";

/**
 * Extend Express' Request type to include `user`,
 * which will hold the decoded Firebase token information
 * once the user has been successfully authenticated.
 */
export interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Utility function to extract the Bearer token from
 * the `Authorization` header in incoming requests.
 *
 * @param req - The incoming Express request object
 * @returns The token string if present, or null if missing
 */
const extractBearerToken = (req: Request): string | null => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    // Split off the word "Bearer" and return the token part
    return header.split("Bearer ")[1];
  }
  return null;
};

/**
 * Middleware to validate and verify Firebase authentication tokens.
 *
 * This function performs multiple checks:
 *  - Ensures a token exists and is properly formatted
 *  - Verifies the token's authenticity using Firebase Admin SDK
 *  - Fetches the user's record from Firebase
 *  - Ensures the user’s email is verified (if not anonymous)
 *  - Checks for custom claims such as `banned`, `admin`, or `owner`
 *  - Prevents admins/owners from accessing regular user routes
 *  - Attaches the decoded user token to the request object
 *
 * On failure, it returns an HTTP 401 or 403 response with a
 * consistent JSON structure: `{ success, message, data, meta }`.
 */
export const validateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Extract ID token from Authorization header
  const idToken = extractBearerToken(req);

  // Reject requests without a token
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
    // Verify the token’s authenticity
    const decodedToken = await auth.verifyIdToken(idToken);

    // Fetch the full Firebase user record
    const user = await auth.getUser(decodedToken.uid);

    // Enforce email verification (except anonymous users)
    if (!user.emailVerified && decodedToken.provider_id !== "anonymous") {
      res.status(401).json({
        success: false,
        message: "Email not verified",
        data: {},
        meta: {},
      });
      return;
    }

    // Block banned users (custom claim check)
    if ((decodedToken as any).banned) {
      res.status(401).json({
        success: false,
        message: `Account banned: ${
          (decodedToken as any).ban_reason || "No reason provided"
        }`,
        data: {},
        meta: {},
      });
      return;
    }

    // Prevent admins and owners from accessing user routes
    if (
      (decodedToken as any).admin === true ||
      (decodedToken as any).owner === true
    ) {
      res.status(403).json({
        success: false,
        message: "Admins and owners cannot perform regular user actions",
        data: {},
        meta: {},
      });
      return;
    }

    // Attach the decoded user information to the request
    req.user = decodedToken;

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Handle invalid tokens
    console.error("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
      data: {},
      meta: {},
    });
  }
};
