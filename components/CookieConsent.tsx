"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie-consent", "true", { expires: 365 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set("cookie-consent", "false", { expires: 365 });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:w-96 z-[200] bg-white text-black p-8 shadow-2xl border border-neutral-100 rounded-2xl"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
          <h4 className="text-sm font-bold tracking-widest mb-4 uppercase">COOKIE CONSENT</h4>
          <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
            We use cookies to enhance your experience, analyze site traffic, and serve personalized content. By clicking "ACCEPT", you consent to our use of cookies.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleAccept}
              className="flex-1 py-4 bg-black text-white text-[10px] font-bold tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              ACCEPT
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 py-4 bg-white text-black text-[10px] font-bold tracking-[0.2em] border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              DECLINE
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
