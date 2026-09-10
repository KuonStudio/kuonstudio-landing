import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf9f5]">
      <div className="text-center px-6">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-3 font-display font-bold text-4xl text-[#141413]">This page does not exist.</h1>
        <a href="/" className="btn-primary mt-8">
          Back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
