import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChevronDown, Globe } from 'lucide-react';

interface LocationStat {
  country: string;
  count: number;
  flag: string;
}

export const CustomerGrowthCard: React.FC = () => {
  const locations: LocationStat[] = [
    { country: 'Egypt (HQ)', count: 2417, flag: '🇪🇬' },
    { country: 'Saudi Arabia', count: 2281, flag: '🇸🇦' },
    { country: 'UAE & Gulf', count: 812, flag: '🇦🇪' },
    { country: 'International', count: 287, flag: '🌐' },
  ];

  return (
    <Card className="rounded-3xl border-border/60 shadow-soft-island bg-card flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start justify-between pb-2 border-b border-border/40">
        <div>
          <CardTitle className="text-base font-bold text-foreground">
            Customer Growth
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Track customer by locations</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
          Today
          <ChevronDown className="h-3 w-3" />
        </button>
      </CardHeader>

      <CardContent className="pt-4 space-y-5">
        {/* Floating Bubble Distribution Inspired by Reference Asset */}
        <div className="flex items-center justify-center py-2">
          <div className="relative w-48 h-32 flex items-center justify-center">
            {/* Primary Main Bubble */}
            <div className="absolute top-1 left-6 w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex flex-col items-center justify-center shadow-md shadow-emerald-500/20 z-20">
              <span className="text-sm font-extrabold">2.417</span>
              <span className="text-[9px] text-white/80">Egypt</span>
            </div>

            {/* Secondary Blue Bubble */}
            <div className="absolute bottom-1 left-2 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 text-white flex flex-col items-center justify-center shadow-md shadow-blue-500/20 z-10">
              <span className="text-xs font-extrabold">2.281</span>
              <span className="text-[8px] text-white/80">KSA</span>
            </div>

            {/* Tertiary Purple Bubble */}
            <div className="absolute bottom-2 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex flex-col items-center justify-center shadow-md shadow-purple-500/20 z-15">
              <span className="text-xs font-extrabold">812</span>
              <span className="text-[8px] text-white/80">UAE</span>
            </div>

            {/* Quaternary Soft Bubble */}
            <div className="absolute top-0 right-10 w-11 h-11 rounded-full bg-muted text-foreground flex flex-col items-center justify-center border border-border/80 shadow-xs z-5">
              <span className="text-[10px] font-bold">287</span>
              <Globe className="h-2.5 w-2.5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Location Breakdown List */}
        <div className="space-y-2.5 pt-2 border-t border-border/50 text-xs">
          {locations.map((loc, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{loc.flag}</span>
                <span className="font-semibold text-foreground">{loc.country}</span>
              </div>
              <span className="font-bold text-foreground font-mono">
                {loc.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
