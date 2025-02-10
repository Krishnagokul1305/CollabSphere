"use client";

import { Button } from "@/components/ui/button";
import { logout } from "../lib/auth";

function LogoutButton() {
  function handler() {
    logout();
  }
  return <Button onClick={handler}>Logout</Button>;
}

export default LogoutButton;
