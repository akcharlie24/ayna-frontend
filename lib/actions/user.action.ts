"use server";
import axios from "axios";

import { SignInUser, SignUpUser } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const signUpUser = async (user: SignUpUser) => {
  try {
    const { data } = await axios({
      method: "post",
      baseURL,
      url: "/auth/local/register",
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (user: SignInUser) => {
  try {
    const { data } = await axios({
      method: "post",
      baseURL,
      url: "/auth/local",
      data: {
        identifier: user.identifier,
        password: user.password,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
