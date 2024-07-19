import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";
import React from "react";
import { RiRobot3Fill } from "react-icons/ri";

const ServerMessage = ({ text, date }: { text: string; date: Date }) => {
  const dateString = timeAgo(date);
  return (
    <div className="flex gap-2">
      <Avatar className="size-10 bg-black">
        <AvatarFallback>
          <RiRobot3Fill size={24} />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="max-w-lg text-wrap rounded-xl bg-[rgba(17,25,40,0.3)] p-3">
          {text}
        </p>
        <span className="p-1 text-sm text-gray-400">{dateString}</span>
      </div>
    </div>
  );
};

export default ServerMessage;
