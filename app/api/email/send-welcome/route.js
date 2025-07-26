import dbConnect from "@/app/lib/db";
import { Email } from "@/app/utils/email";

export async function POST(req) {
  try {
    const { user } = await req.json();

    await dbConnect();

    await new Email(user.email).sendWelcome(user?.name);

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error sending invite:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
