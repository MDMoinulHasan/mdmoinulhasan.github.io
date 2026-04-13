import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { events, stories } from '@/data/mockData';
import { Calendar } from 'lucide-react';

export default function ArchivePage() {
  // Group events by year
  const years = [...new Set(events.map(e => new Date(e.date).getFullYear()))].sort((a, b) => b - a);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Yearly Archive</h1>
        <p className="text-muted-foreground mt-1">Browse by year</p>
      </motion.div>

      <div className="space-y-10">
        {years.map(year => {
          const yearEvents = events.filter(e => new Date(e.date).getFullYear() === year);
          const yearStories = stories.filter(s => new Date(s.createdAt).getFullYear() === year);

          return (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-serif text-4xl font-bold glow-text">{year}</h2>
                <div className="flex-1 h-px bg-border" />
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{yearEvents.length} events</span>
                  <span>{yearStories.length} stories</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {yearEvents.map(event => (
                  <Link key={event.id} to={`/events/${event.id}`} className="group">
                    <div className="glass-card-hover overflow-hidden flex">
                      <div className="w-28 h-24 shrink-0 overflow-hidden">
                        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-3 flex-1">
                        <h3 className="font-serif font-bold text-sm group-hover:text-primary transition-colors">{event.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{event.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
