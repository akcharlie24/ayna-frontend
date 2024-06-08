"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

const getResponse = async () => {
  const provider = "oauth_google";
  const { userId } = auth();
  // @ts-ignore
  const response = await clerkClient.users.getUserOauthAccessToken(
    // @ts-ignore
    userId,
    provider,
  );

  console.log(response.data[0].token);
};

export default getResponse;
