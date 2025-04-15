"use client";

import { Button } from "@/components/ui/button";
import { logout } from "../lib/auth";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();
  function handler() {
    logout();
    router.push("/login");
  }
  return <Button onClick={handler}>Logout</Button>;
}

export default LogoutButton;
