import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Play, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);

    setLoading(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('লগইন করা যায়নি। ইমেইল বা পাসওয়ার্ড ঠিক আছে কিনা দেখো।');
    }
  };

  const handleDemo = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">😎</span>
            <h1 className="font-serif text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to your Voboghure account
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-6">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-secondary/50 border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-secondary/50 border-border"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleDemo}
            className="w-full border-primary/30 text-primary hover:bg-primary/10 h-11"
          >
            <Play className="mr-2 h-4 w-4" /> Try Demo Access
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/request-access" className="text-primary hover:underline">
              Request Access
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}