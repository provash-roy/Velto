import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import SidebarAction from "./sidebar-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import SidebarItem from "./sidebar-item";

import { currentProfile } from "@/lib/current-profile";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

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
    <div className="flex flex-col items-center h-full space-y-2 mx-auto ">
      <SidebarAction />
      <Separator className="bg-zinc-300 dark:bg-zinc-700 h-2 w-10" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div
            key={server.id}
            className="flex items-center justify-center w-12 h-12"
          >
            <SidebarItem
              id={server.id}
              serverName={server.serverName}
              iconUrl={server.iconUrl ?? ""}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="flex flex-col items-center justify-center w-full mb-4 space-y-4">
        <ModeToggle />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-12 h-12",
              userProfile: "w-80",
              userProfileDetails: "text-sm",
            },
          }}
        />
      </div>
    </div>
  );
}
