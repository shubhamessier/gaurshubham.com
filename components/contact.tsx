"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/shubhamessier",
    color: "hover:text-[#333]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/shubhamgaur10",
    color: "hover:text-[#333]",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/0xshubhamgaur",
    color: "hover:text-[#333]",
  },
  {
    name: "Blog",
    icon: Globe,
    href: "https://blog.gaurshubham.com/",
    color: "hover:text-[#333]",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:shubham.gaur7116@gmail.com",
    color: "hover:text-[#333]",
  },
];

export function Contact() {
  return (
    <div className="relative z-50 flex flex-wrap gap-3 mt sm:gap-6">
      {socialLinks.map((link, i) => (
        <motion.div
          key={link.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative z-20"
        >
          <Button size="sm" className="z-[50]" asChild></Button>
          <Link
            href={link.href}
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm sm:text-base text-muted-foreground transition-colors  dark:hover:text-white relative z-30`}
          >
            <link.icon className="h-6 w-6 sm:h-6 sm:w-6" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
