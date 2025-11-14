'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  // Define the transition duration in milliseconds (must match CSS below)
  const TRANSITION_DURATION = 800; // 1 second
  const INTERVAL_TIME = 6000;      // 5 seconds total per slide

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 1. Start the fade-out by setting state to 'fading'
      setIsFading(true); 

      // 2. After the transition duration, switch the image source 
      //    and immediately fade the new image in (setIsFading(false))
      const timer = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, TRANSITION_DURATION);

      return () => clearTimeout(timer);
    }, INTERVAL_TIME);

    return () => clearInterval(intervalId);
  }, [images.length]);

  // Calculate the next image index for preloading
  const next = (current + 1) % images.length;

  return (
    // Set container height (e.g., h-[400px]) to fix the Next.js warning
    <div className="w-full h-full">
      
      {/* 🖼️ Current Image: Fades Out */}
      <Image
        key={images[current]} // Key is still useful for tracking
        src={images[current]}
        alt={`Gallery image ${current + 1}`}
        fill={true}
        // Tailwind classes for smooth transition: 
        // transition-opacity: applies the transition
        // duration-1000: sets the speed to 1 second
        // opacity-100 / opacity-0: controlled by state
        className={`object-cover object-center absolute transition-opacity duration-1000 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={true} 
      />
      
      {/* 🖼️ Next Image: Remains Invisible but is preloaded */}
      <Image
        key={images[next]} 
        src={images[next]}
        alt={`Gallery image ${next + 2}`}
        fill={true}
        // Starts at opacity-0 and stays there until it becomes the 'current' image
        className={`object-cover object-center absolute opacity-0`} 
      />
    </div>
  );
}
