import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      uid,
      xpEarned = 0,
      coinsEarned = 0,
      win = false,
      loss = false,
    } = body;

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

    let xp = user.xp + xpEarned;
    let level = user.level;
    let coins = user.coins + coinsEarned;
    let wins = user.wins;
    let losses = user.losses;

    if (win) wins++;
    if (loss) losses++;

    while (xp >= 100) {
      xp -= 100;
      level++;
    }

    await userRef.update({
      xp,
      level,
      coins,
      wins,
      losses,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Progress updated successfully",
      progress: {
        level,
        xp,
        coins,
        wins,
        losses,
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