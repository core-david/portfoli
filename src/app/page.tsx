import HeroSection from '@/components/home/HeroSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import EducationSection from '@/components/education/EducationSection';
import CertificationsSection from '@/components/certifications/CertificationsSection';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Education Section */}
      <EducationSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Certifications Section */}
      <CertificationsSection />
    </div>
  );
}
