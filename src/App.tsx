import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ProjectPage from "./pages/ProjectPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VisualPage from "./pages/VisualPage";

export type PageType = "home" | "work" | "project" | "about" | "contact" | "visual";

type Route =
  | { page: "home" }
  | { page: "work" }
  | { page: "project"; projectId: string }
  | { page: "about" }
  | { page: "contact" }
  | { page: "visual" };

export default function App() {
  const [route, setRoute] = useState<Route>({ page: "home" });
  const prefersReducedMotion = useReducedMotion();

  const routeKey = useMemo(() => {
    return route.page === "project" ? `project:${route.projectId}` : route.page;
  }, [route]);

  const navigate = useCallback((page: PageType, projectId?: string) => {
    // "instant" não é standard; "auto" é o comportamento imediato.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (page === "project") {
      if (!projectId) return;
      setRoute({ page, projectId });
      return;
    }
    setRoute({ page } as Route);
  }, []);

  function renderPage() {
    switch (route.page) {
      case "home":
        return (
          <HomePage
            onViewWork={() => navigate("work")}
            onViewAbout={() => navigate("about")}
            onViewContact={() => navigate("contact")}
            onViewVisual={() => navigate("visual")}
            onProjectClick={(id) => navigate("project", id)}
          />
        );

      case "work":
        return (
          <WorkPage
            onProjectClick={(id) => navigate("project", id)}
            onContact={() => navigate("contact")}
          />
        );

      case "project":
        return (
          <ProjectPage
            projectId={route.projectId}
            onBack={() => navigate("work")}
            onProjectClick={(id) => navigate("project", id)}
            onContact={() => navigate("contact")}
          />
        );

      case "about":
        return (
          <AboutPage
            onContact={() => navigate("contact")}
            onWork={() => navigate("work")}
          />
        );

      case "contact":
        return <ContactPage />;

      case "visual":
        return (
          <VisualPage
            onProjectClick={(id) => navigate("project", id)}
            onContact={() => navigate("contact")}
          />
        );

      default:
        return null;
    }
  }

  // Transição minimal / “editorial”: um toque de deslocamento + fade.
  // (fica com personalidade sem parecer template SaaS)
  const pageMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 10, filter: "blur(2px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -6, filter: "blur(2px)" },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <>
      <Header currentPage={route.page} onNavigate={navigate} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div key={routeKey} {...pageMotion}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigate} />
    </>
  );
}
