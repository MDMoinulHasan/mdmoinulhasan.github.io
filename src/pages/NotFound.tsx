import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-6xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, hsl(38 92% 50%), hsl(30 80% 55%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
        <p className="text-lg text-muted-foreground mb-6">This path leads nowhere.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
