import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { members, events, stories } from '@/data/mockData';
import { Shield, Users, Calendar, BookOpen, AlertTriangle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function AdminPage() {
  const { canAccessAdmin, isDemo } = useAuth();

  if (!canAccessAdmin) {
    if (isDemo) {
      return (
        <div className="p-6 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold mb-2">Admin Access Restricted</h1>
            <p className="text-muted-foreground">Demo users cannot access the admin panel. This area is reserved for administrators.</p>
          </motion.div>
        </div>
      );
    }
    return <Navigate to="/dashboard" replace />;
  }

  const activeMembers = members.filter(m => m.role !== 'demo');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" /> Admin Panel
        </h1>
        <p className="text-muted-foreground mt-1">Manage the Voboghure platform</p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5">
          <Users className="h-5 w-5 text-primary mb-2" />
          <p className="text-2xl font-bold">{activeMembers.length}</p>
          <p className="text-sm text-muted-foreground">Active Members</p>
        </div>
        <div className="glass-card p-5">
          <Calendar className="h-5 w-5 text-primary mb-2" />
          <p className="text-2xl font-bold">{events.length}</p>
          <p className="text-sm text-muted-foreground">Total Events</p>
        </div>
        <div className="glass-card p-5">
          <BookOpen className="h-5 w-5 text-primary mb-2" />
          <p className="text-2xl font-bold">{stories.length}</p>
          <p className="text-sm text-muted-foreground">Total Stories</p>
        </div>
      </div>

      {/* Members Management */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-serif text-lg font-bold">Members Management</h2>
        </div>
        <div className="divide-y divide-border">
          {activeMembers.map(member => (
            <div key={member.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                member.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
              }`}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
