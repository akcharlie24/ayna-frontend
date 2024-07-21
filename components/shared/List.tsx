"use client";
import { useAuth } from "@/context/AuthContext";
import ChatItem from "./ChatItem";
import { getChats } from "@/lib/actions/chat.actions";
import { useEffect, useRef, useState } from "react";
import { getLastMessage } from "@/lib/utils";
import { Chat } from "@/types";
import { useParams } from "next/navigation";

const List = () => {
  const { authToken } = useAuth();
  const [chats, setChats] = useState([]);

  const endRef = useRef(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // @ts-ignore
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // @ts-ignore
        const data = await getChats({ authToken });
        setChats(data.chat_ids);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, [authToken, id]);

  return (
    <div className="flex max-h-[70vh] min-h-[70vh]  flex-col overflow-y-scroll">
      {chats.map((chat: Chat) => {
        return (
          <ChatItem
            key={chat.id}
            name={chat.name}
            chatId={chat.id}
            lastMessage={getLastMessage(chat.messages)}
          />
        );
      })}
      <div ref={endRef}></div>
    </div>
  );
};

export default List;
