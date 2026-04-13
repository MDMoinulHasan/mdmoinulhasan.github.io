import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { EventCard } from '@/components/EventCard';
import { events } from '@/data/mockData';

export default function EventsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Events Archive</h1>
        <p className="text-muted-foreground mt-1">Every adventure, preserved in time</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}
