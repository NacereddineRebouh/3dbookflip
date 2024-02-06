"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setLoaded: Dispatch<SetStateAction<boolean>>;
  percentage: number;
};

export default function LoadingScreen({ setLoaded, percentage }: Props) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 flex !z-50 h-full w-full select-none flex-col items-center justify-center gap-y-1 bg-[#c4908e] text-sm font-thin transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        {percentage < 100 && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className={`flex animate-pulse-slow2 flex-row gap-x-1`}
            >
              {percentage}% <span className="font-light">Loading</span>
            </motion.div>
            <motion.progress
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              value={percentage}
              max="100"
              className="h-1 w-32"
            />
          </>
        )}
        {percentage >= 100 && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoaded(true)}
            className="group cursor-pointer rounded-lg border-[2px] border-neutral-400 bg-neutral-950/30 px-4 py-2 font-light text-neutral-50"
          >
            <div className="animate-pulse-slow2 transition-all duration-300 group-hover:tracking-wider group-active:tracking-tight">
              Start experience
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
