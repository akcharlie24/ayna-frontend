import Chat from "@/components/shared/Chat";
import ChatList from "@/components/shared/ChatList";

const Home = async () => {
  return (
    <div className="flex">
      <ChatList />
      <Chat />
    </div>
  );
};

export default Home;
