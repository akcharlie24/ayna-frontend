"use client";
import Chat from "@/components/shared/Chat";
import { useParams } from "next/navigation";

const Home = () => {
  const params = useParams();
  const { id } = params;
  // @ts-ignore
  return <Chat chatId={id} />;
};

export default Home;
