"use client";

import { Button } from "@/components/ui/button";
import { markTaskAsCompleted } from "../lib/actions/taskAction";

function CompleteButton({ taskId, memberId }) {
  async function handleComplete() {
    try {
      console.log(taskId, memberId);
      await markTaskAsCompleted(taskId, memberId);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }

  return <Button onClick={handleComplete}>Complete</Button>;
}

export default CompleteButton;
