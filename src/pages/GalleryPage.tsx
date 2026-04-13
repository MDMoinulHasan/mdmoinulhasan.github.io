import { useState } from 'react';
import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { galleryImages, events, getEventById } from '@/data/mockData';

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter(g => g.eventId === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="font-serif text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground mt-1">Moments captured across all our adventures</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>
        {events.map(e => (
          <button
            key={e.id}
            onClick={() => setFilter(e.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === e.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {e.title}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((img, i) => {
          const event = getEventById(img.eventId);
          return (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="break-inside-avoid rounded-lg overflow-hidden group relative"
            >
              <img src={img.url} alt={img.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <div>
                  <p className="text-xs font-medium">{img.caption}</p>
                  {event && <p className="text-[10px] text-muted-foreground">{event.title}</p>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
