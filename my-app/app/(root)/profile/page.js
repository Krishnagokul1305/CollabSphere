import ImageUploader from "@/app/_components/ImageUploader";
import ProfileEditForm from "@/app/_components/ProfileEditForm";

function page() {
  return (
    <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 max-w-7xl mx-auto">
      <ProfileEditForm />
      <ImageUploader />
    </div>
  );
}

export default page;
