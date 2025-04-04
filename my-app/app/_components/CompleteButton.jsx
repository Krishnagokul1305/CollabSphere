"use client";

import { Button } from "@/components/ui/button";
import { markTaskAsCompleted } from "../lib/actions/taskAction";
import toast from "react-hot-toast";

function CompleteButton({ taskId, memberId }) {
  async function handleComplete() {
    try {
      await markTaskAsCompleted(taskId, memberId);
      toast.success("Task marked as completed successfully!");
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to mark task as completed.");
    }
  }

  return <Button onClick={handleComplete}>Complete</Button>;
}

export default CompleteButton;
