import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function GET() {
  try {

    const snapshot = await adminDB
      .collection("users")
      .orderBy("xp", "desc")
      .limit(20)
      .get();

    const leaderboard = [];

    snapshot.forEach((doc) => {
      leaderboard.push(doc.data());
    });

    return NextResponse.json({
      success: true,
      leaderboard,
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