import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { BrandProvider } from '@/contexts/BrandContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AppLayout } from '@/components/AppLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import RequestAccessPage from './pages/RequestAccessPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import GalleryPage from './pages/GalleryPage';
import MembersPage from './pages/MembersPage';
import TimelinePage from './pages/TimelinePage';
import MapPage from './pages/MapPage';
import UpcomingPage from './pages/UpcomingPage';
import ArchivePage from './pages/ArchivePage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const Private = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => {
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase.auth.getSession();
      console.log('🔥 Supabase connected:', { data, error });
    }

    testSupabase();

    const hash = window.location.hash || '';
    const isRecoveryLink =
      hash.includes('type=recovery') ||
      hash.includes('access_token=') ||
      hash.includes('refresh_token=');

    if (isRecoveryLink && window.location.pathname !== '/update-password') {
      window.location.replace(`/update-password${hash}`);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ThemeProvider>
          <BrandProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/update-password" element={<UpdatePasswordPage />} />
                  <Route path="/request-access" element={<RequestAccessPage />} />
                  <Route path="/about" element={<AboutPage />} />

                  {/* Private routes with layout */}
                  <Route element={<AppLayout />}>
                    <Route
                      path="/dashboard"
                      element={
                        <Private>
                          <DashboardPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/events"
                      element={
                        <Private>
                          <EventsPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/events/:id"
                      element={
                        <Private>
                          <EventDetailPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/stories"
                      element={
                        <Private>
                          <StoriesPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/stories/:id"
                      element={
                        <Private>
                          <StoryDetailPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/gallery"
                      element={
                        <Private>
                          <GalleryPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/members"
                      element={
                        <Private>
                          <MembersPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/timeline"
                      element={
                        <Private>
                          <TimelinePage />
                        </Private>
                      }
                    />
                    <Route
                      path="/map"
                      element={
                        <Private>
                          <MapPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/upcoming"
                      element={
                        <Private>
                          <UpcomingPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/archive"
                      element={
                        <Private>
                          <ArchivePage />
                        </Private>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <Private>
                          <ProfilePage />
                        </Private>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <Private>
                          <SettingsPage />
                        </Private>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <Private>
                          <AdminPage />
                        </Private>
                      }
                    />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </BrandProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;