"use client";

import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-5">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-start space-x-4"
        >
          <div className="text-lg font-medium text-muted-foreground w-24">
            {event.year}
          </div>
          <div className="flex-1 text-base text-muted-foreground leading-relaxed">
            {event.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 