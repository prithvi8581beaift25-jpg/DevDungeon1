import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          message: "UID is required",
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

    return NextResponse.json({
      success: true,
      progress: {
        level: user.level,
        xp: user.xp,
        coins: user.coins,
        wins: user.wins,
        losses: user.losses,
      },
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