"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function SmartDatetimePicker({ value, onValueChange }) {
  const now = new Date();

  function handleDateSelect(date) {
    if (date) {
      const selectedDate = new Date(date);
      if (selectedDate < now) return; // Prevent past selection
      if (!value) {
        selectedDate.setHours(now.getHours(), now.getMinutes()); // Default time to current
      }
      onValueChange(selectedDate);
    }
  }

  function handleTimeChange(type, newValue) {
    const currentDate = value || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(newValue, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(newValue, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (newValue === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (newValue === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    // Prevent selecting past time on the current day
    if (newDate.toDateString() === now.toDateString() && newDate < now) {
      return;
    }

    onValueChange(newDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            format(value, "MM/dd/yyyy hh:mm aa")
          ) : (
            <span>MM/DD/YYYY hh:mm aa</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            fromDate={now} // Prevent past dates
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .reverse()
                  .filter(
                    (hour) =>
                      !(
                        value?.toDateString() === now.toDateString() &&
                        now.getHours() % 12 >= hour
                      )
                  ) // Disable past hours today
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value && value.getHours() % 12 === hour % 12
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5)
                  .filter(
                    (minute) =>
                      !(
                        value?.toDateString() === now.toDateString() &&
                        value?.getHours() === now.getHours() &&
                        minute < now.getMinutes()
                      )
                  ) // Disable past minutes this hour
                  .map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        value && value.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea>
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      value &&
                      ((ampm === "AM" && value.getHours() < 12) ||
                        (ampm === "PM" && value.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
