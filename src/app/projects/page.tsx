'use client';

import { Suspense, useState, useRef, useCallback } from 'react';
import Container from '@/components/layout/Container';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CategoryFilter, { type FilterCategory } from '@/components/projects/CategoryFilter';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

function ProjectsContent() {
  const { activeCategory, setCategory } = useCategoryFilter();
  const [displayedCategory, setDisplayedCategory] = useState(activeCategory);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const projects = projectsData.projects as Project[];

  // Handle category change with crossfade transition
  const handleCategoryChange = useCallback(
    (newCategory: FilterCategory) => {
      if (newCategory === displayedCategory) return;

      // Update URL immediately
      setCategory(newCategory);

      // Start fade out
      setIsTransitioning(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // After fade out, swap content and fade in
      timeoutRef.current = setTimeout(() => {
        setDisplayedCategory(newCategory);
        setIsTransitioning(false);
      }, 300);
    },
    [displayedCategory, setCategory]
  );

  const filteredProjects = projects
    .filter((project) => {
      if (displayedCategory === 'all') return true;
      return project.category === displayedCategory;
    })
    .sort((a, b) => a.order - b.order);

  return (
    <div className="pt-24 pb-16">
      <Container>
        <AnimatedSection>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Projects
            </h1>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={100}>
          <div className="flex justify-center mb-10">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </AnimatedSection>

        {/* Projects Grid with crossfade */}
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">
                No projects found in this category.
              </p>
              <button
                onClick={() => setCategory('all')}
                className="mt-4 text-primary hover:underline"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const categoryStyles = {
    mlops: 'bg-primary/10 border-primary/30 text-primary',
    'data-science': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  };

  const categoryLabels = {
    mlops: 'MLOps',
    'data-science': 'Data Science',
  };

  return (
    <div className="bg-surface border border-border p-6 rounded-lg hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`inline-block px-2 py-1 text-xs rounded border ${categoryStyles[project.category]}`}
        >
          {categoryLabels[project.category]}
        </span>
        {project.featured && (
          <span className="inline-block px-2 py-1 bg-primary/10 border border-primary text-primary text-xs rounded">
            Featured
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-dim transition-colors">
        {project.name}
      </h3>

      <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-background border border-border text-text-muted text-xs rounded"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="px-2 py-1 text-text-muted text-xs">
            +{project.techStack.length - 4} more
          </span>
        )}
      </div>

      <div className="flex gap-4 text-sm mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub →
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Demo →
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-16">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Projects
              </h1>
              <p className="text-text-secondary">Loading projects...</p>
            </div>
          </Container>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
