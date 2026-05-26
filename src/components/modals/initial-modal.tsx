"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../mode-toggle";

const formSchema = z.object({
  serverName: z.string().min(5, "Server name must be at least 5 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function InitialModal() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverName: "",
    },
  });

  const isloading = form.formState.isSubmitting;
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Dialog open={true}>
     
      <DialogContent className=" bg-white  text-black ">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Customize your server
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-700 text-center">
              Give your server a personality with name and image.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="serverName" className="text-zinc-500">
                Server Name
              </Label>
              <Input
                id="serverName"
                placeholder="Enter server name"
                disabled={isloading}
                {...form.register("serverName")}
                className="bg-zinc-300/50 rounded text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {form.formState.errors.serverName && (
                <FieldError>
                  {form.formState.errors.serverName.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
          <ModeToggle />

          <DialogFooter className="bg-gray-100">
            <Button
              type="submit"
              className="rounded bg-indigo-500 hover:bg-indigo-500/90"
              disabled={isloading}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
