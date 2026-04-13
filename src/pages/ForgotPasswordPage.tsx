import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { resetPassword } = useAuth(); // 👈 NEW
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await resetPassword(email);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          {submitted ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-serif text-2xl font-bold mb-2">Check Your Email</h1>
              <p className="text-sm text-muted-foreground mb-6">
                If an account exists for <span className="text-foreground font-medium">{email}</span>,
                we've sent a password reset link.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-border"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <h1 className="font-serif text-2xl font-bold">Forgot Password?</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-secondary/50 border-border"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              {error && (
                <p className="text-sm text-red-500 text-center mt-3">{error}</p>
              )}

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mt-6 mx-auto"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}