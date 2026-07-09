import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      uid,
      mode,
      dungeon,
      result,
      xpEarned = 0,
      coinsEarned = 0,
      language = "javascript",
    } = body;

    if (!uid || !mode || !result) {
      return NextResponse.json(
        {
          success: false,
          message: "UID, mode and result are required",
        },
        {
          status: 400,
        }
      );
    }

    const historyRef = adminDB.collection("matchHistory").doc();

    const history = {
      id: historyRef.id,
      uid,
      mode,
      dungeon: dungeon || "",
      language,
      result,
      xpEarned,
      coinsEarned,
      createdAt: new Date().toISOString(),
    };

    await historyRef.set(history);

    return NextResponse.json({
      success: true,
      message: "History saved successfully",
      history,
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