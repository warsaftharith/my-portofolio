import { useState } from "react";

import Layout from "./components/layout/Layout.tsx";
import Hero from "./components/sections/Hero.tsx";
import About from "./components/sections/About.tsx";
import Skills from "./components/sections/Skills.tsx";
import Projects from "./components/sections/Projects.tsx";
import Experience from "./components/sections/Experience.tsx";
import Contact from "./components/sections/Contact.tsx";
import LoadingScreen from "./components/sections/LoadingScreen.tsx";

// analys
import { Analytics } from "@vercel/analytics/react";
// speed
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      {!loading && (
        <Layout>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </Layout>
      )}

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;