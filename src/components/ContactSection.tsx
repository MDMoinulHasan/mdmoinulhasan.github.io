import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Facebook, Instagram, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const XIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L19.5 4H18l-5 6.2L9 4H4z" />
  </svg>
);

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/hellomoinul", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/hellomoinul", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/hellomoinul", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-moinul-hasan-akash-158168226", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/MDMoinulHasan", icon: Github },
  { label: "X", href: "https://x.com/mdmoinul__hasan", icon: XIcon },
] as const;

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [highlightEmail, setHighlightEmail] = useState(false);
  const [highlightSocials, setHighlightSocials] = useState(false);

  useEffect(() => {
    const onAllContacts = () => {
      setTimeout(() => {
        setHighlightSocials(true);
        setHighlightEmail(true);
        setTimeout(() => {
          setHighlightSocials(false);
          setHighlightEmail(false);
        }, 2500);
      }, 600);
    };
    window.addEventListener("highlight-all-contacts", onAllContacts);
    return () => window.removeEventListener("highlight-all-contacts", onAllContacts);
  }, []);

  // --- Netlify AJAX Submission Logic ---
  const encode = (data: any) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setSending(true);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...form }),
    })
      .then(() => {
        toast({ title: "Message sent!", description: "Thank you for reaching out. I'll get back to you soon." });
        setForm({ name: "", email: "", message: "" }); // Form clear kora
      })
      .catch((error) => {
        toast({ title: "Error", description: "Something went wrong. Please try again later.", variant: "destructive" });
        console.error(error);
      })
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-px bg-primary/50 mx-auto" />
          <p className="text-muted-foreground">Available for Technical Consulting and Internships.</p>

          <form 
            name="contact" 
            onSubmit={handleSubmit} 
            className="space-y-4 text-left"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-mono text-sm font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 justify-center disabled:opacity-50"
            >
              <Send size={14} />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="pt-2 space-y-4">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Contact Channels</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 ${
                    highlightSocials ? "text-primary scale-110" : ""
                  }`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            <a
              href="mailto:akash.moinulhasan@gmail.com"
              className={`glass-button px-6 py-3 rounded-lg font-mono text-sm border-b-2 transition-all duration-300 inline-flex items-center gap-2 ${
                highlightEmail ? "text-primary border-primary scale-110" : "hover:text-primary border-primary/50"
              }`}
            >
              <Mail size={16} />
              akash.moinulhasan@gmail.com
            </a>
          </div>
        </motion.div>

        <div className="mt-20 pt-8 border-t border-border/30 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Md. Moinul Hasan Akash — Built with precision.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;