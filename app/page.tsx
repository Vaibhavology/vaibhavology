"use client";

import dynamic from "next/dynamic";
import Header from "./components/Header";
import Banner from "./components/Banner";

// Lazy load below-fold components for faster initial paint
const Experience = dynamic(() => import("./components/Experience"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const Skills = dynamic(() => import("./components/Skills"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const About = dynamic(() => import("./components/About"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const Projects = dynamic(() => import("./components/Projects"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});
const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <div style={{ minHeight: "200px" }} />,
});
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), {
  ssr: false,
});
const AnimatedBackground = dynamic(
  () => import("./components/AnimatedBackground"),
  { ssr: false }
);
const ChatBot = dynamic(() => import("./components/ChatBot"), {
  ssr: false,
});

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative">
      <AnimatedBackground />
      <Header />
      <Banner />
      <Experience />
      <Skills />
      <About />
      <Projects />
      <Testimonials />
      <Footer />
      <ScrollToTop />
      <ChatBot />
    </main>
  );
}
