import HeroSection from '@/components/home/HeroSection';
import FeaturedWorkSection from '@/components/home/FeaturedWorkSection';
import EducationSection from '@/components/education/EducationSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import CertificationsSection from '@/components/certifications/CertificationsSection';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Work Section */}
      <FeaturedWorkSection />

      {/* Education Section */}
      <EducationSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Certifications Section */}
      <CertificationsSection />
    </div>
  );
}
