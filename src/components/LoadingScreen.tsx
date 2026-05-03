import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 600);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);


  return (
    <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-slate-950 overflow-hidden"
        exit={{ opacity: 0 }}
        >
        {/* BACKGROUND GLOW */}
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />

        {/* WELCOME TEXT */}
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-900 dark:text-white mb-2 z-10"
        >
            Welcome to Warsa Portfolio
        </motion.h1>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-500 dark:text-slate-400 mb-6 z-10"
        >
            Please wait while magic is loading...
        </motion.p>

        {/* CHARACTER */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="z-10"
                >
                <img
                    src="/character.gif"
                    alt="character"
                    className="w-24 h-24 object-contain"
                />
            </motion.div>

        {/* LOADING BAR */}
        <div className="w-72 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden z-10">
            <div
            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all"
            style={{ width: `${progress}%` }}
            />
        </div>

        {/* PERCENT */}
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 z-10">
            {progress}%
        </p>

        {/* FUN STATUS TEXT */}
        <AnimatePresence mode="wait">
            <motion.p
            key={progress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-xs text-slate-400 z-10"
            >
            {progress < 30 && "Booting portfolio system..."}
            {progress >= 30 && progress < 70 && "Loading creativity modules..."}
            {progress >= 70 && progress < 100 && "Almost ready bro... 🚀"}
            {progress === 100 && "Ready!"}
            </motion.p>
        </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;