import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      profileId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.profile.create({
    data: {
      profileId: user.id,
      profileName: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0]?.emailAddress || "",
      avatarUrl: user.imageUrl,
    },
  });
  return newProfile;
};
