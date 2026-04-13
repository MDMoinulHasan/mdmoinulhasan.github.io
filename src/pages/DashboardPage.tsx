import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { DemoBanner } from '@/components/DemoBanner';
import { DashboardSection } from '@/components/DashboardSection';
import { EventCard } from '@/components/EventCard';
import { StoryCard } from '@/components/StoryCard';
import { events, stories, upcomingTours, members, galleryImages } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Compass, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const recentEvents = events.slice(0, 3);
  const recentStories = stories.slice(0, 4);
  const nextTour = upcomingTours.find(t => t.status === 'confirmed');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <DemoBanner />

      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl font-bold">
          Welcome back, <span className="glow-text">{user?.nickname}</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening in Voboghure</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: events.length, icon: Calendar, color: 'from-primary/20 to-primary/5' },
          { label: 'Stories Written', value: stories.length, icon: TrendingUp, color: 'from-accent/20 to-accent/5' },
          { label: 'Active Members', value: members.filter(m => m.role !== 'demo').length, icon: Compass, color: 'from-primary/20 to-accent/5' },
          { label: 'Photos Shared', value: galleryImages.length, icon: Calendar, color: 'from-accent/20 to-primary/5' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-4 bg-gradient-to-br ${stat.color}`}
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Tour Banner */}
      {nextTour && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/upcoming" className="block">
            <div className="glass-card-hover overflow-hidden relative">
              <div className="absolute inset-0">
                <img src={nextTour.coverImage} alt={nextTour.title} className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              </div>
              <div className="relative p-6 flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
                    <Compass className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-primary">Next Adventure</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold">{nextTour.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{nextTour.destination} • {nextTour.plannedDate}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Recent Events */}
      <DashboardSection
        title="Recent Adventures"
        subtitle="Our latest trips and explorations"
        action={
          <Link to="/events">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        }
      >
        <div className="grid md:grid-cols-3 gap-4">
          {recentEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </DashboardSection>

      {/* Recent Stories */}
      <DashboardSection
        title="Latest Stories"
        subtitle="Fresh narratives from our members"
        action={
          <Link to="/stories">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentStories.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </DashboardSection>

      {/* Gallery Preview */}
      <DashboardSection
        title="Recent Photos"
        action={
          <Link to="/gallery">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
              View Gallery <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        }
      >
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {galleryImages.slice(0, 6).map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square rounded-lg overflow-hidden"
            >
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
