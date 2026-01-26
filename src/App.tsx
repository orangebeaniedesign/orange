import React, { useCallback, useState } from "react";

import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ProjectPage from "./pages/ProjectPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VisualPage from "./pages/VisualPage";

// If you have a Layout/Header component already, keep using it.
// Otherwise this App renders pages directly.

type Route =
  | { page: "home" }
  | { page: "work" }
  | { page: "project"; projectId: string }
  | { page: "about" }
  | { page: "contact" }
  | { page: "visual" };

export default function App() {
  const [route, setRoute] = useState<Route>({ page: "home" });

  const navigate = useCallback((page: Route["page"], projectId?: string) => {
    if (page === "project") {
      if (!projectId) return;
      setRoute({ page, projectId });
      return;
    }
    setRoute({ page } as Route);
  }, []);

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
      // ✅ Fix: always pass projectId prop
      return (
        <ProjectPage
          projectId={route.projectId}
          onBack={() => navigate("work")}
          onProjectClick={(id) => navigate("project", id)}
          onContact={() => navigate("contact")}
        />
      );

    case "about":
      // ✅ Fix: About expects onContact + onWork
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
