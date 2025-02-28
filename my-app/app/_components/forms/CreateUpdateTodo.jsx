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
import { SmartDatetimePicker } from "@/components/ui/smart-datetime-input";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { createTodo, updateTodo } from "@/app/lib/actions/todoAction";
import Spinner from "../Spinner";
import { useState } from "react";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  date_time: z.date(),
  priority: z.string(),
});

export default function CreateUpdateTodo({ close, initialData }) {
  let [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
      priority: initialData?.priority || "low",
      date_time: initialData?.date_time
        ? new Date(initialData.date_time)
        : new Date(),
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      if (!initialData) {
        toast.promise(createTodo(values), {
          loading: "Loading",
          success: "Created task Successfully",
          error: "Error Creating task",
        });
      } else {
        toast.promise(updateTodo(initialData._id, values), {
          loading: "Loading",
          success: "Created task Successfully",
          error: "Error Creating task",
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

        <FormField
          control={form.control}
          name="date_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <SmartDatetimePicker
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
                >
                  {[
                    ["High", "high"],
                    ["Low", "low"],
                  ].map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault;
              close();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner theme={"light"} /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
