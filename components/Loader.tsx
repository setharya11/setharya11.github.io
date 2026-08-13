"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // Let animation play for 1.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <div className="loader">
        <div className="square" id="sq1"></div>
        <div className="square" id="sq2"></div>
        <div className="square" id="sq3"></div>
        <div className="square" id="sq4"></div>
        <div className="square" id="sq5"></div>
        <div className="square" id="sq6"></div>
        <div className="square" id="sq7"></div>
        <div className="square" id="sq8"></div>
        <div className="square" id="sq9"></div>
      </div>
    </motion.div>
  );
}
