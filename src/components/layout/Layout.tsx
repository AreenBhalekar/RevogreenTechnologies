import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            <span>Revogreen Technologies</span>
          </Link>
          
          <nav className="flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? "secondary" : "ghost"}
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/device/1">
              <Button 
                variant={location.pathname === '/device/1' ? "secondary" : "ghost"}
                size="sm"
              >
                Device 1
              </Button>
            </Link>
            <Link to="/device/2">
              <Button 
                variant={location.pathname === '/device/2' ? "secondary" : "ghost"} 
                size="sm"
              >
                Device 2
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-3 px-6">
        <div className="container mx-auto text-center text-sm">
          <p>Revogreen Technologies &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
