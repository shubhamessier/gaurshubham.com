"use client";

import { motion } from "framer-motion";

export function QuestionsThoughts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4 text-base text-muted-foreground leading-relaxed"
    >
      <h2 className="text-xl sm:text-2xl lg:text-[24px] font-medium">Questions? Thoughts?</h2>
      <p>No comments here. That would be too weird. Just email me.</p>
    </motion.div>
  );
} 