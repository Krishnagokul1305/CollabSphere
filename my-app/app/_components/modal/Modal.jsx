"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Modal = forwardRef(({ title, description, children, Trigger }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {Trigger && <DialogTrigger asChild>{Trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>
          {children &&
            React.cloneElement(children, { close: () => setOpen(false) })}
        </div>
      </DialogContent>
    </Dialog>
  );
});

Modal.displayName = "Modal"; // Required for forwardRef

export default Modal;
