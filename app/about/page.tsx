"use client";

import { motion } from "framer-motion";
import { images, books } from "@/data/about";
import { Carousel } from "@/components/carousel";
import { MainLayout } from "@/components/layout/main-layout";
import { Section } from "@/components/layout/section";
import { Timeline } from "@/components/about/timeline";

const timelineEvents = [
  { year: "2003", description: "Born in Jodhpur, Rajasthan, India." },
  { year: "2015", description: "Started using QBasic in school." },
  {
    year: "2021",
    description: "Started Studying Engineering, MBM University Jodhpur.",
  },
  {
    year: "2022",
    description:
      "Used Linux Kernel for the first time, instantly became a cult follower.",
  },
  {
    year: "2023",
    description:
      "Interned at NIT Trichy, Studied Cybersecurity, Reinforcement Learning and dove into AI.",
  },
  {
    year: "2024",
    description:
      "Refactored my life after a setback from last year, Joined a startup and started working on different projects. Moved to Jaipur, India.",
  },
  {
    year: "2024",
    description:
      "Left the startup, Joined a US Based   Company as a Software Engineer.",
  },
  {
    year: "2024",
    description: "Left the company to work on my own saas idea, Meetster.",
  },
  {
    year: "2025",
    description:
      "Also started building Astroyapper.com, but left it after some time due to difference of opinion with the co-founder.",
  },
  {
    year: "2025",
    description:
      "Joined a Startup as a Software Engineer. Moved to Banglore, India",
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="space-y-8 sm:space-y-12 lg:space-y-16">
        <Section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-3xl lg:text-[28px] font-medium"
          >
            About Me in 10 mins
          </motion.h2>
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

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                I don't like using properitary softwares, I like to use free and
                open source softwares. I like to work with open source
                softwares, and stay avoid getting into the walled garden of
                ecosystems.
              </motion.p>
            </div>
          </motion.div>
        </Section>
        <Section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-3xl lg:text-[28px] font-medium"
          >
            I like living alone.
          </motion.h2>

          <p>
            I do have like socialising and meeting new people constantly, but
            sometimes I just live alone, process my thoughts, work on the things
            I want to do, rather than just follow where the group goes, I do
            hate larger groups where the decision making is made by the alpha of
            the group. I like working with small sets of people, and enjoy the
            prosepct of knowing everyone closely. The rules change when I
            travel, I try to strike up conversations with new people, make
            friends and go along.
          </p>
        </Section>
        <Section>
          <h2 className="text-xl sm:text-3xl lg:text-[24px] font-medium">
            Science and Technology.
          </h2>
          <p>
            As vague it may sound to you, but there's a very specific reason why
            I'm putting it here, As a child growing up in 2000s, Science and
            Technology were noble pursuits and something that provided a deep
            meaning to life, the ability to understand the universe and see the
            universe in it's true form has always been fascinating. Technology
            provided a way for me to mask my idendity and be cool, the
            understanding of complex systems, devices, protocols etc. has made
            me intersted to try out different technologies and make something
            useful out of it.{" "}
          </p>
        </Section>
        <Section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-xl sm:text-3xl lg:text-[24px] font-medium"
          >
            Timeline for context.
          </motion.h2>
          <Timeline events={timelineEvents} />
        </Section>
        <Section>
          <h2 className="text-xl sm:text-3xl lg:text-[24px] font-medium">
            I don't like stability.
          </h2>
          <p>
            I don't like limiting myself to specific outcomes and possibilities
            and settle early in life. I've always wanted to work on different
            technologies, learning something new every day, changing cities,
            learning about cultures, people, living life to its meaning which is
            change. It's better to mold life, see its true meaning, and live up
            to it, than accept what's given by default. I believe god intended
            humans, to break boundaries, to explore.
          </p>
        </Section>
        <Section>
          <h2 className="text-xl sm:text-3xl lg:text-[24px] font-medium">
            Questions? Thoughts?
          </h2>
          <p>No comments here. That would be too weird. Just email me.</p>
        </Section>
      </div>
    </MainLayout>
  );
}
