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
      dungeon: {
        currentDungeon: user.currentDungeon,
        completedDungeons: user.completedDungeons,
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