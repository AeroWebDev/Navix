import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-6">
      <div className="h-20 w-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center animate-bounce">
        <ShieldAlert className="h-10 w-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Error 404</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground">
          The requested page could not be located. It may have moved or the URL might be mistyped.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Homepage
          </Button>
        </Link>
        <Link to="/demo/login">
          <Button className="gap-2">
            Explore Demo System
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/custom-software">
          <Button variant="ghost" className="gap-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Custom Software Form
          </Button>
        </Link>
      </div>
    </div>
  );
};
