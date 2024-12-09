"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="container max-w-[1000px] mx-auto px-8 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <HeroSection />
        <h2 className="text-2xl sm:text-2xl lg:text-2xl font-medium ">
          Contact
        </h2>
        <Contact />
      </motion.div>
    </div>
  );
}
