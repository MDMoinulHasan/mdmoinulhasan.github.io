import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users } from 'lucide-react';
import { TourEvent } from '@/types';
import { getMemberById } from '@/data/mockData';

interface EventCardProps {
  event: TourEvent;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/events/${event.id}`} className="block group">
        <div className="glass-card-hover overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-serif text-lg font-bold leading-tight">{event.title}</h3>
              {event.titleBn && (
                <p className="text-sm text-muted-foreground font-bangla mt-0.5">{event.titleBn}</p>
              )}
            </div>
            <div className="absolute top-3 right-3">
              <div
                className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                style={{ background: `hsl(${event.color} / 0.3)`, color: `hsl(${event.color})` }}
              >
                {event.tags[0]}
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground mr-1" />
              <div className="flex -space-x-2">
                {event.participants.slice(0, 4).map(pid => {
                  const m = getMemberById(pid);
                  return m ? (
                    <img key={pid} src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full border-2 border-card object-cover" />
                  ) : null;
                })}
              </div>
              {event.participants.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">+{event.participants.length - 4}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
