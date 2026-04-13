import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { useAuth } from '@/contexts/AuthContext';
import { getStoriesByAuthor } from '@/data/mockData';
import { StoryCard } from '@/components/StoryCard';
import { MapPin, Calendar, BookOpen, Camera, Mountain } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const userStories = getStoriesByAuthor(user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <DemoBanner />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center mb-8"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-primary/20 mb-4"
        />
        <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
        {user.nameBn && <p className="font-bangla text-muted-foreground">{user.nameBn}</p>}
        <p className="text-xs text-primary capitalize mt-1">{user.role}</p>
        <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">{user.bio}</p>

        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <Mountain className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{user.stats.trips}</p>
            <p className="text-xs text-muted-foreground">Trips</p>
          </div>
          <div className="text-center">
            <BookOpen className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{user.stats.stories}</p>
            <p className="text-xs text-muted-foreground">Stories</p>
          </div>
          <div className="text-center">
            <Camera className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{user.stats.photos}</p>
            <p className="text-xs text-muted-foreground">Photos</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" /> Member since {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </motion.div>

      {userStories.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-bold mb-4">My Stories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {userStories.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
