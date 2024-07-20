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
