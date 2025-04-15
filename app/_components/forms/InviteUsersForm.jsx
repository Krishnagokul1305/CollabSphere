"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import EmptyList from "../EmptyList";
import { searchUser } from "@/app/lib/data-service";
import Spinner from "../Spinner";
import { inviteMember, rejectInvite } from "@/app/lib/actions/projectAction";

export default function InviteUsersForm({ projectId, existingMembers }) {
  const [members, setMembers] = useState([]);
  const [loadingInviteId, setLoadingInviteId] = useState(null);
  const [loadingRemoveId, setLoadingRemoveId] = useState(null);

  const [projectMembers, setProjectMembers] = useState(
    new Set(existingMembers.map((m) => m.user))
  );
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users based on search input
  useEffect(() => {
    async function loadMembers() {
      if (!search.trim()) {
        setMembers([]);
        return;
      }

      setIsLoading(true);
      try {
        const users = await searchUser(search);
        setMembers(users);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching users:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadMembers();
  }, [search]);

  const handleInvite = async (userId) => {
    setLoadingInviteId(userId);
    try {
      await inviteMember(projectId, userId);
      setProjectMembers((prev) => new Set(prev).add(userId));
    } finally {
      setLoadingInviteId(null);
    }
  };

  const handleRemove = async (userId) => {
    setLoadingRemoveId(userId);
    try {
      await rejectInvite(projectId, userId);
      setProjectMembers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    } finally {
      setLoadingRemoveId(null);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-lg space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search team members..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User List */}
      <div className="space-y-3">
        {isLoading ? (
          <Spinner />
        ) : members?.length > 0 ? (
          members?.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-sidebar"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {member.email}
                  </p>
                </div>
              </div>

              {projectMembers.has(member?._id) ? (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={loadingRemoveId === member._id}
                  onClick={() => handleRemove(member._id)}
                >
                  {loadingRemoveId === member._id ? "Removing..." : "Remove"}
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={loadingInviteId === member._id}
                  onClick={() => handleInvite(member._id)}
                >
                  {loadingInviteId === member._id ? "Inviting..." : "Invite"}
                </Button>
              )}
            </div>
          ))
        ) : (
          <EmptyList title="No Users Found" count={0} />
        )}
      </div>
    </div>
  );
}
