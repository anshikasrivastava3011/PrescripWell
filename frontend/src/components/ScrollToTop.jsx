import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always scroll to top (even if navigating to same route)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Add event listener for clicking on same-page links
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href') === pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);

  }, [pathname]);

  return null;
};

export default ScrollToTop;
