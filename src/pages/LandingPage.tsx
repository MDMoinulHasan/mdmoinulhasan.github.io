import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useBrand } from '@/contexts/BrandContext';
import { Button } from '@/components/ui/button';
import { events, stories, members } from '@/data/mockData';
import { ArrowRight, Mountain, BookOpen, Shield, Sparkles, Play } from 'lucide-react';
import { useMemo } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();
  const { brand } = useBrand();

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  // Dynamic stats
  const activeMembers = members.filter(m => m.role !== 'demo');
  const oldestEvent = events.length > 0 ? events[events.length - 1] : null;
  const yearsActive = oldestEvent
    ? new Date().getFullYear() - new Date(oldestEvent.date).getFullYear()
    : 0;

  // Past adventures: oldest 3 events
  const pastAdventures = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  }, []);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Mountains"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-mesh" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">{brand.tagline}</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-4">
              <span className="glow-text">{brand.communityNameBn}</span>
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-foreground/80 mb-2">
              {brand.communityName}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Where every event becomes a story, every story becomes a memory, and every memory stays alive forever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base font-semibold"
              >
                Member Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDemoAccess}
                className="border-primary/30 text-primary hover:bg-primary/10 px-8 h-12 text-base"
              >
                <Play className="mr-2 h-4 w-4" /> Try Demo
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Demo credentials: <code className="text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded">demo / demo123</code>
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              More Than Just Trips
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {brand.communityName} is a private digital archive where a close-knit friend group preserves 
              their travel memories, stories, and adventures together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Mountain, title: 'Memory Vault', desc: 'Every trip is documented with stories, photos, and details that bring the memories back to life.' },
              { icon: BookOpen, title: 'Storytelling', desc: 'Members write personal narratives of each journey — raw, emotional, and beautifully preserved.' },
              { icon: Shield, title: 'Private & Exclusive', desc: 'Invite-only access ensures this remains a safe, intimate space for the community.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card p-6 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-y border-border/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: events.length, label: 'Adventures' },
            { value: stories.length, label: 'Stories' },
            { value: activeMembers.length, label: 'Members' },
            { value: `${yearsActive}+`, label: 'Years' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <div className="text-3xl md:text-4xl font-bold glow-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Adventures */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Past Adventures</h2>
            <p className="text-muted-foreground">A glimpse into the journeys that define us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastAdventures.map((event, i) => (
              <motion.div
                key={event.id}
                className="glass-card-hover overflow-hidden group cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                variants={fadeUp}
                onClick={handleDemoAccess}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Access Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-3">Explore the Platform</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Want to see what {brand.communityName} looks like from the inside? 
                Try our demo mode with pre-loaded sample data. No sign-up required.
              </p>
              <div className="glass-card inline-block px-6 py-3 mb-6">
                <p className="text-sm text-muted-foreground">Demo Credentials</p>
                <p className="text-lg font-mono font-bold text-primary mt-1">
                  demo / demo123
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={handleDemoAccess}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                >
                  <Play className="mr-2 h-4 w-4" /> Launch Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/request-access')}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  Request Membership
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Demo access is read-only. No data can be modified.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{brand.logo}</span>
            <span className="font-serif font-bold">{brand.communityName}</span>
            <span className="text-muted-foreground text-sm">— {brand.communityNameBn}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {brand.communityName}. {brand.tagline}.
          </p>
        </div>
      </footer>
    </div>
  );
}
