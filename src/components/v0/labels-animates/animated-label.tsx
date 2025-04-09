"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLabelProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
  variant?: "default" | "outline" | "gradient";
  errorMessage?: string;
}

export default function AnimatedLabel({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  className,
  variant = "default",
  errorMessage,
}: AnimatedLabelProps) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border-2 border-slate-300 focus-within:border-blue-500 dark:border-slate-600 dark:focus-within:border-blue-400";
      case "gradient":
        return "border-2 border-transparent bg-gradient-to-r from-purple-500 to-blue-500 p-[1px]";
      default:
        return "border-b-2 border-slate-300 focus-within:border-blue-500 dark:border-slate-600 dark:focus-within:border-blue-400";
    }
  };

  return (
    <div className={cn("relative mb-6", className)}>
      <div
        className={cn(
          "relative rounded-md",
          variant === "gradient"
            ? "bg-gradient-to-r from-purple-500 to-blue-500 p-[1px] rounded-md"
            : ""
        )}
      >
        <div
          className={cn(
            "relative",
            variant === "gradient"
              ? "bg-white dark:bg-slate-900 rounded-[3px]"
              : ""
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-md",
              getVariantClasses()
            )}
          >
            <motion.label
              htmlFor={id}
              className={cn(
                "absolute left-3 pointer-events-none text-slate-500 dark:text-slate-400",
                isActive ? "text-xs" : "text-base"
              )}
              initial={false}
              animate={{
                y: isActive ? -12 : 0,
                scale: isActive ? 0.8 : 1,
                x: isActive ? -5 : 0,
                color: focused ? "rgb(59, 130, 246)" : "rgb(100, 116, 139)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </motion.label>

            <input
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              required={required}
              className={cn(
                "block w-full bg-transparent px-3 pb-2 pt-4 text-slate-900 dark:text-white focus:outline-none",
                isActive ? "pt-6" : "pt-4"
              )}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />

            {variant === "default" && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: focused ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.p
            className="absolute text-xs text-red-500 mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
