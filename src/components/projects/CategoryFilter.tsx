'use client';

import { ProjectCategory } from '@/types';

export type FilterCategory = ProjectCategory | 'all';

interface CategoryFilterProps {
  activeCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
}

const FILTER_OPTIONS: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'mlops', label: 'MLOps & Infrastructure' },
  { value: 'data-science', label: 'Data Science & Research' },
];

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filter projects by category">
      {FILTER_OPTIONS.map((option) => {
        const isActive = activeCategory === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onCategoryChange(option.value)}
            className={`
              px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
              ${
                isActive
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'border-border text-text-secondary hover:text-text-primary hover:border-text-secondary'
              }
            `}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}