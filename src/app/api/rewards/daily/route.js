import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { uid } = body;

    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          message: "UID is required",
        },
        { status: 400 }
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
        { status: 404 }
      );
    }

    const user = userDoc.data();

    const today = new Date().toDateString();
    const lastLogin = user.lastLogin
      ? new Date(user.lastLogin).toDateString()
      : null;

    if (today === lastLogin) {
      return NextResponse.json({
        success: false,
        message: "Daily reward already claimed",
      });
    }

    const updatedCoins = (user.coins || 0) + 100;
    const updatedXP = (user.xp || 0) + 25;
    const updatedStreak = (user.dailyStreak || 0) + 1;

    await userRef.update({
      coins: updatedCoins,
      xp: updatedXP,
      dailyStreak: updatedStreak,
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Daily reward claimed successfully",
      rewards: {
        coins: 100,
        xp: 25,
      },
      dailyStreak: updatedStreak,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );

  }
}