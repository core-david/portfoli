import Container from '@/components/layout/Container';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CertificationNode from './CertificationNode';
import certificationsData from '@/data/certifications.json';

export default function CertificationsSection() {
  const { certifications } = certificationsData;

  return (
    <section id="certifications" className="py-20 bg-background">
      <Container>
        <AnimatedSection>
          {/* Section heading */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              Certifications
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto md:mx-0" />
          </div>
        </AnimatedSection>

        {/* Certifications container */}
        <AnimatedSection delay={150}>
          <div className="relative">
            {/* Horizontal flex container with wrapping */}
            <div className="flex gap-8 flex-wrap justify-center items-start">
              {certifications.map((cert) => (
                <CertificationNode
                  key={cert.id}
                  id={cert.id}
                  name={cert.name}
                  issuer={cert.issuer}
                  logo={cert.logo}
                  credentialUrl={cert.credentialUrl}
                  pdfUrl={cert.pdfUrl}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

      </Container>
    </section>
  );
}
