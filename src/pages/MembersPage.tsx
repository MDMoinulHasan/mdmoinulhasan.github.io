import { motion } from 'framer-motion';
import { DemoBanner } from '@/components/DemoBanner';
import { MemberCard } from '@/components/MemberCard';
import { members } from '@/data/mockData';

export default function MembersPage() {
  const activeMembers = members.filter(m => m.role !== 'demo');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DemoBanner />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Members</h1>
        <p className="text-muted-foreground mt-1">The wanderers who make Voboghure special</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeMembers.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}
