"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import { Contact } from "@/components/contact";
import { MainLayout } from "@/components/layout/main-layout";
import { Section } from "@/components/layout/section";
import { animationConfig } from "@/components/animation-config";

export default function Home() {
  return (
    <MainLayout>
      <motion.div
        {...animationConfig}
        className="space-y-10 sm:space-y-14 lg:space-y-20"
      >
        <HeroSection />
        <Section>
          <motion.div {...animationConfig}>
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-medium">
              Contact
            </h2>
          </motion.div>
          <motion.div {...animationConfig}>
            <p className="text-sm sm:text-base lg:text-[16px] leading-relaxed text-muted-foreground">
              I love meeting new people, and I reply to every mail, so say
              hello.
            </p>
          </motion.div>
          <Contact />
        </Section>
      </motion.div>
    </MainLayout>
  );
}
