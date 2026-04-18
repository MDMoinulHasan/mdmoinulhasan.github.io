import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// 📍 Importing your data to make it dynamic
// Note: Ensure the paths correctly point to where your projects and skills are defined
import { projects } from "./ProjectsSection"; 
// যদি স্কিলগুলো অন্য ফাইলে থাকে তবে সেখান থেকে ইমপোর্ট করবেন, 
// অথবা এখানেই একটি স্কিল লিস্ট রাখতে পারেন।

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.ceil(target / (duration / 30)));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold tracking-tighter text-gradient tabular-nums font-mono">
      {count}{suffix}
    </span>
  );
};

const StatsBar = () => {
  // 📍 Dynamic calculation logic
  const projectCount = projects?.length || 3; 
  
  // আপনি যদি স্কিল সেকশন থেকে ইমপোর্ট না করেন, তবে এখানে বর্তমান কাউন্ট ১৬ বসিয়ে দিচ্ছি
  // অথবা সরাসরি স্কিল অ্যারো ইমপোর্ট করলে skills.length ব্যবহার করবেন।
  const techCount = 16; 

  const stats = [
    { value: projectCount, suffix: "+", label: "Projects Completed" },
    { value: techCount, suffix: "+", label: "Technologies" },
    { value: 2, suffix: "+", label: "Years Learning" },
    { value: 100, suffix: "%", label: "Commitment" },
  ];

  return (
    <section className="py-16 relative border-y border-border/30 bg-card/10 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center space-y-2 group"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
