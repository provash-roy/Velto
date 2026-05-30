import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { initialProfile } from "@/lib/initial-profile";
import InitialModal from "@/components/modals/initial-modal";

export default async function SetupPage() {
  const profile = await initialProfile();

  if (!profile || !("id" in profile)) {
    return <div>Profile not found</div>;
  }

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
