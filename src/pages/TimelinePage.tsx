import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { events } from '@/data/mockData';
import { MapPin, Calendar } from 'lucide-react';

export default function TimelinePage() {
  const sorted = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Timeline</h1>
        <p className="text-muted-foreground mt-1">Our journey through time</p>
      </motion.div>

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {sorted.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-14"
            >
              {/* Dot */}
              <div
                className="absolute left-4 top-4 w-5 h-5 rounded-full border-2 border-card"
                style={{ background: `hsl(${event.color})` }}
              />

              <Link to={`/events/${event.id}`} className="block group">
                <div className="glass-card-hover overflow-hidden flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-32 sm:h-auto shrink-0 overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
