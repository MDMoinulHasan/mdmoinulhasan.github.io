import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isPublicRoute = ['/', '/login', '/request-access', '/about'].includes(location.pathname);
  const showSidebar = isAuthenticated && !isPublicRoute;

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex">
        {showSidebar && <AppSidebar open={sidebarOpen} />}

        <motion.main
          className="flex-1 min-h-[calc(100vh-4rem)]"
          style={{
            marginLeft: showSidebar && sidebarOpen ? 240 : 0,
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
