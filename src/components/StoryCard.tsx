import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MessageCircle } from 'lucide-react';
import { Story } from '@/types';
import { getMemberById, getEventById } from '@/data/mockData';

interface StoryCardProps {
  story: Story;
  index?: number;
}

export function StoryCard({ story, index = 0 }: StoryCardProps) {
  const author = getMemberById(story.authorId);
  const event = getEventById(story.eventId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/stories/${story.id}`} className="block group">
        <div className="glass-card-hover overflow-hidden">
          <div className="relative h-40 overflow-hidden">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-serif text-base font-bold leading-tight group-hover:text-primary transition-colors">
                {story.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{story.excerpt}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {author && (
                  <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full object-cover" />
                )}
                <span className="text-xs text-muted-foreground">{author?.nickname}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> {story.commentsCount}
                </span>
                <span>{story.reactions.reduce((s, r) => s + r.count, 0)} ❤️</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
