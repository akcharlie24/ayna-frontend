"use client";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.9,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-10 px-4"
      >
        <div className="text-center font-inter text-3xl font-bold dark:text-white md:text-7xl">
          Welcome To SlidesIO AI
        </div>
        <div className="py-4 text-base font-extralight dark:text-neutral-200 md:text-4xl">
          {children}
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default layout;
