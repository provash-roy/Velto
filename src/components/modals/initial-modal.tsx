"use client";

import * as z from "zod";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  serverName: z.string().min(1, "Server name is required."),
  iconUrl: z.string().min(1, "Server image is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function InitialModal() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      serverName: "",
      iconUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post("/api/servers", data);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black overflow-hidden p-0">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Customize your server
            </DialogTitle>

            <DialogDescription className="text-center text-zinc-500">
              Give your server a personality with a name and image.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 px-6 py-4">
            <FieldGroup>
              {/* SERVER IMAGE */}
              <Field>
                <FieldLabel className="uppercase text-xs font-bold text-zinc-500">
                  Server Image
                </FieldLabel>

                <Controller
                  control={form.control}
                  name="iconUrl"
                  render={({ field }) => (
                    <FileUpload
                      endpoint="serverImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                {form.formState.errors.iconUrl && (
                  <FieldError>
                    {form.formState.errors.iconUrl.message}
                  </FieldError>
                )}
              </Field>

              {/* SERVER NAME */}
              <Field>
                <FieldLabel
                  htmlFor="serverName"
                  className="uppercase text-xs font-bold text-zinc-500"
                >
                  Server Name
                </FieldLabel>

                <Input
                  id="serverName"
                  placeholder="Enter server name"
                  disabled={isLoading}
                  {...form.register("serverName")}
                  className="
                    bg-zinc-300/50
                    border-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    text-black
                  "
                />

                {form.formState.errors.serverName && (
                  <FieldError>
                    {form.formState.errors.serverName.message}
                  </FieldError>
                )}
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-500 hover:bg-indigo-500/90"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
 