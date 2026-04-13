import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { StoryCard } from '@/components/StoryCard';
import { stories } from '@/data/mockData';

export default function StoriesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Stories</h1>
        <p className="text-muted-foreground mt-1">Personal narratives from every journey</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}
      </div>
    </div>
  );
}
