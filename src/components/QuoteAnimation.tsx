import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const quotes = [
  "Believe in yourself, or no one else will."
];

export function QuoteAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: [
                "0 0 4px rgba(255,255,255,0.3)",
                "0 0 8px rgba(255,255,255,0.5)",
                "0 0 4px rgba(255,255,255,0.3)"
              ]
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 1,
              textShadow: {
                duration: 2,
                repeat: Infinity
              }
            }}
            className="text-5xl font-bold text-white text-center px-4"
          >
            {quotes[0]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}