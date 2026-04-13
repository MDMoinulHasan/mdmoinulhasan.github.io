import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getMemberById } from '@/data/mockData';
import { Check, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type VoteChoice = 'joining' | 'not_joining' | 'maybe';

interface Vote {
  userId: string;
  choice: VoteChoice;
}

function getStorageKey(eventId: string) {
  return `voboghure-votes-${eventId}`;
}

function loadVotes(eventId: string): Vote[] {
  try {
    const raw = localStorage.getItem(getStorageKey(eventId));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveVotes(eventId: string, votes: Vote[]) {
  localStorage.setItem(getStorageKey(eventId), JSON.stringify(votes));
}

const options: { choice: VoteChoice; label: string; icon: typeof Check; activeClass: string }[] = [
  { choice: 'joining', label: 'Joining', icon: Check, activeClass: 'bg-green-500/20 border-green-500/50 text-green-400' },
  { choice: 'maybe', label: 'Maybe', icon: HelpCircle, activeClass: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' },
  { choice: 'not_joining', label: 'Not Joining', icon: X, activeClass: 'bg-red-500/20 border-red-500/50 text-red-400' },
];

export function EventVoting({ eventId }: { eventId: string }) {
  const { user, isDemo } = useAuth();
  const [votes, setVotes] = useState<Vote[]>(() => loadVotes(eventId));

  useEffect(() => { setVotes(loadVotes(eventId)); }, [eventId]);

  const myVote = user ? votes.find(v => v.userId === user.id)?.choice : undefined;
  const joining = votes.filter(v => v.choice === 'joining');
  const maybe = votes.filter(v => v.choice === 'maybe');

  const castVote = (choice: VoteChoice) => {
    if (!user || isDemo) return;
    const updated = votes.filter(v => v.userId !== user.id);
    if (myVote !== choice) updated.push({ userId: user.id, choice });
    setVotes(updated);
    saveVotes(eventId, updated);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <h3 className="font-serif text-lg font-bold">🗳️ Are you joining?</h3>

      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = myVote === opt.choice;
          return (
            <Button
              key={opt.choice}
              variant="outline"
              size="sm"
              disabled={isDemo}
              onClick={() => castVote(opt.choice)}
              className={`gap-1.5 transition-all ${active ? opt.activeClass : 'border-border'}`}
            >
              <opt.icon className="h-3.5 w-3.5" />
              {opt.label}
            </Button>
          );
        })}
      </div>

      {myVote && (
        <p className="text-xs text-muted-foreground">
          You voted: <span className="font-medium text-foreground capitalize">{myVote.replace('_', ' ')}</span>
        </p>
      )}
      {isDemo && <p className="text-xs text-muted-foreground italic">Demo users cannot vote.</p>}

      {joining.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">Confirmed ({joining.length})</p>
          <div className="flex flex-wrap gap-2">
            {joining.map(v => {
              const m = getMemberById(v.userId);
              return m ? (
                <div key={v.userId} className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary text-xs">
                  <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                  <span>{m.nickname}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {maybe.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">Maybe ({maybe.length})</p>
          <div className="flex flex-wrap gap-2">
            {maybe.map(v => {
              const m = getMemberById(v.userId);
              return m ? (
                <div key={v.userId} className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary text-xs">
                  <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                  <span>{m.nickname}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
