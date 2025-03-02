"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Stage {
  title: string;
  description: string;
}

const stages: Stage[] = [
  {
    title: "Observe",
    description: "Understanding the problem space and gathering insights.",
  },
  {
    title: "Think",
    description: "Analyzing patterns and formulating potential solutions.",
  },
  {
    title: "Build",
    description: "Creating and implementing the solution with precision.",
  },
  {
    title: "Iterate",
    description: "Refining and improving based on feedback and results.",
  },
];

export function ThoughtProcess() {
  return (
    <div className="space-y-6">
      <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-medium">
        Thought Process
      </h2>
      <div className="relative flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative space-y-2"
            >
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium">
                {stage.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-muted-foreground">
                {stage.description}
              </p>
              <motion.div
                className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                <ArrowRight
                  className="h-6 w-6 text-muted-foreground"
                  style={{
                    transform:
                      index === 1
                        ? "rotate(90deg)"
                        : index === 2
                        ? "rotate(180deg)"
                        : index === 3
                        ? "rotate(270deg)"
                        : "rotate(0deg)",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
