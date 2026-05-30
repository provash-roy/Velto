import Sidebar from "@/components/navigation/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className=" hidden md:flex md:flex-col md:w-18 h-full fixed top-0 left-0 inset-y-0 bg-[#1E1F22]">
        <Sidebar />
      </div>
      <main className="md:pl-16 h-full"> {children}</main>
    </div>
  );
}
