import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import EmptyList from "../EmptyList";

function NotificationSheet() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
          You can view and edit your notification settings here.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <EmptyList
          count={0}
          title={"No Notifications"}
          message={"You have no notifications"}
        />
      </div>
      <SheetFooter>
        {/* <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose> */}
      </SheetFooter>
    </SheetContent>
  );
}

export default NotificationSheet;
