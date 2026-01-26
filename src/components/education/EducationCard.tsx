import Image from 'next/image';

interface EducationCardProps {
  id: string;
  institution: string;
  institutionLogo: string;
  location?: string;
  degree: string;
  major: string;
  minor?: string;
  startDate: string;
  endDate: string | null;
  gpa?: string;
  honors?: string;
  achievements?: string[];
  relevantCoursework?: string[];
  websiteUrl?: string;
}

// Helper function to format date
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function EducationCard({
  institution,
  institutionLogo,
  location,
  degree,
  major,
  minor,
  startDate,
  endDate,
  gpa,
  honors,
  achievements,
  relevantCoursework,
  websiteUrl,
}: EducationCardProps) {
  const isInProgress = !endDate;
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = endDate ? formatDate(endDate) : 'Present';

  return (
    <div className="relative md:pl-8 pb-8 md:pb-12 group">
      {/* Timeline dot - hidden on mobile */}
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-200 hidden md:block" />

      {/* Content card */}
      <div className="bg-surface border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-200">
        {/* Header - logo + degree + location */}
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          {/* Institution logo */}
          <Image
            src={institutionLogo}
            alt={`${institution} logo`}
            width={64}
            height={64}
            className="w-10 h-10 md:w-16 md:h-16 object-contain flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300"
          />

          {/* Degree */}
          <h3 className="text-base md:text-lg font-semibold text-text-primary">
            {degree}
          </h3>

          {/* Location */}
          {location && (
            <span className="text-xs text-text-muted ml-auto">
              {location}
            </span>
          )}
        </div>

        {/* Institution name */}
        <div className="mb-2">
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg text-primary font-medium hover:underline"
            >
              {institution}
            </a>
          ) : (
            <p className="text-base md:text-lg text-primary font-medium">
              {institution}
            </p>
          )}
        </div>

        {/* Major/Minor */}
        <div className="mb-2">
          <p className="text-sm text-text-secondary">
            {major}
            {minor && <span className="text-text-muted"> • Minor in {minor}</span>}
          </p>
        </div>

        {/* Date and current status */}
        <div className="mb-3 md:mb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            <span>{formattedStartDate} - {formattedEndDate}</span>
            {isInProgress && (
              <>
                <span>•</span>
                <span className="text-primary">In Progress</span>
              </>
            )}
          </div>
        </div>

        {/* GPA & Honors */}
        {(gpa || honors) && (
          <div className="mb-3 md:mb-4 text-sm">
            {gpa && (
              <p className="text-text-secondary">
                <span className="font-medium">GPA:</span> {gpa}
              </p>
            )}
            {honors && (
              <p className="text-text-secondary">
                <span className="font-medium">Honors:</span> {honors}
              </p>
            )}
          </div>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <ul className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-xs md:text-sm text-text-secondary flex items-start">
                <span className="text-primary mr-2 mt-1 flex-shrink-0">▹</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Relevant Coursework */}
        {relevantCoursework && relevantCoursework.length > 0 && (
          <p className="text-sm text-text-secondary">
            <span className="font-medium">Relevant Courses:</span> {relevantCoursework.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
