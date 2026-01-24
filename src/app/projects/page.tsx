import Container from '@/components/layout/Container';
import AnimatedSection from '@/components/ui/AnimatedSection';
import projectsData from '@/data/projects.json';

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Projects
            </h1>
            <p className="text-text-secondary text-lg">
              Consultancy work and technical projects
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.projects
            .sort((a, b) => a.order - b.order)
            .map((project, index) => (
              <AnimatedSection key={project.id} delay={100 + index * 75}>
                <div className="bg-surface border border-border p-6 rounded-lg hover:border-primary transition-colors group h-full">
                  {project.featured && (
                    <span className="inline-block px-2 py-1 bg-primary/10 border border-primary text-primary text-xs rounded mb-3">
                      Featured
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-dim transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-background border border-border text-text-muted text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-1 text-text-muted text-xs">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 text-sm">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub →
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
        </div>
      </Container>
    </div>
  );
}
