import Container from '@/components/layout/Container';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Timeline from './Timeline';
import experienceData from '@/data/experience.json';

export default function ExperienceSection() {
  return (
    <section id="experience" className="pt-20 pb-20 bg-surface">
      <Container>
        <AnimatedSection>
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              Experience
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <Timeline experiences={experienceData.experiences} />
        </AnimatedSection>
      </Container>
    </section>
  );
}
