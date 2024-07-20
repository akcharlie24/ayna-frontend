"use client";
import Chat from "@/components/shared/Chat";
import ChatList from "@/components/shared/ChatList";
import { useParams } from "next/navigation";

const Home = () => {
  const params = useParams();
  const { id } = params;

  return <Chat chatId={id} />;
};

export default Home;
