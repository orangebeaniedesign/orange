import { useCallback, useState } from "react";

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

  const navigate = useCallback((page: PageType, projectId?: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  return (
    <>
      <Header currentPage={route.page} onNavigate={navigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </>
  );
}
