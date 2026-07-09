import { NextResponse } from "next/server";
import { adminDB } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      difficulty,
      language,
      starterCode,
      solution,
      testCases,
      xpReward = 50,
      coinReward = 20,
    } = body;

    if (!title || !description || !difficulty) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, Description and Difficulty are required",
        },
        {
          status: 400,
        }
      );
    }

    const questionRef = adminDB.collection("questions").doc();

    const question = {
      id: questionRef.id,
      title,
      description,
      difficulty,
      language: language || "javascript",
      starterCode: starterCode || "",
      solution: solution || "",
      testCases: testCases || [],
      xpReward,
      coinReward,
      createdAt: new Date().toISOString(),
    };

    await questionRef.set(question);

    return NextResponse.json({
      success: true,
      message: "Question created successfully",
      question,
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

export async function GET() {
  try {

    const snapshot = await adminDB.collection("questions").get();

    const questions = snapshot.docs.map((doc) => doc.data());

    return NextResponse.json({
      success: true,
      total: questions.length,
      questions,
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