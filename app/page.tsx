"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import { Contact } from "@/components/contact";
import { MainLayout } from "@/components/layout/main-layout";
import { Section } from "@/components/layout/section";

export default function Home() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-10 sm:space-y-14 lg:space-y-20 px-4 sm:px-6 lg:px-8"
      >
        <HeroSection />
        <Section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Contact
          </h2>
          <Contact />
        </Section>
      </motion.div>
    </MainLayout>
  );
}
