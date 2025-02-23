"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Search } from "lucide-react";

const initialMembers = [
  {
    id: 1,
    name: "Whitney Blessing",
    email: "whitneyblessing@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    added: false,
  },
  {
    id: 2,
    name: "Cheryl Green",
    email: "cherylgreen@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    added: true,
  },
  {
    id: 3,
    name: "Bonnie Lopez",
    email: "bonnielopez@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    added: false,
  },
];

export default function InviteUsersForm() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [emails, setEmails] = useState([]);

  const toggleMember = (id) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, added: !m.added } : m))
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
    <div className="max-w-md mx-auto rounded-lg shadow-md space-y-4">
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
        {members
          .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
          .map((member) => (
            <div
              key={member.id}
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
                onClick={() => toggleMember(member.id)}
              >
                {member.added ? "Remove" : "Add"}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
