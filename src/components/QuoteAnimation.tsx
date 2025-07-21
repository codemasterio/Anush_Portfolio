import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const quotes = [
  "Believe in yourself, or no one else will."
];

export function QuoteAnimation() {
  const [show, setShow] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Show for a minimum of 1.5 seconds, but wait for content to load
    const timer = setTimeout(() => {
      if (isLoaded) {
        setShow(false);
      }
    }, 1500);

    // Preload critical assets
    const preloadAssets = async () => {
      // Add any critical assets to preload here
      await Promise.all([
        // Add any image or font preloading here
      ]);
      setIsLoaded(true);
      if (Date.now() - timer > 1500) {
        setShow(false);
      }
    };

    preloadAssets();

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: "0 0 8px rgba(255,255,255,0.5)"
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-white text-center px-4"
          >
            {quotes[0]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}