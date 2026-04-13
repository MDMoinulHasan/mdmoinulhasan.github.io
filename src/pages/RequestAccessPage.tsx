import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle } from 'lucide-react';

export default function RequestAccessPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">Request Submitted!</h2>
              <p className="text-sm text-muted-foreground">
                An admin will review your request and reach out soon. Thank you for your interest in Voboghure!
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="font-serif text-2xl font-bold">Request Access</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Voboghure is invite-only. Tell us why you'd like to join.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" className="bg-secondary/50 border-border" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-secondary/50 border-border" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Why do you want to join?</Label>
                  <Textarea id="reason" placeholder="Tell us about yourself..." className="bg-secondary/50 border-border min-h-[100px]" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referral">Referred by (optional)</Label>
                  <Input id="referral" placeholder="Member name" className="bg-secondary/50 border-border" />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11">
                  <Send className="mr-2 h-4 w-4" /> Submit Request
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
