"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  duration: string;
}

export function AchievementSection() {
  const achievements = [
    {
      title: "National Entrepreneurship Challenge, IIT Bombay",
      description: "Top 10 out of 200 teams",
      duration: "Feburary, 2023",
    },
    {
      title: "Techfest, IIT Bombay",
      description:
        "Participated in robotics competitions (Cozmoclench, Mesmerize). Designed maze-solving algorithms.",
      duration: "December, 2022",
    },
    {
      title: "EYRC ",
      description:
        "Utilized Python libraries such as turtlesim, gained ROS expertise.",
      duration: "August, 2022",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <h2 className="text-[28px] font-medium">Achievements</h2>
      <div className="space-y-12">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className="mt-1">
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-[20px] font-medium tracking:tighter">
                  {achievement.title}
                </h3>
                <span className="text-sm text-muted-foreground ml-4 ">
                  {achievement.duration}
                </span>
              </div>
              <p className="text-[16px] text-muted-foreground leading-relaxed sm:w-[70%] md:w-[50%]">
                {achievement.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
