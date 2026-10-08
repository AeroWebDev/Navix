import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Permission } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: keyof Permission;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
}) => {
  const { isAuthenticated, hasPermission, user, loginAsRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/demo/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full border-border">
          <CardContent className="p-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">Access Restricted by Role</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your current demo role (<strong className="capitalize text-foreground">{user?.role}</strong>) does not have authorization to view the <strong className="capitalize text-foreground">{requiredPermission}</strong> module.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Link to="/demo/dashboard">
                <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Button
                size="sm"
                className="gap-1.5 w-full sm:w-auto"
                onClick={() => loginAsRole('owner')}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Switch to Owner Role
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
