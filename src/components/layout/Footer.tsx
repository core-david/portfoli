import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: 'GH' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'LI' },
    { name: 'LeetCode', href: 'https://leetcode.com', icon: 'LC' },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-text-muted">
            Made with {'<3'} by David Vargas
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
