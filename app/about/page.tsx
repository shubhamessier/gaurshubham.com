"use client";

import { motion } from "framer-motion";
import { images, books } from "@/data/about";
import { Carousel } from "@/components/carousel";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function AboutPage() {
  return (
    <Container>
      <div className="mt-4 py-8 sm:py-12 lg:py-16 space-y-3 sm:space-y-12 lg:space-y-16">
        <Section>
          <motion.h1
            className="text-2xl sm:text-2xl lg:text-[28px] font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h1>

          <motion.div
            className="space-y-4 sm:space-y-8 text-sm sm:xs lg:text-[16px] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
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

        <Section>
          <motion.h2
            className="text-2xl sm:text-xs mt-6 lg:text-[28px] font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            Reading List
          </motion.h2>

          <motion.div
            className="space-y-1 sm:space-y-1 text-sm sm:text-xs lg:text-[16px] text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            viewport={{ once: true }}
          >
            {books.map((book, index) => (
              <motion.p
                key={book}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                viewport={{ once: true }}
              >
                {book}
              </motion.p>
            ))}
          </motion.div>
        </Section>

        <Section>
          <motion.h2
            className="text-2xl sm:text-xs mt-6 lg:text-[28px] font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            Pictures
          </motion.h2>

          <div className="w-full max-w-[600px] ">
            <Carousel images={images} />
          </div>
        </Section>
      </div>
    </Container>
  );
}
