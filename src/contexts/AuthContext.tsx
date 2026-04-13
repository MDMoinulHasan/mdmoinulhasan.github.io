import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { User, UserRole } from '@/types';
import { members } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { signOutUser } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isDemo: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: () => void;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  canEdit: (authorId?: string) => boolean;
  canDelete: (authorId?: string) => boolean;
  canUpload: boolean;
  canAccessAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapProfileToUser(profile: any): User {
  return {
    id: profile.id,
    name: profile.name || profile.email || 'Member',
    nickname: profile.nickname || profile.email?.split('@')[0] || 'member',
    avatar:
      profile.avatar ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    bio: '',
    socials: {},
    role: (profile.role || 'member') as UserRole,
    joinedDate: profile.created_at || new Date().toISOString(),
    tripsJoined: 0,
    storiesPosted: 0,
    favoriteDestination: '',
    favoriteTrip: '',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const loadUserProfile = useCallback(async (authUserId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUserId)
      .single();

    if (error || !data) {
      console.error('Profile load error:', error);
      setUser(null);
      return;
    }

    setUser(mapProfileToUser(data));
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (session?.user) {
        await loadUserProfile(session.user.id);
      }

      if (mounted) {
        setAuthReady(true);
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }

      if (mounted) {
        setAuthReady(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return !error;
  }, []);

  const loginAsDemo = useCallback(() => {
    setUser(members.find((m) => m.id === 'demo')!);
  }, []);

  const logout = useCallback(async () => {
    if (user?.role === 'demo') {
      setUser(null);
      return;
    }

    await signOutUser();
    setUser(null);
  }, [user]);

  // ✅ Forgot password
  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: 'Something went wrong' };
    }
  }, []);

  const isDemo = user?.role === 'demo';
  const role = user?.role ?? null;

  const canEdit = useCallback(
    (authorId?: string) => {
      if (!user || isDemo) return false;
      if (user.role === 'admin') return true;
      return authorId === user.id;
    },
    [user, isDemo]
  );

  const canDelete = useCallback(
    (authorId?: string) => {
      if (!user || isDemo) return false;
      if (user.role === 'admin') return true;
      return authorId === user.id;
    },
    [user, isDemo]
  );

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isDemo,
        role,
        login,
        loginAsDemo,
        logout,
        resetPassword,
        canEdit,
        canDelete,
        canUpload: !!user && !isDemo,
        canAccessAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}