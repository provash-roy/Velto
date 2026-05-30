"use client";

import Image from "next/image";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  value: string;
  onChange: (url?: string) => void;
  endpoint: "serverImage" | "messageFiles";
}

export default function FileUpload({
  endpoint,
  value,
  onChange,
}: FileUploadProps) {
  if (value) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Uploaded Files:", res);

        onChange(res?.[0]?.ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);

        alert(`ERROR! ${error.message}`);
      }}
      appearance={{
        button: "bg-indigo-700 p-2 hover:bg-indigo-500/90 text-white rounded",
      }}
    />
  );
}
