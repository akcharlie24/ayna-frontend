import ChatList from "@/components/shared/ChatList";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // TODO: check if the overflow-hidden is causing any unexpected behaviours
    <main className=" overflow-hidden ">
      <div className="z-20 flex h-screen items-center justify-center bg-blue-pattern text-white">
        <div className="z-20  h-[90vh] w-[80vw] rounded-xl border border-solid border-[rgba(255,255,255,0.125)] bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%]">
          <div className="flex">
            <ChatList />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
