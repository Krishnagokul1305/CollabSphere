import ImageUploader from "@/app/_components/ImageUploader";
import ProfileEditForm from "@/app/_components/ProfileEditForm";

function page() {
  return (
    <div className="grid md:grid-cols-[2fr_1fr] h-full bg-sidebar grid-cols-1  rounded-md max-w-7xl p-2 mx-auto">
      <ProfileEditForm />
      <ImageUploader />
    </div>
  );
}

export default page;
