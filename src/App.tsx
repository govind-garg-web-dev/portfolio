import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { loadData, type SiteData } from "./store";
import { loadFromSupabase } from "./lib/db";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Works from "./components/Works";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Admin from "./admin/Admin";
import CustomCursor from "./components/CustomCursor";
import BlogPostPage from "./pages/BlogPostPage";
import JournalPage from "./pages/JournalPage";
import WorkPage from "./pages/WorkPage";

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  // Start with localStorage/defaults immediately, upgrade to Supabase data once loaded
  const [data, setData] = useState<SiteData>(loadData);
  useSmoothScroll();

  useEffect(() => {
    loadFromSupabase().then(setData).catch(() => {});
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar nav={data.nav} />
          <main>
            <Hero hero={data.hero} />
            <Works projects={data.projects} />
            <Journal blogPosts={data.blog ?? []} />
            <Explorations items={data.explorations} />
            <Stats stats={data.stats} />
            <Footer footer={data.footer} socials={data.socials} />
          </main>
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </BrowserRouter>
  );
}
