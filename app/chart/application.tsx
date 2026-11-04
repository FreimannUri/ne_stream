"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/app/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { Label } from "@/app/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/ui/radio-group";
import { query } from "./actions";
import { appSchema } from "./columns";

export type formSchema = {
  id: string;
  employer: string;
  vacancy: string;
  state: "pending" | "reacted";
  date: string;
  new: boolean;
};

export default function Application(application: appSchema) {
  // console.log(application);
  const now = new Date().toISOString().split("T")[0];

  const form = useForm<formSchema>({
    defaultValues:
      application.id == "-"
        ? {
            id: "",
            employer: "",
            vacancy: "",
            state: "pending",
            date: now,
            new: true,
          }
        : { ...application, date: now, new: false },
  });

  function onSubmit(values: formSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(query)} className="space-y-8">
        <FormField
          control={form.control}
          name="employer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              {/* <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage /> */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vacancy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vacancy</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

              {/* <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage /> */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="ml-8">
              <FormLabel>State</FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="r0" />
                    <Label htmlFor="r0">Pending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reacted" id="r1" />
                    <Label htmlFor="r1">Reacted</Label>
                  </div>
                </RadioGroup>
              </FormControl>

              {/* <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage /> */}
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-8">
          Submit
        </Button>
      </form>
    </Form>
  );
}
