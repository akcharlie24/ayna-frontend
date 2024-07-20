import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { socket } from "./Chat";

type ChatItemType = {
  name: string;
  chatId: number;
  lastMessage?: string | null;
};

const ChatItem = ({ name, chatId, lastMessage }: ChatItemType) => {
  const router = useRouter();

  useEffect(() => {
    socket.on("chat-click", (chatId) => {
      router.push(`/chat/${chatId}`);
      // @ts-ignore
    });
  }, []);

  return (
    <div
      className="my-2 ml-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-solid border-[#dddddd35] bg-[rgba(5,5,12,0.66)]"
      onClick={() => {
        socket.emit("clicked-chat", chatId);
      }}
    >
      <FiMessageSquare size={40} className="w-1/6 p-0 pl-5" />
      <div className="flex w-5/6 max-w-sm flex-col gap-2  px-5 py-4">
        <p className="text-lg font-semibold">{name}</p>
        <p className="line-clamp-2 text-sm text-white">{lastMessage || ""}</p>
      </div>
    </div>
  );
};

export default ChatItem;
