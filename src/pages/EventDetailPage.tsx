import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { StoryCard } from '@/components/StoryCard';
import { getEventById, getStoriesByEvent, getMemberById, getGalleryByEvent } from '@/data/mockData';
import { MapPin, Calendar, Users, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventVoting } from '@/components/EventVoting';

export default function EventDetailPage() {
  const { id } = useParams();
  const event = getEventById(id || '');
  const eventStories = getStoriesByEvent(id || '');
  const gallery = getGalleryByEvent(id || '');

  if (!event) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Event not found.</p>
        <Link to="/events" className="text-primary hover:underline mt-2 inline-block">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <DemoBanner />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/events" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="h-4 w-4" /> Back to Events
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold">{event.title}</h1>
          {event.titleBn && <p className="font-bangla text-lg text-muted-foreground mt-1">{event.titleBn}</p>}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {event.location}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {event.endDate && ` — ${new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
          </span>
        </div>

        {/* Participants */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Participants
          </h3>
          <div className="flex flex-wrap gap-3">
            {event.participants.map(pid => {
              const m = getMemberById(pid);
              return m ? (
                <div key={pid} className="flex items-center gap-2">
                  <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm">{m.nickname}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="font-serif text-xl font-bold mb-3">About This Trip</h2>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </div>

        {/* Google Photos */}
        {event.googlePhotosUrl && (
          <div className="glass-card p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">📸 Full Photo Album</h3>
              <p className="text-xs text-muted-foreground">View all photos on Google Photos</p>
            </div>
            <a href={event.googlePhotosUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View Album
              </Button>
            </a>
          </div>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <div>
            <h2 className="font-serif text-xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square rounded-lg overflow-hidden group"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Voting */}
        <EventVoting eventId={event.id} />

        {/* Expenses */}
        {event.expenses && event.expenses.length > 0 && (
          <div className="glass-card p-5">
            <h3 className="font-serif text-lg font-bold mb-3">💰 Expense Breakdown</h3>
            <div className="space-y-2">
              {event.expenses.map((exp, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{exp.item}</span>
                  <span className="font-medium">৳{exp.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
                <span>Total</span>
                <span className="text-primary">৳{event.expenses.reduce((s, e) => s + e.amount, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Stories */}
        {eventStories.length > 0 && (
          <div>
            <h2 className="font-serif text-xl font-bold mb-4">Stories from This Trip</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {eventStories.map((story, i) => (
                <StoryCard key={story.id} story={story} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
