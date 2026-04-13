import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { upcomingTours, getMemberById } from '@/data/mockData';
import { Calendar, MapPin, Users, CheckCircle, Clock, Compass } from 'lucide-react';

const statusConfig = {
  confirmed: { icon: CheckCircle, label: 'Confirmed', color: 'text-green-400 bg-green-400/10' },
  planning: { icon: Clock, label: 'Planning', color: 'text-yellow-400 bg-yellow-400/10' },
  upcoming: { icon: Compass, label: 'Upcoming', color: 'text-primary bg-primary/10' },
};

export default function UpcomingPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Upcoming Tours</h1>
        <p className="text-muted-foreground mt-1">Adventures on the horizon</p>
      </motion.div>

      <div className="space-y-6">
        {upcomingTours.map((tour, i) => {
          const status = statusConfig[tour.status];
          const StatusIcon = status.icon;
          return (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                  <img src={tour.coverImage} alt={tour.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} mb-3`}>
                    <StatusIcon className="h-3 w-3" /> {status.label}
                  </div>
                  <h3 className="font-serif text-xl font-bold">{tour.title}</h3>
                  {tour.titleBn && <p className="text-sm text-muted-foreground font-bangla">{tour.titleBn}</p>}
                  <p className="text-sm text-muted-foreground mt-2">{tour.description}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {tour.destination}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {tour.plannedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <div className="flex -space-x-2">
                      {tour.confirmedMembers.map(mid => {
                        const m = getMemberById(mid);
                        return m ? (
                          <img key={mid} src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full border-2 border-card object-cover" />
                        ) : null;
                      })}
                    </div>
                    <span className="text-xs text-muted-foreground">{tour.confirmedMembers.length} confirmed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
