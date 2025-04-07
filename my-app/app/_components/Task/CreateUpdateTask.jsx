"use client";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, FileInput, FileUp } from "lucide-react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createTask, updateTask } from "@/app/lib/actions/taskAction";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/ui/file-upload";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  dueDate: z.coerce.date(),
  status: z.string().optional(),
  members: z.array(z.string()).nonempty("Please select at least one member"),
  priority: z.string(),
  attachment: z.union([z.instanceof(File), z.string()]).optional(),
  report: z.string().optional(),
  tag: z.string().optional(),
});

export default function CreateUpdateTask({
  isCreate = true,
  data,
  members,
  projectId = "",
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      dueDate:
        data?.dueDate && !isNaN(new Date(data.dueDate).getTime())
          ? new Date(data.dueDate)
          : new Date(),
      status: data?.status || "pending",
      members: Array.isArray(data?.members)
        ? data.members.map((m) => m?._id)
        : [],
      priority: data?.priority || "Low",
      report: data?.report || "",
      tag: data?.tag || "",
      attachment: data?.attachment || "",
    },
  });

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      console.log(values);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("dueDate", values.dueDate.toISOString());
      if (values.status) formData.append("status", values.status);
      formData.append("priority", values.priority);
      if (values.report) formData.append("report", values.report);
      if (values.tag) formData.append("tag", values.tag);

      values.members.forEach((member) => {
        formData.append("members", member);
      });

      if (values.attachment) {
        formData.append("attachment", values.attachment);
      }
      formData.append("project", projectId);

      if (isCreate) {
        await createTask(formData);
        toast.success("Task created successfully!");
      } else {
        await updateTask(data._id, formData);
        toast.success("Task updated successfully!");
      }

      router.push(`/projects/${projectId}/tasks`);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 mx-auto"
      >
        {/* Title */}
        {/* ... (rest of your form fields) ... */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title"
                  className="bg-background py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  className="resize-none bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due Date and Tag */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a tag eg: 'UI', 'API'"
                    className="bg-background py-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full py-6 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachment</FormLabel>
              <FormControl>
                <FileUploader
                  name="attachment"
                  value={field.value}
                  onValuesChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Members</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select members" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {members?.map((member) => (
                        <MultiSelectorItem
                          key={member?._id}
                          value={member?._id}
                        >
                          {member.name} ({member.email})
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex items-center space-x-1"
                >
                  {[
                    ["High", "High"],
                    ["Medium", "Medium"],
                    ["Low", "Low"],
                  ].map(([label, value], index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={index}
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

        {/* Submit Button */}
        <Button type="submit" className="block ms-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
}
