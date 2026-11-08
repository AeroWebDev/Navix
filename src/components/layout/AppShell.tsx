import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
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
