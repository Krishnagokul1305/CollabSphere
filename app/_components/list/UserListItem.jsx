import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserListItem({ user }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg cursor-pointer ">
      <Avatar>
        {user.image ? (
          <AvatarImage src={user.image} alt={user.name} />
        ) : (
          <AvatarFallback>
            {user.name.charAt(0) + user.name.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <p className=" font-medium">{user.name}</p>
        <p className="text-sm text-zinc-400">
          Attached to {user.attachment} • {user.daysAgo} days ago
        </p>
      </div>
    </div>
  );
}

export default UserListItem;
