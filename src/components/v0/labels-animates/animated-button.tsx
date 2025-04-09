"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "gradient";
  size?: "default" | "lg" | "sm";
}

export default function AnimatedButton({
  children = "Haz clic",
  className,
  variant = "default",
  size = "default",
  ...props
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="flex items-center justify-center p-8">
      <motion.button
        className={cn(
          "relative rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
          {
            "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600":
              variant === "default",
            "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600":
              variant === "gradient",
            "px-4 py-2 text-base": size === "default",
            "px-6 py-3 text-lg": size === "lg",
            "px-2 py-1 text-sm": size === "sm",
          },
          className
        )}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => isPressed && setIsPressed(false)}
        {...props}
      >
        {children}
      </motion.button>
    </div>
  );
}
