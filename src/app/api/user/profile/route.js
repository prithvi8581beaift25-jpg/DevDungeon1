import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { uid, name, email, photoURL } = body;

    if (!uid || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "UID and Email are required",
        },
        { status: 400 },
      );
    }

    const userRef = adminDB.collection("users").doc(uid);

    const existingUser = await userRef.get();

    if (existingUser.exists) {
      return NextResponse.json({
        success: true,
        message: "User already exists",
        user: existingUser.data(),
      });
    }

    const newUser = {
      uid,
      name: name || "",
      email,
      photoURL: photoURL || "",
      level: 1,
      xp: 0,
      coins: 100,
      wins: 0,
      losses: 0,
      badges: [],
      currentDungeon: "tutorial",

      completedDungeons: [],

      inventory: [],

      achievements: [],

      dailyStreak: 0,

      rank: "Bronze",

      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await userRef.set(newUser);

    return NextResponse.json({
      success: true,
      message: "User profile created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

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
        },
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
        },
      );
    }

    return NextResponse.json({
      success: true,
      user: userDoc.data(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
