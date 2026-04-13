import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { events } from '@/data/mockData';
import { MapPin } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Map</h1>
        <p className="text-muted-foreground mt-1">Where we've been, where we're going</p>
      </motion.div>

      {/* Map placeholder - would integrate Mapbox/Google Maps in production */}
      <div className="glass-card p-8 text-center mb-8">
        <div className="w-full h-96 rounded-lg bg-secondary/50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10 text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-3 animate-float" />
            <p className="text-lg font-serif font-bold">Interactive Map</p>
            <p className="text-sm text-muted-foreground mt-1">Map integration ready for Mapbox or Google Maps</p>
          </div>
        </div>
      </div>

      {/* Location list */}
      <h2 className="font-serif text-xl font-bold mb-4">Our Destinations</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `hsl(${event.color} / 0.15)` }}
            >
              <MapPin className="h-5 w-5" style={{ color: `hsl(${event.color})` }} />
            </div>
            <div>
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
