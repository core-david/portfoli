interface TechBadgeProps {
  tech: string;
}

export default function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="px-3 py-1 text-xs font-medium border border-border rounded-full text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200">
      {tech}
    </span>
  );
}
