'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { FilterCategory } from '@/components/projects/CategoryFilter';

const VALID_CATEGORIES: FilterCategory[] = ['all', 'mlops', 'data-science'];

function isValidCategory(value: string | null): value is FilterCategory {
  return value !== null && VALID_CATEGORIES.includes(value as FilterCategory);
}

export function useCategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read category from URL, default to 'all'
  const categoryParam = searchParams.get('category');
  const activeCategory: FilterCategory = isValidCategory(categoryParam)
    ? categoryParam
    : 'all';

  // Update URL when category changes (shallow routing)
  const setCategory = useCallback((category: FilterCategory) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'all') {
      // Remove param for 'all' to keep URL clean
      params.delete('category');
    } else {
      params.set('category', category);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Use shallow routing to avoid full page reload
    router.push(newUrl, { scroll: false });
  }, [searchParams, pathname, router]);

  return {
    activeCategory,
    setCategory,
  };
}
