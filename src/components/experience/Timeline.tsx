import { Experience } from '@/types';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-border" />

      {/* Timeline items */}
      <div className="relative">
        {experiences.map((experience) => (
          <TimelineItem key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}
