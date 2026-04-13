import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBrand } from '@/contexts/BrandContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Bell, LogOut, User, ChevronDown, Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notifications } from '@/data/mockData';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export function Navbar({ onToggleSidebar, sidebarOpen }: NavbarProps) {
  const { user, isAuthenticated, isDemo, logout } = useAuth();
  const { brand } = useBrand();
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const isPublicRoute = ['/', '/login', '/request-access', '/about'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Sidebar toggle for private routes */}
        {isAuthenticated && !isPublicRoute && (
          <button onClick={onToggleSidebar} className="mr-3 p-2 rounded-lg hover:bg-secondary transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {/* Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 mr-6">
          <span className="text-2xl leading-none">{brand.logo}</span>
          <span className="font-serif text-xl font-bold tracking-tight hidden sm:block">
            {brand.communityName}— {brand.communityNameBn}
          </span>
        </Link>

        {/* Public nav links */}
        {!isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex-1" />

        {/* Demo banner */}
        {isDemo && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mr-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Demo Mode</span>
          </div>
        )}

        {/* Theme toggle */}
        <ThemeToggle />

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card border-border">
                <div className="px-3 py-2 border-b border-border">
                  <p className="font-semibold text-sm">Notifications</p>
                </div>
                {notifications.slice(0, 5).map(n => (
                  <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <span className="text-sm font-medium">{n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.message}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" />
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate('/'); }} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-muted-foreground hover:text-foreground">
              <Shield className="mr-1.5 h-3.5 w-3.5" /> Admin Login
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
