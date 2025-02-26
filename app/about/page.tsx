"use client";

import { motion } from "framer-motion";
import { images, books } from "@/data/about";
import { Carousel } from "@/components/carousel";
import { MainLayout } from "@/components/layout/main-layout";
import { Section } from "@/components/layout/section";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="space-y-8 sm:space-y-12 lg:space-y-16">
        <Section>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-[28px] font-medium"
          >
            About Me
          </motion.h1>
          <motion.div
            className="space-y-4 sm:space-y-8 text-sm sm:text-base lg:text-[16px] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="space-y-6 sm:space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Since my childhood, I was fascinated by computers and
                technology. At 10, I was curious enough to learn PowerPoint on
                my own. As a result, I spent years of my childhood learning
                about them, fixing my computer, taking apart hard drives.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                I&apos;ve spent countless hours playing Condition Zero, Total
                Overdose, Grand Theft Auto, Need For Speed etc. I first learnt
                programming using QBasic during my school, thanks to Windows XP
                & computer viruses I learnt the habit of fixing errors, early in
                life.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Other than programming I enjoy astrophotography, a hobby I
                picked up casually exploring my phone camera&apos;s
                capabilities, I&apos;ve captured different shots of moons, stars
                & nebulas. During my college, I started writing my own blog, The
                Zero Days of Life where I write about my daily life, my
                failures, challenges etc.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                My work is a reflection of my inspirations. I have been very
                much inspired by fictional characters, music & programmers,
                people such as Iron Man (for putting his passion for technology
                above everything else), Rocky Balboa (for never giving up),
                Kevin Mitnick (for being my hacker inspiration), Linus Torvalds
                (for his beautiful contribution to open source), Karate Kid (for
                teaching me wax on, wax off!), Pink Floyd (for every one of
                their life altering hits).
              </motion.p>
            </div>
          </motion.div>
        </Section>
        {/* <Section>
          <motion.h2
            className="text-xl sm:text-2xl lg:text-[24px] font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Pictures
          </motion.h2>
          <div className="w-full max-w-[600px]">
            <Carousel images={images} />
          </div>
        </Section> */}
      </div>
    </MainLayout>
  );
}
