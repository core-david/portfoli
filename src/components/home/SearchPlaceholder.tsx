'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchPlaceholder() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleFocus = () => {
    setShowTooltip(true);
  };

  const handleBlur = () => {
    setShowTooltip(false);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="w-5 h-5 text-text-muted" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          readOnly
          placeholder="Search my experience, projects, and notes..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search placeholder (coming soon)"
          className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 cursor-not-allowed"
        />

        {/* Coming Soon Tooltip */}
        {showTooltip && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-surface border border-primary rounded-md shadow-lg animate-fade-in">
            <p className="text-xs text-primary whitespace-nowrap">
              🚀 Coming soon - RAG-powered search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
