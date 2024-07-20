"use client";
import { FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { addChat } from "@/lib/actions/chat.actions";
import { useToast } from "../ui/use-toast";

const UserInfo = () => {
  const [newChat, setNewChat] = useState("");
  const { logout, user, authToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleChatAddition = async () => {
    if (newChat === "") {
      return toast({
        variant: "destructive",
        title: "Please enter chat name",
      });
    }
    const data = await addChat({
      // @ts-ignore
      authToken,
      chatName: newChat,
      // @ts-ignore
      userId: user.id,
    });
    if (!data) {
      return toast({
        title: "Error adding chat, refresh and try again",
      });
    }
    location.replace(`/chat/${data.data.id}`);
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">{user?.username}</h2>
        <Button
          onClick={() => {
            logout();
            router.push("/sign-in");
          }}
        >
          <IoLogOutOutline size={32} />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 ">
        <Input
          className="w-3/5 border-none bg-[rgba(8,11,17,0.58)]"
          placeholder="Write the name of new chat..."
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
        />
        <Button
          className="flex w-1/3 items-center justify-center gap-2 bg-[rgba(17,25,40,0.5)] "
          onClick={handleChatAddition}
        >
          <p className="text-sm font-semibold">Add Chat</p>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
