import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="h-full flex flex-col flex-1 items-center justify-center">
      <p className="text-3xl font-semibold text-red-800">Hello World</p>
      <ModeToggle />
    </div>
  );
}
