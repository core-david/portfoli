'use client';

import Link from 'next/link';
import { SiGithub, SiLinkedin, SiLeetcode } from 'react-icons/si';
import siteConfig from '@/data/site-config.json';
import { useTypewriter } from '@/hooks/useTypewriter';
import SearchPlaceholder from './SearchPlaceholder';

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`;

  const titles = [
    'Data Scientist',
    'Software Engineer',
    'MLOps Engineer',
    'Systems Engineer',
  ];

  const { text } = useTypewriter({
    words: titles,
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 1500,
    startDelay: 1000,
  });

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-2">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight">
          {siteConfig.name}
        </h1>

        {/* Title with Typewriter Effect */}
        <p className="text-xl md:text-2xl text-primary font-medium min-h-[2rem] md:min-h-[3rem]">
          {text}
          <span className="animate-cursor">|</span>
        </p>

        {/* Tagline
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          {siteConfig.tagline}
        </p> */}

        {/* Social Icons & Search */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">

          {/* Search Bar */}
          <div className="w-full md:w-auto md:flex-1 md:max-w-md">
            <SearchPlaceholder />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="GitHub Profile"
            >
              <SiGithub className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors duration-200" />
            </a>

            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="LinkedIn Profile"
            >
              <SiLinkedin className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors duration-200" />
            </a>

            <a
              href={siteConfig.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="LeetCode/Portfolio"
            >
              <SiLeetcode className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors duration-200" />
            </a>
          </div>

        
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 pt-8">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-32 sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base text-center bg-primary text-background font-medium rounded-md hover:bg-primary-dim transition-colors duration-200 shadow-lg hover:shadow-primary/20"
          >
            Resume
          </a>

          <Link
            href="/projects"
            className="w-32 sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base text-center bg-surface text-text-primary font-medium rounded-md border border-border hover:border-primary transition-colors duration-200"
          >
            View Projects
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-32 sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-base text-center bg-surface text-text-primary font-medium rounded-md border border-border hover:border-primary transition-colors duration-200"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
