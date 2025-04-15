import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json({ message: "get" });
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
