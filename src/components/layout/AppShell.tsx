import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { useDemoData } from '@/context/DemoDataContext';

interface AppShellProps {
  onResetDemoData?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ onResetDemoData }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resetAllData } = useDemoData();

  const handleReset = onResetDemoData || resetAllData;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Ephemeral Preview Top Banner (Strict preview requirement: No data saved) */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>
              <strong className="font-semibold">Interactive Preview Mode:</strong> All mutations exist purely in temporary browser memory. Zero persistent data is saved.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Baseline
            </button>
            <span>•</span>
            <Link to="/custom-software" className="hover:underline font-bold flex items-center gap-1 text-primary">
              Request Customized Build <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Top Header Bar */}
        <TopBar
          onOpenMobileSidebar={() => setMobileOpen(true)}
          onResetDemoData={handleReset}
        />

        {/* Scrollable Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
