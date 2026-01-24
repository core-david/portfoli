import Container from '@/components/layout/Container';
import AnimatedSection from '@/components/ui/AnimatedSection';
import articlesData from '@/data/articles.json';

export default function EngineeringLogPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Engineering Log
            </h1>
            <p className="text-text-secondary text-lg">
              Technical writing and research insights
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6 max-w-3xl mx-auto">
          {articlesData.articles
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .map((article, index) => (
              <AnimatedSection key={article.id} delay={100 + index * 100}>
                <article className="bg-surface border border-border p-6 rounded-lg hover:border-primary transition-colors group">
                  <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary-dim transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-text-secondary mb-4">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-background border border-border text-primary text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 text-sm text-text-muted">
                    <span>{article.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </article>
              </AnimatedSection>
            ))}
        </div>
      </Container>
    </div>
  );
}
