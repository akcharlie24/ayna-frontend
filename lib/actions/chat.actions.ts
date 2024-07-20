"use server";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getChats = async ({ authToken }: { authToken: string }) => {
  try {
    const { data } = await axios({
      baseURL,
      url: "/users/me",
      params: {
        "populate[0]": "chat_ids",
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addChat = async ({
  authToken,
  chatName,
  userId,
}: {
  authToken: string;
  chatName: string;
  userId: number;
}) => {
  try {
    const { data } = await axios({
      method: "post",
      baseURL,
      url: "chats",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        data: {
          name: chatName,
          messages: [],
          user_id: {
            connect: [{ id: userId }],
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getChatMessages = async ({
  chatId,
  authToken,
}: {
  chatId: string;
  authToken: string;
}) => {
  try {
    const { data } = await axios({
      baseURL,
      url: `/chats/${chatId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        fields: "messages",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const storeMessageToDB = async ({
  chatId,
  authToken,
  messages,
}: {
  chatId: string;
  authToken: string;
  messages: any;
}) => {
  try {
    const { data } = await axios({
      method: "put",
      baseURL,
      url: `/chats/${chatId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        data: {
          messages,
        },
      },
    });
    return data;
  } catch (error) {}
};
