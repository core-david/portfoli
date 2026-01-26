import Container from '@/components/layout/Container';
import articlesData from '@/data/articles.json';

export default function EngineeringLogPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Engineering Log
          </h1>
          <p className="text-text-secondary text-lg">
            Substack coming soon...
          </p>
        </div>
      </Container>
    </div>
  );
}
