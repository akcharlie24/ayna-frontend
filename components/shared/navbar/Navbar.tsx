import { Button } from "@/components/ui/button";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import React from "react";
import { IoLogOut } from "react-icons/io5";

const Navbar = async () => {
  const { userId }: { userId: string } = auth();
  const user = await clerkClient.users.getUser(userId);
  console.log(user.externalAccounts[0].emailAddress);
  return (
    <div className="flex justify-center">
      <nav className="flex-between fixed z-50 m-8 w-3/4 gap-5 rounded-2xl bg-[#EEEEEE]  p-4 shadow-light-300 sm:px-12  ">
        <div className="flex gap-5">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-12 w-12",
                },
              }}
            />
          </SignedIn>
          <div className="flex flex-col font-spaceGrotesk text-black">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div className="text-gray-700">
              {user.externalAccounts[0].emailAddress}
            </div>
          </div>
        </div>
        <div>
          <SignOutButton>
            <Button>
              <IoLogOut size={32} />
            </Button>
          </SignOutButton>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
