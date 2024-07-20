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

const socket = io("http://localhost:1337"); // TODO: change to env variable

const Chat = () => {
  const endRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      text: "Hello, how are you?",
      date: new Date("2024-07-19T10:00:00Z"),
    },
    {
      text: "Just finished my work.",
      date: new Date("2024-07-19T12:30:00Z"),
    },
    {
      text: "Let's meet for lunch.",
      date: new Date("2024-07-19T13:00:00Z"),
    },
    {
      text: "I'm on my way.",
      date: new Date("2024-07-19T14:15:00Z"),
    },
    {
      text: "See you soon!",
      date: new Date("2024-07-19T14:45:00Z"),
    },
  ]);

  useEffect(() => {
    // @ts-ignore
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("ser-message", (message) => {
      // @ts-ignore
      setMessages((prev) => [...prev, { text: message, date: Date.now() }]);
    });
  }, []);

  console.log("component re-rendered");

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof messageSchema>) {
    console.log(values);
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
        <h2 className=" text-3xl font-bold">Chat 1 with Server</h2>
      </div>
      <div className="flex flex-[1] flex-col gap-5 overflow-y-scroll px-24 py-5">
        {messages.map((message, i) => {
          return (
            <>
              <UserMessage
                text={message.text}
                date={message.date}
                key={`User ${i}`}
              />
              <ServerMessage
                text={message.text}
                date={message.date}
                key={`Server ${i}`}
              />
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
