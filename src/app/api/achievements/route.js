import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { uid, achievement } = body;

    if (!uid || !achievement) {
      return NextResponse.json(
        {
          success: false,
          message: "UID and Achievement are required",
        },
        {
          status: 400,
        }
      );
    }

    const userRef = adminDB.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const user = userDoc.data();

    const achievements = user.achievements || [];
    const badges = user.badges || [];

    if (achievements.includes(achievement)) {
      return NextResponse.json(
        {
          success: false,
          message: "Achievement already unlocked",
        },
        {
          status: 400,
        }
      );
    }

    achievements.push(achievement);
    badges.push(achievement);

    await userRef.update({
      achievements,
      badges,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Achievement unlocked successfully",
      achievements,
      badges,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}
