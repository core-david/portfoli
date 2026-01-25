'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { Project } from '@/types';
import FeaturedProjectCard from './FeaturedProjectCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function FeaturedWorkSection() {
  // Filter to only featured projects and sort by order
  const featuredProjects = (projectsData.projects as Project[])
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="featured-work" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Featured Projects
          </h2>
        </AnimatedSection>

        {/* Project Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {featuredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <FeaturedProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        {/* View All Projects Link */}
        <AnimatedSection delay={400} className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dim transition-colors duration-200 font-medium group"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
