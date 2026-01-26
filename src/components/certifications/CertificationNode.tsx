'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CertificationNodeProps {
  id: string;
  name: string;
  issuer: string;
  logo: string;
  credentialUrl?: string | null;
  pdfUrl?: string | null;
}

export default function CertificationNode({
  name,
  issuer,
  logo,
  credentialUrl,
  pdfUrl,
}: CertificationNodeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Determine the link URL (prioritize credentialUrl, fallback to pdfUrl)
  const linkUrl = credentialUrl || pdfUrl;
  const hasLink = !!linkUrl;

  const nodeContent = (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      {/* Circular container */}
      <div
        className={`
          w-32 h-32 rounded-full
          bg-surface border-2 border-border
          flex items-center justify-center
          transition-all duration-300 ease-out
          ${hasLink ? 'cursor-pointer hover:scale-110 hover:border-primary hover:shadow-lg hover:shadow-primary/20' : 'cursor-default'}
          focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background
        `}
      >
        {/* Logo */}
        <div className="relative w-20 h-20">
          <Image
            src={logo}
            alt={`${name} certification`}
            fill
            className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300"
            sizes="80px"
          />
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-10 animate-fade-in pointer-events-none">
          <div className="bg-surface border border-primary px-4 py-2 rounded shadow-lg whitespace-nowrap">
            <p className="text-sm font-medium text-text-primary">{name}</p>
            <p className="text-xs text-text-secondary mt-0.5">{issuer}</p>
          </div>
          {/* Arrow pointer */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary" />
        </div>
      )}
    </div>
  );

  // If there's a link, wrap in Link/anchor, otherwise just return the node
  if (hasLink) {
    return (
      <Link
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block focus:outline-none"
        aria-label={`View ${name} credential`}
      >
        {nodeContent}
      </Link>
    );
  }

  return <div className="inline-block">{nodeContent}</div>;
}
