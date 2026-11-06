'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Preload critical pages
export function PreloadCriticalPages() {
  useEffect(() => {
    // Preload critical pages after initial load
    const preloadPages = ['/rescate', '/proteccion-personal', '/ventilacion', '/hazmat', '/nosotros'];
    
    preloadPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

// Optimized Link component with prefetch
export function OptimizedLink({ 
  href, 
  children, 
  className,
  prefetch = true,
  ...props 
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
} & React.ComponentProps<typeof Link>) {
  return (
    <Link 
      href={href} 
      prefetch={prefetch}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}