import Container from '@/components/layout/Container';
import EducationCard from './EducationCard';
import educationData from '@/data/education.json';
import { Education } from '@/types';

export default function EducationSection() {
  const { education } = educationData as { education: Education[] };

  return (
    <section id="education" className="pt-20 pb-1 bg-surface">
      <Container>
        {/* Section heading */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Education
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto md:mx-0" />
        </div>

        {/* Education timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-border hidden md:block" />

          {/* Education cards */}
          <div className="relative">
            {education.map((edu) => (
              <EducationCard
                key={edu.id}
                id={edu.id}
                institution={edu.company}
                institutionLogo={edu.companyLogo}
                location={edu.location}
                degree={edu['degree:'] || edu.degree || 'Degree'}
                major={edu.major}
                minor={edu.minor}
                startDate={edu.startDate}
                endDate={edu.endDate}
                gpa={edu.gpa}
                honors={edu.honors}
                achievements={edu.impactPoints}
                relevantCoursework={edu['Relevant Courses'] || edu.relevantCoursework}
                websiteUrl={edu.websiteUrl}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
