import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Hero from "./components/sections/Hero";
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
  return (
    <Layout>
      <Hero />
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricelist" element={<PriceListPage />} />
            {/* Route for the Skripsi page coming soon */}
            <Route path="/skripsi" element={<Skripsi />} />
          </Routes>
        </BrowserRouter>
      )}

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;