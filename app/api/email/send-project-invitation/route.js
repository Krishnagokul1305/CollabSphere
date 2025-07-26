import dbConnect from "@/app/lib/db";
import { Email } from "@/app/utils/email";

export async function POST(req) {
  try {
    const { project, to } = await req.json();

    await dbConnect();

    if (!project) {
      return Response.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    await new Email(to).sendProjectInvitation(
      project,
      process.env.NEXTAUTH_URL
    );

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
