"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";

interface SidebarItemProps {
  id: string;
  serverName: string;
  iconUrl: string;
}

export default function SidebarItem({
  id,
  serverName,
  iconUrl,
}: SidebarItemProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <div>
      <ActionTooltip label={serverName} side="right">
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-12 h-12 px-3 rounded-xl  mb-2"
        >
          <Image
            src={iconUrl}
            alt={`${serverName} icon`}
            className="w-12 h-12"
          />
        </button>
      </ActionTooltip>
    </div>
  );
}
