import { createContext, useContext, useState, ReactNode } from 'react';

export interface BrandConfig {
  communityName: string;
  communityNameBn: string;
  logo: string; // emoji or image URL
  logoType: 'emoji' | 'image';
  tagline: string;
}

const defaultBrand: BrandConfig = {
  communityName: 'Voboghure',
  communityNameBn: 'ভবঘুরে',
  logo: '😎',
  logoType: 'emoji',
  tagline: 'A private friend zone community',
};

interface BrandContextType {
  brand: BrandConfig;
  updateBrand: (updates: Partial<BrandConfig>) => void;
}

const BrandContext = createContext<BrandContextType | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig>(defaultBrand);

  const updateBrand = (updates: Partial<BrandConfig>) => {
    setBrand(prev => ({ ...prev, ...updates }));
  };

  return (
    <BrandContext.Provider value={{ brand, updateBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used within BrandProvider');
  return ctx;
}
