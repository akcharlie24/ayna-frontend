"use client";
import { RiRobot3Fill } from "react-icons/ri";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ServerMessage from "./messages/ServerMessage";
import UserMessage from "./messages/UserMessage";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/forms/messsageInputSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getChatMessages, storeMessageToDB } from "@/lib/actions/chat.actions";

export const socket = io("http://localhost:1337"); // TODO: change to env variable

const Chat = ({ chatId }: { chatId: number }) => {
  const endRef = useRef(null);
  const { user, authToken } = useAuth();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // @ts-ignore
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getChatMessages({ chatId, authToken });
      setMessages(data.data.attributes.messages);
      console.log(data.data.attributes.messages);
    };

    fetchMessages();

    socket.on("ser-message", (message) => {
      // @ts-ignore
      setMessages((prev) => [...prev, { text: message, date: Date.now() }]);
      console.log(messages);
    });
  }, []);

  console.log("component re-rendered");

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    console.log(values);
    const newMessage = {
      text: values.text,
      date: Date.now(),
    };
    const data = await getChatMessages({ chatId, authToken });
    const oldMessages = data.data.attributes.messages;
    const updatedMessages = [...oldMessages, newMessage];
    await storeMessageToDB({
      chatId,
      authToken,
      messages: updatedMessages,
    });
    socket.emit("user-message", values.text);
    form.reset();
  }

  return (
    <div className="flex max-h-[90vh] min-h-[90vh] flex-[2] flex-col rounded-lg border-x border-solid border-[#dddddd35]">
      <div className="flex min-h-20 items-center justify-center gap-4 border-b border-solid border-[#dddddd35] p-5 ">
        <Avatar className="bg-black">
          <AvatarFallback>
            <RiRobot3Fill size={32} />
          </AvatarFallback>
        </Avatar>
        <h2 className=" text-3xl font-bold">{user?.username}</h2>
      </div>
      <div className="flex flex-[1] flex-col gap-5 overflow-y-scroll px-24 py-5">
        {messages.map((message, i) => {
          return (
            <>
              <UserMessage text={message.text} date={message.date} />
              <ServerMessage text={message.text} date={message.date} />
            </>
          );
        })}
        <div ref={endRef}></div>
      </div>
      <div className=" flex w-full items-center justify-center gap-4 py-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center justify-center gap-4"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <div className="flex flex-col">
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        className=" w-[40rem] border-none bg-[rgba(17,25,40,0.5)] p-6 text-lg"
                        placeholder="Type your message here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                </div>
              )}
            />
            <Button type="submit" className="flex gap-2 bg-black text-lg">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
