"use client";

import { STAGGER_CHILD_VARIANTS } from "@dub/utils";
import va from "@vercel/analytics";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function PlaceholderContent() {
  const { domain } = useParams() as { domain: string };

  return (
    <motion.div
      className="z-10 mb-20"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
      >
        <motion.h1
          className="font-display text-4xl font-bold text-gray-800 transition-colors sm:text-5xl"
          variants={STAGGER_CHILD_VARIANTS}
        >
          ChatGPT Link Shortener
        </motion.h1>
        <motion.p
          className="max-w-xl text-gray-600 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          A free link shortener for your Custom GPTs and ChatGPT conversation
          links, powered by img.pt
        </motion.p>
        <motion.a
          variants={STAGGER_CHILD_VARIANTS}
          href="https://img.pt"
          onClick={() =>
            va.track("Referred from custom domain", {
              domain,
              medium: "button",
            })
          }
          className="rounded-full bg-gray-800 px-10 py-2 font-medium text-white transition-colors hover:bg-black"
        >
          Create Your Free Short Link
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
