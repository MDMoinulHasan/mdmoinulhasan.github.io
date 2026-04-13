import { motion } from 'framer-motion';
import { User } from '@/types';

interface MemberCardProps {
  member: User;
  index?: number;
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card-hover p-5 text-center"
    >
      <img
        src={member.avatar}
        alt={member.name}
        className="w-20 h-20 rounded-full object-cover mx-auto ring-2 ring-primary/20 mb-3"
      />
      <h3 className="font-serif font-bold">{member.name}</h3>
      {member.nameBn && <p className="text-sm text-muted-foreground font-bangla">{member.nameBn}</p>}
      <p className="text-xs text-primary capitalize mt-1">{member.role}</p>
      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
      <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
        <span><strong className="text-foreground">{member.stats.trips}</strong> trips</span>
        <span><strong className="text-foreground">{member.stats.stories}</strong> stories</span>
        <span><strong className="text-foreground">{member.stats.photos}</strong> photos</span>
      </div>
    </motion.div>
  );
}
