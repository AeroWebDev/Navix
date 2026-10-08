import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export const DemoLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedEmail, setSelectedEmail] = useState(DEMO_ACCOUNTS[0].user.email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].passwordHint);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectAccount = (email: string, hint: string) => {
    setSelectedEmail(email);
    setPassword(hint);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = login(selectedEmail, password);
    if (result.success) {
      navigate('/demo/dashboard');
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Brand header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">Apex Ledger</span>
        </Link>

        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Role-Based Demo Access Portal
          </h1>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
            Experience realistic ERP permissions. Select a staff role below or enter demo credentials to begin.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium text-amber-700 dark:text-amber-400">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>Interactive Preview: All changes stay in memory and are never saved</span>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl space-y-8">
        {/* Step 1: Quick-Pick Role Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Demo Staff Account (1-Click Fill)
            </label>
            <span className="text-xs text-primary font-medium">Click any card to auto-fill</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DEMO_ACCOUNTS.map((account) => {
              const isSelected = selectedEmail.toLowerCase() === account.user.email.toLowerCase();
              return (
                <div
                  key={account.user.id}
                  onClick={() => handleSelectAccount(account.user.email, account.passwordHint)}
                  className={cn(
                    'p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3',
                    isSelected
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm'
                      : 'border-border bg-card hover:border-primary/40'
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          account.user.role === 'owner'
                            ? 'default'
                            : account.user.role === 'manager'
                            ? 'secondary'
                            : account.user.role === 'accountant'
                            ? 'warning'
                            : 'outline'
                        }
                        className="text-[10px]"
                      >
                        {account.roleLabel}
                      </Badge>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm font-bold text-foreground mt-2">{account.user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{account.user.email}</p>
                  </div>

                  <div className="pt-2 border-t border-border/70 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                      <KeyRound className="h-3 w-3 text-primary" />
                      <span>Pass: <strong className="text-foreground">{account.passwordHint}</strong></span>
                    </div>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {account.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Login Form */}
        <Card className="max-w-md mx-auto shadow-xl border-border">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <UserCheck className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">Sign In to Continue</h3>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Staff Email</label>
                <Input
                  type="email"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  placeholder="name@apexledger.demo"
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Password</label>
                  <span className="text-[11px] text-muted-foreground">
                    Required for security check
                  </span>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  icon={<Lock className="h-4 w-4" />}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2 justify-center py-5">
                Sign In to Demo System
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                ← Return to Apex Ledger Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
