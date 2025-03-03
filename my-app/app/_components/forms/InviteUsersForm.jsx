"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import EmptyList from "../EmptyList";
import { searchUser } from "@/app/lib/data-service";
import Spinner from "../Spinner";

export default function InviteUsersForm() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let abortController = new AbortController(); // Initialize abort controller

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

  const toggleMember = (id) => {
    setMembers(
      members.map((m) => (m._id === id ? { ...m, added: !m.added } : m))
    );
  };

  const addEmail = (email) => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
    }
  };

  const removeEmail = (email) => {
    setEmails(emails.filter((e) => e !== email));
  };

  return (
    <div className="max-w-md mx-auto rounded-lg space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search team members..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
              <Button
                variant={member.added ? "destructive" : "outline"}
                size="sm"
                onClick={() => toggleMember(member._id)}
              >
                {member.added ? "Remove" : "Add"}
              </Button>
            </div>
          ))
        ) : (
          <EmptyList title="No Users Found" count={0} />
        )}
      </div>
    </div>
  );
}
