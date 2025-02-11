import ResetPasswordForm from "@/app/_components/ResetPasswordForm";

async function page({ params }) {
  const token = await params;
  return <ResetPasswordForm resetToken={token.resetToken} />;
}

export default page;
