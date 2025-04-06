"use client";

import { Button } from "@/components/ui/button";
import { markTaskAsCompleted } from "../lib/actions/taskAction";
import toast from "react-hot-toast";

function CompleteButton({ taskId, memberId }) {
  async function handleComplete() {
    try {
      toast.promise(markTaskAsCompleted(taskId, memberId), {
        loading: "Completing task...",
        success: "Task completed successfully!",
        error: "Error completing task.",
      });
    } catch (error) {
      toast.error("Failed to mark task as completed.");
    }
  }

  return <Button onClick={handleComplete}>Complete</Button>;
}

export default CompleteButton;
