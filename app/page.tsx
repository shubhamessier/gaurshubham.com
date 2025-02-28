"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import { Contact } from "@/components/contact";
import { MainLayout } from "@/components/layout/main-layout";
import { Section } from "@/components/layout/section";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
  viewport: { once: true, amount: 0.1 },
};

export default function Home() {
  return (
    <MainLayout>
      <motion.div
        {...animationConfig}
        className="space-y-6 sm:space-y-8 lg:space-y-10"
      >
        <HeroSection />
        <Section>
          <motion.div {...animationConfig}>
            <h2 className="text-xl sm:text-3xl lg:text-[28px] font-medium pb-4">
              Socials
            </h2>
          </motion.div>
          <motion.div
            {...animationConfig}
            className=" text-[16px] leading-relaxed text-muted-foreground"
          ></motion.div>
          <Contact />
        </Section>
      </motion.div>
    </MainLayout>
  );
}
