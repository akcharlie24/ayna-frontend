import ControlBar from "@/components/shared/ControlBar";
import Navbar from "@/components/shared/navbar/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background-home";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO: check if the overflow-hidden is causing any unexpected behaviours
    <main className=" relative overflow-hidden bg-light-850 ">
      <AuroraBackground>
        <Navbar />
        <div className="flex">
          <section className="flex min-h-screen flex-1 flex-col px-6 pt-36 max-md:pb-14 sm:px-14">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </section>
        </div>
      </AuroraBackground>
    </main>
  );
};

export default Layout;
