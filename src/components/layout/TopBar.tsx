import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  RotateCcw,
  LogOut,
  ChevronDown,
  UserCheck,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface TopBarProps {
  onOpenMobileSidebar: () => void;
  onResetDemoData?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileSidebar,
  onResetDemoData,
}) => {
  const { user, role, loginAsRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resetToast, setResetToast] = useState(false);

  // Derive page title from pathname
  const getPageTitle = () => {
    const segments = location.pathname.split('/');
    const last = segments[segments.length - 1];
    if (!last || last === 'demo' || last === 'dashboard') return 'Dashboard';
    return last.charAt(0).toUpperCase() + last.slice(1).replace('-', ' ');
  };

  const handleReset = () => {
    if (onResetDemoData) {
      onResetDemoData();
    }
    setResetToast(true);
    setTimeout(() => setResetToast(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/demo/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      {/* Left: Mobile hamburger & Dynamic page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation sidebar"
          className="p-2 rounded-full text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-extrabold text-foreground capitalize tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Center: Curved Quick Navigation Capsule (inspired by reference design) */}
      <div className="hidden xl:flex items-center gap-1 bg-card/90 border border-border/70 rounded-full p-1 shadow-soft-island text-xs font-semibold">
        {[
          { label: 'Dashboard', path: '/demo/dashboard' },
          { label: 'Sales POS', path: '/demo/sales' },
          { label: 'Invoices', path: '/demo/invoices' },
          { label: 'Inventory', path: '/demo/inventory' },
          { label: 'Reports', path: '/demo/reports' },
          { label: 'Accounting', path: '/demo/accounting' },
        ].map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                'px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs',
                active
                  ? 'bg-accent text-white shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Center-Right: Global Search Bar with Curved Pill */}
      <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records (Ctrl+K)..."
            className="w-full h-9 pl-9 pr-4 rounded-full border border-input bg-card text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:bg-background transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications, Role-Switcher & Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Demo State Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="h-8 px-3 text-xs gap-1.5 text-muted-foreground hover:text-foreground border-border/80 rounded-full"
          title="Reset all demo data back to clean baseline state"
        >
          <RotateCcw className="h-3 w-3" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        {/* Reset feedback toast indicator */}
        {resetToast && (
          <div className="fixed top-20 right-6 z-50 p-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Data reset to baseline!</span>
          </div>
        )}

        {/* Notifications Mock Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View notifications"
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted relative cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card p-4 shadow-xl z-50 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h4 className="text-xs font-bold text-foreground">Notifications</h4>
                <Badge variant="default" className="text-[10px]">
                  3 New
                </Badge>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="font-semibold text-foreground">Low Stock Alert</p>
                  <p className="text-[11px] text-muted-foreground">
                    Wireless Barcode Scanner is below reorder point (4 left).
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted/40">
                  <p className="font-semibold text-foreground">Payment Received</p>
                  <p className="text-[11px] text-muted-foreground">
                    $4,200.00 received for Invoice INV-2026-0891.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role & User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            aria-label="User profile menu"
          >
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-foreground leading-tight">{user?.name}</span>
              <span className="text-[10px] text-muted-foreground capitalize">{role}</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
          </button>

          {/* User & Role Switcher Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-2xl z-50 space-y-2 animate-in fade-in duration-150">
              <div className="p-2 border-b border-border">
                <p className="text-xs font-bold text-foreground">{user?.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Badge variant="default" className="text-[9px] uppercase">
                    Active Role: {role}
                  </Badge>
                </div>
              </div>

              {/* Quick Role Switcher section */}
              <div className="p-1 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
                  Switch Active Role:
                </p>
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.user.id}
                    onClick={() => {
                      loginAsRole(acc.user.role);
                      setUserDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer',
                      role === acc.user.role
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <span>{acc.roleLabel}</span>
                    {role === acc.user.role && <UserCheck className="h-3.5 w-3.5 text-primary" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-border pt-1">
                <Link
                  to="/"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Exit Demo to Main Website</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out / Return to Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
