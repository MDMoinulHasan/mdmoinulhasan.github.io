import { motion } from 'framer-motion';
import { Mountain, Heart, Users, Compass } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
          About <span className="glow-text">ভবঘুরে</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A close-knit group of friends who believe that the best stories are lived, not told — and then told anyway.
        </p>
      </motion.div>

      <div className="space-y-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="glass-card p-8">
          <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-3">
            <Heart className="h-6 w-6 text-primary" /> Why Voboghure?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            "ভবঘুরে" (Voboghure) is a Bangla word meaning "wanderer" — someone who roams freely, 
            driven by curiosity and love for exploration. We started as a small group of friends 
            who went on trips together. Over time, those trips became traditions, 
            those traditions became stories, and those stories needed a home.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp} className="glass-card p-8">
          <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-3">
            <Mountain className="h-6 w-6 text-primary" /> Our Journey
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From the mangroves of Sundarbans to the cloud-kissed peaks of Sajek, from the 
            endless beaches of Cox's Bazar to the silent tea gardens of Srimangal — every 
            destination has shaped us. This platform is our way of preserving those moments, 
            so that years from now, we can revisit them and feel the same magic.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp} className="glass-card p-8">
          <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" /> The Community
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Voboghure is intentionally small. We're not a travel agency or a social network. 
            We're a group of friends who value each other's company on the road and the memories 
            we create together. Membership is by invitation only, keeping the community intimate 
            and authentic.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeUp} className="glass-card p-8">
          <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-3">
            <Compass className="h-6 w-6 text-primary" /> What's Next
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We never stop planning. There's always a next trip on the horizon, a new destination 
            calling, a new story waiting to be written. This platform helps us plan, coordinate, 
            and build excitement for what's ahead while cherishing what's behind.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
