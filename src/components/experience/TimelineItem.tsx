import Image from 'next/image';
import { Experience } from '@/types';
import TechBadge from './TechBadge';

interface TimelineItemProps {
  experience: Experience;
}

function formatDate(dateStr: string | null, isCurrent: boolean): string {
  if (isCurrent || !dateStr) return 'Present';

  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
}

export default function TimelineItem({ experience }: TimelineItemProps) {
  const startDate = formatDate(experience.startDate, false);
  const endDate = formatDate(experience.endDate, experience.current);

  return (
    <div className="relative md:pl-8 pb-8 md:pb-12 group">
      {/* Timeline dot - hidden on mobile */}
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-200 hidden md:block" />

      {/* Content card */}
      <div className="bg-surface border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-200">
        {/* Header - logo + role + location */}
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          {/* Company logo */}
          <div className="relative w-10 h-10 md:w-16 md:h-16 flex-shrink-0">
            <Image
              src={experience.companyLogo}
              alt={`${experience.company} logo`}
              fill
              className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Role */}
          <h3 className="text-base md:text-lg font-semibold text-text-primary">
            {experience.role}
          </h3>

          {/* Location */}
          <span className="text-xs text-text-muted ml-auto">
            {experience.location}
          </span>
        </div>

        {/* Company name */}
        <div className="mb-2">
          <p className="text-base md:text-lg text-primary font-medium">
            {experience.company}
          </p>
        </div>

        {/* Date and current status */}
        <div className="mb-3 md:mb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            <span>{startDate} - {endDate}</span>
            {experience.current && (
              <>
                <span>•</span>
                <span className="text-primary">Current</span>
              </>
            )}
          </div>
        </div>

        {/* Impact points */}
        <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
          {experience.impactPoints.map((point, index) => (
            <li key={index} className="text-xs md:text-sm text-text-secondary flex items-start">
              <span className="text-primary mr-2 mt-1 flex-shrink-0">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
