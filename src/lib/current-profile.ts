import { auth } from "@clerk/nextjs/server";

import prisma from "./prisma";

export const currentProfile = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      profileId: userId,
    },
  });

  return profile;
};
