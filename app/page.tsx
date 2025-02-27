"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import { Contact } from "@/components/contact";
import { MainLayout } from "@/components/layout/main-layout";
import { Section } from "@/components/layout/section";

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeInOut" },
  viewport: { once: true, amount: 0.2 },
};

export default function Home() {
  return (
    <MainLayout>
      <motion.div
        {...animationConfig}
        className="space-y-4 sm:space-y-6 lg:space-y-8"
      >
        <HeroSection />
        <Section>
          <motion.div {...animationConfig}>
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-medium">
              Contact
            </h2>
          </motion.div>
          <motion.div
            {...animationConfig}
            className="mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base lg:text-[16px] leading-relaxed text-muted-foreground"
          >
            <p>
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
