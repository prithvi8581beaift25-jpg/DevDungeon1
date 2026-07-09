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