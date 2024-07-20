"use client";

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
import { signUpSchema } from "@/forms/signUpSchema";
import { signUpUser } from "@/lib/actions/user.action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const data = await signUpUser(values);
    if (!data) {
      return toast({
        variant: "destructive",
        title: "SignIn Failed",
        description: `There was a problem (duplicate user or email)
        , Please Try Again`,
      });
    }
    login(data);
    router.push("/");
  }

  return (
    <div className="z-20 flex h-[70vh] w-[40vw] flex-col items-center rounded-xl border border-solid border-[rgba(255,255,255,0.125)] bg-[rgba(17,25,40,0.75)] py-16 backdrop-blur-[19px] backdrop-saturate-[180%]">
      <h1 className="font-inter text-3xl font-semibold ">Sign Up</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="w-80 border-none bg-[rgba(6,10,18,0.81)] p-6 text-lg "
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
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
      <p className="mt-14 text-lg">
        Alerady a user ? SignIn{" "}
        <Link className=" font-inter text-blue-500" href={"/sign-in"}>
          here
        </Link>
      </p>
    </div>
  );
}
