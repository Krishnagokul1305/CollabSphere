"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { createTodo, updateTodo } from "@/app/lib/actions/todoAction";
import Spinner from "../Spinner";
import { useState } from "react";
import { format } from "date-fns";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"), // "YYYY-MM-DD"
  time: z.string().min(1, "Time is required"), // "HH:mm"
  priority: z.string(),
});

export default function CreateUpdateTodo({ close, initialData }) {
  const [loading, setLoading] = useState(false);

  const initialDateTime = initialData?.date_time
    ? new Date(initialData.date_time)
    : new Date();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
      priority: initialData?.priority || "low",
      date: format(initialDateTime, "yyyy-MM-dd"),
      time: format(initialDateTime, "HH:mm"),
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    // Combine date + time into a single Date object
    const combinedDateTime = new Date(`${values.date}T${values.time}:00`);

    const payload = {
      description: values.description,
      priority: values.priority,
      date_time: combinedDateTime,
    };

    try {
      if (!initialData) {
        await toast.promise(createTodo(payload), {
          loading: "Creating task...",
          success: "Task created successfully!",
          error: "Error creating task.",
        });
      } else {
        await toast.promise(updateTodo(initialData._id, payload), {
          loading: "Updating task...",
          success: "Task updated successfully!",
          error: "Error updating task.",
        });
      }
      close();
    } catch (error) {
      console.error("Form submission error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto"
      >
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the Task"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex items-center gap-4"
                  value={field.value}
                >
                  {[
                    ["High", "high"],
                    ["Low", "low"],
                  ].map(([label, value]) => (
                    <FormItem
                      key={value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal">{label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner theme="light" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
