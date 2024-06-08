import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <SignedIn>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-14 w-14",
          },
        }}
      />
    </SignedIn>
  );
};

export default Navbar;
