import { motion } from "framer-motion";
import { Database, Smartphone, Network, Github, ExternalLink } from "lucide-react";

// Asset Imports
import taxImg from "@/assets/project-tax.jpg";
import cricketImg from "@/assets/project-cricket.jpg";
import voboghureImg from "@/assets/voboghure-hero.png.jpeg";

// 📍 Added 'export' so StatsBar can dynamically count projects
export const projects = [
  {
    title: "Voboghure - Multi-Community Ecosystem",
    // 📍 New description based on your engineering work in Voboghure
    description: "Architected and engineered a full-stack SaaS-style platform for multi-community management. Features Role-Based Access Control (RBAC), secure Supabase authentication, and real-time database-trigger notifications.",
    tags: ["React & TypeScript", "Supabase", "Auth", "RBAC", "Full Stack"],
    icon: Network, 
    liveLink: "https://voboghure.vercel.app/",
    // 📍 GitHub link removed as it's a private repo per your instruction
    image: voboghureImg,
  },
  {
    title: "Tax Management System",
    description: "A robust backend system built with SQL. Features include complex CRUD operations, advanced relational database design, and optimized data querying for financial records.",
    tags: ["SQL", "Database Design", "CRUD", "Backend"],
    icon: Database,
    // 📍 Integrated your GitHub repository link
    githubLink: "https://github.com/hellomoinul/Tax-Management-System",
    image: taxImg,
  },
  {
    title: "Fantasy Cricket App",
    description: "A cross-platform mobile application developed using Flutter and Dart, focusing on a seamless user interface and real-time data handling for sports enthusiasts.",
    tags: ["Flutter", "Dart", "Mobile", "UI/UX"],
    icon: Smartphone,
    // 📍 Integrated your GitHub repository link
    githubLink: "https://github.com/hellomoinul/fantasy_cricket_app",
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

        {/* 📍 Grid layout optimized for 3 projects */}
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
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  // 📍 Added cinematic filter for a professional look
                  style={{ filter: "grayscale(10%) contrast(105%)" }}
                />
                
                {/* 📍 Added Hover Overlay with Dynamic Button Logic */}
                <div className="absolute inset-0 bg-black/70 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-44 justify-center py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs transition-all hover:scale-105"
                    >
                      <ExternalLink size={14} /> Visit Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-44 justify-center py-2.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-xs transition-all hover:scale-105 border border-white/10"
                    >
                      <Github size={14} /> View Code
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <project.icon size={16} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg tracking-tight line-clamp-1">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
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
