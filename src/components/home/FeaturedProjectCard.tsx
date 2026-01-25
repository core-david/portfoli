import Image from 'next/image';
import { Project } from '@/types';
import TechBadge from '@/components/experience/TechBadge';
import { SiGithub } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const categoryLabel = project.category === 'mlops' ? 'MLOps & Infrastructure' : 'Data Science & Research';
  const categoryStyles = project.category === 'mlops'
    ? 'bg-primary/20 text-primary'
    : 'bg-purple-500/20 text-purple-400';

  // Display only the top 4 tech stack items
  const displayedTech = project.techStack.slice(0, 4);

  return (
    <div className="group relative flex bg-surface border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]">
      {/* Content - Left Side */}
      <div className="flex-1 p-4">
        {/* Category Badge */}
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 ${categoryStyles}`}>
          {categoryLabel}
        </span>

        {/* Project Name */}
        <h3 className="text-lg font-bold text-text-primary mb-1">
          {project.name}
        </h3>

        {/* Summary - truncated to 2 lines */}
        <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
          {project.summary}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {displayedTech.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-md text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200"
              aria-label={`View ${project.name} on GitHub`}
            >
              <SiGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-background rounded-md hover:bg-primary-dim transition-colors duration-200"
              aria-label={`View live demo of ${project.name}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Preview Image - Right Side */}
      {project.thumbnail && (
        <div className="relative w-32 shrink-0 bg-background overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </div>
  );
}
