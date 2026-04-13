import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export function DemoBanner() {
  const { isDemo } = useAuth();
  if (!isDemo) return null;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2.5 flex items-center gap-3 mb-6"
    >
      <Info className="h-4 w-4 text-primary shrink-0" />
      <p className="text-sm text-primary">
        <strong>Demo Mode</strong> — This is a demo version. Content is sample data. You have read-only access.
      </p>
    </motion.div>
  );
}
