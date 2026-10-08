import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

interface DemoModulePlaceholderProps {
  title: string;
  moduleKey: string;
  description: string;
  features: string[];
}

export const DemoModulePlaceholder: React.FC<DemoModulePlaceholderProps> = ({
  title,
  moduleKey,
  description,
  features,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            <Badge variant="default" className="text-xs uppercase">
              {moduleKey}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>

        <Link to="/custom-software">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Customize {title}
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{title} Module Engine</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            This module is wired with role-based access control and in-memory transactional processing.
          </p>

          <div className="pt-2 max-w-md mx-auto text-left border-t border-border space-y-1.5">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Included capabilities:
            </p>
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
