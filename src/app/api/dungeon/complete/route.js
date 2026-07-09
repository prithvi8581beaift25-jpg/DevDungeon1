import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { uid, dungeonId, xpEarned, coinsEarned } = body;

    if (!uid || !dungeonId) {
      return NextResponse.json(
        {
          success: false,
          message: "UID and Dungeon ID are required",
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

    if (user.completedDungeons.includes(dungeonId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Dungeon already completed",
        },
        {
          status: 400,
        }
      );
    }

    const updatedCompleted = [
      ...user.completedDungeons,
      dungeonId,
    ];

    const updatedXP = user.xp + (xpEarned || 0);
    const updatedCoins = user.coins + (coinsEarned || 0);

    await userRef.update({
      completedDungeons: updatedCompleted,
      currentDungeon: `next-${dungeonId}`,
      xp: updatedXP,
      coins: updatedCoins,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Dungeon completed successfully",
      rewards: {
        xp: xpEarned || 0,
        coins: coinsEarned || 0,
      },
      nextDungeon: `next-${dungeonId}`,
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