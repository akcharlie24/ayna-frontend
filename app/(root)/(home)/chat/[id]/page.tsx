"use client";
import Chat from "@/components/shared/Chat";
import ChatList from "@/components/shared/ChatList";
import { useParams } from "next/navigation";

const Home = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);
  return <Chat />;
};

export default Home;
