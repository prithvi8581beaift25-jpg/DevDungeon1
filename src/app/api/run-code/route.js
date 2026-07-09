import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: false,
    message: "Execution service is under development."
  });
}