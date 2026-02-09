import { useCallback, useState } from "react";

import Header from "./components/Header";
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
    window.scrollTo(0, 0);
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
            onBack={() => navigate("home")}
            onProjectClick={(id) => navigate("project", id)}
            onAbout={() => navigate("about")}
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
            onBack={() => navigate("home")}
            onContact={() => navigate("contact")}
            onWork={() => navigate("work")}
          />
        );

      case "contact":
        return <ContactPage onBack={() => navigate("home")} />;

      case "visual":
        return <VisualPage onBack={() => navigate("home")} />;

      default:
        return null;
    }
  }

  return (
    <>
      <Header currentPage={route.page} onNavigate={navigate} />
      <main>{renderPage()}</main>
    </>
  );
}
