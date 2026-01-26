'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { Project } from '@/types';
import FeaturedProjectCard from './FeaturedProjectCard';

export default function FeaturedWorkSection() {
  // Filter to only featured projects and sort by order
  const featuredProjects = (projectsData.projects as Project[])
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="featured-work" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto md:mx-0" />
        </div>

        {/* Project Grid - 3 per row on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dim transition-colors duration-200 font-medium group"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
