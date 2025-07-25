import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useChat = () => {
  const params = useParams();
  const chatId = useMemo(() => params?.id || "", [params?.id]);
  const isActive = useMemo(() => !!chatId, [chatId]);
  return { chatId, isActive };
};
