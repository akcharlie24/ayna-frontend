"use client";

import { signInSchema } from "@/forms/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInUser } from "@/lib/actions/user.action";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("authToken")) router.push("/chat");
  }, []);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const data = await signInUser(values);
    if (!data) {
      return toast({
        variant: "destructive",
        title: "SignIn Failed",
        description: "There was a problem, Please Try Again",
      });
    }
    const sessionToken = data.jwt;
    localStorage.setItem("authToken", sessionToken);
    router.push("/chat");
  }

  return (
    <div className="z-20 flex h-[60vh] w-[40vw] flex-col items-center rounded-xl border border-solid border-[rgba(255,255,255,0.125)] bg-[rgba(17,25,40,0.75)] py-16 backdrop-blur-[19px] backdrop-saturate-[180%]">
      <h1 className="font-inter text-3xl font-semibold ">Sign In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-80 border-none bg-[rgba(6,10,18,0.81)] p-6 text-lg "
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-80 border-none bg-[rgba(6,10,18,0.81)] p-6 text-lg"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-1/2 bg-black">
            Submit
          </Button>
        </form>
      </Form>
      <p className=" mt-12 text-lg">
        New to ayna chat ? SignUp{" "}
        <Link className=" font-inter text-blue-500" href={"/sign-up"}>
          here
        </Link>
      </p>
    </div>
  );
}
