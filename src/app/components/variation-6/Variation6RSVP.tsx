"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { RSVPForm } from "../RSVPForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Variation6RSVPProps {
  user: BetterAuthUser | null;
}

export function Variation6RSVP({ user }: Variation6RSVPProps) {
  const router = useRouter();

  if (!user) {
    return (
      <motion.div
        id="rsvp-section"
        className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="border-4 border-cyan-400 p-8 mb-8 inline-block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-4xl mb-4"
                initial={{ rotate: -180 }}
                whileInView={{ rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                🎮
              </motion.div>
            </motion.div>
            <motion.h3
              className="text-3xl md:text-4xl font-mono font-bold text-cyan-400 mb-6 tracking-wider"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              [ PLAYER LOGIN REQUIRED ]
            </motion.h3>
            <motion.p
              className="text-xl text-cyan-300 mb-8 max-w-2xl mx-auto font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              [ ACCESS DENIED: AUTHENTICATION NEEDED FOR QUEST ]
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={() => router.push("/login")}
                size="lg"
                className="bg-cyan-600 text-black hover:bg-cyan-500 border-2 border-cyan-400 font-mono tracking-wider"
              >
                [ INSERT COIN TO CONTINUE ]
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="rsvp-section"
      className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Game terminal header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="border-4 border-cyan-400 p-8 mb-8 inline-block"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-5xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              🎯
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-3xl md:text-4xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent mb-6 tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            [ PLAYER STATUS: {user.name.toUpperCase()} ]
          </motion.h3>

          <motion.p
            className="text-xl text-cyan-300 max-w-2xl mx-auto mb-8 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            [ READY TO ACCEPT QUEST? CONFIRM YOUR PARTICIPATION BELOW ]
          </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
            <div className="w-4 h-4 border-2 border-cyan-400 rotate-45"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400"></div>
          </motion.div>
        </motion.div>

        {/* Terminal-style form container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border-4 border-cyan-400 bg-black/80 backdrop-blur-sm shadow-2xl rounded-none overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-lg text-cyan-400 font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  [ LOADING QUEST PARAMETERS... ]
                </motion.p>
              </motion.div>

              <RSVPForm user={user} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Game terminal footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t-4 border-cyan-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center space-x-6 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-4 h-4 border-2 border-cyan-400 rotate-45"></div>
            <motion.p
              className="text-cyan-400 font-mono text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              [ QUEST COMPLETE: THANK YOU FOR JOINING OUR FINAL LEVEL ]
            </motion.p>
            <div className="w-4 h-4 border-2 border-cyan-400 rotate-45"></div>
          </motion.div>

          {/* Terminal prompt */}
          <motion.div
            className="mt-8 text-left max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-400 font-mono text-sm">
              <span className="text-magenta-400">root@wedding-terminal:</span><span className="text-cyan-400">~$ </span>
              <span className="animate-pulse">_</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
