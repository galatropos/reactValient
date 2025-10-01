import { useState, useEffect } from "react";

function useIsLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () =>
    {
        setLoading(false);
    }

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return loading;
}

export default useIsLoading;