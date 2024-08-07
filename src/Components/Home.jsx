import React from "react";
import btcSrc from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-black h-screen w-full flex flex-col items-center justify-center">
      <motion.div
        className="w-full flex justify-center"
        style={{
          height: "60vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          className="h-full w-auto max-w-full object-contain filter grayscale"
          src={btcSrc}
          alt="Bitcoin"
        />
      </motion.div>

      <p className="text-4xl md:text-6xl text-center font-thin text-white opacity-70 mt-[-5rem]">
        Xcrypto
      </p>
    </div>
  );
};

export default Home;
