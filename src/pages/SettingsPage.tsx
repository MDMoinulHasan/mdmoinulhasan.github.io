import { motion } from 'framer-motion';
import { useTheme, ThemeName } from '@/contexts/ThemeContext';
import { DemoBanner } from '@/components/DemoBanner';
import { Moon, Sun, Sunset, Waves, TreePine, Check } from 'lucide-react';

const themes: { id: ThemeName; label: string; icon: typeof Moon; description: string; preview: string }[] = [
  { id: 'dark', label: 'Dark Cinematic', icon: Moon, description: 'Deep, moody tones with golden accents', preview: 'from-[hsl(222,25%,6%)] to-[hsl(222,20%,12%)]' },
  { id: 'light', label: 'Light', icon: Sun, description: 'Clean, warm light with amber highlights', preview: 'from-[hsl(40,20%,96%)] to-[hsl(0,0%,100%)]' },
  { id: 'sunset', label: 'Sunset Gradient', icon: Sunset, description: 'Warm oranges and deep purples', preview: 'from-[hsl(15,80%,12%)] to-[hsl(280,40%,15%)]' },
  { id: 'ocean', label: 'Ocean Blue', icon: Waves, description: 'Deep sea blues with teal accents', preview: 'from-[hsl(210,50%,8%)] to-[hsl(200,60%,15%)]' },
  { id: 'forest', label: 'Forest Green', icon: TreePine, description: 'Rich greens with earthy warmth', preview: 'from-[hsl(150,30%,8%)] to-[hsl(140,40%,12%)]' },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your experience</p>
      </motion.div>

      <div>
        <h2 className="font-serif text-xl font-bold mb-4">Theme</h2>
        <div className="grid gap-3">
          {themes.map((t, i) => {
            const active = theme === t.id;
            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setTheme(t.id)}
                className={`glass-card p-4 flex items-center gap-4 text-left transition-all duration-300 ${
                  active ? 'border-primary/50 shadow-[var(--shadow-glow)]' : 'hover:border-primary/20'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${t.preview} flex items-center justify-center shrink-0`}>
                  <t.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
                {active && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
