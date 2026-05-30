import { PlusIcon } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import ActionTooltip from "../action-tooltip";

export default function SidebarAction() {
  return (
    <div>
      <ActionTooltip label="Create Server" side="right">
        <div className="flex items-center justify-center w-12 h-12 px-3 rounded-full hover:rounded-xl bg-[#363636] hover:bg-emerald-700 text-emerald-700 hover:text-white mb-2">
          <PlusIcon />
        </div>
      </ActionTooltip>
      <Separator />
    </div>
  );
}
