import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "../../../../generated/prisma/enums";

export async function POST(req: Request) {
  try {
    const { serverName, iconUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prisma.server.create({
      data: {
        profileId: profile.id,
        serverName,
        iconUrl,
        inviteCode: uuidv4(),

        channels: {
          create: [
            {
              channelName: "general",
              profileId: profile.id,
            },
          ],
        },

        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERs_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
