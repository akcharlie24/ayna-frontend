import Navbar from "@/components/shared/navbar/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-light-850">
      <Navbar />
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col px-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
      Toaster
    </main>
  );
};

export default Layout;
