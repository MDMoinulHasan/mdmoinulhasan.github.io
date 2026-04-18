import { motion } from "framer-motion";
import { Database, Smartphone, Network } from "lucide-react";

// Asset Imports
import taxImg from "@/assets/project-tax.jpg";
import cricketImg from "@/assets/project-cricket.jpg";
// 📍 Updated with your exact filename
import voboghureImg from "@/assets/voboghure-hero.png.jpeg";

const projects = [
  {
    title: "Voboghure - Multi-Community Ecosystem",
    description: "Architected and engineered a full-stack SaaS-style platform for multi-community management. Features Role-Based Access Control (RBAC), secure Supabase authentication, real-time database-trigger notifications, and optimized query workflows for scalable infrastructure.",
    tags: ["React & TypeScript", "Supabase", "Auth", "RBAC", "Real-time", "Full Stack"],
    icon: Network, 
    liveLink: "https://voboghure.vercel.app/",
    image: voboghureImg,
  },
  {
    title: "Tax Management System",
    description: "A robust backend system built with SQL. Features include complex CRUD operations, advanced relational database design, and optimized data querying.",
    tags: ["SQL", "Database Design", "CRUD", "Backend"],
    icon: Database,
    image: taxImg,
  },
  {
    title: "Fantasy Cricket App",
    description: "A cross-platform mobile application developed using Flutter and Dart, focusing on a seamless user interface and real-time data handling.",
    tags: ["Flutter", "Dart", "Mobile", "UI/UX"],
    icon: Smartphone,
    image: cricketImg,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-px bg-primary/50 mx-auto" />
        </motion.div>

        {/* Dynamic grid: 3 columns on large screens for better balance */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card rounded-xl overflow-hidden group relative flex flex-col h-full"
            >
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
              </div>

              {/* Image Section */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: "grayscale(10%) contrast(105%)" }}
                />
                
                {/* Overlay with Live Link for Voboghure */}
                {project.liveLink && (
                  <div className="absolute inset-0 bg-black/60 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all hover:scale-105 active:scale-95 z-30 pointer-events-auto shadow-lg"
                    >
                      Visit Voboghure Live
                    </a>
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between bg-card/50">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <project.icon size={16} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg tracking-tight line-clamp-1">{project.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
