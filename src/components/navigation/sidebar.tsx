import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import SidebarAction from "./sidebar-action";
import { Separator } from "../ui/separator";

export default async function Sidebar() {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/");
  }

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="flex flex-col items-center py-2">
      <SidebarAction />
    </div>
  );
}
