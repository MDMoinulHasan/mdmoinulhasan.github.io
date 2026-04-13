import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink, Image, AlertCircle } from 'lucide-react';

function isValidGooglePhotosUrl(url: string): boolean {
  if (!url) return true;
  try {
    const u = new URL(url);
    return u.hostname.includes('photos.google.com') || u.hostname.includes('photos.app.goo.gl');
  } catch { return false; }
}

interface GooglePhotosInputProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function GooglePhotosInput({ value, onChange, placeholder = 'Paste your Google Photos link', disabled }: GooglePhotosInputProps) {
  const [error, setError] = useState('');

  const handleChange = (val: string) => {
    if (val && !isValidGooglePhotosUrl(val)) {
      setError('Please enter a valid Google Photos link');
    } else {
      setError('');
    }
    onChange(val);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
        />
        {value && isValidGooglePhotosUrl(value) && (
          <a href={value} target="_blank" rel="noopener noreferrer">
            <Button type="button" variant="outline" size="icon" className="shrink-0 border-primary/30 text-primary hover:bg-primary/10">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}

interface GooglePhotosPreviewProps {
  url?: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
}

export function GooglePhotosPreview({ url, fallbackImage, alt = 'Photo', className = '' }: GooglePhotosPreviewProps) {
  if (!url && !fallbackImage) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <Image className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  // Show fallback image with "View Album" overlay if it's a Google Photos link
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <img
        src={fallbackImage || '/placeholder.svg'}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
            <ExternalLink className="h-4 w-4" /> View Album
          </span>
        </a>
      )}
    </div>
  );
}
