import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Modal({ title, description, children, Trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{children}</div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default">Confirm</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
