import ChatList from "@/components/shared/ChatList";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" overflow-hidden ">
      <div className="z-20 flex h-screen items-center justify-center bg-blue-pattern text-white">
        <div className="z-20  h-screen w-screen rounded-xl border border-solid border-[rgba(255,255,255,0.125)] bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] lg:h-[90vh] lg:w-[80vw]">
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
