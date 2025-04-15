import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import clsx from "clsx";

export function Message({ message, time, isSender, name, avatar }) {
  return (
    <div
      className={clsx("flex gap-3 items-start", { "justify-end": isSender })}
    >
      {!isSender && (
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      )}

      <div className={clsx("md:max-w-[75%]", { "text-right": isSender })}>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p
          className={clsx("rounded-lg p-2 text-sm", {
            "bg-primary text-primary-foreground": isSender,
            "bg-muted": !isSender,
          })}
        >
          {message}
        </p>
      </div>

      {isSender && (
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
