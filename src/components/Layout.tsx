import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />

      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-5 right-5 z-50
          p-3 rounded-full
          bg-black text-white
          dark:bg-white dark:text-black
          shadow-lg
          transition-all duration-300
          hover:scale-110
          ${
            showButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
      >
        <ChevronUp size={22} />
      </button>
    </div>
  );
}

export default Layout;