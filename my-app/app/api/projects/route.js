import dbConnect from "@/app/lib/db";
import Event from "@/app/lib/models/dummy.model";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await dbConnect();
  // const data = await Event.find({});
  return NextResponse.json({ data: "hello" });
}

export async function POST(req, res) {
  return NextResponse.json({ message: "post" });
}

export async function PUT(req, res) {
  return NextResponse.json({ message: "put" });
}

export async function DELETE(req, res) {
  return NextResponse.json({ message: "delete" });
}
