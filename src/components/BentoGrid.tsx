"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoItem({ children, className = "", delay = 0 }: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: delay,
      }}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function BentoGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
