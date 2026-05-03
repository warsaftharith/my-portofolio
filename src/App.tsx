import { useState } from "react";

import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen.tsx";

// analys
import { Analytics } from "@vercel/analytics/react";

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
    </>
  );
}

export default App;