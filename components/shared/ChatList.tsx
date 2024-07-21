"use client";
import { useEffect } from "react";
import List from "./List";
import UserInfo from "./UserInfo";

const ChatList = () => {
  return (
    // TODO: manage responsiveness
    <div className="hidden flex-[1] md:flex md:flex-col">
      <div className="flex flex-col gap-4">
        <UserInfo />
        <List />
      </div>
    </div>
  );
};

export default ChatList;
