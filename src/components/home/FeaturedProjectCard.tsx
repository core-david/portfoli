import { Project } from '@/types';
import { SiGithub } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <div className="group relative flex bg-surface border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]">
      {/* Content */}
      <div className="flex-1 p-4">
        {/* Project Name */}
        <h3 className="text-lg font-bold text-text-primary mb-1">
          {project.name}
        </h3>

        {/* Summary - truncated to 2 lines */}
        <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
          {project.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-primary rounded-md text-primary hover:bg-primary/10 transition-colors duration-200"
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-primary rounded-md text-primary hover:bg-primary/10 transition-colors duration-200"
              aria-label={`View live demo of ${project.name}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
