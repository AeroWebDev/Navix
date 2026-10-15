import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Boxes,
  Warehouse,
  Users,
  Building2,
  CreditCard,
  FileText,
  BadgeDollarSign,
  UserCog,
  BarChart4,
  Scale,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Permission } from '@/types/auth';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  permissionKey: keyof Permission;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const { user, hasPermission } = useAuth();

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/demo/dashboard',
      icon: <LayoutDashboard className="h-4 w-4 shrink-0" />,
      permissionKey: 'dashboard',
    },
    {
      name: 'Sales & POS',
      path: '/demo/sales',
      icon: <ShoppingCart className="h-4 w-4 shrink-0" />,
      permissionKey: 'sales',
    },
    {
      name: 'Purchases',
      path: '/demo/purchases',
      icon: <ShoppingBag className="h-4 w-4 shrink-0" />,
      permissionKey: 'purchases',
    },
    {
      name: 'Products',
      path: '/demo/products',
      icon: <Boxes className="h-4 w-4 shrink-0" />,
      permissionKey: 'products',
    },
    {
      name: 'Inventory',
      path: '/demo/inventory',
      icon: <Warehouse className="h-4 w-4 shrink-0" />,
      permissionKey: 'inventory',
    },
    {
      name: 'Customers',
      path: '/demo/customers',
      icon: <Users className="h-4 w-4 shrink-0" />,
      permissionKey: 'customers',
    },
    {
      name: 'Suppliers',
      path: '/demo/suppliers',
      icon: <Building2 className="h-4 w-4 shrink-0" />,
      permissionKey: 'suppliers',
    },
    {
      name: 'Expenses',
      path: '/demo/expenses',
      icon: <CreditCard className="h-4 w-4 shrink-0" />,
      permissionKey: 'expenses',
    },
    {
      name: 'Invoices',
      path: '/demo/invoices',
      icon: <FileText className="h-4 w-4 shrink-0" />,
      permissionKey: 'invoices',
    },
    {
      name: 'Payments',
      path: '/demo/payments',
      icon: <BadgeDollarSign className="h-4 w-4 shrink-0" />,
      permissionKey: 'payments',
    },
    {
      name: 'Employees',
      path: '/demo/employees',
      icon: <UserCog className="h-4 w-4 shrink-0" />,
      permissionKey: 'employees',
    },
    {
      name: 'Reports',
      path: '/demo/reports',
      icon: <BarChart4 className="h-4 w-4 shrink-0" />,
      permissionKey: 'reports',
    },
    {
      name: 'Accounting',
      path: '/demo/accounting',
      icon: <Scale className="h-4 w-4 shrink-0" />,
      permissionKey: 'accounting',
    },
    {
      name: 'Settings',
      path: '/demo/settings',
      icon: <Settings className="h-4 w-4 shrink-0" />,
      permissionKey: 'settings',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container - Curved Floating Island */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-card transition-all duration-300 select-none lg:static lg:my-3 lg:ml-3 lg:rounded-[28px] lg:border lg:border-border/60 lg:shadow-soft-island overflow-hidden',
          isCollapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
          <Link
            to="/demo/dashboard"
            onClick={onCloseMobile}
            className={cn('flex items-center gap-2.5 overflow-hidden group', isCollapsed && 'justify-center')}
          >
            <div className="h-10 w-10 rounded-2xl bg-accent flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-foreground truncate">
                  NAVIX
                </span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Live Preview
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1.5 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isAllowed = hasPermission(item.permissionKey);

            if (!isAllowed) {
              return isCollapsed ? null : (
                <div
                  key={item.path}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-xs text-muted-foreground/40 cursor-not-allowed select-none"
                  title="Restricted by your active role"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <Lock className="h-3 w-3" />
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all group cursor-pointer',
                    isActive
                      ? 'bg-accent text-white font-semibold shadow-xs'
                      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
                    isCollapsed && 'justify-center px-0 rounded-2xl mx-1'
                  )
                }
                title={item.name}
              >
                {item.icon}
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User & Role Indicator */}
        <div className="p-3 border-t border-border/60 bg-muted/20">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="h-9 w-9 rounded-full bg-accent/15 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-foreground truncate">{user?.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{user?.role} Role</p>
                </div>
              </div>
              <Badge
                variant={user?.role === 'owner' ? 'default' : user?.role === 'cashier' ? 'outline' : 'secondary'}
                className="text-[9px] uppercase px-2 py-0.5 rounded-full"
              >
                {user?.role}
              </Badge>
            </div>
          ) : (
            <div className="flex justify-center" title={`${user?.name} (${user?.role})`}>
              <div className="h-9 w-9 rounded-full bg-accent/15 text-accent font-bold text-xs flex items-center justify-center">
                {user?.name.charAt(0) || 'U'}
              </div>
            </div>
          )}

          {!isCollapsed && (
            <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <Sparkles className="h-3 w-3" /> In-Memory
              </span>
              <Link to="/demo/login" className="hover:text-primary font-semibold transition-colors">
                Switch Role
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
