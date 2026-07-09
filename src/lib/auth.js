<<<<<<< HEAD
const COOKIE_NAME = 'devdungeon_auth';

export function setAuthCookie() {
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function clearAuthCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}
=======
import { adminAuth } from "@/lib/firebaseAdmin";

export async function verifyAuth(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const token = authHeader.split("Bearer ")[1];

    const decodedToken = await adminAuth.verifyIdToken(token);

    return {
      success: true,
      user: decodedToken,
    };

  } catch (error) {

    return {
      success: false,
      message: "Invalid or expired token",
    };

  }
}
>>>>>>> 0c7f0df4defad34b3b1bf659808f2a674f3ffaa1
