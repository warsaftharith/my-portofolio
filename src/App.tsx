import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* Warsa Appearance — non-invasive patch */
import AppearanceControl from "./components/appearance/AppearanceControl";
import { NavigationAppearanceProvider } from "./context/NavigationAppearanceContext";
import FirstVisitTour from "./components/onboarding/FirstVisitTour";

import Layout from "./components/layout/Layout";

import Hero from "./components/sections/Hero";
import HeroProfile from "./components/sections/HeroProfile";
import { useProfileHeroMode } from "./hooks/useProfileHeroMode";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import LoadingScreen from "./components/sections/LoadingScreen";
import Footer from "./components/layout/Footer";
import PriceList from "./components/pricelist/PriceList";

import Skripsi from "./pages/Skripsi";

// Vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function HomePage() {
  const [heroMode] = useProfileHeroMode();
  return (
    <Layout>
      {heroMode === "profile" ? <HeroProfile /> : <Hero />}
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </Layout>
  );
}


function PriceListPage() {
  return (
    <>
      <PriceList />
      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        <BrowserRouter>
          <NavigationAppearanceProvider>
          {/* Warsa Appearance: floating controls, original layout unchanged */}
          <AppearanceControl />
          <FirstVisitTour />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricelist" element={<PriceListPage />} />
            {/* Route for the Skripsi page coming soon */}
            <Route path="/skripsi" element={<Skripsi />} />
          </Routes>
        </NavigationAppearanceProvider>
        </BrowserRouter>
      )}

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;