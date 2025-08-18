import { useState, useEffect } from "react";
import introVideo from '../assets/opening animation.webm'
import '../css/intro.css'

export default function IntroVideo({ onFinish }: { onFinish: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish(); 
    }, 2000); 
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <video
      className="intro-video"
      src={introVideo}
      autoPlay
      muted
      playsInline
    />
  );
}