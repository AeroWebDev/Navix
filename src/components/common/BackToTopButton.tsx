import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * BackToTopButton appears smoothly when the user scrolls down,
 * allowing instant smooth teleportation back to the top of the page.
 */
export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 animate-teleport-in group"
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
};
