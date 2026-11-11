import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * TeleportOverlay renders a futuristic quantum teleportation pulse across the screen
 * whenever navigation occurs between routes.
 */
export const TeleportOverlay: React.FC = () => {
  const { pathname } = useLocation();
  const [teleporting, setTeleporting] = useState(false);

  useEffect(() => {
    setTeleporting(true);
    const timer = setTimeout(() => {
      setTeleporting(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!teleporting) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* High-speed teleport laser streak across the top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-teal-300 shadow-[0_0_15px_rgba(52,211,153,0.9)] animate-[teleportBeam_0.45s_ease-out]" />

      {/* Futuristic expanding quantum portal burst */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 sm:w-80 sm:h-80 rounded-full border border-emerald-400/40 bg-radial-gradient from-emerald-500/15 via-teal-500/5 to-transparent blur-md animate-[teleportPortalPulse_0.45s_ease-out]" />
      </div>

      {/* Screen edge energy flashes */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-emerald-500/10 to-transparent transition-opacity duration-300" />
    </div>
  );
};
