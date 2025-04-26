// import Chat from "@/app/_components/Chat";
import Chat from "@/app/_components/Chat";
import UserList from "@/app/_components/list/UserList";

function page() {
  return (
    <div className="space-y-5">
      <div className="py-4 rounded-md px-3 md:px-6 pb-3 bg-sidebar space-y-3 flex flex-col md:flex-row  md:items-center justify-between">
        <h1 className="text-2xl font-semibold">Messages</h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5 rounded-md">
        <UserList />
        <Chat />
      </div>
    </div>
  );
}

export default page;
