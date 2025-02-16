import DetailsForm from "./DetailsForm";
import PasswordForm from "./PasswordForm";

export default function UserDetailsForm() {
  return (
    <div className="mx-auto md:p-6 w-full p-3">
      <h2 className="text-2xl font-semibold">User Information</h2>
      <DetailsForm />
      <PasswordForm />
    </div>
  );
}
