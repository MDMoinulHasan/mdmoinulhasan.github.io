import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, Calendar, BookOpen, Image, Users,
  Clock, Archive, Compass, UserCircle, Settings, Shield,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/stories', icon: BookOpen, label: 'Stories' },
  { to: '/gallery', icon: Image, label: 'Gallery' },
  { to: '/timeline', icon: Clock, label: 'Timeline' },
  { to: '/map', icon: Map, label: 'Map' },
  { to: '/members', icon: Users, label: 'Members' },
  { to: '/upcoming', icon: Compass, label: 'Upcoming' },
  { to: '/archive', icon: Archive, label: 'Archive' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const bottomItems = [
  { to: '/profile', icon: UserCircle, label: 'Profile' },
];

interface AppSidebarProps {
  open: boolean;
}

export function AppSidebar({ open }: AppSidebarProps) {
  const location = useLocation();
  const { canAccessAdmin } = useAuth();

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed left-0 top-16 bottom-0 z-40 border-r border-border/50 bg-sidebar overflow-hidden flex flex-col"
        >
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-border/50 space-y-1">
            {bottomItems.map(item => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {canAccessAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/admin'
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
