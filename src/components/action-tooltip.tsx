import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
  label: string;
  side: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
}

export default function ActionTooltip({
  label,
  side,
  children,
}: ActionTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div>{children}</div>
      </TooltipTrigger>
      <TooltipContent side={side}>
        <p className="text-sm font-medium">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
