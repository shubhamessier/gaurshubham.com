"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2 sm:space-y-4"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-[28px] font-medium">
        Shubham Gaur
      </h1>
      <div className="space-y-2 sm:space-y-8">
        <div className="space-y-2 text-sm sm:text-base lg:text-[16px] leading-relaxed text-muted-foreground">
          <p>
            I am a full time software developer, part time hacker. I believe in
            the philosophy, &quot;An idiot admires complexity, a genius admires
            simplicity." Outside of programming, I enjoy writing my blog,
            spending time offline and learning about newer innovations.
          </p>
          <p>
            I've recently adopted the hobby of breaking down tech and teaching
            them in fun ways to my social group. I really admire the initiative
            of free open source software (FOSS), thus Linux became my all-time
            favorite.
          </p>
          <p>
            I see hacking as the art of programming, creativity beyond paywalls
            and firewalls. It's about innovating and experimenting freely,
            creating unique ways to make or break things rather than stealing or
            copying.
          </p>
        </div>

        <div className="flex pt-2 flex-wrap gap-2.5 lg:text-[16px] sm:gap-4">
          <Button
            asChild
            variant="outline"
            className="group text-base sm:text-lg"
          >
            <Link href="/work">
              <p>My Work</p>
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="group text-base sm:text-lg"
          >
            <Link href="/about">
              <p>About Me</p>
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="group text-base sm:text-lg"
          >
            <Link
              href="https://drive.google.com/file/d/1VJpCLHLKdzpM9QcrSLR-nvXM3B6jkhYH/view?usp=sharing"
              rel="noopener noreferrer"
            >
              <p>Resume</p>
              <FileText className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
