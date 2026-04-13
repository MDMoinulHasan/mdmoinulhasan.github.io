import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { stories, getMemberById, getEventById, getCommentsByStory } from '@/data/mockData';
import { ArrowLeft, Calendar, MessageCircle } from 'lucide-react';

export default function StoryDetailPage() {
  const { id } = useParams();
  const story = stories.find(s => s.id === id);
  const author = story ? getMemberById(story.authorId) : null;
  const event = story ? getEventById(story.eventId) : null;
  const storyComments = story ? getCommentsByStory(story.id) : [];

  if (!story) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Story not found.</p>
        <Link to="/stories" className="text-primary hover:underline mt-2 inline-block">Back to Stories</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <DemoBanner />

      <Link to="/stories" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Stories
      </Link>

      {/* Cover */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden mb-8">
        <img src={story.coverImage} alt={story.title} className="w-full h-64 md:h-80 object-cover" />
      </motion.div>

      {/* Meta */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {event && (
          <Link to={`/events/${event.id}`} className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mb-3">
            From: {event.title}
          </Link>
        )}
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">{story.title}</h1>
        {story.titleBn && <p className="font-bangla text-xl text-muted-foreground mt-2">{story.titleBn}</p>}

        <div className="flex items-center gap-4 mt-4 mb-8">
          {author && (
            <div className="flex items-center gap-2">
              <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-medium">{author.name}</span>
            </div>
          )}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-foreground/90 leading-relaxed text-lg whitespace-pre-line">{story.content}</p>
        </div>

        {/* Reactions */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
          {story.reactions.map(r => (
            <span key={r.type} className="glass-card px-3 py-1.5 text-sm flex items-center gap-1.5">
              {r.type} <span className="text-muted-foreground">{r.count}</span>
            </span>
          ))}
        </div>

        {/* Comments */}
        <div className="mt-8">
          <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" /> Comments ({storyComments.length})
          </h3>
          <div className="space-y-4">
            {storyComments.map(comment => {
              const cAuthor = getMemberById(comment.authorId);
              return (
                <div key={comment.id} className="glass-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {cAuthor && <img src={cAuthor.avatar} alt={cAuthor.name} className="w-6 h-6 rounded-full object-cover" />}
                    <span className="text-sm font-medium">{cAuthor?.nickname}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              );
            })}
            {storyComments.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {story.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
