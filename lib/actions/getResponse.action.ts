"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import axios from "axios";

const getResponse = async () => {
  const baseUrl = "https://gmail.googleapis.com/gmail/v1/users/me/messages";
  const provider = "oauth_google";
  const { userId } = auth();
  // @ts-ignore
  const response = await clerkClient.users.getUserOauthAccessToken(
    // @ts-ignore
    userId,
    provider,
  );

  console.log(response.data[0].token);
  const token = response.data[0].token;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const fetchEmail = async (messageId: string) => {
    try {
      const { data } = await axios({
        baseURL: baseUrl,
        url: `/${messageId}`,
      });
      console.log(data.payload.headers);
    } catch (error) {
      console.log(error);
    }
  };

  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: "/",
      params: {
        maxResults: 2,
      },
    });
    const messages = data.messages;
    messages.map((message) => {
      fetchEmail(message.id);
    });
  } catch (err) {
    console.log(err);
  }
};

export default getResponse;
