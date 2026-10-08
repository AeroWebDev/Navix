import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <header className="border-b p-4 bg-card">
          <h1 className="text-xl font-bold text-primary">Apex Ledger Solutions</h1>
        </header>
        <main className="flex-1 p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl font-extrabold">Commercial Accounting Platform</h2>
                  <p className="text-muted-foreground">
                    Production-ready accounting and business management system showcase.
                  </p>
                </div>
              }
            />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
