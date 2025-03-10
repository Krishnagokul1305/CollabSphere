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

export default function InviteUsersForm({ projectId }) {
  const [members, setMembers] = useState([]); // Users from search
  const [invitedUsers, setInvitedUsers] = useState(new Set()); // Track invited users
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

  // Invite a user
  const handleInvite = async (userId) => {
    await inviteMember(projectId, userId);
    setInvitedUsers((prev) => new Set(prev).add(userId));
  };

  // Remove invited user
  const handleRemove = async (userId) => {
    await rejectInvite(projectId, userId);
    setInvitedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
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
        ) : members.length > 0 ? (
          members.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-sidebar"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>

              {invitedUsers.has(member._id) ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(member._id)}
                >
                  Remove
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleInvite(member._id)}>
                  Invite
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
