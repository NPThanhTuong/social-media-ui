import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query list using matchMedia
    const mediaQueryList = window.matchMedia(query);

    // Define a function to handle the changes in media query match status
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Set the initial value
    setMatches(mediaQueryList.matches);

    // Listen for changes in the media query match status
    mediaQueryList.addEventListener("change", handleChange);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
