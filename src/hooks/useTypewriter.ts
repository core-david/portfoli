'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  startDelay?: number;
}

export function useTypewriter({
  words,
  typeSpeed = 50,
  deleteSpeed = 30,
  delayBetweenWords = 2000,
  startDelay = 3000,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Initialize with first word for immediate LCP
  const [currentText, setCurrentText] = useState(words[0] || '');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Delay animation start to avoid blocking main thread during page load
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentWord.length) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      } else {
        // Finished typing, wait before deleting
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentText.substring(0, currentText.length - 1));
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [currentText, currentWordIndex, isDeleting, words, delayBetweenWords]);

  useEffect(() => {
    // Don't animate until startDelay has passed
    if (!hasStarted) return;

    // On first start, begin by deleting the initial word (short pause then delete)
    if (hasStarted && currentText === words[0] && !isDeleting && currentWordIndex === 0) {
      const initTimer = setTimeout(() => setIsDeleting(true), 500);
      return () => clearTimeout(initTimer);
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(type, speed);

    return () => clearTimeout(timer);
  }, [type, isDeleting, typeSpeed, deleteSpeed, hasStarted, currentText, words, currentWordIndex, delayBetweenWords]);

  return { text: currentText, isDeleting };
}
