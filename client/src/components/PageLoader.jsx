import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/loader.css';

export default function PageLoader({ isLoading }) {
  const { theme } = useTheme();
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isLoading) {
      setShouldRender(true);
      setIsFadingOut(false);
    } else if (shouldRender) {
      setIsFadingOut(true);
      timeoutId = setTimeout(() => {
        setShouldRender(false);
        setIsFadingOut(false);
      }, 400);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={`page-loader ${theme} ${isFadingOut ? 'is-hidden' : ''}`}>
      <div className="loader-spinner"></div>
    </div>
  );
}
